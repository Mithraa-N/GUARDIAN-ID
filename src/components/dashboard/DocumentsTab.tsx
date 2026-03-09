import { FileText, Upload, Landmark, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { DocumentEntry } from "@/hooks/useDemoData";

interface DocumentsTabProps {
  documents: DocumentEntry[];
}

const DocumentsTab = ({ documents }: DocumentsTabProps) => {
  return (
    <div className="card-elevated p-6 md:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-heading font-semibold text-foreground">Encrypted Documents</h2>
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={() => toast.info("File upload requires backend integration")}
        >
          <Upload className="w-4 h-4" />
          Upload
        </Button>
      </div>

      <div className="flex items-center gap-2 bg-muted rounded-md px-4 py-3 text-sm text-muted-foreground font-body">
        <Landmark className="w-4 h-4 text-secondary flex-shrink-0" />
        All documents are encrypted with AES-256 before storage.
      </div>

      <div className="divide-y divide-border">
        {documents.map((doc) => (
          <div key={doc.id} className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-md bg-muted flex items-center justify-center">
                <FileText className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground font-body">{doc.name}</p>
                <p className="text-xs text-muted-foreground font-body">
                  {doc.type} · {doc.size} · Uploaded {doc.uploadedAt}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-destructive hover:text-destructive"
              onClick={() => toast.info("Document deletion requires backend integration")}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentsTab;
