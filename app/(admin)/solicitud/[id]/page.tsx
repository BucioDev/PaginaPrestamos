import { aprovarSolicitud, rechazarSolicitud, solicitudClienteSimilitud } from "@/app/actions";
import { prisma } from "@/app/lib/prisma";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { da } from "date-fns/locale";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";


async function getSolicitud(id:string) {
    const data = await prisma.solicitud.findFirst({
        where:{
            id:id,
            isDeleted:false
        },
    });

    if(!data){
        return notFound();
    }

    return data;
}


export default async function SolicitudPage({params}:{params:Promise<{id:string}>}) {
    const {id} = await params;
    const data = await getSolicitud(id);
    const nombre = data.nombre + " " + data.apellidoPaterno + " " + data.apellidoMaterno;

    const posibleClientedata = {
        data:{
        nombre: nombre,
        direccion: data.direccion,
        telefono: data.telefono,
        email: data.email,
        nombreNegocio: data.nombreNegocio,
        solicitudId:id,
        }
    }
    const similitud = await solicitudClienteSimilitud(posibleClientedata)



    return (
        <div className="mx-auto max-w-7xl px-6">
            <div className="mt-5">
            <Button asChild>
                <Link href="/administracion">
                    <ChevronLeft/>
                </Link>
            </Button>
        </div>
            <Card className="mt-5">
                <CardHeader>
                    <CardTitle>
                        Datos de la Solicitud
                    </CardTitle>
                </CardHeader>
                <CardContent>
                <div className="space-y-6">

                    <h2 className="text-xl font-bold">Datos personales</h2>

                    <div className="grid grid-cols-3 gap-6">
                    <div>
                        <p className="text-sm font-semibold text-gray-500">Nombre</p>
                        <p>{data.nombre}</p>
                    </div>

                    <div>
                        <p className="text-sm font-semibold text-gray-500">Apellido paterno</p>
                        <p>{data.apellidoPaterno}</p>
                    </div>

                    <div>
                        <p className="text-sm font-semibold text-gray-500">Apellido materno</p>
                        <p>{data.apellidoMaterno}</p>
                    </div>

                    <div>
                        <p className="text-sm font-semibold text-gray-500">Fecha de nacimiento</p>
                        <p>
                        {new Date(data.fechaNacimiento).toLocaleDateString("es-MX")}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm font-semibold text-gray-500">Teléfono</p>
                        <p>{data.telefono}</p>
                    </div>

                    <div>
                        <p className="text-sm font-semibold text-gray-500">Correo</p>
                        <p>{data.email}</p>
                    </div>

                    <div className="col-span-2">
                        <p className="text-sm font-semibold text-gray-500">Dirección</p>
                        <p>{data.direccion}</p>
                    </div>

                    <div>
                        <p className="text-sm font-semibold text-gray-500">Código Postal</p>
                        <p>{data.codigoPostal}</p>
                    </div>
                    </div>

                    </div>
                    <h2 className="text-xl font-bold mt-8">Negocio</h2>

                        <div className="grid grid-cols-3 gap-6">

                        <div>
                            <p className="text-sm font-semibold text-gray-500">Nombre</p>
                            <p>{data.nombreNegocio}</p>
                        </div>

                        <div>
                            <p className="text-sm font-semibold text-gray-500">Años en el negocio</p>
                            <p>{data.anosNegocio}</p>
                        </div>

                        <div>
                            <p className="text-sm font-semibold text-gray-500">Página web</p>
                            <p>{data.paginaNegocio || "-"}</p>
                        </div>

                        <div className="col-span-3">
                            <p className="text-sm font-semibold text-gray-500">Descripción</p>
                            <p>{data.descripcion}</p>
                        </div>

                        </div>
                        <h2 className="text-xl font-bold mt-8">Referencia</h2>

                            <div className="grid grid-cols-2 gap-6">

                            <div>
                                <p className="text-sm font-semibold text-gray-500">Nombre</p>
                                <p>{data.nombreReferencia}</p>
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-gray-500">Teléfono</p>
                                <p>{data.telefonoReferencia}</p>
                            </div>

                            </div>
                            <h2 className="text-xl font-bold mt-8">Crédito</h2>

                            <div className="grid grid-cols-4 gap-6">

                            <div>
                                <p className="text-sm font-semibold text-gray-500">Crédito vigente</p>
                                <p>{data.creditoVigente ? "Sí" : "No"}</p>
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-gray-500">Deuda pendiente</p>
                                <p>${data.deudaPendiente}</p>
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-gray-500">Cantidad solicitada</p>
                                <p>${data.cantidad}</p>
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-gray-500">Plazo</p>
                                <p>{data.plazo} dias</p>
                            </div>

                            </div>
                            <h2 className="text-xl font-bold mt-8">Estado</h2>

                                <div className="grid grid-cols-4 gap-6">

                                <div>
                                    <p className="text-sm font-semibold text-gray-500">Aprobado</p>
                                    <p>{data.aprovado ? "Sí" : "No"}</p>
                                </div>

                                <div>
                                    <p className="text-sm font-semibold text-gray-500">Código</p>
                                    <p>{data.Codigo ?? "-"}</p>
                                </div>

                                </div>
                                <div>
                                {(similitud?.solicitudes?.length ?? 0) > 0 && (
                                    <p className="text-red-500">
                                        ⚠️ Este cliente ya tiene una solicitud existente en nuestro sistema.
                                    </p>
                                    )}
                                </div>
                </CardContent>
                <form >
                    <input type="hidden" value={data.id} name="id"/>
                <CardFooter className="flex justify-between items-center">
                    <Button size="lg" className="rounded-full text-2xl bg-emerald-400 px-8 py-6 text-black" 
                    formAction={aprovarSolicitud}>
                        Aprovar Solicitud
                    </Button>
                    <Button  size="lg" variant="destructive" className="rounded-full text-2xl  px-8 py-6"
                    formAction={rechazarSolicitud}>
                        Rechazar Solicitud
                    </Button>
                </CardFooter>
                </form>

            </Card>
        </div>
    )
}