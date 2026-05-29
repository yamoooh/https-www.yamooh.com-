import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

import { toast } from "@/hooks/use-toast";
import { Mail, Lock, User as UserIcon, Phone } from "lucide-react";

const signupSchema = z.object({
  full_name: z.string().trim().min(2, "Nom requis").max(80),
  phone: z.string().trim().min(6, "Téléphone requis").max(20),
  email: z.string().trim().email("Email invalide").max(255),
  password: z.string().min(8, "8 caractères minimum").max(72),
});
const loginSchema = z.object({
  email: z.string().trim().email("Email invalide").max(255),
  password: z.string().min(1, "Mot de passe requis").max(72),
});

const Auth = () => {
  const [params] = useSearchParams();
  const [mode, setMode] = useState<"login" | "signup">(params.get("mode") === "signup" ? "signup" : "login");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ full_name: "", phone: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleGoogle = async () => {
    setLoading(true);
    try {
      const result = await supabase.auth.signInWithOAuth({ provider: "google",
        redirect_uri: window.location.origin + (params.get("redirect") || "/account"),
      });
      if (result.error) throw new Error(result.error.message || "Connexion Google échouée");
      if (result.redirected) return;
      await verifyAndContinue();
    } catch (err: any) {
      toast({ title: "Erreur", description: err.message || "Une erreur est survenue", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const verifyAndContinue = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const meta: any = user.user_metadata || {};
    const identityVerified = user.identities?.some(
      (i: any) => i.provider === "google" && (i.identity_data?.email_verified === true || i.identity_data?.verified_email === true)
    );
    const isVerified = Boolean(user.email_confirmed_at) || meta.email_verified === true || identityVerified;
    if (!isVerified) {
      await supabase.auth.signOut();
      toast({
        title: "Email non vérifié",
        description: "Votre adresse Google n'est pas encore vérifiée. Vérifiez-la dans votre compte Google puis réessayez.",
        variant: "destructive",
      });
      return;
    }
    // Pré-remplir l'email dans le formulaire à partir du compte Google
    if (user.email) setForm((f) => ({ ...f, email: user.email as string, full_name: f.full_name || meta.full_name || meta.name || "" }));
    // Garantir que l'email est bien stocké dans la table profiles
    if (user.email) {
      await supabase.from("profiles").upsert(
        { id: user.id, email: user.email, full_name: meta.full_name || meta.name || null },
        { onConflict: "id" }
      );
    }
    toast({ title: "Connecté", description: `Bienvenue ${user.email} !` });
    navigate(params.get("redirect") || "/account");
  };

  const autoTriggered = useRef(false);
  useEffect(() => {
    if (autoTriggered.current) return;
    autoTriggered.current = true;
    // After OAuth redirect back, session is set — verify email status.
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        verifyAndContinue();
      } else {
        handleGoogle();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const parsed = signupSchema.safeParse(form);
        if (!parsed.success) { toast({ title: "Erreur", description: parsed.error.issues[0].message, variant: "destructive" }); return; }
        const { error } = await supabase.auth.signUp({
          email: parsed.data.email,
          password: parsed.data.password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: { full_name: parsed.data.full_name, phone: parsed.data.phone },
          },
        });
        if (error) throw error;
        toast({ title: "Compte créé", description: "Bienvenue chez Yamooh !" });
        navigate(params.get("redirect") || "/account");
      } else {
        const parsed = loginSchema.safeParse(form);
        if (!parsed.success) { toast({ title: "Erreur", description: parsed.error.issues[0].message, variant: "destructive" }); return; }
        const { error } = await supabase.auth.signInWithPassword({ email: parsed.data.email, password: parsed.data.password });
        if (error) throw error;
        toast({ title: "Connecté", description: "Heureux de vous revoir !" });
        navigate(params.get("redirect") || "/account");
      }
    } catch (err: any) {
      toast({ title: "Erreur", description: err.message || "Une erreur est survenue", variant: "destructive" });
    } finally { setLoading(false); }
  };

  return (
    <>
      <title>{mode === "signup" ? "Créer un compte" : "Connexion"} — Yamooh</title>
      <section className="bg-gradient-hero min-h-[80vh] flex items-center">
        <div className="container-tight max-w-md w-full py-16">
          <div className="bg-card border border-border rounded-3xl p-8 shadow-elevated">
            <h1 className="text-3xl font-display font-bold mb-2">
              {mode === "signup" ? "Créer mon compte" : "Bon retour !"}
            </h1>
            <p className="text-muted-foreground mb-6">
              {mode === "signup" ? "Sauvegardez vos commandes et infos de livraison." : "Connectez-vous à votre compte Yamooh."}
            </p>

            <form onSubmit={handle} className="space-y-4">
              {mode === "signup" && (
                <>
                  <Field icon={UserIcon} type="text" placeholder="Nom complet" value={form.full_name} onChange={(v) => setForm({ ...form, full_name: v })} />
                  <Field icon={Phone} type="tel" placeholder="Téléphone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
                </>
              )}
              <Field icon={Mail} type="email" placeholder="Email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
              <Field icon={Lock} type="password" placeholder="Mot de passe" value={form.password} onChange={(v) => setForm({ ...form, password: v })} />

              <button type="submit" disabled={loading} className="w-full bg-primary text-primary-foreground py-3.5 rounded-full font-bold hover:opacity-90 transition disabled:opacity-50">
                {loading ? "..." : mode === "signup" ? "Créer mon compte" : "Se connecter"}
              </button>
              {mode === "login" && (
                <p className="text-center text-sm">
                  <Link to="/forgot-password" className="text-primary font-semibold hover:underline">Mot de passe oublié ?</Link>
                </p>
              )}
            </form>

            <div className="flex items-center gap-3 my-5">
              <div className="h-px bg-border flex-1" />
              <span className="text-xs text-muted-foreground">ou</span>
              <div className="h-px bg-border flex-1" />
            </div>

            <button
              type="button"
              onClick={handleGoogle}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-background border border-input py-3 rounded-full font-semibold hover:bg-muted transition disabled:opacity-50"
            >
              <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
                <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z"/>
                <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16.2 19 13 24 13c3.1 0 5.8 1.1 8 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.6 8.4 6.3 14.7z"/>
                <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35 26.7 36 24 36c-5.3 0-9.7-3.4-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/>
                <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4.1 5.5l6.2 5.2c-.4.4 6.6-4.8 6.6-14.7 0-1.3-.1-2.3-.4-3.5z"/>
              </svg>
              Continuer avec Google
            </button>

            <p className="text-center text-sm mt-6 text-muted-foreground">
              {mode === "signup" ? "Déjà inscrit ?" : "Pas encore de compte ?"}{" "}
              <button onClick={() => setMode(mode === "signup" ? "login" : "signup")} className="text-primary font-semibold hover:underline">
                {mode === "signup" ? "Se connecter" : "Créer un compte"}
              </button>
            </p>
            <p className="text-center text-xs mt-4">
              <Link to="/" className="text-muted-foreground hover:text-foreground">← Retour à l'accueil</Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

type FieldProps = {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  type: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
};
const Field = ({ icon: Icon, type, placeholder, value, onChange }: FieldProps) => (
  <div className="relative">
    <Icon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
    <input
      type={type} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)}
      className="w-full bg-background border border-input rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
    />
  </div>
);

export default Auth;
