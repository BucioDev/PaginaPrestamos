import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";



export async function GET(req: Request){
    const { searchParams } = new URL(req.url);

    const clientId = searchParams.get("clientId");

    try{

        const solicitudes = await prisma.solicitud.findMany({
            where:{
                clienteId:clientId
            },
            select:{
                id:true,
                Codigo:true,
                deudaPendiente:true,
            }
        });

        return NextResponse.json(solicitudes);

    } catch (err){
        console.error("Error fetching Actividades: ", err);
        return NextResponse.json(
            { error: "Failed to fetch Actividades"},
            { status: 500 }
        );
    }
}