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



export default async function entregaPage({params}:{params:Promise<{codigo:string}>}){
    const {codigo} = await params;
    const solicitud = await getSolicitud(codigo);
    
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
        <div className="h-[80vh] w-full flex items-center justify-center">
          <Card className="w-full max-w-xl">
            <CardHeader>
              <CardTitle>Datos de solicitud</CardTitle>
              <CardDescription>
                Por favor confirme que los datos son correctos antes de proceder.
              </CardDescription>
            </CardHeader>
    
            <CardContent className="w-full flex justify-between">
              <div className="flex flex-col gap-6">
                <p className="text-xl font-medium">
                  Código de Aprobación: {solicitud.Codigo}
                </p>
    
                <p className="text-xl font-medium">
                  Nombre del Cliente: {solicitud.nombre}{" "}
                  {solicitud.apellidoPaterno} {solicitud.apellidoMaterno}
                </p>
    
                <p className="text-xl font-medium">
                  Cantidad Solicitada: {solicitud.cantidad}
                </p>
              </div>
              <p className="text-red-500 text-sm">Advertencia: este proceso deber ser hecho por la persona responsable, de otra manera se podria cancelar esta solicitud </p>
    
              
            </CardContent>
            <CardFooter>
            <Button asChild>
                <Link href="/">Cancelar</Link>
              </Button>
    
              <form action={confirmarEntrega}>
                <input type="hidden" name="id" value={solicitud.id} />
                <input type="hidden" name="clienteId" value={solicitud.cliente?.id} />
                <SubmitButton text="Confirmar Entrega" />
              </form>
            </CardFooter>
          </Card>
        </div>
      );
    }