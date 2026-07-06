import { ReactNode } from "react";
import NavBar from "../components/NavBar";

 export default function HomeLayout({children}:{children:ReactNode}){
    return (
        <>

        <main className="bg-linear-to-br from-green-50 via-emerald-50 to-teal-200">
            <NavBar/>
            <div className="relative min-h-screen">
                <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-green-300/20 blur-3xl"/>
                <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-emerald-400/20 blur-3xl"/>

                {children}
            </div>
        </main>
        
        </>
    )
 }