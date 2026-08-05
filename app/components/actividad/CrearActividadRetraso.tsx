"use client"
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { SubmitButton } from "../SubmitButtons";
import {  useState } from "react";
import {  createActividadRetraso } from "@/app/actions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";



export default function CrearActividadRetraso({clienteId, solicitudId}:{clienteId:string, solicitudId:string}) {

    const [value, setValue] = useState("");

  

    return (    
        <Dialog>
            <DialogTrigger asChild>
                <Button>Agregar Retraso</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl">
            <form  action={createActividadRetraso}>
                <DialogHeader>
                    <DialogTitle>Descripcion de la actividad</DialogTitle>
                </DialogHeader>
               
                    <div className="flex flex-col gap-6 mt-4">
                        <div className="flex flex-col gap-3">
                            <Textarea id="descripcion" name="descripcion" value="Cliente retrasado con pago, dias de retraso: " disabled/>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label>Cantidad de pagos retrasados</Label>
                            <Input type="text" inputMode="numeric" pattern="[0-9]*" value={value}
                                onChange={(e) => {
                                    const numbersOnly = e.target.value.replace(/\D/g, "");
                                    setValue(numbersOnly); }} 
                                    name="cantidad" required/>
                        </div>
                        <input type="hidden" value={clienteId} name="clientId"/>
                        <input type="hidden" value={solicitudId} name="solicitud"/>
                    </div>

                
                <DialogFooter className="flex justify-between mt-5">
                <DialogClose asChild>
                    <Button type="button">
                        Cancelar
                    </Button>
                </DialogClose>

                <SubmitButton text="Agregar Retraso a actividad de cliente"/>
            </DialogFooter>
            </form>
            </DialogContent>
        </Dialog>
    )
}