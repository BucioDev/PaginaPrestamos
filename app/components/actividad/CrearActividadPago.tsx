import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { SubmitButton } from "../SubmitButtons";
import {  useState } from "react";
import {  createActividadRetraso } from "@/app/actions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";



export default function CrearActividadPago({clienteId, solicitudId, pago, deudaPendiente}:{clienteId:string, solicitudId:string, pago:number, deudaPendiente:number}) {

    const [value, setValue] = useState("1");

  

    return (    
        <Dialog>
            <DialogTrigger asChild>
                <Button>Agregar Actividad</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Deuda Pendiente: {deudaPendiente.toFixed(2)}</DialogTitle>
                </DialogHeader>
                <form  action={createActividadRetraso}>
                    <div className="flex flex-col gap-6 mt-4">
                        <div className="flex flex-col gap-3">
                            <p className="text-md font-semibold">Los pagos diarios son de: {pago.toFixed(2)}</p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label>Cantidad de pagos realizados</Label>
                            <Input type="text" inputMode="numeric" pattern="[0-9]*" value={value}
                                onChange={(e) => {
                                    const numbersOnly = e.target.value.replace(/\D/g, "");
                                    setValue(numbersOnly); }} 
                                    name="cantidad" required/>
                        </div>
                        <div><p className="text-md font-semibold">Cantidad a Recibir: {(Number(value) * pago).toFixed(2)}</p></div>
                        <input type="hidden" value={clienteId} name="clientId"/>
                        <input type="hidden" value={solicitudId} name="solicitud"/>
                        <input type="hidden" value={pago} name="pago"/>
                    </div>

                </form>
                <DialogFooter className="flex justify-between mt-5">
                <DialogClose asChild>
                    <Button type="button">
                        Cancelar
                    </Button>
                </DialogClose>

                <SubmitButton text="Agregar Pago a actividad de cliente"/>
            </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}