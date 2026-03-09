import { Link } from "react-router-dom";
import { Landmark, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="hero-gradient relative overflow-hidden">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />
      
      <div className="container mx-auto px-6 py-24 md:py-32 relative z-10">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-6">
            <Landmark className="w-8 h-8 text-gold" />
            <span className="text-gold font-heading text-xl font-semibold tracking-wide">GuardianID</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-foreground leading-tight mb-6">
            Your Legal Identity,{" "}
            <span className="gold-text">Instantly Accessible</span>{" "}
            in Any Emergency
          </h1>
          
          <p className="text-lg md:text-xl text-primary-foreground/70 leading-relaxed mb-10 max-w-2xl font-body">
            Store critical legal contacts and documents securely. Generate a QR code 
            that gives emergency responders instant access to your lawyer, next of kin, 
            and vital legal instructions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/login">
              <Button size="lg" className="gold-gradient text-primary font-semibold px-8 py-6 text-base hover:opacity-90 transition-opacity">
                Secure Your Legal Identity
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/emergency/ls-7f3a9b2e-4d1c-8e5f-a6b0-3c2d1e4f5a6b">
              <Button variant="outline" size="lg" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 px-8 py-6 text-base">
                View Live Demo
              </Button>
            </Link>
          </div>
          
          <p className="mt-8 text-primary-foreground/40 text-xs font-body">
            This platform does not replace formal legal registration systems. 
            All data encrypted with AES-256.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
