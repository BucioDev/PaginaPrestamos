import { prisma } from "@/app/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";

async function getSolicitudes() {
    const solicitudes = await prisma.solicitud.findMany({
        where:{
           isDeleted:false,
        },
        orderBy:{
            createdAt:"desc"
        },
    });

    return solicitudes
}



export default async function AdminPage(){

    const solicitudes = await getSolicitudes();

    return (
        <div className="mx-auto max-w-7xl px-6">
            <Card className="mt-5">
                <CardHeader>
                    <CardTitle>Solicitudes Recibidas</CardTitle>
                    <CardDescription>sin color: no revisadas, Rojas: Rechazadas, Verdes: Aceptadas</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nombre Completo</TableHead>
                                <TableHead>Cantidad Solicitada</TableHead>
                                <TableHead>Plazo</TableHead>
                                <TableHead>Nombre de Negocio</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {solicitudes.map((solicitud) => (
                                <TableRow
                                key={solicitud.id}
                                className={
                                    solicitud.aprovado === true
                                    ? "bg-green-100 hover:bg-green-200"
                                    : solicitud.aprovado === false
                                    ? "bg-red-100 hover:bg-red-200"
                                    : ""
                                }
                                >
                                <TableCell>
                                    <Link href={`/solicitud/${solicitud.id}`}>
                                    {solicitud.nombre} {solicitud.apellidoPaterno}{" "}
                                    {solicitud.apellidoMaterno}
                                    </Link>
                                </TableCell>

                                <TableCell>{solicitud.cantidad}</TableCell>
                                <TableCell>{solicitud.plazo}</TableCell>
                                <TableCell>{solicitud.nombreNegocio}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}