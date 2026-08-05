import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SubmitButton } from "./SubmitButtons";
import { updateNotas } from "../actions";



export default function AgregarNotaForm({clienteId, notas}:{clienteId:string, notas:string}){

    return (
        <Dialog>
            
                <DialogTrigger asChild>
                    <Button> Agregar / Editar Notas</Button>
                </DialogTrigger>
                <DialogContent>
                <form action={updateNotas} id="notas-form">
                    <DialogHeader>
                        <DialogTitle>
                            Notas sobre el cliente
                        </DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-6 mt-5">
                        <div className="flex flex-col gap3">
                            <Textarea defaultValue={notas} name="notas"/>
                        </div>
                    </div>
                    <input type="hidden" value={clienteId} name="clientId"/>
                    <DialogFooter className="flex justify-between mt-5">
                <DialogClose asChild>
                    <Button type="button">
                        Cancelar
                    </Button>
                </DialogClose>

                <SubmitButton text="Agregar / Actualizar Notas" />
                </DialogFooter>
                </form>
                </DialogContent>
                
            
        </Dialog>
    )
}