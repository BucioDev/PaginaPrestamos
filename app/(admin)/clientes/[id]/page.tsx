
import AgregarNotaForm from "@/app/components/AgregarNotaForm";
import CrearActividadCita from "@/app/components/actividad/CrearActividadCita";
import CrearActividadForm from "@/app/components/actividad/CrearActividadForm";
import CrearActividadPago from "@/app/components/actividad/CrearActividadPago";
import CrearActividadRetraso from "@/app/components/actividad/CrearActividadRetraso";
import { prisma } from "@/app/lib/prisma";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronLeft, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getCliente(id:string){
    const data = await prisma.cliente.findFirst({
        where:{
            id:id,
        },
        include:{
            solicitudes:true,
            actividades:true,
        }
    });

    if (!data){
        return notFound();
    }

    return data;
} 

function formatFecha(fecha: Date) {
    const dia = fecha.getDate();
    const mes = new Intl.DateTimeFormat("es-MX", {
      month: "long",
    }).format(fecha);
    const año = fecha.getFullYear();
  
    return `${dia} de ${mes} del ${año}`;
  }

export default async function clientePage({params}:{params:Promise<{id:string}>}) {
    const { id } = await params;
    const cliente = await getCliente(id);

    return (
        <div className="mx-auto max-w-7xl px-6">
            <div className="mt-5">
            <Button asChild>
                <Link href="/clientes">
                    <ChevronLeft/>
                </Link>
            </Button>
        </div>
        <Card className="mt-5">
            <CardHeader>
                <CardTitle>Informacion del cliente</CardTitle>
            </CardHeader>
            <CardContent>
                <h2 className="text-xl font-bold">Datos del cliente</h2>
                <div className="grid grid-cols-3 gap-6">
                    <div>
                        <p className="text-sm font-semibold text-slate-700">Nombre completo</p>
                        <p>{cliente.nombre}</p>
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-slate-700">Telefono</p>
                        <p>{cliente.telefono}</p>
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-slate-700">Email</p>
                        <p>{cliente.email}</p>
                    </div>

                    <div>
                        <p className="text-sm font-semibold text-slate-700">Nombre del negocio</p>
                        <p>{cliente.nombreNegocio}</p>
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-slate-700">Direccion</p>
                        <p>{cliente.direccion}</p>
                    </div>
                </div>
                <div className="mt-5">
                        <p className="text-sm font-semibold text-slate-700">Notas sobre el Cliente</p>
                        <p className="whitespace-pre-wrap break-words">{cliente.notas || ""}</p>
                    </div>
            </CardContent>
            <CardFooter className="text-right">
                <AgregarNotaForm clienteId={cliente.id} notas={cliente.notas || ""}/>
            </CardFooter>
        </Card>

        <Card className="mt-5">
            <CardHeader>
                <CardTitle>Solicitudes del Cliente</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Codigo</TableHead>
                            <TableHead>Cantidad Solicitada</TableHead>
                            <TableHead>Plazo</TableHead>
                            <TableHead>Deuda Pendiente</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {cliente.solicitudes.map((solicitud) => (
                            <TableRow key={solicitud.id}>
                                <TableCell>
                                    <Link href={`/solicitud/${solicitud.id}`}>
                                        {solicitud.Codigo}
                                    </Link>
                                </TableCell>
                                <TableCell>{solicitud.cantidad}</TableCell>
                                <TableCell>{solicitud.plazo}</TableCell>
                                <TableCell>{solicitud.deudaPendiente}</TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="default" size="icon">
                                                <MoreHorizontal className="h-5 w-5"/>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>
                                                Acciones Rapidas
                                            </DropdownMenuLabel>
                                            <DropdownMenuSeparator/>
                                            <DropdownMenuItem asChild><CrearActividadCita clienteId={cliente.id} solicitudId={solicitud.id}/></DropdownMenuItem>
                                            <DropdownMenuItem asChild><CrearActividadPago clienteId={cliente.id} solicitudId={solicitud.id} pago={solicitud.pago} deudaPendiente={solicitud.deudaPendiente}/></DropdownMenuItem>
                                            <DropdownMenuItem asChild><CrearActividadRetraso clienteId={cliente.id} solicitudId={solicitud.id}/></DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>

        <Card className="mt-5">
            <CardHeader>
                <CardTitle>
                    Actividad del cliente
                </CardTitle>
                <CardDescription>Acciones Rapidas</CardDescription>
            </CardHeader>
            <CardContent>
                <div >Acciones rapidas aqui</div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Actividad</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {cliente.actividades.map((actividad) =>(
                            <TableRow key={actividad.id}>
                                <TableCell>{formatFecha(actividad.fecha)}: {actividad.descripcion}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter>
                <CrearActividadForm clienteId={cliente.id}/>
            </CardFooter>
        </Card>
        </div>
    )
}