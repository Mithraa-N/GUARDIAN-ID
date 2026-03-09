import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeatureSection from "@/components/FeatureSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <HeroSection />
      <FeatureSection />
      
      {/* CTA Section */}
      <section className="hero-gradient py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground mb-4">
            Don't Wait for an Emergency
          </h2>
          <p className="text-primary-foreground/60 text-lg mb-8 max-w-xl mx-auto font-body">
            Set up your secure legal identity today. It takes less than 5 minutes.
          </p>
          <a
            href="/login"
            className="inline-block gold-gradient text-primary font-semibold px-8 py-3 rounded-md hover:opacity-90 transition-opacity"
          >
            Create Your GuardianID Profile
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
