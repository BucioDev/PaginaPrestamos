import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { SubmitButton } from "../SubmitButtons";
import { createActividadCita } from "@/app/actions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { CalendarIcon } from "lucide-react";



export default function CrearActividadCita({clienteId, solicitudId}:{clienteId:string, solicitudId:string}) {
  
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState<Date | undefined>(undefined);
    return (    
        <Dialog>
            <DialogTrigger asChild>
                <Button>Agregar Actividad</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Razon de la cita</DialogTitle>
                </DialogHeader>
                <form  action={createActividadCita}>
                    <div className="flex flex-col gap-6 mt-4">
                        <div className="flex flex-col gap-3">
                            <Textarea id="razon" name="razon"  />
                        </div>
                        <div className="flex flex-col gap-3">
                                    <Label>Fecha de la cita</Label>
                                    <Popover open={open} onOpenChange={setOpen}>
                                        <PopoverTrigger asChild>
                                            <Button variant="outline" data-empty={!date}
                                            className="w-[280px] justify-start text-left font-normal data-[empty=true]:text-muted-foreground border-2 border-slate-400"> 
                                                <CalendarIcon/>
                                                {date ? date.toLocaleDateString() : <span>Seleccionar Fecha</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar mode="single" defaultMonth={date} captionLayout="dropdown"
                                            selected={date} 
                                            onSelect={(date) => {
                                                setDate(date)
                                                setOpen(false)
                                            }}/>
                                        </PopoverContent>
                                    </Popover>
                                    <input type="hidden" value={date?.toDateString() ?? ""} id="fecha" name="fecha"/>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <Label>Hora de la cita</Label>
                                    <Input
                                    type="time"
                                    id="hora"
                                    step="1"
                                    name="hora"
                                    defaultValue="12:30:00"
                                    className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                                    />
                                </div>
                        <input type="hidden" value={clienteId} name="clientId"/>
                        <input type="hidden" value={solicitudId} name="solicitud"/>
                    </div>

                </form>
                <DialogFooter className="flex justify-between mt-5">
                <DialogClose asChild>
                    <Button type="button">
                        Cancelar
                    </Button>
                </DialogClose>

                <SubmitButton text="Agregar Cita con el cliente"/>
            </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}