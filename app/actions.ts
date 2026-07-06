"use server"
import { parseWithZod } from "@conform-to/zod/v4";
import { loginSchema, solicitudSchema } from "./lib/zodSchemas";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { SessionData, sessionOptions } from "./lib";
import { prisma } from "./lib/prisma";



export async function getSession() {
    const cookieStore  = await cookies();

    const session = await getIronSession<SessionData>(cookieStore, sessionOptions)


    return session
}


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

        }
    })  

    redirect("/grasias")

    
}
