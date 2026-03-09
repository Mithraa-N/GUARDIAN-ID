import { Link, useNavigate } from "react-router-dom";
import { Landmark, User, FileText, QrCode, ClipboardList, LogOut, Gavel, Camera, Clock, AlertTriangle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDemoData } from "@/hooks/useDemoData";
import ProfileTab from "@/components/dashboard/ProfileTab";
import DocumentsTab from "@/components/dashboard/DocumentsTab";
import QRTab from "@/components/dashboard/QRTab";
import AccessLogTab from "@/components/dashboard/AccessLogTab";
import CaseTrackerTab from "@/components/dashboard/CaseTrackerTab";
import EvidenceLockerTab from "@/components/dashboard/EvidenceLockerTab";
import DeadManSwitchTab from "@/components/dashboard/DeadManSwitchTab";
import PanicButton from "@/components/dashboard/PanicButton";

const Dashboard = () => {
  const { profile, setProfile, accessLog } = useDemoData();

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="hero-gradient border-b border-primary-foreground/10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Landmark className="w-6 h-6 text-gold" />
            <span className="text-primary-foreground font-heading text-lg font-semibold">GuardianID</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-primary-foreground/60 text-sm font-body hidden sm:block">
              {profile.fullName}
            </span>
            <Link
              to="/"
              className="text-primary-foreground/50 hover:text-primary-foreground transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
            Legal Emergency Profile
          </h1>
          <p className="text-muted-foreground text-sm mt-1 font-body">
            Manage your secure legal identity, cases, evidence, and emergency access settings.
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="bg-muted p-1 rounded-lg flex-wrap h-auto gap-1">
            <TabsTrigger value="profile" className="font-body text-sm gap-2">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="documents" className="font-body text-sm gap-2">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Documents</span>
            </TabsTrigger>
            <TabsTrigger value="cases" className="font-body text-sm gap-2">
              <Gavel className="w-4 h-4" />
              <span className="hidden sm:inline">Cases</span>
            </TabsTrigger>
            <TabsTrigger value="evidence" className="font-body text-sm gap-2">
              <Camera className="w-4 h-4" />
              <span className="hidden sm:inline">Evidence</span>
            </TabsTrigger>
            <TabsTrigger value="qr" className="font-body text-sm gap-2">
              <QrCode className="w-4 h-4" />
              <span className="hidden sm:inline">QR Code</span>
            </TabsTrigger>
            <TabsTrigger value="deadman" className="font-body text-sm gap-2">
              <Clock className="w-4 h-4" />
              <span className="hidden sm:inline">Dead-Man's Switch</span>
            </TabsTrigger>
            <TabsTrigger value="log" className="font-body text-sm gap-2">
              <ClipboardList className="w-4 h-4" />
              <span className="hidden sm:inline">Access Log</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <ProfileTab profile={profile} onUpdate={setProfile} />
          </TabsContent>
          <TabsContent value="documents">
            <DocumentsTab documents={profile.documents} />
          </TabsContent>
          <TabsContent value="cases">
            <CaseTrackerTab />
          </TabsContent>
          <TabsContent value="evidence">
            <EvidenceLockerTab />
          </TabsContent>
          <TabsContent value="qr">
            <QRTab profile={profile} />
          </TabsContent>
          <TabsContent value="deadman">
            <DeadManSwitchTab />
          </TabsContent>
          <TabsContent value="log">
            <AccessLogTab logs={accessLog} />
          </TabsContent>
        </Tabs>
      </main>

      {/* Panic Button */}
      <PanicButton />
    </div>
  );
};

export default Dashboard;
