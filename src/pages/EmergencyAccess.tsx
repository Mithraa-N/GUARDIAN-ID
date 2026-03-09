import { useState } from "react";
import { useParams } from "react-router-dom";
import { Landmark, Phone, User, FileText, AlertTriangle, Lock, Scale, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const EMERGENCY_DATA = {
  fullName: "Jonathan R. Mitchell",
  primaryLawyerName: "Sarah K. Whitfield, Esq.",
  lawyerContactNumber: "+15552345678",
  lawyerContactDisplay: "+1 (555) 234-5678",
  secondaryContactName: "Margaret Mitchell (Wife)",
  secondaryContactNumber: "+15558765432",
  secondaryContactDisplay: "+1 (555) 876-5432",
  powerOfAttorneyHolder: "Margaret Mitchell",
  emergencyInstructions: "Contact primary lawyer immediately. Do not make any statements without legal counsel present. Medical power of attorney held by spouse.",
};

const LEGAL_RIGHTS = [
  {
    title: "Right to Legal Representation",
    description: "You have the right to consult with a lawyer before answering any questions.",
  },
  {
    title: "Right to Remain Silent",
    description: "You are not obligated to answer any questions. Anything you say may be used against you.",
  },
  {
    title: "Right to Know the Charges",
    description: "You have the right to be informed of the charges or reasons for detention.",
  },
  {
    title: "Right to Bail",
    description: "For bailable offenses, you have the right to be released on bail.",
  },
  {
    title: "Right Against Self-Incrimination",
    description: "You cannot be compelled to be a witness against yourself.",
  },
];

const EmergencyAccess = () => {
  const { qrId } = useParams();
  const [showDocRequest, setShowDocRequest] = useState(false);
  const [showRights, setShowRights] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const data = EMERGENCY_DATA;

  const handleRequestDocuments = () => setShowDocRequest(true);
  const handleSendOtp = () => {
    setOtpSent(true);
    toast.success("Verification code sent to registered contact");
  };
  const handleVerifyOtp = () => {
    if (otp === "123456") {
      toast.success("Access granted. Documents available for 10 minutes.");
      setShowDocRequest(false);
    } else {
      toast.error("Invalid verification code. Try: 123456 for demo.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Emergency banner */}
      <div className="emergency-banner py-3 px-6 text-center">
        <div className="flex items-center justify-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          <span className="font-semibold text-sm font-body">EMERGENCY LEGAL ACCESS</span>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Landmark className="w-8 h-8 text-gold" />
            <span className="font-heading text-2xl font-bold text-foreground">GuardianID</span>
          </div>
          <p className="text-xs text-muted-foreground font-body">
            Emergency Legal Identity · Verified Profile
          </p>
        </div>

        {/* Person Identity */}
        <div className="card-elevated p-6 mb-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full hero-gradient flex items-center justify-center">
              <User className="w-7 h-7 text-gold" />
            </div>
            <div>
              <h1 className="text-2xl font-heading font-bold text-foreground">{data.fullName}</h1>
              <p className="text-sm text-muted-foreground font-body">GuardianID Verified Identity</p>
            </div>
          </div>
        </div>

        {/* Primary Lawyer */}
        <div className="card-elevated p-6 mb-4">
          <p className="text-xs text-muted-foreground font-body uppercase tracking-wider mb-2">Primary Lawyer</p>
          <p className="text-lg font-heading font-semibold text-foreground">{data.primaryLawyerName}</p>
          <a
            href={`tel:${data.lawyerContactNumber}`}
            className="mt-3 flex items-center gap-2 gold-gradient text-primary font-semibold px-5 py-3 rounded-md w-full justify-center hover:opacity-90 transition-opacity"
          >
            <Phone className="w-5 h-5" />
            Call Lawyer: {data.lawyerContactDisplay}
          </a>
        </div>

        {/* Secondary Contact */}
        <div className="card-elevated p-6 mb-4">
          <p className="text-xs text-muted-foreground font-body uppercase tracking-wider mb-2">Emergency Family Contact</p>
          <p className="text-lg font-heading font-semibold text-foreground">{data.secondaryContactName}</p>
          <a
            href={`tel:${data.secondaryContactNumber}`}
            className="mt-3 flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-5 py-3 rounded-md w-full justify-center hover:opacity-90 transition-opacity"
          >
            <Phone className="w-5 h-5" />
            Call: {data.secondaryContactDisplay}
          </a>
        </div>

        {/* Power of Attorney */}
        <div className="card-elevated p-6 mb-4">
          <p className="text-xs text-muted-foreground font-body uppercase tracking-wider mb-2">Power of Attorney Holder</p>
          <p className="text-lg font-heading font-semibold text-foreground">{data.powerOfAttorneyHolder}</p>
        </div>

        {/* Emergency Instructions */}
        <div className="card-elevated p-6 mb-4 border-l-4 border-secondary">
          <p className="text-xs text-muted-foreground font-body uppercase tracking-wider mb-2">Legal Emergency Instructions</p>
          <p className="text-sm text-foreground font-body leading-relaxed">{data.emergencyInstructions}</p>
        </div>

        {/* Legal Rights Section */}
        <div className="card-elevated mb-4 overflow-hidden">
          <button
            onClick={() => setShowRights(!showRights)}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Scale className="w-5 h-5 text-secondary" />
              <span className="font-heading font-semibold text-foreground">Your Legal Rights</span>
            </div>
            <BookOpen className="w-4 h-4 text-muted-foreground" />
          </button>
          {showRights && (
            <div className="px-6 pb-5 space-y-4 border-t">
              {LEGAL_RIGHTS.map((right, i) => (
                <div key={i} className="pt-4">
                  <p className="text-sm font-semibold text-foreground font-body">{right.title}</p>
                  <p className="text-xs text-muted-foreground font-body mt-1">{right.description}</p>
                </div>
              ))}
              <p className="text-[10px] text-muted-foreground/50 font-body pt-2 border-t">
                These are general legal rights. Specific rights may vary by jurisdiction.
              </p>
            </div>
          )}
        </div>

        {/* Document Request */}
        {!showDocRequest ? (
          <Button
            variant="outline"
            className="w-full gap-2 py-6 mb-4"
            onClick={handleRequestDocuments}
          >
            <FileText className="w-5 h-5" />
            Request Temporary Document Access
          </Button>
        ) : (
          <div className="card-elevated p-6 space-y-4 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Lock className="w-5 h-5 text-secondary" />
              <h3 className="font-heading font-semibold text-foreground">Secure Document Access</h3>
            </div>
            <p className="text-sm text-muted-foreground font-body">
              A one-time verification code will be sent to the registered contact to authorize document access. Access expires in 10 minutes.
            </p>
            {!otpSent ? (
              <Button className="w-full gold-gradient text-primary font-semibold hover:opacity-90" onClick={handleSendOtp}>
                Send Verification Code
              </Button>
            ) : (
              <div className="space-y-3">
                <Input
                  placeholder="Enter 6-digit code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                  className="text-center text-lg tracking-widest"
                />
                <Button className="w-full gold-gradient text-primary font-semibold hover:opacity-90" onClick={handleVerifyOtp}>
                  Verify & Access Documents
                </Button>
                <p className="text-xs text-muted-foreground text-center font-body">
                  Demo code: 123456
                </p>
              </div>
            )}
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-8 text-center space-y-2">
          <p className="text-xs text-muted-foreground font-body">
            This platform does not replace formal legal registration systems.
          </p>
          <p className="text-xs text-muted-foreground/50 font-body font-mono">
            ID: {qrId}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmergencyAccess;
