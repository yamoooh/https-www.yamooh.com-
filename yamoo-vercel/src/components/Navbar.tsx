import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X, ShoppingBag, User } from "lucide-react";
import logo from "@/assets/yammoh-logo-white.png";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";

const links = [
  { to: "/", label: "Accueil" },
  { to: "/builder", label: "Composer ma salade" },
  { to: "/signature", label: "Signature" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { count } = useCart();
  const { user } = useAuth();

  const navLinks = [
    ...links,
    { to: user ? "/account" : "/auth", label: "Compte" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header className={`fixed top-8 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? "bg-background/95 backdrop-blur-md shadow-card" : "bg-background/95 backdrop-blur-sm border-b border-border"}`}>
      <nav className="container-tight flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-2" aria-label="Yamooh accueil">
          <img src={logo} alt="Yamooh logo" className="h-12 w-auto" width={140} height={48} />
        </Link>

        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => (
            <li key={l.to}>
              <NavLink to={l.to} end={l.to === "/"}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${isActive ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-secondary"}`
                }>
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link to="/cart" aria-label="Mon panier" className="relative p-2.5 rounded-full hover:bg-secondary transition">
            <ShoppingBag size={22} />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-[10px] font-extrabold rounded-full min-w-5 h-5 px-1.5 flex items-center justify-center">{count}</span>
            )}
          </Link>
          <Link to={user ? "/account" : "/auth"} aria-label="Mon compte" className="hidden sm:inline-flex p-2.5 rounded-full hover:bg-secondary transition">
            <User size={22} />
          </Link>

          <button className="md:hidden p-2 rounded-lg hover:bg-secondary" onClick={() => setOpen((o) => !o)} aria-label="Menu">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden bg-background border-t border-border">
          <ul className="container-tight py-4 flex flex-col gap-1">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} end={l.to === "/"}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-lg text-base font-bold ${isActive ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`
                  }>
                  {l.label}
                </NavLink>
              </li>
            ))}
            <li>
              <NavLink to={user ? "/account" : "/auth"}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-lg text-base font-bold ${isActive ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`
                }>
                {user ? "Mon compte" : "Connexion"}
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
