"use client"
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { SubmitButton } from "../SubmitButtons";
import { useActionState, useEffect, useState } from "react";
import { createActividadLogE } from "@/app/actions";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod/v4";
import { actividadSchema } from "@/app/lib/zodSchemas";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Solicitud = {
    id: string;
    Codigo: string;
    deudaPendiente: number,
}


export default function CrearActividadForm({clienteId}:{clienteId:string}) {

    const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
    const [lastResult, action] = useActionState(createActividadLogE, undefined);
    

    const [form, fields] = useForm({
        lastResult,
        onValidate({formData}){
            return parseWithZod(formData, {schema:actividadSchema});
        },

        shouldValidate:"onBlur",
        shouldRevalidate:"onInput",
    })

    useEffect(() => {
        const fetchSolicitudes = async () => {
            const res = await fetch(`/api/solicitudes-de-cliente?clientId=${clienteId}`);
            const data: Solicitud[] = await res.json();
            setSolicitudes(data);
        }
        fetchSolicitudes();
    }, [clienteId]);

    return (    
        <Dialog>
            
            <DialogTrigger asChild>
                <Button>Agregar Actividad</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl">
            <form id={form.id} onSubmit={form.onSubmit} action={action}>
                <DialogHeader>
                    <DialogTitle>Descripcion de la actividad</DialogTitle>
                </DialogHeader>
                
                    <div className="flex flex-col gap-6 mt-4">
                        <div className="flex flex-col gap-3">
                            <Textarea id={fields.descripcion.id} name={fields.descripcion.name}/>
                        </div>
                        <input type="hidden" value={clienteId} name="clientId"/>
                        <div className="flex flex-col gap-3">
                            <Label>Seleccionar Solicitud de la actividad</Label>
                            <Select key={fields.solicitudId.key} name={fields.solicitudId.name} >
                                <SelectTrigger>
                                    <SelectValue placeholder="Seleccionar solicitud"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {solicitudes.map((solicitud) => (
                                        <SelectItem key={solicitud.id} value={solicitud.id}>Codigo:{solicitud.Codigo}, Deuda pendiente:{solicitud.deudaPendiente}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <p className="text-red-500">{fields.solicitudId.errors}</p>
                        </div>
                    </div>

               
                <DialogFooter className="flex justify-between mt-5">
                <DialogClose asChild>
                    <Button type="button">
                        Cancelar
                    </Button>
                </DialogClose>

                <SubmitButton text="Agregar Actividad"/>
            </DialogFooter>
            </form>
            </DialogContent>
          
        </Dialog>
    )
}