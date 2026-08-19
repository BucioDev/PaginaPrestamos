import { confirmarEntrega } from "@/app/actions";
import { SubmitButton } from "@/app/components/SubmitButtons";
import { prisma } from "@/app/lib/prisma";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { notFound } from "next/navigation";


async function getSolicitud(codigo:string){

    const solicitud = await prisma.solicitud.findFirst({
        where:{
            Codigo:codigo
        },
        select:{
            id:true,
            nombre: true,
            apellidoPaterno: true,
            apellidoMaterno: true,
            cantidad:true,
            fechaEntrega: true,
            Codigo:true,
            cliente:{
              select:{
                id:true,
              }
            }
        }
    })

    if(!solicitud){
        return notFound();
    };


    return solicitud
}



export default async function entregaPage({params}:{params:Promise<{id:string}>}){
    const {id} = await params;
    const solicitud = await getSolicitud(id);
    
    if (solicitud.fechaEntrega) {
        return (
          <div className="h-[80vh] flex items-center justify-center">
            <Card className="w-full max-w-lg">
              <CardHeader>
                <CardTitle>Entrega ya realizada</CardTitle>
                <CardDescription>
                  Esta solicitud ya fue entregada anteriormente.
                </CardDescription>
              </CardHeader>
    
              <CardContent>
                <p className="mb-6">
                  La entrega de este apoyo ya fue registrada, por lo que no es
                  posible realizar otra entrega.
                </p>
    
                <Button asChild>
                  <Link href="/">Volver</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        );
      }
    
      return (
        <div className="flex min-h-[80vh] w-full items-center justify-center px-4 py-8 sm:px-6">
            <Card className="w-full max-w-xl">
                <CardHeader className="px-4 sm:px-6">
                    <CardTitle className="text-xl sm:text-2xl">
                        Datos de solicitud
                    </CardTitle>
    
                    <CardDescription className="text-sm sm:text-base">
                        Por favor confirme que los datos son correctos antes de
                        proceder.
                    </CardDescription>
                </CardHeader>
    
                <CardContent className="w-full px-4 sm:px-6">
                    <div className="flex flex-col gap-5 sm:gap-6">
                        <p className="text-lg font-medium sm:text-xl">
                            Código de Aprobación: {solicitud.Codigo}
                        </p>
    
                        <p className="text-lg font-medium sm:text-xl">
                            Nombre del Cliente: {solicitud.nombre}{" "}
                            {solicitud.apellidoPaterno}{" "}
                            {solicitud.apellidoMaterno}
                        </p>
    
                        <p className="text-lg font-medium sm:text-xl">
                            Cantidad Solicitada: {solicitud.cantidad}
                        </p>
    
                        <p className="mt-3 text-sm text-red-500 sm:mt-5">
                            Advertencia: este proceso debe ser hecho por la persona
                            responsable, de otra manera se podría cancelar esta
                            solicitud
                        </p>
                    </div>
                </CardContent>
    
                <CardFooter className="flex flex-col gap-3 px-4 sm:flex-row sm:justify-between sm:px-6">
                    <Button asChild className="w-full sm:w-auto">
                        <Link href="/">Cancelar</Link>
                    </Button>
    
                    <form action={confirmarEntrega} className="w-full sm:w-auto">
                        <input type="hidden" name="id" value={solicitud.id}/>
                        <input
                            type="hidden"
                            name="clienteId"
                            value={solicitud.cliente?.id}
                        />
    
                        <SubmitButton text="Confirmar Entrega"/>
                    </form>
                </CardFooter>
            </Card>
        </div>
    );
    }