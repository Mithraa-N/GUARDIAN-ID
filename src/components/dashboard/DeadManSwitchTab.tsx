import { useState } from "react";
import { Clock, Mail, AlertTriangle, Landmark, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface Beneficiary {
  id: string;
  name: string;
  email: string;
  documents: string[];
}

const DEMO_BENEFICIARIES: Beneficiary[] = [
  { id: "ben-1", name: "Margaret Mitchell", email: "margaret@email.com", documents: ["Will", "Insurance"] },
  { id: "ben-2", name: "Robert J. Mitchell", email: "robert@email.com", documents: ["Will", "Property Deed"] },
];

const DeadManSwitchTab = () => {
  const [enabled, setEnabled] = useState(true);
  const [inactivityDays, setInactivityDays] = useState("90");
  const [beneficiaries] = useState(DEMO_BENEFICIARIES);

  const handleSave = () => {
    toast.success("Dead-man's switch settings saved");
  };

  return (
    <div className="space-y-6">
      {/* Main settings */}
      <div className="card-elevated p-6 md:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-heading font-semibold text-foreground">Dead-Man's Switch</h2>
            <p className="text-sm text-muted-foreground font-body mt-1">
              Automatically release documents to beneficiaries if you become inactive.
            </p>
          </div>
          <Switch checked={enabled} onCheckedChange={setEnabled} />
        </div>

        {enabled && (
          <>
            <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-md px-4 py-3 text-sm text-amber-800 font-body">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              If you do not log in for the set period, a verification email will be sent. If unresponded, selected documents will be released.
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <Label className="font-body text-sm">Inactivity Period</Label>
                <Select value={inactivityDays} onValueChange={setInactivityDays}>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="60">60 days</SelectItem>
                    <SelectItem value="90">90 days</SelectItem>
                    <SelectItem value="180">180 days</SelectItem>
                    <SelectItem value="365">365 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="font-body text-sm">Verification Grace Period</Label>
                <Select defaultValue="7">
                  <SelectTrigger className="mt-1.5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 days</SelectItem>
                    <SelectItem value="7">7 days</SelectItem>
                    <SelectItem value="14">14 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-muted rounded-md px-4 py-3">
              <Clock className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-semibold text-foreground font-body">Last Activity</p>
                <p className="text-xs text-muted-foreground font-body">Today, March 3, 2026 – Timer resets on each login</p>
              </div>
            </div>

            <Button onClick={handleSave} className="gold-gradient text-primary font-semibold hover:opacity-90">
              Save Settings
            </Button>
          </>
        )}
      </div>

      {/* Beneficiaries */}
      {enabled && (
        <div className="card-elevated p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-muted-foreground" />
              <h3 className="text-lg font-heading font-semibold text-foreground">Beneficiaries</h3>
            </div>
            <Button variant="outline" size="sm" onClick={() => toast.info("Adding beneficiaries requires backend integration")}>
              Add Beneficiary
            </Button>
          </div>

          <div className="divide-y divide-border">
            {beneficiaries.map((b) => (
              <div key={b.id} className="py-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-foreground font-body">{b.name}</p>
                  <p className="text-xs text-muted-foreground font-body">{b.email}</p>
                </div>
                <div className="flex gap-1.5">
                  {b.documents.map((doc) => (
                    <span key={doc} className="text-[10px] bg-muted px-2 py-1 rounded font-body text-muted-foreground">
                      {doc}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DeadManSwitchTab;
