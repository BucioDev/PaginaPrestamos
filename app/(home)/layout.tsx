import { ReactNode } from "react";
import NavBar from "../components/NavBar";

 export default function HomeLayout({children}:{children:ReactNode}){
    return (
        <main className="relative min-h-screen overflow-hidden bg-linear-to-br from-green-50 via-emerald-50 to-teal-200">
          <NavBar />
    
          <div className="relative mx-auto min-h-screen max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Background decorations */}
            <div className="pointer-events-none absolute -left-20 top-20 h-48 w-48 rounded-full bg-green-300/20 blur-3xl sm:h-72 sm:w-72 lg:h-96 lg:w-96" />
    
            <div className="pointer-events-none absolute -right-20 bottom-0 h-48 w-48 rounded-full bg-emerald-400/20 blur-3xl sm:h-72 sm:w-72 lg:h-96 lg:w-96" />
    
            {children}
          </div>
        </main>
      );
 }