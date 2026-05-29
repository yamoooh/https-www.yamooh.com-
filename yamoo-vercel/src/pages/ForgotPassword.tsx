import { useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Mail, Phone } from "lucide-react";

const emailSchema = z.string().trim().email("Email invalide").max(255);
const phoneSchema = z.string().trim().min(8, "Numéro invalide").max(20);

const ForgotPassword = () => {
  const [method, setMethod] = useState<"email" | "sms">("email");
  const [value, setValue] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = emailSchema.safeParse(value);
    if (!parsed.success) { toast({ title: "Erreur", description: parsed.error.issues[0].message, variant: "destructive" }); return; }
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(parsed.data, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      toast({ title: "Email envoyé", description: "Vérifiez votre boîte mail pour réinitialiser votre mot de passe." });
    } catch (err: any) {
      toast({ title: "Erreur", description: err.message, variant: "destructive" });
    } finally { setLoading(false); }
  };

  const sendSms = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = phoneSchema.safeParse(value);
    if (!parsed.success) { toast({ title: "Erreur", description: parsed.error.issues[0].message, variant: "destructive" }); return; }
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({ phone: parsed.data });
      if (error) throw error;
      setOtpSent(true);
      toast({ title: "Code envoyé", description: "Entrez le code reçu par SMS." });
    } catch (err: any) {
      toast({ title: "Erreur", description: err.message, variant: "destructive" });
    } finally { setLoading(false); }
  };

  const verifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.verifyOtp({ phone: value, token: otp, type: "sms" });
      if (error) throw error;
      toast({ title: "Connecté", description: "Vous pouvez maintenant définir un nouveau mot de passe." });
      window.location.href = "/reset-password";
    } catch (err: any) {
      toast({ title: "Erreur", description: err.message, variant: "destructive" });
    } finally { setLoading(false); }
  };

  return (
    <section className="bg-gradient-hero min-h-[80vh] flex items-center">
      <div className="container-tight max-w-md w-full py-16">
        <div className="bg-card border border-border rounded-3xl p-8 shadow-elevated">
          <h1 className="text-3xl font-display font-bold mb-2">Mot de passe oublié</h1>
          <p className="text-muted-foreground mb-6">Récupérez l'accès à votre compte Yamooh.</p>

          <div className="flex gap-2 mb-6 p-1 bg-muted rounded-full">
            <button onClick={() => { setMethod("email"); setOtpSent(false); setValue(""); }} className={`flex-1 py-2 rounded-full text-sm font-semibold transition ${method === "email" ? "bg-background shadow" : "text-muted-foreground"}`}>Par email</button>
            <button onClick={() => { setMethod("sms"); setOtpSent(false); setValue(""); }} className={`flex-1 py-2 rounded-full text-sm font-semibold transition ${method === "sms" ? "bg-background shadow" : "text-muted-foreground"}`}>Par SMS</button>
          </div>

          {method === "email" ? (
            <form onSubmit={sendEmail} className="space-y-4">
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input type="email" placeholder="Votre email" value={value} onChange={(e) => setValue(e.target.value)}
                  className="w-full bg-background border border-input rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
              </div>
              <button type="submit" disabled={loading} className="w-full bg-primary text-primary-foreground py-3.5 rounded-full font-bold hover:opacity-90 transition disabled:opacity-50">
                {loading ? "..." : "Envoyer le lien"}
              </button>
            </form>
          ) : !otpSent ? (
            <form onSubmit={sendSms} className="space-y-4">
              <div className="relative">
                <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input type="tel" placeholder="+237 6XX XXX XXX" value={value} onChange={(e) => setValue(e.target.value)}
                  className="w-full bg-background border border-input rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
              </div>
              <button type="submit" disabled={loading} className="w-full bg-primary text-primary-foreground py-3.5 rounded-full font-bold hover:opacity-90 transition disabled:opacity-50">
                {loading ? "..." : "Envoyer le code SMS"}
              </button>
            </form>
          ) : (
            <form onSubmit={verifyOtp} className="space-y-4">
              <input type="text" inputMode="numeric" placeholder="Code reçu" value={otp} onChange={(e) => setOtp(e.target.value)}
                className="w-full bg-background border border-input rounded-xl px-4 py-3 text-center text-2xl tracking-widest focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
              <button type="submit" disabled={loading} className="w-full bg-primary text-primary-foreground py-3.5 rounded-full font-bold hover:opacity-90 transition disabled:opacity-50">
                {loading ? "..." : "Vérifier le code"}
              </button>
            </form>
          )}

          <p className="text-center text-sm mt-6">
            <Link to="/auth" className="text-muted-foreground hover:text-foreground">← Retour à la connexion</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
