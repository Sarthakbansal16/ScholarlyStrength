import { NavLink } from "react-router-dom";
import { useState} from "react";
import { Menu, X } from "lucide-react";

const NavLinks = () => {
    return (
        <>
            <NavLink to="/acads">Acads</NavLink>
            <NavLink to="/coding">Coding</NavLink>
            <NavLink to="/Project">Projects</NavLink>
            <NavLink to="/Healthy">HeatlhyMeHappyMe</NavLink>
        </>
    );
};

export const Nav = () => {
    const [isOpen,setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    }

    return (
        <>
        <nav className="w-full md:w-1/3 flex justify-end items-center">
            {/* Button to toggle the mobile menu */}
            <button onClick={toggleNavbar} className="md:hidden">
                {isOpen ? <X /> : <Menu />}
            </button>
            
            {/* Navigation links for larger screens */}
            <div className="hidden md:flex space-x-4">
                <NavLinks />
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="flex flex-col items-center md:hidden space-y-4">
                    <NavLinks />
                </div>
            )}
        </nav>
        </>
        
    )
}
