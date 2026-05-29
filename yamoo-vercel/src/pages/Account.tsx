import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { LogOut, Save, Package, Link2, Unlink } from "lucide-react";

type Profile = { full_name: string | null; phone: string | null; address: string | null };
type Order = { id: string; total: number; status: string; created_at: string; items: any };
type Identity = { identity_id: string; provider: string; email?: string };

const Account = () => {
  const { user, loading, signOut } = useAuth();
  const [profile, setProfile] = useState<Profile>({ full_name: "", phone: "", address: "" });
  const [orders, setOrders] = useState<Order[]>([]);
  const [saving, setSaving] = useState(false);
  const [identities, setIdentities] = useState<Identity[]>([]);
  const [linking, setLinking] = useState(false);

  const refreshIdentities = async () => {
    const { data } = await supabase.auth.getUserIdentities();
    if (data?.identities) setIdentities(data.identities as any);
  };

  useEffect(() => {
    if (!user) return;
    supabase.from("profiles").select("full_name,phone,address").eq("id", user.id).maybeSingle()
      .then(({ data }) => { if (data) setProfile({ full_name: data.full_name ?? "", phone: data.phone ?? "", address: data.address ?? "" }); });
    supabase.from("orders").select("id,total,status,created_at,items").eq("user_id", user.id).order("created_at", { ascending: false })
      .then(({ data }) => { if (data) setOrders(data as Order[]); });
    refreshIdentities();
  }, [user]);

  if (loading) return <div className="container-tight py-20">Chargement...</div>;
  if (!user) return <Navigate to="/auth" replace />;

  const save = async () => {
    setSaving(true);
    const { error } = await supabase.from("profiles").update(profile).eq("id", user.id);
    setSaving(false);
    if (error) toast({ title: "Erreur", description: error.message, variant: "destructive" });
    else toast({ title: "Profil mis à jour" });
  };

  const linkGoogle = async () => {
    setLinking(true);
    try {
      const { data, error } = await supabase.auth.linkIdentity({
        provider: "google",
        options: { redirectTo: `${window.location.origin}/account` },
      });
      if (error) throw error;
      if (data?.url) window.location.href = data.url;
    } catch (err: any) {
      toast({
        title: "Impossible de lier Google",
        description: err.message || "Une erreur est survenue. Vérifiez que la liaison manuelle est activée.",
        variant: "destructive",
      });
    } finally {
      setLinking(false);
    }
  };

  const unlink = async (id: Identity) => {
    if (identities.length < 2) {
      toast({ title: "Action refusée", description: "Vous devez conserver au moins une méthode de connexion.", variant: "destructive" });
      return;
    }
    const { error } = await supabase.auth.unlinkIdentity(id as any);
    if (error) toast({ title: "Erreur", description: error.message, variant: "destructive" });
    else { toast({ title: "Compte délié" }); refreshIdentities(); }
  };

  const hasGoogle = identities.some((i) => i.provider === "google");

  return (
    <>
      <title>Mon compte — Yamooh</title>
      <section className="container-tight py-12 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-display font-bold">Mon compte</h1>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
          <button onClick={signOut} className="inline-flex items-center gap-2 bg-secondary px-4 py-2 rounded-full font-semibold hover:bg-secondary/70 transition">
            <LogOut size={16} /> Déconnexion
          </button>
        </div>

        <div className="bg-card border border-border rounded-3xl p-8 shadow-card mb-8">
          <h2 className="text-2xl font-display font-bold mb-5">Mes informations</h2>
          <div className="space-y-4">
            <Input label="Nom complet" value={profile.full_name ?? ""} onChange={(v) => setProfile({ ...profile, full_name: v })} />
            <Input label="Téléphone" value={profile.phone ?? ""} onChange={(v) => setProfile({ ...profile, phone: v })} />
            <Input label="Adresse de livraison" value={profile.address ?? ""} onChange={(v) => setProfile({ ...profile, address: v })} />
            <button onClick={save} disabled={saving} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-bold hover:opacity-90 transition">
              <Save size={18} /> {saving ? "..." : "Enregistrer"}
            </button>
          </div>
        </div>

        <div className="bg-card border border-border rounded-3xl p-8 shadow-card mb-8">
          <h2 className="text-2xl font-display font-bold mb-2 flex items-center gap-2"><Link2 /> Comptes liés</h2>
          <p className="text-muted-foreground text-sm mb-5">Liez votre compte Google pour vous connecter en un clic, sans créer de doublon.</p>
          <div className="space-y-2 mb-5">
            {identities.map((id) => (
              <div key={id.identity_id} className="flex items-center justify-between bg-background border border-border rounded-xl px-4 py-3">
                <div>
                  <p className="font-semibold capitalize">{id.provider}</p>
                  {id.email && <p className="text-sm text-muted-foreground">{id.email}</p>}
                </div>
                {identities.length > 1 && (
                  <button onClick={() => unlink(id)} className="text-sm inline-flex items-center gap-1 text-destructive hover:underline">
                    <Unlink size={14} /> Délier
                  </button>
                )}
              </div>
            ))}
          </div>
          {!hasGoogle && (
            <button onClick={linkGoogle} disabled={linking} className="inline-flex items-center gap-2 bg-secondary px-5 py-3 rounded-full font-semibold hover:bg-secondary/70 transition disabled:opacity-50">
              <Link2 size={16} /> {linking ? "..." : "Lier mon compte Google"}
            </button>
          )}
        </div>

        <div className="bg-card border border-border rounded-3xl p-8 shadow-card">
          <h2 className="text-2xl font-display font-bold mb-5 flex items-center gap-2"><Package /> Mes commandes</h2>
          {orders.length === 0 ? (
            <p className="text-muted-foreground">Aucune commande pour le moment.</p>
          ) : (
            <div className="divide-y divide-border">
              {orders.map((o) => (
                <div key={o.id} className="py-4 flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{new Date(o.created_at).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</p>
                    <p className="text-sm text-muted-foreground">{Array.isArray(o.items) ? o.items.length : 0} article(s) · {o.status}</p>
                  </div>
                  <p className="font-bold text-primary text-lg">{o.total.toLocaleString()} FCFA</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

const Input = ({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) => (
  <div>
    <label className="block text-sm font-semibold mb-2">{label}</label>
    <input value={value} onChange={(e) => onChange(e.target.value)}
      className="w-full bg-background border border-input rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition" />
  </div>
);

export default Account;
