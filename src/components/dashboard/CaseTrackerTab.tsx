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

const DEMO_CASES: CaseEntry[] = [
  {
    id: "case-1",
    title: "Property Dispute – 42 Oak Avenue",
    caseNumber: "CIV-2025-04821",
    court: "District Civil Court, Metro Division",
    status: "Active",
    nextHearing: "2026-03-18",
    filedDate: "2025-06-12",
    description: "Property boundary dispute with neighboring owner. Surveyor report submitted. Awaiting court-appointed mediator.",
  },
  {
    id: "case-2",
    title: "Insurance Claim – Vehicle Accident",
    caseNumber: "INS-2025-11293",
    court: "Consumer Dispute Forum",
    status: "Pending",
    nextHearing: "2026-04-05",
    filedDate: "2025-09-20",
    description: "Claim for damages following vehicle collision. Insurance company disputed coverage amount. Evidence submitted.",
  },
  {
    id: "case-3",
    title: "Employment Contract Review",
    caseNumber: "LAB-2024-07654",
    court: "Labour Tribunal",
    status: "Closed",
    nextHearing: "",
    filedDate: "2024-03-10",
    description: "Non-compete clause challenge. Resolved in favor with modified terms. Case closed December 2024.",
  },
];

const statusColors: Record<string, string> = {
  Active: "bg-emerald-100 text-emerald-700",
  Pending: "bg-amber-100 text-amber-700",
  Closed: "bg-muted text-muted-foreground",
  Appeal: "bg-red-100 text-red-700",
};

const CaseTrackerTab = () => {
  const [expandedCase, setExpandedCase] = useState<string | null>(null);

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
          onClick={() => toast.info("Case creation requires backend integration")}
        >
          <Plus className="w-4 h-4" /> Add Case
        </Button>
      </div>

      <div className="space-y-3">
        {DEMO_CASES.map((c) => {
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
