"use client"
import { createSolicitud, createSolicitudPersonal } from "@/app/actions";
import CalculadoraInteres from "@/app/components/CalculadoraInteres";
import { SubmitButton } from "@/app/components/SubmitButtons";
import { solicitudPersonalSchema, solicitudSchema } from "@/app/lib/zodSchemas";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod/v4";
import { CalendarIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useActionState, useState } from "react";

export default function SolicitarPersonalForm() {
    const searchParams = useSearchParams();

    const [open, setOpen] = useState(false);
    const [date, setDate] = useState<Date | undefined>(undefined);
    const today = new Date();

    const maxBirthDate = new Date(
        today.getFullYear() - 18,
        today.getMonth(),
        today.getDate()
    );

    const cantidad = Number(searchParams.get("cantidad")) || 3000;
    const plazo = Number(searchParams.get("plazo")) || 20;

    const [lastResult, action] = useActionState(createSolicitudPersonal, undefined);

    const [form, fields] = useForm({
        lastResult,
        onValidate({formData}){
            return parseWithZod(formData, {schema: solicitudPersonalSchema});
        },

        shouldValidate:"onBlur",
        shouldRevalidate:"onInput",
    })


    
    return (
        <div className="mx-auto max-w-7xl px-6">
            <form id={form.id} onSubmit={form.onSubmit} action={action}>
            <section className="grid grid-cols-[30%_70%] min-h-[80vh] gap-4 py-6 ">
                <div>
                    <CalculadoraInteres c={cantidad} p={plazo}/>
                </div>
                <div>
                    <Card className="w-full max-w-5xl rounded-3xl bg-white/90 p-8 shadow-2xl backdrop-blur">
                        <CardHeader>
                            <CardTitle>
                                Ingresa tus datos y descubre si eres elegible para un Financiamiento
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-6">
                                <div className="flex">
                                    <Checkbox className="h-5 w-5 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 data-[state=checked]:text-white"
                                    id={fields.mayorEdad.id} name={fields.mayorEdad.name}/>
                                     <Label>* Tengo mas de 18 años. Tengo Ingresos Regulares. Tengo una Direccion permanente</Label>
                                     <div><p className="text-sm text-red-500">{fields.mayorEdad.errors}</p></div>
                                </div>
                                
                                <div className="flex flex-col gap-3">
                                    <Label>Nombre</Label>
                                    <Input className="w-full focus-visible:ring-blue-500 border-2 border-slate-400" type="text"
                                    id={fields.nombre.id} name={fields.nombre.name}/>
                                    <p className="text-sm text-red-500">{fields.nombre.errors}</p>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <Label>Apellido Paterno</Label>
                                    <Input className="w-full focus-visible:ring-blue-500 border-2 border-slate-400" type="text"
                                    id={fields.apellidoPaterno.id} name={fields.apellidoPaterno.name}/>
                                    <p className="text-sm text-red-500">{fields.apellidoPaterno.errors}</p>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <Label>Apellido Materno</Label>
                                    <Input className="w-full focus-visible:ring-blue-500 border-2 border-slate-400" type="text"
                                    id={fields.apellidoMaterno.id} name={fields.apellidoMaterno.name}/>
                                    <p className="text-sm text-red-500">{fields.apellidoMaterno.errors}</p>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <Label>Fecha de nacimiento</Label>
                                    <Popover open={open} onOpenChange={setOpen}>
                                        <PopoverTrigger asChild>
                                            <Button variant="outline" data-empty={!date}
                                                className="w-[280px] justify-start text-left font-normal data-[empty=true]:text-muted-foreground border-2 border-slate-400">
                                                <CalendarIcon />
                                                {date ? ( date.toLocaleDateString()
                                                ) : ( <span>Seleccionar Fecha</span>
                                                )}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar mode="single" defaultMonth={date ?? maxBirthDate}
                                                captionLayout="dropdown" selected={date}
                                                disabled={{ after: maxBirthDate, }}
                                                onSelect={(date) => {
                                                    setDate(date);
                                                    setOpen(false);
                                                }}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <input type="hidden" value={date?.toDateString() ?? ""} id={fields.fechaNacimiento.id} name={fields.fechaNacimiento.name}/>
                                    <p className="text-sm text-red-500">{fields.fechaNacimiento.errors}</p>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <Label>Numero de Telefono</Label>
                                    <Input className="w-full focus-visible:ring-blue-500 border-2 border-slate-400"type="text"
                                    id={fields.Telefono.id} name={fields.Telefono.name}/>
                                    <p className="text-sm text-red-500">{fields.Telefono.errors}</p>
                                </div>
                                 <div className="flex flex-col gap-3">
                                    <Label>Correo Electronico</Label>
                                    <Input className="w-full focus-visible:ring-blue-500 border-2 border-slate-400" type="text"
                                    id={fields.email.id} name={fields.email.name}/>
                                    <p className="text-sm text-red-500">{fields.email.errors}</p>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <Label>Confirma tu Correo Electronico</Label>
                                    <Input className="w-full focus-visible:ring-blue-500 border-2 border-slate-400" type="text"
                                    id={fields.confirmaEmail.id} name={fields.confirmaEmail.name}/>
                                    <p className="text-sm text-red-500">{fields.confirmaEmail.errors}</p>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <Label>Direccion </Label>
                                    <Input className="w-full focus-visible:ring-blue-500 border-2 border-slate-400" type="text"
                                    id={fields.direccion.id} name={fields.direccion.name}/>
                                    <p className="text-sm text-red-500">{fields.direccion.errors}</p>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <Label>Codigo postal</Label>
                                    <Input className="w-full focus-visible:ring-blue-500 border-2 border-slate-400"
                                        type="text" inputMode="numeric" maxLength={5}
                                        id={fields.codigoPostal.id} name={fields.codigoPostal.name} />
                                    <p className="text-sm text-red-500">{fields.codigoPostal.errors}</p>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <Label>Referencia</Label>
                                    <Input className="w-full focus-visible:ring-blue-500 border-2 border-slate-400" type="text"
                                    id={fields.nombreReferencia.id} name={fields.nombreReferencia.name}/>
                                    <p className="text-sm text-red-500">{fields.nombreReferencia.errors}</p>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <Label>Telefono de Referencia</Label>
                                    <Input className="w-full focus-visible:ring-blue-500 border-2 border-slate-400" type="text"
                                    id={fields.telefonoReferencia.id} name={fields.telefonoReferencia.name}/>
                                    <p className="text-sm text-red-500">{fields.telefonoReferencia.errors}</p>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <Label>Tiene un credito Vigente?</Label>
                                    <Select key={fields.creditoVigente.key} name={fields.creditoVigente.name}>
                                        <SelectTrigger className="w-[280px] border-2 border-slate-400 focus-visible:ring-blue-500">
                                            <SelectValue placeholder="Elegir Respuesta"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="1">SI</SelectItem>
                                                <SelectItem value="0">NO</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <p className="text-sm text-red-500">{fields.creditoVigente.errors}</p>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end">
                            <SubmitButton text="Enviar Solicitud" />
                        </CardFooter>
                    </Card>
                </div>
            </section>
            </form>
        </div>
    )
}