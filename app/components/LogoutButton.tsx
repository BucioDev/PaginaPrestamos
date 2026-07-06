import { Button } from "@/components/ui/button";
import { logout } from "../actions";



export default function LogoutButton() {
    return (
        <>
        <form action={logout} >
        <Button type="submit" variant="destructive" >
            Cerrar Session
        </Button>
        </form>

        
        </>
    )
}