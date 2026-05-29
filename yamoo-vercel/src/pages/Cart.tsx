import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Minus, Plus, Trash2, MessageCircle, ShoppingBag } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

const WHATSAPP = "237658254509";

const Cart = () => {
  const { items, setQty, remove, total, clear } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [sending, setSending] = useState(false);
  const [extra, setExtra] = useState({ name: "", phone: "", address: "" });

  const order = async () => {
    if (items.length === 0) return;
    const name = extra.name.trim();
    const phone = extra.phone.trim();
    if (!name || !phone) {
      toast({ title: "Infos manquantes", description: "Nom et téléphone requis.", variant: "destructive" });
      return;
    }
    setSending(true);
    if (user) {
      await supabase.from("orders").insert({
        user_id: user.id,
        items: items as any,
        total,
        notes: `Nom: ${name} · Tél: ${phone} · Adresse: ${extra.address}`,
      });
    }
    const lines = items.map((i) => `• ${i.qty}× ${i.name} — ${(i.qty * i.price).toLocaleString()} FCFA`).join("%0A");
    const text =
      `*Nouvelle commande Yamooh*%0A%0A` +
      `👤 ${name}%0A📞 ${phone}%0A📍 ${extra.address || "—"}%0A%0A` +
      `🛒 *Commande :*%0A${lines}%0A%0A` +
      `💰 *Total : ${total.toLocaleString()} FCFA*`;
    window.open(`https://wa.me/${WHATSAPP}?text=${text}`, "_blank");
    clear();
    setSending(false);
    toast({ title: "Commande envoyée", description: "WhatsApp s'est ouvert avec votre commande." });
    navigate("/");
  };

  return (
    <>
      <title>Mon panier — Yamooh</title>
      <section className="container-tight py-12 max-w-4xl">
        <h1 className="text-4xl font-display font-bold mb-2">Mon panier</h1>
        <p className="text-muted-foreground mb-8">{items.length === 0 ? "Votre panier est vide." : `${items.length} article(s)`}</p>

        {items.length === 0 ? (
          <div className="bg-card border border-border rounded-3xl p-12 text-center shadow-card">
            <ShoppingBag size={56} className="mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg mb-6">Composez votre salade ou choisissez une formule signature.</p>
            <Link to="/builder" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-bold hover:opacity-90 transition">
              Composer ma salade
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-3">
              {items.map((i) => (
                <div key={i.id} className="bg-card border border-border rounded-2xl p-4 flex items-center gap-4 shadow-card">
                  <div className="w-16 h-16 bg-secondary rounded-xl flex items-center justify-center text-3xl shrink-0">
                    {i.image ? <img src={i.image} alt={i.name} className="w-full h-full object-cover rounded-xl" /> : "🥗"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold truncate">{i.name}</p>
                    <p className="text-sm text-primary font-bold">{i.price.toLocaleString()} FCFA</p>
                  </div>
                  <div className="flex items-center gap-2 bg-secondary rounded-full p-1">
                    <button onClick={() => setQty(i.id, i.qty - 1)} className="w-8 h-8 rounded-full bg-background hover:bg-muted flex items-center justify-center"><Minus size={14} /></button>
                    <span className="font-bold w-6 text-center">{i.qty}</span>
                    <button onClick={() => setQty(i.id, i.qty + 1)} className="w-8 h-8 rounded-full bg-background hover:bg-muted flex items-center justify-center"><Plus size={14} /></button>
                  </div>
                  <button onClick={() => remove(i.id)} className="text-destructive p-2 hover:bg-destructive/10 rounded-full"><Trash2 size={18} /></button>
                </div>
              ))}
            </div>

            <aside className="bg-card border border-border rounded-3xl p-6 shadow-card h-fit space-y-4">
              <h2 className="text-xl font-display font-bold">Récapitulatif</h2>
              <div className="flex justify-between text-lg"><span>Total</span><span className="font-bold text-primary">{total.toLocaleString()} FCFA</span></div>
              <div className="border-t border-border pt-4 space-y-3">
                <input placeholder="Votre nom *" value={extra.name} onChange={(e) => setExtra({ ...extra, name: e.target.value })}
                  className="w-full bg-background border border-input rounded-xl px-3 py-2.5" />
                <input placeholder="Téléphone *" value={extra.phone} onChange={(e) => setExtra({ ...extra, phone: e.target.value })}
                  className="w-full bg-background border border-input rounded-xl px-3 py-2.5" />
                <input placeholder="Adresse de livraison" value={extra.address} onChange={(e) => setExtra({ ...extra, address: e.target.value })}
                  className="w-full bg-background border border-input rounded-xl px-3 py-2.5" />
              </div>
              <button onClick={order} disabled={sending} className="w-full inline-flex items-center justify-center gap-2 bg-whatsapp text-whatsapp-foreground py-3.5 rounded-full font-bold hover:opacity-90 transition shadow-soft">
                <MessageCircle size={20} /> Commander via WhatsApp
              </button>
              {!user && <p className="text-xs text-muted-foreground text-center"><Link to="/auth" className="text-primary font-semibold hover:underline">Se connecter</Link> pour sauvegarder vos commandes.</p>}
            </aside>
          </div>
        )}
      </section>
    </>
  );
};

export default Cart;
