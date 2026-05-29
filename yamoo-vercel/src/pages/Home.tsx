import { Link } from "react-router-dom";
import { ArrowRight, Leaf, Truck, Sparkles, ChevronDown, MapPin } from "lucide-react";
import heroImg from "@/assets/hero-salad.jpg";

const Home = () => {
  return (
    <>
      {/* SEO */}
      <title>Yamooh | Salades fraîches & saines à Douala — Livraison rapide</title>
      <meta name="description" content="Composez votre salade sur mesure chez Yamooh à Douala. Ingrédients frais, livraison rapide via WhatsApp. Commandez maintenant !" />
      <link rel="canonical" href="https://yamooh.lovable.app/" />

      {/* HERO — fullscreen video slideshow */}
      <section className="relative overflow-hidden bg-gradient-hero min-h-[88vh] flex items-center">
        {/* Video backdrop */}
        <div aria-hidden className="absolute inset-0 -z-0">
          <video
            className="hero-video-a absolute inset-0 w-full h-full object-cover will-change-[opacity]"
            src="/videos/video1.mp4"
            autoPlay muted loop playsInline preload="auto"
            poster={heroImg}
          />
          <video
            className="hero-video-b absolute inset-0 w-full h-full object-cover will-change-[opacity]"
            src="/videos/video2.mp4"
            autoPlay muted loop playsInline preload="auto"
          />
          <video
            className="hero-video-c absolute inset-0 w-full h-full object-cover will-change-[opacity]"
            src="/videos/video3.mp4"
            autoPlay muted loop playsInline preload="auto"
          />
          {/* Linear gradient overlay */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.40) 50%, rgba(0,0,0,0.20) 100%)" }} />
          {/* Radial vignette */}
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)" }} />
        </div>

        <div className="relative container-tight py-20 lg:py-28 text-white">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-1.5 rounded-full text-xs font-medium mb-6 animate-fade-up" style={{ animationDelay: "0.0s", animationFillMode: "both" }}>
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inset-0 rounded-full bg-accent animate-pulse-dot" />
                <span className="relative inline-block h-2.5 w-2.5 rounded-full bg-accent" />
              </span>
              Nouveau · Salades de saison
            </span>
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-display font-semibold leading-[1.05] mb-6 animate-fade-up" style={{ animationDelay: "0.2s", animationFillMode: "both" }}>
              Freshness in <span className="text-accent">every bite.</span>
            </h1>
            <p className="text-lg text-white/85 mb-8 max-w-xl animate-fade-up" style={{ animationDelay: "0.4s", animationFillMode: "both" }}>
              Salades fraîches préparées à la commande à Douala. Composez sur mesure, livraison rapide via WhatsApp partout au Cameroun.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: "0.6s", animationFillMode: "both" }}>
              <Link
                to="/builder"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 rounded-full font-semibold hover:opacity-90 transition shadow-soft"
              >
                Composer ma salade <ArrowRight size={18} />
              </Link>
              <Link
                to="/signature"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white px-7 py-3.5 rounded-full font-semibold hover:bg-white/20 transition"
              >
                Voir nos formules
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div aria-hidden className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 flex flex-col items-center gap-1 animate-scroll-bounce">
          <span className="text-[10px] font-medium uppercase tracking-widest">Scroll</span>
          <ChevronDown size={20} />
        </div>
      </section>



      {/* VALUES */}
      <section className="container-tight py-20">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Leaf, title: "Ingrédients frais", desc: "Légumes locaux sélectionnés chaque matin." },
            { icon: Sparkles, title: "Préparé à la commande", desc: "Aucune salade préparée à l'avance." },
            { icon: Truck, title: "Livraison rapide", desc: "Commande WhatsApp et livraison express." },
          ].map((f) => (
            <div key={f.title} className="bg-card border border-border rounded-2xl p-8 shadow-card hover:shadow-soft transition">
              <div className="w-12 h-12 rounded-xl bg-secondary text-primary flex items-center justify-center mb-4">
                <f.icon size={22} />
              </div>
              <h3 className="text-xl font-display font-semibold mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED MENU section removed per request */}

      {/* CTA */}
      <section className="container-tight pb-20">
        {/* NOTRE CONCEPT */}
        <div className="mb-20">
          <div className="text-center mb-12 animate-fade-up">
            <p className="text-sm text-accent font-bold mb-3 uppercase tracking-wider">Notre Concept</p>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Un Concept — Super Frais</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              S'il est une passion qui anime l'esprit de Yamooh, c'est bien l'amour de l'art culinaire et des saveurs vraies. Cet attrait pour l'authenticité a naturellement conduit nos créateurs à imaginer un univers où la salade devient une œuvre d'art, alliant santé et gourmandise.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <div className="bg-gradient-hero rounded-3xl p-8 shadow-card">
              <h3 className="text-2xl font-display font-bold mb-2">Ingrédients Frais</h3>
              <p className="text-muted-foreground">Légumes locaux sélectionnés chaque matin.</p>
            </div>
            <div className="bg-card border border-border rounded-3xl p-8 shadow-card">
              <h3 className="text-2xl font-display font-bold mb-2">Notre Philosophie</h3>
              <p className="text-muted-foreground">La philosophie de Yamooh est le reflet d'une exigence sans compromis : offrir une expérience culinaire saine, sur-mesure et accessible.</p>
            </div>
          </div>

          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-display font-bold">L'Esprit Yamooh : L'Excellence du Sain au Quotidien</h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { t: "La Maîtrise de la Fraîcheur", d: "Chaque matin, nos ateliers reçoivent les meilleurs produits soigneusement sélectionnés." },
              { t: "Une Signature pour chaque Envie", d: "Entre nos salades signatures et vos envies de sur-mesure, chaque repas devient une expérience unique." },
              { t: "Une Production Responsable", d: "Grâce à une gestion rigoureuse et des pesées précises, nous limitons activement le gaspillage alimentaire." },
              { t: "Engagement Eco-Conscient", d: "Nous privilégions des contenants responsables et réduisons l'utilisation des plastiques non recyclables." },
              { t: "La Passion et le Partage", d: "Yamooh est avant tout une aventure humaine portée par la passion du service et du goût." },
            ].map((c) => (
              <div key={c.t} className="bg-card border border-border rounded-2xl p-6 shadow-card hover:shadow-elevated hover:-translate-y-1 transition">
                <h4 className="font-display font-bold text-lg mb-2 text-primary">{c.t}</h4>
                <p className="text-sm text-muted-foreground">{c.d}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-primary text-primary-foreground rounded-3xl p-10 md:p-16 text-center shadow-elevated">
          <h2 className="text-3xl md:text-5xl font-display font-semibold mb-4">Prêt à goûter la fraîcheur ?</h2>
          <p className="text-primary-foreground/85 max-w-xl mx-auto mb-8">
            Une commande, un message WhatsApp, et votre bowl arrive frais chez vous.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-4 rounded-full font-semibold hover:opacity-90 transition"
          >
            Commander maintenant <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* NOUS TROUVER — SEO local Douala */}
      <section id="nous-trouver" className="container-tight pb-20">
        <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-card grid md:grid-cols-2">
          <div className="p-8 md:p-10">
            <p className="text-xs text-accent font-bold uppercase tracking-wider mb-2">Nous trouver</p>
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-3">Yamooh — Restaurant healthy à Douala</h2>
            <p className="text-muted-foreground mb-4">
              Retrouvez Yamooh à <strong>Douala, Cameroun</strong>. Livraison rapide de salades fraîches dans tous les quartiers : Akwa, Bonanjo, Bonapriso, Bonamoussadi, Makepe, Bonaberi. Commandez votre salade en ligne via WhatsApp.
            </p>
            <div className="flex items-center gap-2 text-sm text-foreground mb-4">
              <MapPin size={18} className="text-primary" />
              <span>Douala, Cameroun</span>
            </div>
            <a
              href="https://maps.google.com/?q=Yamooh+Douala"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-full font-semibold text-sm hover:opacity-90 transition"
            >
              <MapPin size={16} /> Ouvrir dans Google Maps
            </a>
          </div>
          <div className="min-h-[280px] md:min-h-full">
            <iframe
              title="Yamooh Douala — Google Maps"
              src="https://www.google.com/maps?q=Douala,Cameroun&output=embed"
              width="100%" height="100%"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ border: 0, minHeight: 280 }}
              allowFullScreen
            />
          </div>
        </div>
      </section>

    </>
  );
};

export default Home;
