import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Landmark, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp) {
      localStorage.setItem("userAccount", JSON.stringify({ email, password }));
      toast.success("Account created successfully! You can now sign in.");
      setIsSignUp(false);
      setPassword("");
    } else {
      const storedAccount = localStorage.getItem("userAccount");
      if (storedAccount) {
        const parsed = JSON.parse(storedAccount);
        if (parsed.email === email && parsed.password === password) {
          toast.success(`Welcome back, ${email.split('@')[0]}!`);
          navigate("/dashboard");
        } else {
          toast.error("Invalid email or password.");
        }
      } else {
        toast.error("No account found. Please create an account first.");
      }
    }
  };



  return (
    <div className="min-h-screen hero-gradient flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Landmark className="w-8 h-8 text-gold" />
            <span className="text-primary-foreground font-heading text-2xl font-bold">GuardianID</span>
          </div>
          <p className="text-primary-foreground/60 text-sm font-body">
            {isSignUp ? "Create your secure legal identity" : "Access your secure legal profile"}
          </p>
        </div>

        <div className="bg-card rounded-lg p-8 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="email" className="text-foreground font-body text-sm">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-1.5"
                required
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-foreground font-body text-sm">Password</Label>
              <div className="relative mt-1.5">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full gold-gradient text-primary font-semibold hover:opacity-90">
              {isSignUp ? "Create Account" : "Sign In"}
            </Button>
          </form>



          <p className="mt-6 text-center text-sm text-muted-foreground font-body">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-secondary font-semibold hover:underline"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-primary-foreground/30 font-body">
          Your data is encrypted with AES-256 and never stored in plain text.
        </p>
      </div>
    </div>
  );
};

export default Login;
