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

const DEMO_EVIDENCE: EvidenceEntry[] = [
  {
    id: "ev-1",
    name: "Property_Boundary_Photo_01.jpg",
    type: "Photo",
    timestamp: "2026-02-15T10:32:00Z",
    hash: "sha256:a3f8b2c9d1e4...7f6a",
    verified: true,
    size: "4.2 MB",
  },
  {
    id: "ev-2",
    name: "Workplace_Incident_Recording.mp4",
    type: "Video",
    timestamp: "2026-01-20T14:15:00Z",
    hash: "sha256:b7d2e4f1a8c3...9e2b",
    verified: true,
    size: "28.6 MB",
  },
  {
    id: "ev-3",
    name: "Contract_Amendment_Unsigned.pdf",
    type: "Document",
    timestamp: "2025-12-05T09:45:00Z",
    hash: "sha256:c1a9f3b7e2d6...4c8f",
    verified: true,
    size: "1.8 MB",
  },
];

const typeIcons = {
  Photo: Camera,
  Video: Camera,
  Document: FileText,
};

const EvidenceLockerTab = () => {
  const [evidence] = useState(DEMO_EVIDENCE);

  return (
    <div className="card-elevated p-6 md:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-heading font-semibold text-foreground">Digital Evidence Locker</h2>
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={() => toast.info("Evidence upload requires backend integration")}
        >
          <Upload className="w-4 h-4" /> Upload Evidence
        </Button>
      </div>

      <div className="flex items-center gap-2 bg-muted rounded-md px-4 py-3 text-sm text-muted-foreground font-body">
        <Hash className="w-4 h-4 text-secondary flex-shrink-0" />
        All evidence is timestamped and SHA-256 hashed for tamper-proof verification.
      </div>

      <div className="divide-y divide-border">
        {evidence.map((item) => {
          const Icon = typeIcons[item.type];
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
