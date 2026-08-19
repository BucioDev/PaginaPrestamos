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
        <div>
          <section className="grid min-h-[80vh] items-center gap-10 py-12 sm:gap-12 sm:py-16 lg:grid-cols-2 lg:py-20">
            {/* Text */}
            <div className="text-center lg:text-left">
              <h1 className="mb-5 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl xl:text-7xl">
                ¡Pinos32!
    
                <span className="mt-2 block text-emerald-600">
                  Financia tus ideas, construye tu futuro.
                </span>
              </h1>
    
              <p className="mx-auto max-w-xl text-base text-slate-600 sm:text-lg lg:mx-0">
                Hasta $10.000 rápido y fácil, puedes solicitarlo en línea.
              </p>
    
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
                {/* Buttons */}
              </div>
            </div>
    
            {/* Calculator */}
            <div className="flex w-full justify-center lg:justify-end">
              <div className="w-full max-w-md">
                <CalculadoraInteres c={3000} p={20} />
              </div>
            </div>
          </section>
    
          <section>
            <WhyUs />
          </section>
        </div>
      );
}