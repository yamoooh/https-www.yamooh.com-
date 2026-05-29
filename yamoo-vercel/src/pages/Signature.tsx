import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { menu } from "@/data/menu";

const Signature = () => {
  const sigItems = useMemo(() => menu.filter((m) => m.signature), []);

  return (
    <>
      <title>Signature — Yamooh | Créations du chef</title>
      <meta name="description" content="Découvrez nos bowls signature : créations du chef, ingrédients premium, personnalisation libre." />
      <link rel="canonical" href="/signature" />

      <section className="bg-gradient-hero">
        <div className="container-tight py-14 lg:py-20 max-w-3xl text-center">
          <p className="text-sm text-accent font-bold mb-3 uppercase tracking-wider">👑 Nos signatures</p>
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">Bowls signature Yamooh</h1>
          <p className="text-muted-foreground text-lg">
            Les créations du chef. Personnalisez chaque ingrédient et ajoutez autant d'extras que vous voulez.
          </p>
          <Link
            to="/builder"
            className="mt-6 inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-bold hover:opacity-90 transition shadow-soft"
          >
            Voir nos formules <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {sigItems.length > 0 && (
        <section className="container-tight py-14">
          <div className="text-center mb-10">
            <p className="text-sm text-accent font-bold mb-3 uppercase tracking-wider">Créations du chef</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold">Bowls signature</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {sigItems.map((item) => (
              <article key={item.id} className="bg-card border border-border rounded-2xl overflow-hidden shadow-card hover:shadow-elevated hover:-translate-y-1 transition-all flex flex-col">
                <div className="aspect-[4/3] overflow-hidden bg-secondary">
                  <img src={item.image} alt={item.name} loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-display text-xl font-bold leading-tight">{item.name}</h3>
                    {item.badge && (
                      <span className="text-[10px] uppercase tracking-wider bg-accent text-accent-foreground px-2 py-1 rounded-full font-extrabold whitespace-nowrap">{item.badge}</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 flex-1">{item.description}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <span className="text-primary font-extrabold text-lg">{item.price.toLocaleString()} FCFA</span>
                    <Link to={`/builder?signature=${item.id}`} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-bold text-sm bg-accent text-accent-foreground hover:opacity-90">
                      Composer <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default Signature;
