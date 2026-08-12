
import SolicitarPersonalForm from "@/app/components/SolicitarPersonalForm";
import SolicitarForm from "@/app/components/solicitarForm";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Suspense } from "react";

export default function SolicitarPage() {
    
    return (
       <Suspense>
        <Label className="w-full max-w-7xl px-6 mx-auto mb-5"> Seleccione el tipo de Financiamiento a solicitar</Label>
        <Tabs defaultValue="negocio" className="w-full max-w-7xl px-6 mx-auto">
        <TabsList className="h-auto bg-transparent p-0 gap-1">
        <TabsTrigger
            value="negocio"
            className="
                relative
                z-10
                rounded-t-lg rounded-b-none
                border border-transparent
                px-6 py-3
                data-[state=active]:bg-white
                data-[state=active]:border-gray-200
                data-[state=active]:border-b-white
                data-[state=active]:-mb-[15px]
            "
        >
            Negocios
        </TabsTrigger>

        <TabsTrigger
            value="personal"
            className="
                relative
                z-10
                rounded-t-lg rounded-b-none
                border border-transparent
                px-6 py-3
                data-[state=active]:bg-white
                data-[state=active]:border-gray-200
                data-[state=active]:border-b-white
                data-[state=active]:-mb-[15px]
            "
        >
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
        
       </Suspense> 
    )
}