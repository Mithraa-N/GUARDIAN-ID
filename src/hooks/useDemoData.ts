import { useState } from "react";

export interface LegalProfile {
  id: string;
  fullName: string;
  dateOfBirth: string;
  primaryLawyerName: string;
  lawyerContactNumber: string;
  secondaryContactName: string;
  secondaryContactNumber: string;
  bailPreferences: string;
  powerOfAttorneyHolder: string;
  willExecutorName: string;
  emergencyInstructions: string;
  documents: DocumentEntry[];
  cases: any[];
  evidence: any[];
  beneficiaries: any[];
  qrId: string;
  createdAt: string;
}

export interface DocumentEntry {
  id: string;
  name: string;
  type: string;
  uploadedAt: string;
  size: string;
}

export interface AccessLogEntry {
  id: string;
  timestamp: string;
  accessType: "QR Scan" | "Document Request" | "Profile View";
  ipAddress: string;
  device: string;
  status: "Granted" | "Denied" | "Pending";
}

const DEMO_PROFILE: LegalProfile = {
  id: "demo-001",
  fullName: "Jonathan R. Mitchell",
  dateOfBirth: "1985-03-15",
  primaryLawyerName: "Sarah K. Whitfield, Esq.",
  lawyerContactNumber: "+1 (555) 234-5678",
  secondaryContactName: "Margaret Mitchell (Wife)",
  secondaryContactNumber: "+1 (555) 876-5432",
  bailPreferences: "Maximum bail up to $50,000. Contact lawyer first before any proceedings.",
  powerOfAttorneyHolder: "Margaret Mitchell",
  willExecutorName: "Robert J. Mitchell (Brother)",
  emergencyInstructions: "Contact primary lawyer immediately. Do not make any statements without legal counsel present. Medical power of attorney held by spouse.",
  documents: [
    { id: "doc-1", name: "Last Will and Testament.pdf", type: "Will", uploadedAt: "2024-01-15", size: "2.4 MB" },
    { id: "doc-2", name: "Power of Attorney.pdf", type: "Power of Attorney", uploadedAt: "2024-01-15", size: "1.1 MB" },
    { id: "doc-3", name: "Life Insurance Policy.pdf", type: "Insurance", uploadedAt: "2024-02-20", size: "3.8 MB" },
    { id: "doc-4", name: "Property Deed Summary.pdf", type: "Property", uploadedAt: "2024-03-01", size: "1.5 MB" },
  ],
  cases: [
    {
      id: "case-1",
      title: "Property Dispute – 42 Oak Avenue",
      caseNumber: "CIV-2025-04821",
      court: "District Civil Court, Metro Division",
      status: "Active",
      nextHearing: "2026-03-18",
      filedDate: "2025-06-12",
      description: "Property boundary dispute with neighboring owner. Surveyor report submitted. Awaiting court-appointed mediator.",
    }
  ],
  evidence: [
    {
      id: "ev-1",
      name: "Property_Boundary_Photo_01.jpg",
      type: "Photo",
      timestamp: "2026-02-15T10:32:00Z",
      hash: "sha256:a3f8b2c9d1e4...7f6a",
      verified: true,
      size: "4.2 MB",
    }
  ],
  beneficiaries: [
    { id: "ben-1", name: "Margaret Mitchell", email: "margaret@email.com", documents: ["Will", "Insurance"] },
    { id: "ben-2", name: "Robert J. Mitchell", email: "robert@email.com", documents: ["Will", "Property Deed"] },
  ],
  qrId: "ls-7f3a9b2e-4d1c-8e5f-a6b0-3c2d1e4f5a6b",
  createdAt: "2024-01-15",
};

const DEMO_ACCESS_LOG: AccessLogEntry[] = [
  { id: "log-1", timestamp: "2026-03-02T14:32:00Z", accessType: "QR Scan", ipAddress: "192.168.1.***", device: "iPhone 15 Pro", status: "Granted" },
  { id: "log-2", timestamp: "2026-03-01T09:15:00Z", accessType: "Document Request", ipAddress: "10.0.0.***", device: "Chrome / Windows", status: "Denied" },
  { id: "log-3", timestamp: "2026-02-28T18:45:00Z", accessType: "Profile View", ipAddress: "172.16.0.***", device: "Safari / macOS", status: "Granted" },
  { id: "log-4", timestamp: "2026-02-25T11:20:00Z", accessType: "QR Scan", ipAddress: "192.168.2.***", device: "Samsung Galaxy S24", status: "Granted" },
];

export function useDemoData() {
  const [profile, setProfileState] = useState<LegalProfile>(() => {
    try {
      const storedAccount = localStorage.getItem("userAccount");
      const email = storedAccount ? JSON.parse(storedAccount).email : "guest";
      const storedProfile = localStorage.getItem(`profile_${email}`);
      if (storedProfile) {
        return JSON.parse(storedProfile);
      }
    } catch (e) {
      console.error("Error parsing profile data", e);
    }
    return {
      id: `user-${Date.now()}`,
      fullName: "",
      dateOfBirth: "",
      primaryLawyerName: "",
      lawyerContactNumber: "",
      secondaryContactName: "",
      secondaryContactNumber: "",
      bailPreferences: "",
      powerOfAttorneyHolder: "",
      willExecutorName: "",
      emergencyInstructions: "",
      documents: [],
      cases: [],
      evidence: [],
      beneficiaries: [],
      qrId: `ls-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
  });

  const [accessLog] = useState<AccessLogEntry[]>(DEMO_ACCESS_LOG);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const setProfile = (newProfile: LegalProfile) => {
    setProfileState(newProfile);
    try {
      const storedAccount = localStorage.getItem("userAccount");
      const email = storedAccount ? JSON.parse(storedAccount).email : "guest";
      localStorage.setItem(`profile_${email}`, JSON.stringify(newProfile));
    } catch (e) {
      console.error("Error saving profile", e);
    }
  };

  return { profile, setProfile, accessLog, isLoggedIn, setIsLoggedIn, demoProfile: DEMO_PROFILE };
}
