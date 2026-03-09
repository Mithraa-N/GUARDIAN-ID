import { QRCodeSVG } from "qrcode.react";
import { Download, RefreshCw, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { LegalProfile } from "@/hooks/useDemoData";

interface QRTabProps {
  profile: LegalProfile;
}

const QRTab = ({ profile }: QRTabProps) => {
  const emergencyUrl = `${window.location.origin}/emergency/${profile.qrId}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(emergencyUrl);
    toast.success("Emergency link copied to clipboard");
  };

  const handleDownload = () => {
    const svg = document.querySelector("#qr-code-svg svg") as SVGElement;
    if (!svg) return;
    const serializer = new XMLSerializer();
    const svgStr = serializer.serializeToString(svg);
    const canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 1100;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      // Card background
      ctx.fillStyle = "#0a1628";
      ctx.fillRect(0, 0, 800, 1100);
      
      // Gold accent line
      ctx.fillStyle = "#c9a84c";
      ctx.fillRect(0, 0, 800, 6);

      // Title
      ctx.fillStyle = "#c9a84c";
      ctx.font = "bold 32px Georgia, serif";
      ctx.textAlign = "center";
      ctx.fillText("LEGAL EMERGENCY CARD", 400, 60);

      // QR Code
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(225, 90, 350, 350);
      ctx.drawImage(img, 235, 100, 330, 330);

      // Info
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 24px Georgia, serif";
      ctx.fillText(profile.fullName, 400, 490);

      ctx.fillStyle = "#9ca3af";
      ctx.font = "16px Inter, sans-serif";
      ctx.fillText("PRIMARY LAWYER", 400, 540);
      ctx.fillStyle = "#ffffff";
      ctx.font = "18px Inter, sans-serif";
      ctx.fillText(profile.primaryLawyerName, 400, 565);
      ctx.fillText(profile.lawyerContactNumber, 400, 590);

      ctx.fillStyle = "#9ca3af";
      ctx.font = "16px Inter, sans-serif";
      ctx.fillText("EMERGENCY CONTACT", 400, 640);
      ctx.fillStyle = "#ffffff";
      ctx.font = "18px Inter, sans-serif";
      ctx.fillText(profile.secondaryContactName, 400, 665);
      ctx.fillText(profile.secondaryContactNumber, 400, 690);

      ctx.fillStyle = "#9ca3af";
      ctx.font = "16px Inter, sans-serif";
      ctx.fillText("POWER OF ATTORNEY", 400, 740);
      ctx.fillStyle = "#ffffff";
      ctx.font = "18px Inter, sans-serif";
      ctx.fillText(profile.powerOfAttorneyHolder, 400, 765);

      // Disclaimer
      ctx.fillStyle = "#6b7280";
      ctx.font = "11px Inter, sans-serif";
      ctx.fillText("Scan QR code for full emergency legal profile", 400, 830);
      ctx.fillText("This card does not replace formal legal registration systems", 400, 850);

      // ID
      ctx.fillStyle = "#4b5563";
      ctx.font = "10px Inter, sans-serif";
      ctx.fillText(`ID: ${profile.qrId}`, 400, 890);

      const link = document.createElement("a");
      link.download = "GuardianID-Emergency-Card.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
      toast.success("Emergency card downloaded");
    };
    img.src = "data:image/svg+xml;base64," + btoa(svgStr);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* QR Display */}
      <div className="card-elevated p-6 md:p-8 flex flex-col items-center space-y-6">
        <h2 className="text-xl font-heading font-semibold text-foreground">Your Emergency QR Code</h2>
        
        <div id="qr-code-svg" className="bg-card p-6 rounded-lg border">
          <QRCodeSVG
            value={emergencyUrl}
            size={220}
            level="H"
            fgColor="hsl(220, 60%, 15%)"
            bgColor="transparent"
          />
        </div>

        <p className="text-xs text-muted-foreground text-center font-body max-w-xs">
          This QR code contains only a secure reference ID. No personal data is embedded.
        </p>

        <div className="flex gap-3 w-full">
          <Button variant="outline" className="flex-1 gap-2" onClick={handleCopy}>
            <Copy className="w-4 h-4" /> Copy Link
          </Button>
          <Button variant="outline" className="flex-1 gap-2" onClick={handleDownload}>
            <Download className="w-4 h-4" /> Download Card
          </Button>
        </div>

        <Button
          variant="outline"
          className="w-full gap-2 text-destructive border-destructive/30 hover:bg-destructive/5"
          onClick={() => toast.info("QR regeneration requires backend integration")}
        >
          <RefreshCw className="w-4 h-4" /> Revoke & Regenerate
        </Button>
      </div>

      {/* Preview */}
      <div className="card-elevated p-6 md:p-8 space-y-4">
        <h2 className="text-xl font-heading font-semibold text-foreground">Emergency Card Preview</h2>
        <div className="hero-gradient rounded-lg p-6 text-center space-y-4">
          <div className="w-full h-1 gold-gradient rounded-full" />
          <p className="text-gold text-xs font-semibold tracking-widest uppercase">Legal Emergency Card</p>
          <div className="bg-card/10 backdrop-blur rounded-lg p-4 inline-block">
            <QRCodeSVG value={emergencyUrl} size={120} level="H" fgColor="#ffffff" bgColor="transparent" />
          </div>
          <p className="text-primary-foreground font-heading font-bold text-lg">{profile.fullName}</p>
          <div className="space-y-1 text-sm">
            <p className="text-primary-foreground/50 text-xs uppercase tracking-wider">Primary Lawyer</p>
            <p className="text-primary-foreground">{profile.primaryLawyerName}</p>
            <p className="text-gold">{profile.lawyerContactNumber}</p>
          </div>
          <p className="text-primary-foreground/30 text-[10px]">
            Scan QR for full emergency profile · ID: {profile.qrId.slice(0, 20)}...
          </p>
        </div>
        <p className="text-xs text-muted-foreground font-body">
          Print this card and keep it in your wallet or attach it to your personal ID.
        </p>
      </div>
    </div>
  );
};

export default QRTab;
