import { prisma } from "@/app/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";

async function getClientes() {
    const clientes = await prisma.cliente.findMany({
        select:{
            id:true,
            nombre:true,
            nombreNegocio:true,
            notas:true,
            solicitudes:{
                select:{
                    deudaPendiente:true,
                    estado:true,
                }
            }
        },
        orderBy:{
            createdAt:"desc"
        },
    });


    return { clientes };
}



export default async function AdminPage(){

    const { clientes } = await getClientes();

    return (
        <div className="mx-auto max-w-7xl px-6">
            <Card className="mt-5">
                <CardHeader>
                    <CardTitle>Clientes Aprovados</CardTitle>
                    <CardDescription>Lista de clientes que tiene credito aprobado</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nombre Completo</TableHead>
                                <TableHead>Nombre de Negocio</TableHead>
                                <TableHead>Notas</TableHead>
                                <TableHead>Nombre de Negocio</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                        {clientes.map((cliente) => {
                        const maxEstado = Math.max(
                            ...cliente.solicitudes.map((s) => s.estado ?? 0),
                            0
                        );

                        const rowColor =
                            maxEstado === 3
                                ? "bg-red-100 hover:bg-red-200"
                                : maxEstado === 2
                                ? "bg-yellow-100 hover:bg-yellow-200"
                                : maxEstado === 1
                                ? "bg-blue-100 hover:bg-blue-200"
                                : "bg-green-100 hover:bg-green-200";

                        const deudaCliente = cliente.solicitudes.reduce(
                            (sum, s) => sum + (s.deudaPendiente ?? 0),
                            0
                        );

                        return (
                            <TableRow key={cliente.id} className={rowColor}>
                                <TableCell>
                                    <Link href={`/clientes/${cliente.id}`}>
                                        {cliente.nombre}
                                    </Link>
                                </TableCell>

                                <TableCell>{cliente.nombreNegocio}</TableCell>
                                <TableCell>{cliente.notas}</TableCell>
                                <TableCell>{deudaCliente}</TableCell>
                            </TableRow>
                        );
                    })}
                            </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}