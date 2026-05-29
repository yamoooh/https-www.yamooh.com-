import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MessageCircle, Mail, MapPin, Phone, Clock } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const WHATSAPP = "237658254509";

const Contact = () => {
  const [params] = useSearchParams();
  const preset = params.get("item");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    location: "",
    message: preset ? `Je souhaite commander : ${preset}` : "",
  });

  useEffect(() => {
    if (preset) setForm((f) => ({ ...f, message: `Je souhaite commander : ${preset}` }));
  }, [preset]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.message) {
      toast({ title: "Champs manquants", description: "Merci de remplir nom, téléphone et message." });
      return;
    }
    const text = `*Nouvelle commande Yamooh* %0A%0A👤 *Nom :* ${form.name}%0A📞 *Téléphone :* ${form.phone}%0A📍 *Lieu :* ${form.location || "—"}%0A%0A📝 *Commande :*%0A${form.message}`;
    window.open(`https://wa.me/${WHATSAPP}?text=${text}`, "_blank");
  };

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  return (
    <>
      <title>Commander — Yamooh | Commande WhatsApp à Douala</title>
      <meta name="description" content="Passez votre commande Yamooh en quelques secondes. Salades fraîches livrées à Douala. Contact WhatsApp +237 658 254 509." />
      <link rel="canonical" href="/contact" />

      <section className="bg-gradient-hero">
        <div className="container-tight py-16 lg:py-20 max-w-3xl text-center animate-fade-up">
          <p className="text-sm text-primary font-semibold mb-3 uppercase tracking-wider">Commande & Contact</p>
          <h1 className="text-4xl md:text-6xl font-display font-semibold mb-5">
            Une envie de fraîcheur ?
          </h1>
          <p className="text-muted-foreground text-lg">
            Remplissez ce formulaire et envoyez votre commande directement sur WhatsApp.
          </p>
        </div>
      </section>

      <section className="container-tight py-16 grid lg:grid-cols-5 gap-10">
        {/* Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-3 bg-card border border-border rounded-3xl p-8 md:p-10 shadow-card space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2" htmlFor="name">Nom complet</label>
            <input
              id="name" type="text" required value={form.name} onChange={update("name")}
              className="w-full bg-background border border-input rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
              placeholder="Votre nom"
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold mb-2" htmlFor="phone">Téléphone</label>
              <input
                id="phone" type="tel" required value={form.phone} onChange={update("phone")}
                className="w-full bg-background border border-input rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                placeholder="+237 ..."
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2" htmlFor="location">Lieu de livraison</label>
              <input
                id="location" type="text" value={form.location} onChange={update("location")}
                className="w-full bg-background border border-input rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                placeholder="Quartier, Douala"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2" htmlFor="message">Détails de la commande</label>
            <textarea
              id="message" required rows={5} value={form.message} onChange={update("message")}
              className="w-full bg-background border border-input rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition resize-none"
              placeholder="Ex : 1 Yamooh Classic, 1 Bissap, livraison ce soir..."
            />
          </div>
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-3 bg-whatsapp text-whatsapp-foreground font-semibold px-6 py-4 rounded-full hover:opacity-90 transition shadow-soft"
          >
            <MessageCircle size={20} /> Commander via WhatsApp
          </button>
          <p className="text-xs text-muted-foreground text-center">
            En cliquant, WhatsApp s'ouvre avec votre commande pré-remplie.
          </p>
        </form>

        {/* Info */}
        <aside className="lg:col-span-2 space-y-4">
          {[
            { icon: Phone, title: "WhatsApp", value: "+237 658 254 509", href: `https://wa.me/${WHATSAPP}` },
            { icon: Mail, title: "Email", value: "tchokonte@gmail.com", href: "mailto:tchokonte@gmail.com" },
            { icon: MapPin, title: "Adresse", value: "Pharmacie Kotto, Douala, Cameroun" },
            { icon: Clock, title: "Horaires", value: "Lundi – Samedi · 10h – 21h" },
          ].map((c) => {
            const Inner = (
              <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-soft transition flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-secondary text-primary flex items-center justify-center shrink-0">
                  <c.icon size={20} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">{c.title}</p>
                  <p className="font-medium">{c.value}</p>
                </div>
              </div>
            );
            return c.href ? (
              <a key={c.title} href={c.href} target="_blank" rel="noreferrer" className="block">{Inner}</a>
            ) : (
              <div key={c.title}>{Inner}</div>
            );
          })}
        </aside>
      </section>

      <section className="container-tight pb-16">
        <h2 className="text-2xl md:text-3xl font-display font-bold mb-5">Nous trouver</h2>
        <iframe
          title="Carte Yamooh — Pharmacie Kotto, Douala"
          src="https://www.google.com/maps?q=Pharmacie+Kotto,+Douala,+Cameroun&output=embed"
          width="100%"
          height={350}
          style={{ border: 0, borderRadius: 12 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Restaurant",
          name: "Yamooh",
          address: { "@type": "PostalAddress", streetAddress: "Pharmacie Kotto", addressLocality: "Douala", addressCountry: "CM" }
        }) }} />
      </section>
    </>
  );
};

export default Contact;
