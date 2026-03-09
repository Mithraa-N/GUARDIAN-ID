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
  const [profile, setProfile] = useState<LegalProfile>(DEMO_PROFILE);
  const [accessLog] = useState<AccessLogEntry[]>(DEMO_ACCESS_LOG);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return { profile, setProfile, accessLog, isLoggedIn, setIsLoggedIn, demoProfile: DEMO_PROFILE };
}
