import { Button } from "@/components/ui/button";
import { ChevronRight, ClockCheck, ListCheck, ThumbsUp, ThumbsUpIcon, UserCog, UserLock } from "lucide-react";
import Link from "next/link";



export default function WhyUs(){
    return (
        <div className="mx-auto max-w-7xl px-6 pt-6 pb-5">
            <div className="flex items-center justify-center pb-8">
                <h1 className="text-2xl font-bold">¿Por que Nosotros sobre Otros?</h1>
            </div>
            
            <div className="grid grid-cols-3 gap-8 pb-5">
                <div className="flex flex-col gap-2 ">
                    <ClockCheck className="h-16 w-16 text-teal-600"/>
                    <h2 className="text-xl text-teal-600 font-semibold">Rapido</h2>
                    <p>Sabemos que los imprevistos no esperan. Obtén una respuesta ágil para acceder al financiamiento que necesitas.</p>
                </div>
                <div className="flex flex-col gap-2">
                    <ThumbsUpIcon className="h-16 w-16 text-teal-600"/>
                    <h2 className="text-xl text-teal-600 font-semibold">Sencillo</h2>
                    <p>Olvídate de las solicitudes interminables. Nuestro proceso está diseñado para ser ágil, claro y sin complicaciones.</p>
                </div>
                <div className="flex flex-col gap-2">
                    <UserLock className="h-16 w-16 text-teal-600"/>
                    <h2 className="text-xl text-teal-600 font-semibold">Seguro</h2>
                    <p>Protegemos tus datos con los mismos estándares de seguridad utilizados por plataformas líderes, para que puedas realizar tus gestiones con total confianza.</p>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-8 pb-5">
                <div className="flex flex-col gap-2">
                    <ListCheck className="h-16 w-16 text-teal-600"/>
                    <h2 className="text-xl text-teal-600 font-semibold">Tu eres nuestra prioridad </h2>
                    <p>Ponemos nuestra experiencia a tu servicio para identificar oportunidades y ofrecerte acceso a las mejores opciones disponibles.</p>
                </div>
                <div className="flex flex-col gap-2">
                    <UserCog className="h-16 w-16 text-teal-600"/>
                    <h2 className="text-xl text-teal-600 font-semibold">Personalizado</h2>
                    <p>Creemos que las mejores soluciones financieras son aquellas que se adaptan a cada situación. Por eso, evaluamos cada caso de forma personalizada.</p>
                </div>
            </div>

            <div className="flex items-center justify-center pb-8">
                <h1 className="text-2xl font-bold">Obten tu financiamiento ¿Por que esperar?</h1>
            </div>
            <div className="flex items-center justify-center">

                <Button asChild className="rounded-full text-2xl bg-cyan-400 px-8 py-8 text-black ">
                                <Link href="/solicitar">
                                Solicita tu Fianciamiento ahora<ChevronRight/>
                                </Link>
                            </Button>
 
            </div>


        </div>
    )
}