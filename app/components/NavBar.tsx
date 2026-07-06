import NavBarLinks from "./NavBarLinks";


export default function NavBar(){
    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between bg-transparent">
            <NavBarLinks/>
        </div>
    )
}