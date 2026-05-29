import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, MessageCircle, Pencil, Settings2, ShoppingBag, Sparkles } from "lucide-react";
import {
  bases, vegetables, fruits, proteins, toppings, sauces, BASE_PRICE, type Option,
} from "@/data/builder";
import {
  formulas, menu, EXTRA_INGREDIENT_PRICE, type Formula, type MenuItem,
} from "@/data/menu";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";

const WHATSAPP = "237658254509";

type CatKey = "base" | "protein" | "vegetables" | "toppings" | "sauce" | "fruits";
type Selections = Record<CatKey, string[]>;

const empty: Selections = { base: [], protein: [], vegetables: [], toppings: [], sauce: [], fruits: [] };

const Builder = () => {
  const [searchParams] = useSearchParams();
  const { add } = useCart();
  const [formula, setFormula] = useState<Formula | null>(null);
  const [signatureItem, setSignatureItem] = useState<MenuItem | null>(null);
  const [step, setStep] = useState(0);
  const [sel, setSel] = useState<Selections>(empty);
  const [info, setInfo] = useState({ name: "", location: "" });

  // Load formula + pre-select included items
  useEffect(() => {
    const f = searchParams.get("formula");
    if (!f) return;
    const found = formulas.find((x) => x.id === f);
    if (!found) return;
    setFormula(found);
    setSignatureItem(null);
    const lim = found.limits;
    setSel({
      base: bases.slice(0, lim.base).map((o) => o.id),
      protein: proteins.filter((p) => p.id !== "none").slice(0, lim.protein).map((o) => o.id),
      vegetables: vegetables.slice(0, lim.vegetables).map((o) => o.id),
      toppings: toppings.slice(0, lim.toppings).map((o) => o.id),
      sauce: sauces.slice(0, lim.sauce).map((o) => o.id),
      fruits: [],
    });
    toast({ title: `Formule ${found.name} chargée`, description: "Ingrédients pré-sélectionnés. Modifiez librement." });
  }, [searchParams]);

  // Load signature bowl + pre-select its ingredients
  useEffect(() => {
    const s = searchParams.get("signature");
    if (!s) return;
    const found = menu.find((x) => x.id === s && x.signature);
    if (!found) return;
    setSignatureItem(found);
    setFormula(null);
    if (found.builderIngredients) {
      setSel({
        base: found.builderIngredients.base,
        protein: found.builderIngredients.protein,
        vegetables: found.builderIngredients.vegetables,
        toppings: found.builderIngredients.toppings,
        sauce: found.builderIngredients.sauce,
        fruits: found.builderIngredients.fruits,
      });
    }
    toast({ title: `${found.name} chargée`, description: "Ingrédients pré-sélectionnés. Ajoutez des suppléments librement." });
  }, [searchParams]);

  const limits = formula?.limits ?? { base: 1, vegetables: 0, protein: 1, toppings: 0, sauce: 1 };

  const steps = useMemo(() => [
    { key: "base" as CatKey, title: "Votre base", subtitle: `${limits.base} inclus${formula ? "" : " · sélection multiple possible"}`, options: bases, included: limits.base },
    { key: "protein" as CatKey, title: "Vos protéines", subtitle: `${limits.protein} inclus${limits.protein > 1 ? "es" : "e"}`, options: proteins.filter((p) => p.id !== "none"), included: limits.protein },
    { key: "vegetables" as CatKey, title: "Vos légumes", subtitle: formula ? `${limits.vegetables} inclus` : "Sélection libre", options: vegetables, included: limits.vegetables },
    { key: "toppings" as CatKey, title: "Vos toppings", subtitle: formula ? `${limits.toppings} inclus` : "Sélection libre", options: toppings, included: limits.toppings },
    { key: "sauce" as CatKey, title: "Vos sauces", subtitle: `${limits.sauce} incluse`, options: sauces, included: limits.sauce },
    { key: "fruits" as CatKey, title: "Fruits (optionnel)", subtitle: "Boost vitalité", options: fruits, included: 0 },
  ], [limits, formula]);

  const findById = (opts: Option[], id: string) => opts.find((o) => o.id === id);
  const findMany = (opts: Option[], ids: string[]) => ids.map((id) => findById(opts, id)).filter(Boolean) as Option[];

  // count over limit = extras
  const extrasCount = useMemo(() => {
    if (!formula) return 0;
    return (
      Math.max(0, sel.base.length - limits.base) +
      Math.max(0, sel.protein.length - limits.protein) +
      Math.max(0, sel.vegetables.length - limits.vegetables) +
      Math.max(0, sel.toppings.length - limits.toppings) +
      Math.max(0, sel.sauce.length - limits.sauce) +
      sel.fruits.length
    );
  }, [sel, formula, limits]);

  const total = useMemo(() => {
    if (formula) return formula.price + extrasCount * EXTRA_INGREDIENT_PRICE;
    if (signatureItem) {
      // TOTAL = prix signature + suppléments (chaque ingrédient ajouté au-delà des pré-sélectionnés)
      const extras =
        findMany(bases, sel.base).reduce((s, o) => s + o.price, 0) +
        findMany(proteins, sel.protein).reduce((s, o) => s + o.price, 0) +
        findMany(vegetables, sel.vegetables).reduce((s, o) => s + o.price, 0) +
        findMany(toppings, sel.toppings).reduce((s, o) => s + o.price, 0) +
        findMany(sauces, sel.sauce).reduce((s, o) => s + o.price, 0) +
        findMany(fruits, sel.fruits).reduce((s, o) => s + o.price, 0);
      // Les ingrédients pré-sélectionnés sont inclus dans le prix signature
      const preselectedCost =
        (signatureItem.builderIngredients?.base ?? []).flatMap(id => findById(bases, id) ? [findById(bases, id)!.price] : []).reduce((a, b) => a + b, 0) +
        (signatureItem.builderIngredients?.protein ?? []).flatMap(id => findById(proteins, id) ? [findById(proteins, id)!.price] : []).reduce((a, b) => a + b, 0) +
        (signatureItem.builderIngredients?.vegetables ?? []).flatMap(id => findById(vegetables, id) ? [findById(vegetables, id)!.price] : []).reduce((a, b) => a + b, 0) +
        (signatureItem.builderIngredients?.toppings ?? []).flatMap(id => findById(toppings, id) ? [findById(toppings, id)!.price] : []).reduce((a, b) => a + b, 0) +
        (signatureItem.builderIngredients?.sauce ?? []).flatMap(id => findById(sauces, id) ? [findById(sauces, id)!.price] : []).reduce((a, b) => a + b, 0);
      return signatureItem.price + Math.max(0, extras - preselectedCost);
    }
    let t = BASE_PRICE;
    t += findMany(bases, sel.base).reduce((s, o) => s + o.price, 0);
    t += findMany(proteins, sel.protein).reduce((s, o) => s + o.price, 0);
    t += findMany(vegetables, sel.vegetables).reduce((s, o) => s + o.price, 0);
    t += findMany(toppings, sel.toppings).reduce((s, o) => s + o.price, 0);
    t += findMany(sauces, sel.sauce).reduce((s, o) => s + o.price, 0);
    t += findMany(fruits, sel.fruits).reduce((s, o) => s + o.price, 0);
    return t;
  }, [sel, formula, signatureItem, extrasCount]);

  const isReview = step === steps.length;
  const current = !isReview ? steps[step] : null;

  const toggle = (key: CatKey, optId: string) => {
    setSel((prev) => ({
      ...prev,
      [key]: prev[key].includes(optId) ? prev[key].filter((x) => x !== optId) : [...prev[key], optId],
    }));
  };

  const next = () => { setStep((s) => Math.min(s + 1, steps.length)); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const prev = () => { setStep((s) => Math.max(s - 1, 0)); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const summary = () => ({
    base: findMany(bases, sel.base).map((o) => o.name).join(", ") || "—",
    protein: findMany(proteins, sel.protein).map((o) => o.name).join(", ") || "—",
    legumes: findMany(vegetables, sel.vegetables).map((o) => o.name).join(", ") || "—",
    toppings: findMany(toppings, sel.toppings).map((o) => o.name).join(", ") || "—",
    sauce: findMany(sauces, sel.sauce).map((o) => o.name).join(", ") || "—",
    fruits: findMany(fruits, sel.fruits).map((o) => o.name).join(", ") || "—",
  });

  const cartName = () => {
    if (formula) return `Formule ${formula.name} (personnalisée)`;
    if (signatureItem) return `${signatureItem.name} (personnalisée)`;
    return "Salade composée";
  };

  const addToCart = () => {
    add({ id: `custom-${Date.now()}`, name: cartName(), price: total, category: "Salade", image: "" });
    toast({ title: "Ajouté au panier", description: `${cartName()} — ${total.toLocaleString()} FCFA` });
  };

  const sendWhatsApp = () => {
    if (sel.base.length === 0 || sel.sauce.length === 0) {
      toast({ title: "Composition incomplète", description: "Choisissez au moins une base et une sauce." });
      return;
    }
    const s = summary();
    const lines = [
      "Hello Yamooh,", "",
      `Je souhaite commander : ${cartName()}`, "",
      `🥗 *Base :* ${s.base}`,
      `🍗 *Protéine :* ${s.protein}`,
      `🥕 *Légumes :* ${s.legumes}`,
      `✨ *Toppings :* ${s.toppings}`,
      `🥫 *Sauce :* ${s.sauce}`,
      `🍍 *Fruits :* ${s.fruits}`, "",
      `💰 *Total :* ${total.toLocaleString()} FCFA`, "",
      info.name ? `👤 *Nom :* ${info.name}` : "",
      info.location ? `📍 *Lieu :* ${info.location}` : "",
    ].filter(Boolean);
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank");
  };

  const progress = isReview ? 100 : (step / steps.length) * 100;

  // For each option, determine if it counts as extra (selected beyond included quota)
  const isOptionExtra = (key: CatKey, optId: string) => {
    if (!formula) return false;
    const arr = sel[key];
    const idx = arr.indexOf(optId);
    if (idx === -1) return false;
    const included = key === "base" ? limits.base
      : key === "protein" ? limits.protein
      : key === "vegetables" ? limits.vegetables
      : key === "toppings" ? limits.toppings
      : key === "sauce" ? limits.sauce
      : 0;
    return idx >= included;
  };

  const countHint = (key: CatKey) => {
    if (!formula) return "";
    const inc = key === "base" ? limits.base
      : key === "protein" ? limits.protein
      : key === "vegetables" ? limits.vegetables
      : key === "toppings" ? limits.toppings
      : key === "sauce" ? limits.sauce
      : 0;
    if (key === "fruits") return `${sel.fruits.length} extra${sel.fruits.length > 1 ? "s" : ""}`;
    const n = sel[key].length;
    const extra = Math.max(0, n - inc);
    return extra > 0 ? `${inc} inclus + ${extra} extra${extra > 1 ? "s" : ""}` : `${n}/${inc} inclus`;
  };

  return (
    <>
      <title>Composer ma salade — Yamooh</title>
      <meta name="description" content="Composez votre salade Yamooh : base, protéine, légumes, toppings, sauce. Multi-sélection libre + WhatsApp." />
      <link rel="canonical" href="/builder" />

      <section className="bg-gradient-hero">
        <div className="container-tight py-12 lg:py-16 max-w-4xl">
          <div className="text-center mb-8 animate-fade-up">
            <p className="text-sm text-primary font-bold mb-3 uppercase tracking-wider">Composer ma salade</p>
            <h1 className="text-3xl md:text-5xl font-display font-bold mb-3">Vous choisissez tout.</h1>
            <p className="text-muted-foreground">Sélection multiple — ajoutez autant d'ingrédients que vous voulez.</p>
            {formula && (
              <div className="mt-4 inline-flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-bold shadow-soft">
                <Sparkles size={16} /> Formule {formula.name} — base {formula.price.toLocaleString()} FCFA
                <button onClick={() => { setFormula(null); setSel(empty); }} className="ml-2 underline text-xs">Annuler</button>
              </div>
            )}
            {signatureItem && (
              <div className="mt-4 inline-flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-bold shadow-soft">
                <Sparkles size={16} /> {signatureItem.emoji} {signatureItem.name} — {signatureItem.price.toLocaleString()} FCFA
                <button onClick={() => { setSignatureItem(null); setSel(empty); }} className="ml-2 underline text-xs">Annuler</button>
              </div>
            )}
          </div>

          <div className="mb-2 flex items-center justify-between text-xs font-semibold text-muted-foreground">
            <span>Étape {Math.min(step + 1, steps.length + 1)} / {steps.length + 1}</span>
            <span className="text-primary font-extrabold text-sm">{total.toLocaleString()} FCFA</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div className="h-full bg-gradient-primary transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </section>

      {/* FORMULES — déplacées depuis Signature */}
      {!formula && !signatureItem && step === 0 && (
        <section className="container-tight py-10 max-w-5xl">
          <div className="text-center mb-8 animate-fade-up">
            <p className="text-sm text-accent font-bold mb-2 uppercase tracking-wider">✨ Nos formules</p>
            <h2 className="text-2xl md:text-4xl font-display font-bold mb-2">Démarrez avec une formule</h2>
            <p className="text-muted-foreground text-sm">Pré-sélection intelligente — modifiable librement à chaque étape.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {formulas.map((f) => (
              <Link
                key={f.id}
                to={`/builder?formula=${f.id}`}
                className="group relative bg-card border-2 border-border rounded-3xl p-6 shadow-card hover:shadow-elevated hover:border-primary hover:-translate-y-1 transition-all flex flex-col"
              >
                {f.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">{f.badge}</span>
                )}
                <div className="text-5xl mb-3 text-center group-hover:scale-110 transition-transform">{f.emoji}</div>
                <h3 className="text-xl font-display font-bold text-center mb-1.5">{f.name}</h3>
                <p className="text-center text-sm text-muted-foreground mb-4">{f.description}</p>
                <ul className="space-y-1 mb-4 flex-1">
                  {f.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs">
                      <Check size={14} className="text-primary shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-baseline justify-between mb-3">
                  <span className="text-xs text-muted-foreground">À partir de</span>
                  <span className="font-display font-extrabold text-primary text-xl">{f.price.toLocaleString()} FCFA</span>
                </div>
                <span className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2.5 rounded-full font-bold text-sm shadow-soft group-hover:opacity-90">
                  <Settings2 size={16} /> Composer
                </span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-6">
            <p className="text-xs text-muted-foreground">Ou continuez ci-dessous pour composer librement.</p>
          </div>
        </section>
      )}

      <section className="container-tight py-12 max-w-4xl">
        {!isReview && current && (
          <div key={step} className="animate-fade-up">
            <div className="mb-6 flex items-end justify-between gap-4 flex-wrap">
              <div>
                <h2 className="text-2xl md:text-3xl font-display font-bold mb-2">{current.title}</h2>
                <p className="text-muted-foreground text-sm">{current.subtitle} · multi-sélection</p>
              </div>
              {countHint(current.key) && (
                <span className="text-xs font-bold bg-secondary px-3 py-1.5 rounded-full">{countHint(current.key)}</span>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {current.options.map((opt) => {
                const active = sel[current.key].includes(opt.id);
                const extraTag = formula && active && isOptionExtra(current.key, opt.id);
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => toggle(current.key, opt.id)}
                    className={`relative bg-card border-2 rounded-2xl p-5 text-left transition-all hover:-translate-y-0.5 ${
                      active ? "border-primary shadow-soft bg-secondary" : "border-border hover:border-primary/40"
                    }`}
                  >
                    {active && (
                      <span className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                        <Check size={14} />
                      </span>
                    )}
                    {opt.image ? (
                      <div className="aspect-square w-full mb-3 rounded-xl overflow-hidden bg-secondary/40">
                        <img src={opt.image} alt={opt.alt ?? `${opt.name} - Salade Yamooh Douala`} loading="lazy" width={600} height={600} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="aspect-square w-full mb-3 rounded-xl bg-secondary/40 flex items-center justify-center text-5xl">{opt.emoji}</div>
                    )}
                    <div className="font-bold text-sm mb-1">{opt.name}</div>
                    <div className="text-xs font-extrabold text-accent">
                      {formula
                        ? (extraTag ? `+${EXTRA_INGREDIENT_PRICE} FCFA` : (active ? "Inclus" : `+${EXTRA_INGREDIENT_PRICE} FCFA si extra`))
                        : (opt.price === 0 ? "Inclus" : `+${opt.price.toLocaleString()} FCFA`)}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {isReview && (
          <div className="animate-fade-up">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-8">Récapitulatif</h2>
            <div className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-card space-y-5 mb-8">
              {(() => {
                const s = summary();
                const rows = [
                  { label: "Base", value: s.base },
                  { label: "Protéine", value: s.protein },
                  { label: "Légumes", value: s.legumes },
                  { label: "Toppings", value: s.toppings },
                  { label: "Sauce", value: s.sauce },
                  { label: "Fruits", value: s.fruits },
                ];
                return rows.map((row, i) => (
                  <div key={row.label} className="flex items-start justify-between gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-wider text-muted-foreground font-bold mb-1">{row.label}</p>
                      <p className="font-medium">{row.value}</p>
                    </div>
                    <button onClick={() => setStep(i)} className="text-primary text-sm font-bold inline-flex items-center gap-1 hover:underline shrink-0">
                      <Pencil size={14} /> Modifier
                    </button>
                  </div>
                ));
              })()}

              {formula && (
                <div className="pt-2 space-y-1.5 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Prix de la formule</span><span className="font-semibold">{formula.price.toLocaleString()} FCFA</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Extras ({extrasCount})</span><span className="font-semibold text-accent">+{(extrasCount * EXTRA_INGREDIENT_PRICE).toLocaleString()} FCFA</span></div>
                </div>
              )}
              {signatureItem && (
                <div className="pt-2 space-y-1.5 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Prix de base {signatureItem.name}</span><span className="font-semibold">{signatureItem.price.toLocaleString()} FCFA</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Suppléments ajoutés</span><span className="font-semibold text-accent">+{(total - signatureItem.price).toLocaleString()} FCFA</span></div>
                </div>
              )}

              <div className="flex items-center justify-between pt-2 border-t border-border">
                <span className="font-display text-lg font-bold">Total</span>
                <span className="text-2xl font-display font-bold text-primary">{total.toLocaleString()} FCFA</span>
              </div>
            </div>

            <div className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-card space-y-5 mb-8">
              <div>
                <label className="block text-sm font-bold mb-2" htmlFor="name">Votre nom</label>
                <input id="name" type="text" value={info.name} onChange={(e) => setInfo({ ...info, name: e.target.value })}
                  className="w-full bg-background border border-input rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  placeholder="Nom complet" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2" htmlFor="loc">Lieu de livraison</label>
                <input id="loc" type="text" value={info.location} onChange={(e) => setInfo({ ...info, location: e.target.value })}
                  className="w-full bg-background border border-input rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  placeholder="Quartier, Douala" />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <button onClick={sendWhatsApp}
                className="w-full inline-flex items-center justify-center gap-3 bg-whatsapp text-whatsapp-foreground font-bold px-6 py-4 rounded-full hover:opacity-90 transition shadow-soft">
                <MessageCircle size={20} /> Commander sur WhatsApp
              </button>
              <button onClick={addToCart}
                className="w-full inline-flex items-center justify-center gap-3 bg-primary text-primary-foreground font-bold px-6 py-4 rounded-full hover:opacity-90 transition shadow-soft">
                <ShoppingBag size={20} /> Ajouter au panier
              </button>
            </div>
            <div className="text-center mt-4">
              <Link to="/cart" className="text-sm text-primary font-bold hover:underline">Voir mon panier →</Link>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mt-10">
          <button onClick={prev} disabled={step === 0}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-border bg-background font-bold hover:bg-secondary transition disabled:opacity-40 disabled:cursor-not-allowed">
            <ArrowLeft size={18} /> Précédent
          </button>

          {!isReview && (
            <button onClick={next}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-bold hover:opacity-90 transition shadow-soft">
              {step === steps.length - 1 ? "Voir le récap" : "Suivant"} <ArrowRight size={18} />
            </button>
          )}
        </div>
      </section>
    </>
  );
};

export default Builder;
