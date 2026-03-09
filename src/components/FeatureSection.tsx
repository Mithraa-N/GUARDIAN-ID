import { Landmark, Phone, FileText, QrCode, Lock, Eye } from "lucide-react";

const features = [
  {
    icon: Landmark,
    title: "Military-Grade Encryption",
    description: "All documents encrypted with AES-256 before storage. Your legal data is protected with the same standards used by financial institutions.",
  },
  {
    icon: QrCode,
    title: "Instant QR Access",
    description: "Generate a secure QR code that links to your emergency legal profile. Contains only a secure reference ID — never raw data.",
  },
  {
    icon: Phone,
    title: "Click-to-Call Contacts",
    description: "Emergency responders can instantly reach your lawyer and family contacts with one tap from the emergency access page.",
  },
  {
    icon: FileText,
    title: "Critical Document Vault",
    description: "Securely store your will, power of attorney, insurance policies, and property documents with controlled access.",
  },
  {
    icon: Lock,
    title: "Time-Limited Access",
    description: "Document access requests expire in 10 minutes. OTP verification required for sensitive document retrieval.",
  },
  {
    icon: Eye,
    title: "Full Audit Trail",
    description: "Every access to your emergency profile is logged with timestamp, device, and IP information for complete transparency.",
  },
];

const FeatureSection = () => {
  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold tracking-widest uppercase text-secondary mb-3">
            How It Works
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
            Comprehensive Legal Protection
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Every feature designed with privacy and urgency in mind, ensuring your legal information is accessible when it matters most.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="card-elevated p-8 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg gold-gradient flex items-center justify-center mb-5">
                <feature.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
