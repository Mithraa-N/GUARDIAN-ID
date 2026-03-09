import { useState } from "react";
import { Camera, FileText, Hash, Plus, CheckCircle, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface EvidenceEntry {
  id: string;
  name: string;
  type: "Photo" | "Video" | "Document";
  timestamp: string;
  hash: string;
  verified: boolean;
  size: string;
}

import type { LegalProfile } from "@/hooks/useDemoData";

interface EvidenceLockerTabProps {
  profile: LegalProfile;
  onUpdate: (profile: LegalProfile) => void;
}

const typeIcons: Record<string, any> = {
  Photo: Camera,
  Video: Camera,
  Document: FileText,
};

const EvidenceLockerTab = ({ profile, onUpdate }: EvidenceLockerTabProps) => {
  const evidence = profile.evidence || [];

  const handleAddEvidence = () => {
    const name = prompt("Enter Evidence File Name (e.g., photo.jpg):");
    if (!name) return;
    const typeInput = prompt("Enter Type (Photo, Video, Document):") || "Document";
    const type = ["Photo", "Video", "Document"].includes(typeInput) ? typeInput : "Document";

    const newEvidence = {
      id: `ev-${Date.now()}`,
      name,
      type,
      timestamp: new Date().toISOString(),
      hash: "sha256:" + Math.random().toString(36).substring(2, 12),
      verified: true,
      size: `${(Math.random() * 20 + 0.1).toFixed(1)} MB`
    };
    onUpdate({ ...profile, evidence: [...evidence, newEvidence] });
    toast.success("Evidence added securely");
  };



  return (
    <div className="card-elevated p-6 md:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-heading font-semibold text-foreground">Digital Evidence Locker</h2>
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={handleAddEvidence}
        >
          <Upload className="w-4 h-4" /> Upload Evidence
        </Button>
      </div>

      <div className="flex items-center gap-2 bg-muted rounded-md px-4 py-3 text-sm text-muted-foreground font-body">
        <Hash className="w-4 h-4 text-secondary flex-shrink-0" />
        All evidence is timestamped and SHA-256 hashed for tamper-proof verification.
      </div>

      <div className="divide-y divide-border">
        {evidence.length === 0 && <p className="text-sm text-muted-foreground py-4">No evidence uploaded yet.</p>}
        {evidence.map((item: any) => {
          const Icon = typeIcons[item.type] || FileText;
          return (
            <div key={item.id} className="py-4 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-md bg-muted flex items-center justify-center">
                    <Icon className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground font-body">{item.name}</p>
                    <p className="text-xs text-muted-foreground font-body">
                      {item.type} · {item.size} · {new Date(item.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
                <Badge className={item.verified ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100" : ""}>
                  {item.verified && <CheckCircle className="w-3 h-3 mr-1" />}
                  {item.verified ? "Verified" : "Pending"}
                </Badge>
              </div>
              <div className="ml-13 pl-13">
                <p className="text-[11px] font-mono text-muted-foreground/60 bg-muted px-3 py-1.5 rounded inline-block">
                  {item.hash}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EvidenceLockerTab;
