"use client"
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";


export default function CalculadoraInteres({c, p} : {c:number, p:number}){

        const pathname = usePathname();
        const [cantidad, setCantidad] = useState([c])
        const [plazo, setPlazo] = useState([p])
    
     
        const hideButtonOn = "/solicitar"
       
    
        const tarifa = useMemo(() => {
            const monto = cantidad[0];
            const dias = plazo[0];
    
            const interes = dias / 100;
            const totalPagar = monto * (1 + interes);
    
            return Number((totalPagar / dias).toFixed(2));
            }, [cantidad, plazo]);
    return(
        <>
        <Card className="w-full max-w-md rounded-3xl bg-white/90 p-8 shadow-2xl backdrop-blur">
                    <h2 className="mb-6 text-2xl font-semibold"> 
                        Calcula tus pagos
                    </h2>
                    <div className="space-y-6">
                        <div className="">
                        <div className="flex items-center justify-between gap-2 mb-5">
                            <Label className="text-3xl">
                                Cantidad
                            </Label>
                            <span className="text-2xl text-blue-950">{cantidad.join(", ")}</span>
                        </div>
                        <Slider id="cantidad" name="cantidad"
                         className="[&_[data-slot=slider-track]]:h-3 [&_[data-slot=slider-thumb]]:h-6 [&_[data-slot=slider-thumb]]:w-6"
                        value={cantidad}
                        onValueChange={setCantidad}
                        min={3000}
                        max={10000}
                        step={500}
                        />
                        </div>
                        <div>
                        <div className="flex items-center justify-between gap-2 mb-5">
                            <Label className="text-3xl">
                                Plazo
                            </Label>
                            <span className="text-2xl text-blue-950">{plazo.join(", ")}</span>
                        </div>
                        <Slider id="plazo" name="plazo"
                         className="[&_[data-slot=slider-track]]:h-3 [&_[data-slot=slider-thumb]]:h-6 [&_[data-slot=slider-thumb]]:w-6"
                        value={plazo}
                        onValueChange={setPlazo}
                        min={20}
                        max={30}
                        step={5}
                        />
                        </div>
                        <div className="mt-2 text-right text-2xl font-bold">
                            Tarifa Diaria: ${tarifa}
                            <input type="hidden" value={tarifa} name="tarifa" />
                        </div>
                        <input type="hidden" value={cantidad[0] * (1 + (plazo[0] / 100))} id="total" name="total"/>
                        <div className="mt-5 flex items-center justify-center">
                            {pathname !== hideButtonOn && (
                                <Button asChild className="rounded-full text-2xl bg-cyan-400 px-8 py-6 text-black ">
                                <Link href={`/solicitar?cantidad=${cantidad[0]}&plazo=${plazo[0]}`}>
                                Solicitar tu Financiamiento <ChevronRight/>
                                </Link>
                                
                            </Button>
                            )}
                            
                        </div>
                    </div>

                    </Card>
        </>
    )
}