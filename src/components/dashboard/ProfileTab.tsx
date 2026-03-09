import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Landmark } from "lucide-react";
import { toast } from "sonner";
import type { LegalProfile } from "@/hooks/useDemoData";

interface ProfileTabProps {
  profile: LegalProfile;
  onUpdate: (profile: LegalProfile) => void;
}

const ProfileTab = ({ profile, onUpdate }: ProfileTabProps) => {
  const [form, setForm] = useState(profile);
  const [riskLevel, setRiskLevel] = useState("general");
  const handleSave = () => {
    onUpdate(form);
    toast.success("Profile updated successfully");
  };

  const update = (field: keyof LegalProfile, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="card-elevated p-6 md:p-8 space-y-6">
      <h2 className="text-xl font-heading font-semibold text-foreground">Personal & Legal Information</h2>

      {/* Risk Level */}
      <div className="flex items-center gap-4 bg-muted rounded-lg p-4">
        <Landmark className="w-5 h-5 text-secondary flex-shrink-0" />
        <div className="flex-1">
          <Label className="font-body text-sm font-semibold">Risk Level Profile</Label>
          <p className="text-xs text-muted-foreground font-body">Customizes emergency settings based on your risk profile.</p>
        </div>
        <Select value={riskLevel} onValueChange={setRiskLevel}>
          <SelectTrigger className="w-44">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="general">General Citizen</SelectItem>
            <SelectItem value="business">Business Owner</SelectItem>
            <SelectItem value="high-risk">High-Risk Individual</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <Label className="font-body text-sm">Full Legal Name</Label>
          <Input className="mt-1.5" value={form.fullName} onChange={(e) => update("fullName", e.target.value)} />
        </div>
        <div>
          <Label className="font-body text-sm">Date of Birth</Label>
          <Input className="mt-1.5" type="date" value={form.dateOfBirth} onChange={(e) => update("dateOfBirth", e.target.value)} />
        </div>
        <div>
          <Label className="font-body text-sm">Primary Lawyer Name</Label>
          <Input className="mt-1.5" value={form.primaryLawyerName} onChange={(e) => update("primaryLawyerName", e.target.value)} />
        </div>
        <div>
          <Label className="font-body text-sm">Lawyer Contact Number</Label>
          <Input className="mt-1.5" type="tel" value={form.lawyerContactNumber} onChange={(e) => update("lawyerContactNumber", e.target.value)} />
        </div>
        <div>
          <Label className="font-body text-sm">Secondary Contact (Family)</Label>
          <Input className="mt-1.5" value={form.secondaryContactName} onChange={(e) => update("secondaryContactName", e.target.value)} />
        </div>
        <div>
          <Label className="font-body text-sm">Secondary Contact Number</Label>
          <Input className="mt-1.5" type="tel" value={form.secondaryContactNumber} onChange={(e) => update("secondaryContactNumber", e.target.value)} />
        </div>
        <div>
          <Label className="font-body text-sm">Power of Attorney Holder</Label>
          <Input className="mt-1.5" value={form.powerOfAttorneyHolder} onChange={(e) => update("powerOfAttorneyHolder", e.target.value)} />
        </div>
        <div>
          <Label className="font-body text-sm">Will Executor</Label>
          <Input className="mt-1.5" value={form.willExecutorName} onChange={(e) => update("willExecutorName", e.target.value)} />
        </div>
      </div>

      <div>
        <Label className="font-body text-sm">Bail Preferences</Label>
        <Textarea className="mt-1.5" rows={2} value={form.bailPreferences} onChange={(e) => update("bailPreferences", e.target.value)} />
      </div>

      <div>
        <Label className="font-body text-sm">Emergency Instructions</Label>
        <Textarea className="mt-1.5" rows={3} value={form.emergencyInstructions} onChange={(e) => update("emergencyInstructions", e.target.value)} />
      </div>

      <Button onClick={handleSave} className="gold-gradient text-primary font-semibold hover:opacity-90">
        Save Changes
      </Button>
    </div>
  );
};

export default ProfileTab;
