import { Link } from "react-router-dom";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import logo from "@/assets/yammoh-logo-white.png";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background mt-24">
      <div className="container-tight py-16 grid gap-12 md:grid-cols-3">
        <div>
          <img src={logo} alt="Yamooh" className="h-14 w-auto bg-background rounded-lg p-1 mb-4" width={160} height={56} loading="lazy" />
          <p className="text-sm text-background/70 max-w-xs">
            Freshness in every bite. Salades fraîches préparées avec amour à Douala.
          </p>
        </div>

        <div>
          <h3 className="font-display text-lg mb-4">Liens rapides</h3>
          <ul className="space-y-2 text-sm text-background/80 mb-6">
            <li><Link to="/builder" className="hover:text-accent">Composer ma salade</Link></li>
            <li><Link to="/signature" className="hover:text-accent">Formules signature</Link></li>
            <li><Link to="/cart" className="hover:text-accent">Mon panier</Link></li>
            <li><Link to="/faq" className="hover:text-accent">FAQ</Link></li>
            <li><Link to="/auth" className="hover:text-accent">Connexion / Inscription</Link></li>
          </ul>
          <h3 className="font-display text-lg mb-4">Contact</h3>
          <ul className="space-y-3 text-sm text-background/80">
            <li className="flex items-start gap-3"><MapPin size={16} className="mt-0.5 text-accent" /> Pharmacie Kotto, Douala</li>
            <li className="flex items-start gap-3"><Phone size={16} className="mt-0.5 text-accent" /> +237 658 254 509</li>
            <li className="flex items-start gap-3"><Mail size={16} className="mt-0.5 text-accent" /> tchokonte@gmail.com</li>
            <li className="flex items-start gap-3"><Clock size={16} className="mt-0.5 text-accent" /> Lun – Sam · 10h – 21h</li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg mb-4">Suivez-nous</h3>
          <div className="flex gap-3 mb-6">
            <a
              href="https://wa.me/237658254509"
              target="_blank" rel="noreferrer"
              className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center transition hover:opacity-80"
              aria-label="WhatsApp"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="24" height="24" aria-hidden="true">
                <path fill="#25D366" d="M16 3C9.373 3 4 8.373 4 15c0 2.385.69 4.61 1.882 6.49L4 29l7.71-1.838A11.94 11.94 0 0 0 16 27C22.627 27 28 21.627 28 15S22.627 3 16 3zm5.51 14.42c-.302-.151-1.79-.882-2.067-.983-.277-.1-.479-.151-.68.151-.202.302-.78.983-.956 1.184-.176.202-.352.227-.654.076-.302-.151-1.276-.47-2.43-1.5-.898-.8-1.504-1.787-1.68-2.09-.176-.302-.019-.466.132-.617.135-.135.302-.352.453-.528.151-.176.202-.302.302-.504.1-.202.05-.378-.025-.529-.076-.151-.68-1.638-.932-2.243-.245-.587-.494-.507-.68-.517l-.58-.01c-.202 0-.529.076-.806.378-.277.302-1.06 1.034-1.06 2.521 0 1.487 1.085 2.923 1.236 3.125.151.202 2.136 3.263 5.176 4.575.724.313 1.288.5 1.728.64.726.231 1.387.198 1.91.12.582-.087 1.79-.732 2.043-1.439.252-.706.252-1.31.176-1.439-.075-.126-.277-.202-.579-.353z"/>
              </svg>
            </a>
            <a
              href="https://www.facebook.com/share/1CkFEDGvrB/?mibextid=wwXIfr"
              target="_blank" rel="noreferrer"
              className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center transition hover:opacity-80"
              aria-label="Facebook"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
                <path fill="#1877F2" d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.412c0-3.017 1.792-4.683 4.533-4.683 1.312 0 2.686.235 2.686.235v2.962h-1.514c-1.491 0-1.956.93-1.956 1.886v2.27h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
              </svg>
            </a>
            <a
              href="https://www.tiktok.com/@yamooh_?_r=1&_t=ZS-96gXmgUOsmz"
              target="_blank" rel="noreferrer"
              className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center transition hover:opacity-80"
              aria-label="TikTok"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
                <path fill="#000000" d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.71a8.16 8.16 0 0 0 4.77 1.52V6.78a4.85 4.85 0 0 1-1.84-.09z"/>
              </svg>
            </a>
          </div>
          <div className="text-sm">
            <Link to="/contact" className="inline-block bg-accent text-accent-foreground px-5 py-2.5 rounded-full font-semibold hover:opacity-90">
              Commander maintenant
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-background/10">
        <div className="container-tight py-5 text-xs text-background/60 flex flex-col sm:flex-row justify-between gap-2">
          <p>© {new Date().getFullYear()} Yamooh. Tous droits réservés.</p>
          <p>Freshness in every bite.</p>
        </div>
        <div className="container-tight pb-5 text-xs text-background/60 text-center sm:text-right">
          <span>Site conçu par </span>
          <a
            href="https://vexlio-visibility.lovable.app/"
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-accent transition"
          >
            Vexlio
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
