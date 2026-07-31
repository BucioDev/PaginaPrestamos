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
        name:"Ajustes",
        href:"/ajusted"
    },
]

export default function AdminNavBarLinks({onLinkClick}:{onLinkClick?:() => void}){
    return (
        <>
        {links.map((link) => (
            <Link key={link.id} href={link.href} onClick={onLinkClick}
            className="group p-2 font-semibold rounded-md">
                {link.name}
            </Link>
        ))

        }
        </>
    )
}