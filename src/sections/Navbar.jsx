import {useState} from "react";
import {motion} from "motion/react";
import { Link } from "react-router-dom";

function Navigation({ onNavigate })
{
    const navigationItems = [
        { label: "Home", id: "home" },
        { label: "About", id: "about" },
        { label: "Services", id: "services" },
        { label: "Projects", id: "projects" },
        { label: "Contact", id: "contact" },
    ];

    return (
        <ul className="nav-ul">
            {navigationItems.map(({ label, id }) => (
                <li key={id} className="nav-li">
                    <Link className="nav-link" to={`/#${id}`} onClick={onNavigate}>
                        {label}
                    </Link>
                </li>
            ))}
        </ul>
    )
}
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
  return ( 
  <div className="fixed inset-x-0 z-20 w-full backdrop-blur-lg
  bg-primary/40">
    <div className="mx-auto c-space max-w-7xl">
        <div className="flex items-center justify-between
        py-2 sm:py-0">
            <Link
            to="/#home"
            className="text-xl font-bold transition-colors text-secondary">
                BINAY
            </Link>
            <button 
            onClick={() => setIsOpen(!isOpen)}
            className="flex cursor-pointer text-secondary
            hover:text-blue-500 focus:outline-non sm:hidden">
                <img src={isOpen ? "/assets/close.svg" : "/assets/menu.svg"} className="w-6 h-6" alt="toggle"/>
            </button>
            <nav className="hidden sm:flex">
                <Navigation onNavigate={() => setIsOpen(false)} />
            </nav>
            </div>
    </div>
    {isOpen && (
    <motion.div className="block overflow-hidden text-center 
    sm:hidden"
    initial={{ opacity: 0, x: -10}}
    animate={{ opacity: 1, x:0}}
    style={{ maxHeight: "100vh"}}
    transition={{ duration: 1}}
    >
        <nav className="pb-5">
            <Navigation onNavigate={() => setIsOpen(false)} />
        </nav>
    </motion.div>
    )}
  </div>
  );
};

export default Navbar;
