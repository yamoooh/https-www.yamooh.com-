import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Lock } from "lucide-react";

const schema = z.object({
  password: z.string().min(8, "8 caractères minimum").max(72),
  confirm: z.string(),
}).refine((d) => d.password === d.confirm, { message: "Les mots de passe ne correspondent pas", path: ["confirm"] });

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Supabase auth handles the recovery hash automatically; check session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setReady(!!session);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY" || session) setReady(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ password, confirm });
    if (!parsed.success) { toast({ title: "Erreur", description: parsed.error.issues[0].message, variant: "destructive" }); return; }
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: parsed.data.password });
      if (error) throw error;
      toast({ title: "Mot de passe mis à jour", description: "Vous êtes maintenant connecté." });
      navigate("/account");
    } catch (err: any) {
      toast({ title: "Erreur", description: err.message, variant: "destructive" });
    } finally { setLoading(false); }
  };

  return (
    <section className="bg-gradient-hero min-h-[80vh] flex items-center">
      <div className="container-tight max-w-md w-full py-16">
        <div className="bg-card border border-border rounded-3xl p-8 shadow-elevated">
          <h1 className="text-3xl font-display font-bold mb-2">Nouveau mot de passe</h1>
          <p className="text-muted-foreground mb-6">
            {ready ? "Choisissez un nouveau mot de passe sécurisé." : "Lien invalide ou expiré. Demandez un nouveau lien."}
          </p>

          {ready && (
            <form onSubmit={handle} className="space-y-4">
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input type="password" placeholder="Nouveau mot de passe" value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-background border border-input rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
              </div>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input type="password" placeholder="Confirmer" value={confirm} onChange={(e) => setConfirm(e.target.value)}
                  className="w-full bg-background border border-input rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
              </div>
              <button type="submit" disabled={loading} className="w-full bg-primary text-primary-foreground py-3.5 rounded-full font-bold hover:opacity-90 transition disabled:opacity-50">
                {loading ? "..." : "Mettre à jour"}
              </button>
            </form>
          )}

          <p className="text-center text-sm mt-6">
            <Link to="/forgot-password" className="text-primary font-semibold hover:underline">Demander un nouveau lien</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
