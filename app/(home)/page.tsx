"use client"
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ChevronRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import CalculadoraInteres from "../components/CalculadoraInteres";
import WhyUs from "../components/info/WhyUs";

export default function Home(){


    return (
        <div className="mx-auto max-w-7xl px-6">
            <section className="grid min-h-[80vh] items-center gap-12 py-12 lg:grid-cols-2">

                <div>
                    <h1 className="mb-6 text-5xl font-bold leading-tight lg:text-7xl">
                        ¡Pinos32! 
                        <span className="block text-emerald-600">   
                            Financia tus ideas, construye tu futuro.
                        </span>
                        </h1>
                        <p className="max-w-xl text-lg text-slate-600">
                            Hasta $10.000 rapido y facil, puedes solicitarlo en linea
                        </p>
                        
                        <div className="mt-8 flex gap-4">
                        
                        </div>
                </div>
                <div className="flex justify-center lg:justify-end">
                    <CalculadoraInteres c={3000} p={20}/>
                    
                </div>

            </section>
            <div>
                <WhyUs/>
            </div>

        </div>
    )
}