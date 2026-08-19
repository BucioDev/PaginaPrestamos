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
            return (
                <Card className="w-full max-w-md rounded-3xl bg-white/90 p-5 shadow-2xl backdrop-blur sm:p-6 lg:p-8">
                  <h2 className="mb-6 text-xl font-semibold sm:text-2xl">
                    Calcula tus pagos
                  </h2>
              
                  <div className="space-y-6">
                    <div>
                      <div className="mb-4 flex items-center justify-between gap-3">
                        <Label className="text-xl sm:text-2xl lg:text-3xl">
                          Cantidad
                        </Label>
              
                        <span className="text-lg text-blue-950 sm:text-xl lg:text-2xl">
                          ${cantidad.join(", ")}
                        </span>
                      </div>
              
                      <Slider id="cantidad" name="cantidad"
                        className=" [&_[data-slot=slider-track]]:h-3 [&_[data-slot=slider-thumb]]:h-6 [&_[data-slot=slider-thumb]]:w-6"
                        value={cantidad}
                        onValueChange={setCantidad}
                        min={3000} max={10000} step={500}/>
                    </div>
                    <div>
                      <div className="mb-4 flex items-center justify-between gap-3">
                        <Label className="text-xl sm:text-2xl lg:text-3xl">
                          Plazo
                        </Label>
              
                        <span className="text-lg text-blue-950 sm:text-xl lg:text-2xl">
                          {plazo.join(", ")} días
                        </span>
                      </div>
              
                      <Slider id="plazo" name="plazo"
                        className=" [&_[data-slot=slider-track]]:h-3 [&_[data-slot=slider-thumb]]:h-6 [&_[data-slot=slider-thumb]]:w-6"
                        value={plazo}
                        onValueChange={setPlazo}
                        min={20} max={30} step={5}/>
                    </div>
              
                    <div className="mt-2 text-right text-xl font-bold sm:text-2xl">
                      Tarifa Diaria: ${tarifa}
              
                      <input type="hidden" value={tarifa} name="tarifa"/>
                    </div>
              
                    <input type="hidden" value={cantidad[0] * (1 + plazo[0] / 100)} id="total" name="total"/>
              
                
                    <div className="mt-5 flex justify-center">
                      {pathname !== hideButtonOn && (
                        <Button asChild className="w-full rounded-full bg-cyan-400 px-4 py-6 text-base text-black sm:w-auto sm:px-8 sm:text-lg lg:text-xl">
                          <Link href={`/solicitar?cantidad=${cantidad[0]}&plazo=${plazo[0]}`}>
                            <span>Solicitar tu Financiamiento</span>
                            <ChevronRight />
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              );
}