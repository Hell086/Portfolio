import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

function Navigation({ onLinkClick }) {
  return (
    <ul className="nav-ul">
      {navLinks.map((link) => (
        <li key={link.href} className="nav-li">
          <a className="nav-link" href={link.href} onClick={onLinkClick}>
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Navbar bar — always on top, isolated stacking context */}
      <div className="fixed inset-x-0 top-0 z-50 w-full backdrop-blur-lg bg-primary/40">
        <div className="mx-auto c-space max-w-7xl">
          <div className="flex items-center justify-between py-2 sm:py-0">
            <a href="/" className="text-xl font-bold transition-colors text-secondary">
              BINAY
            </a>

            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="flex cursor-pointer text-secondary hover:text-blue-500 focus:outline-none sm:hidden"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              <img
                src={isOpen ? "assets/close.svg" : "assets/menu.svg"}
                className="w-6 h-6"
                alt="toggle"
              />
            </button>

            <nav className="hidden sm:flex">
              <Navigation />
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile menu — separate from navbar, sits below it */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            key="mobile-menu"
            className="fixed inset-x-0 top-12 z-40 backdrop-blur-lg bg-primary/40 text-center sm:hidden"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="pb-5 pt-3">
              <Navigation onLinkClick={() => setIsOpen(false)} />
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;