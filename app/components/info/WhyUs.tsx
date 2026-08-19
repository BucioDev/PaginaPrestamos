import { Button } from "@/components/ui/button";
import { ChevronRight, ClockCheck, ListCheck, ThumbsUp, ThumbsUpIcon, UserCog, UserLock } from "lucide-react";
import Link from "next/link";



export default function WhyUs() {
    return (
        <div className="mx-auto max-w-7xl px-4 pt-6 pb-10 sm:px-6">
            <div className="flex items-center justify-center pb-8 text-center">
                <h1 className="text-2xl font-bold sm:text-3xl">
                    ¿Por qué Nosotros sobre Otros?
                </h1>
            </div>

            <div className="grid grid-cols-1 gap-10 pb-8 sm:grid-cols-2 lg:grid-cols-3">
                <div className="flex flex-col gap-2">
                    <ClockCheck className="h-12 w-12 text-teal-600 sm:h-16 sm:w-16" />
                    <h2 className="text-xl font-semibold text-teal-600">
                        Rapido
                    </h2>
                    <p className="text-slate-600">
                        Sabemos que los imprevistos no esperan. Obtén una
                        respuesta ágil para acceder al financiamiento que
                        necesitas.
                    </p>
                </div>

                <div className="flex flex-col gap-2">
                    <ThumbsUpIcon className="h-12 w-12 text-teal-600 sm:h-16 sm:w-16" />
                    <h2 className="text-xl font-semibold text-teal-600">
                        Sencillo
                    </h2>
                    <p className="text-slate-600">
                        Olvídate de las solicitudes interminables. Nuestro
                        proceso está diseñado para ser ágil, claro y sin
                        complicaciones.
                    </p>
                </div>

                <div className="flex flex-col gap-2">
                    <UserLock className="h-12 w-12 text-teal-600 sm:h-16 sm:w-16" />
                    <h2 className="text-xl font-semibold text-teal-600">
                        Seguro
                    </h2>
                    <p className="text-slate-600">
                        Protegemos tus datos con los mismos estándares de
                        seguridad utilizados por plataformas líderes, para que
                        puedas realizar tus gestiones con total confianza.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-10 pb-10 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                    <ListCheck className="h-12 w-12 text-teal-600 sm:h-16 sm:w-16" />
                    <h2 className="text-xl font-semibold text-teal-600">
                        Tú eres nuestra prioridad
                    </h2>
                    <p className="text-slate-600">
                        Ponemos nuestra experiencia a tu servicio para
                        identificar oportunidades y ofrecerte acceso a las
                        mejores opciones disponibles.
                    </p>
                </div>

                <div className="flex flex-col gap-2">
                    <UserCog className="h-12 w-12 text-teal-600 sm:h-16 sm:w-16" />
                    <h2 className="text-xl font-semibold text-teal-600">
                        Personalizado
                    </h2>
                    <p className="text-slate-600">
                        Creemos que las mejores soluciones financieras son
                        aquellas que se adaptan a cada situación. Por eso,
                        evaluamos cada caso de forma personalizada.
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-center pb-8 text-center">
                <h1 className="text-2xl font-bold sm:text-3xl">
                    Obtén tu financiamiento ¿Por qué esperar?
                </h1>
            </div>

            <div className="flex items-center justify-center">
                <Button
                    asChild
                    className="w-full rounded-full bg-cyan-400 px-6 py-6 text-lg text-black sm:w-auto sm:px-8 sm:py-8 sm:text-2xl"
                >
                    <Link href="/solicitar">
                        Solicita tu Financiamiento ahora
                        <ChevronRight />
                    </Link>
                </Button>
            </div>
        </div>
    );
}