import { useState } from "react";
import { Calendar, Gavel, Clock, Plus, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface CaseEntry {
  id: string;
  title: string;
  caseNumber: string;
  court: string;
  status: "Active" | "Pending" | "Closed" | "Appeal";
  nextHearing: string;
  filedDate: string;
  description: string;
}

import type { LegalProfile } from "@/hooks/useDemoData";

interface CaseTrackerTabProps {
  profile: LegalProfile;
  onUpdate: (profile: LegalProfile) => void;
}

const statusColors: Record<string, string> = {
  Active: "bg-emerald-100 text-emerald-700",
  Pending: "bg-amber-100 text-amber-700",
  Closed: "bg-muted text-muted-foreground",
  Appeal: "bg-red-100 text-red-700",
};

const CaseTrackerTab = ({ profile, onUpdate }: CaseTrackerTabProps) => {
  const [expandedCase, setExpandedCase] = useState<string | null>(null);
  const cases = profile.cases || [];

  const handleAddCase = () => {
    const title = prompt("Enter Case Title (e.g., Property Dispute):");
    if (!title) return;
    const caseNumber = prompt("Enter Case Number:");
    const court = prompt("Enter Court Name:");

    const newCase = {
      id: `case-${Date.now()}`,
      title,
      caseNumber: caseNumber || "Pending",
      court: court || "TBD",
      status: "Active",
      nextHearing: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 14 days from now
      filedDate: new Date().toISOString().split('T')[0],
      description: "Newly added case.",
    };
    onUpdate({ ...profile, cases: [...cases, newCase] });
    toast.success("Case added to tracker");
  };

  const toggleCase = (id: string) => {
    setExpandedCase(expandedCase === id ? null : id);
  };

  const daysUntil = (date: string) => {
    if (!date) return null;
    const diff = Math.ceil((new Date(date).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  return (
    <div className="card-elevated p-6 md:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-heading font-semibold text-foreground">Case Tracker</h2>
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={handleAddCase}
        >
          <Plus className="w-4 h-4" /> Add Case
        </Button>
      </div>

      <div className="space-y-3">
        {cases.length === 0 && <p className="text-sm text-muted-foreground">No cases tracked yet.</p>}
        {cases.map((c: any) => {
          const days = daysUntil(c.nextHearing);
          const isExpanded = expandedCase === c.id;

          return (
            <div key={c.id} className="border rounded-lg overflow-hidden">
              <button
                onClick={() => toggleCase(c.id)}
                className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Gavel className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-sm text-foreground font-body">{c.title}</p>
                    <p className="text-xs text-muted-foreground font-body">{c.caseNumber} · {c.court}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={`${statusColors[c.status]} hover:${statusColors[c.status]}`}>
                    {c.status}
                  </Badge>
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                </div>
              </button>

              {isExpanded && (
                <div className="px-5 pb-5 pt-2 border-t bg-muted/30 space-y-3">
                  <p className="text-sm text-foreground font-body">{c.description}</p>
                  <div className="flex flex-wrap gap-4 text-xs text-muted-foreground font-body">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> Filed: {c.filedDate}
                    </span>
                    {c.nextHearing && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> Next Hearing: {c.nextHearing}
                        {days !== null && days > 0 && (
                          <Badge variant="secondary" className="ml-1 text-[10px]">{days} days</Badge>
                        )}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CaseTrackerTab;
