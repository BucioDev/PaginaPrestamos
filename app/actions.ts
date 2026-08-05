"use server"
import { parseWithZod } from "@conform-to/zod/v4";
import { actividadSchema, loginSchema, solicitudSchema } from "./lib/zodSchemas";
import { notFound, redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { SessionData, sessionOptions } from "./lib";
import { prisma } from "./lib/prisma";
import { Resend } from "resend";
import { NextResponse } from "next/server";
import SolicitudRechazadaEmail from "@/emails/correo-rechazo";
import React from "react";
import { render } from "react-email";
import SolicitudAprobadaEmail from "@/emails/correo-aprovado";
import QRCode from "qrcode";
import { put } from "@vercel/blob";

const resend = new Resend(process.env.RESEND_API_KEY);

//======================== Interfaces ==============================

interface createClienteProps {
    data :{
        nombre: string,
        direccion: string,
        telefono: string,
        email: string,
        nombreNegocio: string,
        solicitudId:string,
    }
}



//======================== logins actions ============================

export async function login(prevState: unknown, formData:FormData){

    const session = await getSession();

    const submission = parseWithZod(formData,{
        schema:loginSchema
    });

    if(submission.status !== "success"){
        return submission.reply();
    }

    // check if user exists
    const user = await prisma.sec.findFirst({
        where:{
            pass:submission.value.password,
        }
    })

    if(!user ){
        return submission.reply({
            formErrors:["Contraseña incorrecta"],
        });
    }


    session.isLoggedIn = true;

    await session.save();

    redirect("/administracion");
}

export async function logout(){
    const session = await getSession();
    session.destroy();
    
    redirect("/login");
}

//===============================================  Solicitudes  ==================================================

export async function createSolicitud(prevState: unknown, formData: FormData){

    const submission = parseWithZod(formData, {
        schema:solicitudSchema
    });

    if (submission.status !== "success"){
        return submission.reply();
    };

    const plazo = Number(formData.get("plazo")); 
    const cantidad = Number(formData.get("cantidad"));
    const total = Number(formData.get("total"));
    const rawTarifa = formData.get("tarifa");
    if (!rawTarifa || typeof rawTarifa !== "string") {
        throw new Error("Tarifa is required");
      }
    const sanitized = rawTarifa.replace(",", ".");
  const tarifa = parseFloat(sanitized);


    console.log(Object.fromEntries(formData.entries()));

    await prisma.solicitud.create({
        data:{
            nombre: submission.value.nombre,
            apellidoPaterno: submission.value.apellidoPaterno,
            apellidoMaterno: submission.value.apellidoMaterno,
            fechaNacimiento: new Date(submission.value.fechaNacimiento),
            telefono: submission.value.Telefono,
            email: submission.value.email,
            direccion: submission.value.direccion,
            codigoPostal: submission.value.codigoPostal,
            anosNegocio: submission.value.anosNegocio,
            nombreNegocio: submission.value.nombreNegocio,
            paginaNegocio: submission.value.paginaNegocio || "",
            descripcion: submission.value.descripcion,
            nombreReferencia: submission.value.nombreReferencia,
            telefonoReferencia: submission.value.telefonoReferencia,
            creditoVigente: submission.value.creditoVigente,
            deudaPendiente: total,
            cantidad: cantidad,
            plazo: plazo,
            pago: tarifa,
        }
    })  

    redirect("/gracias")

    
}

export async function rechazarSolicitud(formData: FormData){

    const id = formData.get("id") as string;

    const solicitudActualizada =await prisma.solicitud.update({
        where:{
            id:id,
        },
        data:{
            aprovado: false,
        }
    });

    //Agregar envio de correo o whatsapp sobre el rechazo de la solicitud
    
    //Rechazo por correo
    await enviarRechazoEmail(
        solicitudActualizada.nombre,
        solicitudActualizada.apellidoPaterno,
        solicitudActualizada.apellidoMaterno,
        solicitudActualizada.email,
      );

    redirect("/administracion");
}

export async function aprovarSolicitud(formData: FormData){

    const id = formData.get("id") as string;

    const codigo = generarAlphaNumericCode(15);

    //llamar la informacion de la solicitud
    const solicitud = await prisma.solicitud.findFirst({
        where:{
            id:id
        }
    })

    if(!solicitud){
        return notFound()
    }
    
    //poner la informacion dentro de la interface
    const nombre = solicitud.nombre + " "+ solicitud.apellidoPaterno + " " + solicitud.apellidoMaterno;
    const nuevoClientedata = {
        data:{
        nombre: nombre,
        direccion: solicitud.direccion,
        telefono: solicitud.telefono,
        email: solicitud.email,
        nombreNegocio: solicitud.nombreNegocio,
        solicitudId:solicitud.id,
        }
    }
    
    //revisar si el cliente existe si si agregar cliente a la solicitud, si no crear nuevo cliente
    let cliente = await existeCliente(nuevoClientedata);

    if (!cliente) {
        cliente = await createCliente(nuevoClientedata);
    }
    
    const solicitudActualizada = await prisma.solicitud.update({
        where: {
            id,
        },
        data: {
            aprovado: true,
            Codigo: codigo,
            clienteId: cliente.id,
        },
    });
    
    await createActividadLog(
        cliente.id,
        "Solicitud aprobada",
        solicitudActualizada.id
    );

    

    //crear logs
    await enviarAprovadoEmail(
        solicitudActualizada.nombre,
        solicitudActualizada.apellidoPaterno,
        solicitudActualizada.apellidoMaterno,
        solicitudActualizada.email,
        solicitudActualizada.Codigo as string,
      );

    redirect("/administracion");
}

export async function solicitudClienteSimilitud({ data }: createClienteProps) {
    return await prisma.cliente.findFirst({
      where: {
        direccion: data.direccion,
        telefono: data.telefono,
        email: data.email,
        nombreNegocio: data.nombreNegocio,
      },
      include:{
        solicitudes:true,
      }
    });
}

//Funcion para actualizar el estado de una solicitud despues de un pago o un retraso - helper function
async function revisarEstadoSolicitud(solicitudId: string) {
    const solicitud = await prisma.solicitud.findUnique({
      where: {
        id: solicitudId,
      },
      select: {
        fechaEntrega: true,
        pagosHechos: true,
        fechaTermino: true,
        deudaPendiente:true,
      },
    });
  
    if (!solicitud) {
      throw new Error("Solicitud no encontrada");
    }
  
    const { fechaEntrega, fechaTermino, pagosHechos, deudaPendiente } = solicitud;

if (!fechaEntrega || !fechaTermino) {
  return null; 
}
  
    const today = new Date();
  
    // First payment is the day after delivery
    const firstPayment = new Date(fechaEntrega);
    firstPayment.setDate(firstPayment.getDate() + 1);
  
    // Remove time portion to avoid partial-day issues
    firstPayment.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
  
    let expectedPayments = 0;
  
    if (today >= firstPayment) {
      const end = today < fechaTermino ? today : fechaTermino;
  
      const msPerDay = 1000 * 60 * 60 * 24;
      expectedPayments =
        Math.floor(
          (end.getTime() - firstPayment.getTime()) / msPerDay
        ) + 1;
    }
  
    const difference = pagosHechos - expectedPayments;

    let status = 0;

    if (difference > 0) {
    // Ahead
    status = 1;
    } else if (difference === 0) {
    // On time
    status = 0;
    } else {
    // Behind
    const daysLate = -difference;

    if (daysLate >= 6) {
        status = 3;
    } else if (daysLate >= 3) {
        status = 2;
    } else {
        // 1-2 days late
        status = 0;
    }
    }

    const completo = deudaPendiente <= 0;

    await prisma.solicitud.update({
        where:{
            id: solicitudId,
        },
        data:{
            estado:status,
            completado: completo,
        }
    })
    
    
    }


    export async function confirmarEntrega(formData:FormData){
        const solicitudId = formData.get("id") as string;
        const clienteId = formData.get("clienteId") as string;

        const solicitud = await prisma.solicitud.findUnique({
            where:{
                id:solicitudId
            },
        })

        if (!solicitud){
            return notFound();
        }

        const today = new Date();
        const finalday = new Date(today);
        finalday.setDate(finalday.getDate() + solicitud.plazo + 1);

        await prisma.solicitud.update({
            where:{
                id:solicitudId,
            },
            data:{
                fechaEntrega:today,
                fechaTermino:finalday,
            },
        })

        createActividadLog(clienteId, "Dinero fue entregado al cliente", solicitudId)



        redirect("/exito");

    }
//============================= cliente Actions ========================================


async function createCliente({data}:createClienteProps){

    const clienteNuevo = await prisma.cliente.create({
        data:{
            nombre:data.nombre,
            direccion:data.direccion,
            telefono:data.telefono,
            email:data.email,
            nombreNegocio:data.nombreNegocio,
        }
    });
    let descripcion = "Perfil de Cliente Creado"
    await createActividadLog(clienteNuevo.id, descripcion, data.solicitudId)

    return clienteNuevo;
}

export async function existeCliente({ data }: createClienteProps) {
    return await prisma.cliente.findFirst({
      where: {
        nombre: data.nombre,
        direccion: data.direccion,
        telefono: data.telefono,
        email: data.email,
        nombreNegocio: data.nombreNegocio,
      },
    });
}

export async function updateNotas(formData:FormData) {
    const clientId = formData.get("clientId") as string;
    const notas = formData.get("notas") as string;
    await prisma.cliente.update({
        where:{
            id:clientId,
        },
        data:{
            notas:notas,
        },
    });

    redirect(`/clientes/${clientId}`)
}
//============================== client activity Actions ============================

async function createActividadLog(clienteId:string, descripcion:string, solicitudiId:string){

    await prisma.actividad.create({
        data:{
            descripcion:descripcion,
            solicitudId:solicitudiId,
            clienteId:clienteId
        }
    })
}

export async function createActividadLogE(prevState: unknown, formData: FormData){

    const submission = parseWithZod(formData, {
        schema:actividadSchema
    });

    if(submission.status !== "success"){
        return submission.reply();
    }

    const clientId = formData.get("clientId") as string;

    await prisma.actividad.create({
        data:{
            descripcion:submission.value.descripcion,
            solicitudId:submission.value.solicitudId,
            clienteId:clientId,
        }
    })

    redirect(`/clientes/${clientId}`)
}

export async function createActividadPago(formData: FormData){

    const clienteId = formData.get("clientId") as string;
    const solicitudId = formData.get("solicitud") as string;
    const cantidad = Number(formData.get("cantidad")) ;
    const pago = Number(formData.get("pago"));

    const pagoTotal = (cantidad * pago).toFixed(2);

    const descripcion = "Cliente pago: " + cantidad + " dias de su deuda, sumando la cantidad de: " + pagoTotal;

    await prisma.actividad.create({
        data:{
            descripcion:descripcion,
            solicitudId:solicitudId,
            clienteId:clienteId,
        }
    })

    await prisma.solicitud.update({
        where: {
            id: solicitudId,
        },
        data: {
            pagosHechos: {
            increment: cantidad,
        },
            deudaPendiente: {
            decrement: Number(pagoTotal),
        },
        },
    });

    //Revisar el estado actual de la solicitud
    revisarEstadoSolicitud(solicitudId);


    redirect(`/clientes/${clienteId}`)
}

export async function createActividadRetraso(formData: FormData){

    const clienteId = formData.get("clientId") as string;
    const solicitudId = formData.get("solicitud") as string;
    const cantidad = formData.get("cantidad") as string;

    const descripcion = "Cliente retrasado con pago, dias de retraso: " + cantidad;

    await prisma.actividad.create({
        data:{
            descripcion:descripcion,
            solicitudId:solicitudId,
            clienteId:clienteId,
        }
    })

    //Revisar el estado actual de la solicitud
    revisarEstadoSolicitud(solicitudId);


    redirect(`/clientes/${clienteId}`)
}

export async function createActividadCita(formData: FormData){

    const clienteId = formData.get("clientId") as string;
    const solicitudId = formData.get("solicitud") as string;
    const razon = formData.get("razon") as string;
    const fecha = new Date(formData.get("fecha") as string);
    const hora = formData.get("hora") as string;

    const [hours, minutes] = hora.split(":").map(Number);

    fecha.setHours(hours, minutes, 0, 0);

    const end = new Date(fecha);
    end.setMinutes(end.getMinutes() + 30);

    const start = formatGoogleDate(fecha);
    const finish = formatGoogleDate(end);



const calendarUrl =
  `https://calendar.google.com/calendar/render?action=TEMPLATE` +
  `&text=${encodeURIComponent("Cita con Cliente")}` +
  `&dates=${start}/${finish}` +
  `&details=${encodeURIComponent(razon)}` +
  `&location=${encodeURIComponent("Oficina")}`;

    const descripcion = "Cliente Agendo una cita, Razon: " + razon +" Link para agendar cita: " + calendarUrl;

    await prisma.actividad.create({
        data:{
            descripcion:descripcion,
            solicitudId:solicitudId,
            clienteId:clienteId,
        }
    })

    


    redirect(`/clientes/${clienteId}`)
}

//================================== email actions ================================

async function enviarRechazoEmail(nombre:string, apellidoMaterno:string, apellidoPaterno:string, email:string) {
    try {

        if (!email || !nombre) {
            return NextResponse.json(
                { error: "Falta nombre o correo" },
                { status: 400 }
            );
        }

        const emailElement = React.createElement(SolicitudRechazadaEmail,{
            nombre,
            apellidoPaterno,
            apellidoMaterno,
            email,
        });

        const html = await render(emailElement);

        await resend.emails.send({
            from: process.env.EMAIL_FROM!,
            to: email,
            subject: 'Solicitud de financiamiento rechazada',
            html,
          });

        return NextResponse.json({ nombre, email },);
    } catch(error) {
        console.error("ENVIO_EMAIL_ERROR", error);
        return NextResponse.json(
            { error: "Fallo al Enviar el Correo" },
            { status: 500 }
        );
    }
}

async function enviarAprovadoEmail(nombre:string, apellidoMaterno:string, apellidoPaterno:string, email:string, codigo:string) {
    try {

        if (!email || !nombre) {
            return NextResponse.json(
                { error: "Falta nombre o correo" },
                { status: 400 }
            );
        }

        const qrUrl = `https://www.pinos32.com/entrega/${encodeURIComponent(codigo)}`;

        const qrBuffer = await QRCode.toBuffer(qrUrl, {
            type: "png",
            width: 180,
        });

        const blob = await put(
            `qrcodes/${codigo}.png`,
            qrBuffer,
            {
            access: "public",
            contentType: "image/png",
            }
        );

        const emailElement = React.createElement(SolicitudAprobadaEmail,{
            nombre,
            apellidoPaterno,
            apellidoMaterno,
            email,
            codigo,
            qrUrl:blob.url,
        });

        const html = await render(emailElement);

        await resend.emails.send({
            from: process.env.EMAIL_FROM!,
            to: email,
            subject: 'Solicitud de financiamiento Aprovada',
            html,
          });

        return NextResponse.json({ nombre, email },);
    } catch(error) {
        console.error("ENVIO_EMAIL_ERROR", error);
        return NextResponse.json(
            { error: "Fallo al Enviar el Correo" },
            { status: 500 }
        );
    }
}



//============================= Utility Functions =========================================

export async function getSession() {
    const cookieStore  = await cookies();

    const session = await getIronSession<SessionData>(cookieStore, sessionOptions)


    return session
}

 function generarAlphaNumericCode(length:number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  function formatGoogleDate(date: Date) {
    return date
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}Z$/, "Z");
  }