"use client"

import Link from "next/link"

const links = [
    {
        id:0,
        name:"Inicio",
        href:"/",
    },
    {
        id:1,
        name:"Solicitar Financiamiento",
        href:"/solicitar"
    },
]

export default function NavBarLinks({onLinkClick}:{onLinkClick?:() => void}){
    return (
        <>
        {links.map((link) => (
            <Link key={link.id} href={link.href} onClick={onLinkClick}
            className=" rounded-md px-3 py-2 font-semibold transition-colors hover:bg-emerald-100 hover:text-emerald-700 ">
                {link.name}
            </Link>
        ))

        }
        </>
    )
}