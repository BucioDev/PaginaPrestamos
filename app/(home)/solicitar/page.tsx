
import SolicitarPersonalForm from "@/app/components/SolicitarPersonalForm";
import SolicitarForm from "@/app/components/solicitarForm";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Suspense } from "react";

export default function SolicitarPage() {
    return (
        <Suspense>
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
                <Label className="mb-5 block w-full text-base sm:text-lg">
                    Seleccione el tipo de Financiamiento a solicitar
                </Label>

                <Tabs defaultValue="negocio" className="w-full">
                    <TabsList className="h-auto w-full gap-1 bg-transparent p-0 sm:w-auto">
                        <TabsTrigger
                            value="negocio"
                            className="relative z-10 flex-1 rounded-t-lg rounded-b-none border border-transparent px-4 py-3 text-sm sm:flex-none sm:px-6 sm:text-base
                            data-[state=active]:-mb-[15px] data-[state=active]:border-gray-200 data-[state=active]:border-b-white data-[state=active]:bg-white">
                            Negocios
                        </TabsTrigger>

                        <TabsTrigger
                            value="personal"
                            className="relative z-10 flex-1 rounded-t-lg rounded-b-none border border-transparent px-4 py-3 text-sm sm:flex-none sm:px-6 sm:text-base
                            data-[state=active]:-mb-[15px] data-[state=active]:border-gray-200 data-[state=active]:border-b-white data-[state=active]:bg-white">
                            Personales
                        </TabsTrigger>
                    </TabsList>

                    <div className="rounded-b-xl rounded-tr-xl border border-gray-200 bg-white">
                        <TabsContent value="negocio" className="m-0">
                            <SolicitarForm />
                        </TabsContent>

                        <TabsContent value="personal" className="m-0">
                            <SolicitarPersonalForm />
                        </TabsContent>
                    </div>
                </Tabs>
            </div>
        </Suspense>
    );
}