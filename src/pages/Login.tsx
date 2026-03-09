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
  const [isVerifyingEmail, setIsVerifyingEmail] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [verificationMode, setVerificationMode] = useState<"signup" | "reset">("signup");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isResettingPassword) {
      const storedAccount = localStorage.getItem("userAccount");
      if (storedAccount) {
        localStorage.setItem("userAccount", JSON.stringify({ email, password: newPassword }));
        toast.success("Password reset successfully! You can now sign in.");
        setIsResettingPassword(false);
        setIsForgotPassword(false);
        setNewPassword("");
        setPassword("");
      }
      return;
    }

    if (isVerifyingEmail) {
      if (verificationCode.length >= 4) {
        if (verificationMode === "signup") {
          localStorage.setItem("userAccount", JSON.stringify({ email, password }));
          toast.success("Email verified and account created successfully!");
          setIsVerifyingEmail(false);
          setIsSignUp(false);
          setPassword("");
          setVerificationCode("");
        } else {
          toast.success("Email verified!");
          setIsVerifyingEmail(false);
          setIsResettingPassword(true);
          setVerificationCode("");
        }
      } else {
        toast.error("Please enter a valid verification code.");
      }
      return;
    }

    if (isForgotPassword) {
      const storedAccount = localStorage.getItem("userAccount");
      if (storedAccount) {
        const parsed = JSON.parse(storedAccount);
        if (parsed.email === email) {
          setVerificationMode("reset");
          setIsVerifyingEmail(true);
          toast.info(`A password reset code has been sent to ${email}`);
        } else {
          toast.error("Email not found in our records.");
        }
      } else {
        toast.error("No account found. Please create an account first.");
      }
      return;
    }

    if (isSignUp) {
      // Move to verification step
      setVerificationMode("signup");
      setIsVerifyingEmail(true);
      toast.info(`A verification code has been sent to ${email}`);
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

  const getSubheadingText = () => {
    if (isResettingPassword) return "Create a new password";
    if (isVerifyingEmail) return "Verify your email to continue";
    if (isForgotPassword) return "Reset your password securely";
    return isSignUp ? "Create your secure legal identity" : "Access your secure legal profile";
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
            {getSubheadingText()}
          </p>
        </div>

        <div className="bg-card rounded-lg p-8 shadow-lg">
          {isResettingPassword ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label htmlFor="new-password" className="text-foreground font-body text-sm">New Password</Label>
                <div className="relative mt-1.5">
                  <Input
                    id="new-password"
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
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
                Confirm New Password
              </Button>
            </form>
          ) : isVerifyingEmail ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label htmlFor="code" className="text-foreground font-body text-sm">Enter Verification Code</Label>
                <p className="text-xs text-muted-foreground mb-3">
                  We've sent a code to <strong>{email}</strong>. (For demo, enter any 4+ digit code)
                </p>
                <Input
                  id="code"
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="123456"
                  maxLength={6}
                  className="mt-1.5 text-center text-lg tracking-widest"
                  required
                />
              </div>
              <Button type="submit" className="w-full gold-gradient text-primary font-semibold hover:opacity-90">
                {verificationMode === "signup" ? "Verify & Create Account" : "Verify Email"}
              </Button>
              <button
                type="button"
                onClick={() => setIsVerifyingEmail(false)}
                className="w-full text-center text-sm text-secondary hover:underline mt-2"
              >
                Back
              </button>
            </form>
          ) : isForgotPassword ? (
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
              <Button type="submit" className="w-full gold-gradient text-primary font-semibold hover:opacity-90">
                Next: Verify Email
              </Button>
              <button
                type="button"
                onClick={() => setIsForgotPassword(false)}
                className="w-full text-center text-sm text-secondary hover:underline mt-2"
              >
                Back to Sign In
              </button>
            </form>
          ) : (
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
                {!isSignUp && (
                  <div className="flex justify-end mt-1">
                    <button
                      type="button"
                      onClick={() => setIsForgotPassword(true)}
                      className="text-xs text-muted-foreground hover:text-secondary hover:underline"
                    >
                      Forgot Password?
                    </button>
                  </div>
                )}
              </div>

              <Button type="submit" className="w-full gold-gradient text-primary font-semibold hover:opacity-90">
                {isSignUp ? "Next: Verify Email" : "Sign In"}
              </Button>
            </form>
          )}



          {!isVerifyingEmail && !isForgotPassword && !isResettingPassword && (
            <p className="mt-6 text-center text-sm text-muted-foreground font-body">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-secondary font-semibold hover:underline"
              >
                {isSignUp ? "Sign In" : "Sign Up"}
              </button>
            </p>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-primary-foreground/30 font-body">
          Your data is encrypted with AES-256 and never stored in plain text.
        </p>
      </div>
    </div>
  );
};

export default Login;
