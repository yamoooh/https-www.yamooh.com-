import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "Comment commander chez Yamooh ?", a: "Vous pouvez ajouter vos produits ou formules au panier puis cliquer sur \"Commander via WhatsApp\". Votre message est pré-rempli, il ne reste qu'à l'envoyer." },
  { q: "Quels sont les délais de livraison ?", a: "Nous livrons en moyenne sous 30 à 60 minutes à Douala selon le quartier. Toutes nos salades sont préparées à la commande." },
  { q: "Quels sont les modes de paiement acceptés ?", a: "Espèces à la livraison, Mobile Money (Orange Money, MTN Mobile Money). Le paiement se fait à la réception." },
  { q: "Peut-on personnaliser sa commande ?", a: "Oui ! Utilisez notre outil \"Composer ma salade\" pour créer votre bowl sur mesure : base, légumes, fruits, protéines, toppings, sauce." },
  { q: "Quelle est votre zone de livraison ?", a: "Nous livrons partout à Douala. Les frais peuvent varier selon la distance depuis Pharmacie Kotto." },
  { q: "Vos produits sont-ils frais ?", a: "Absolument. Nous achetons nos légumes chaque matin et préparons toutes les salades à la commande, jamais à l'avance." },
  { q: "Avez-vous des options végétariennes/vegan ?", a: "Oui, plusieurs salades et sandwichs sont 100% vegan. Cherchez le badge \"Vegan\" sur notre menu." },
];

const FAQ = () => (
  <>
    <title>FAQ — Yamooh | Questions fréquentes</title>
    <meta name="description" content="Réponses à toutes vos questions sur Yamooh : commande, livraison, paiement, personnalisation des salades à Douala." />
    <link rel="canonical" href="/faq" />

    <section className="bg-gradient-hero">
      <div className="container-tight py-16 max-w-3xl text-center">
        <p className="text-sm text-primary font-bold mb-3 uppercase tracking-wider">FAQ</p>
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Vos questions, nos réponses</h1>
        <p className="text-muted-foreground text-lg">Tout ce qu'il faut savoir pour commander en toute sérénité.</p>
      </div>
    </section>

    <section className="container-tight py-12 max-w-3xl">
      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((f, i) => (
          <AccordionItem key={i} value={`item-${i}`} className="bg-card border border-border rounded-2xl px-6 shadow-card">
            <AccordionTrigger className="text-left text-lg font-bold hover:no-underline">{f.q}</AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground leading-relaxed">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  </>
);

export default FAQ;
