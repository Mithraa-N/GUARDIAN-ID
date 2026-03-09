import { Landmark } from "lucide-react";

const Footer = () => {
  return (
    <footer className="hero-gradient py-12 border-t border-primary-foreground/10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Landmark className="w-5 h-5 text-gold" />
            <span className="text-primary-foreground font-heading font-semibold">GuardianID</span>
          </div>
          <p className="text-primary-foreground/40 text-xs text-center font-body max-w-lg">
            This platform does not replace formal legal registration systems. 
            All information is encrypted and stored securely. GuardianID is designed 
            for emergency reference purposes only.
          </p>
          <p className="text-primary-foreground/30 text-xs font-body">
            © {new Date().getFullYear()} GuardianID
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
