import NavBar from "@/app/components/NavBar";
import { ReactNode } from "react";
import { getSession } from "../actions";
import { redirect } from "next/navigation";
import LogoutButton from "../components/LogoutButton";

export default async function AdminLayout({children}:{children:ReactNode}){

    const session = await getSession();

    if(!session.isLoggedIn){
        redirect("/login");
    }
    return (
         <>
        
                <main className="bg-linear-to-br from-green-50 via-emerald-50 to-teal-200">
                    <NavBar/> <LogoutButton />
                    <div className="relative min-h-screen">
                        <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-green-300/20 blur-3xl"/>
                        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-emerald-400/20 blur-3xl"/>
        
                        {children}
                    </div>
                </main>
                
                </>
    )
}