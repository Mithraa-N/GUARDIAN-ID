import { Badge } from "@/components/ui/badge";
import type { AccessLogEntry } from "@/hooks/useDemoData";

interface AccessLogTabProps {
  logs: AccessLogEntry[];
}

const AccessLogTab = ({ logs }: AccessLogTabProps) => {
  return (
    <div className="card-elevated p-6 md:p-8 space-y-6">
      <h2 className="text-xl font-heading font-semibold text-foreground">Access History</h2>
      <p className="text-sm text-muted-foreground font-body">
        Complete log of every access to your emergency profile and documents.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-sm font-body">
          <thead>
            <tr className="border-b text-left">
              <th className="pb-3 text-muted-foreground font-medium">Timestamp</th>
              <th className="pb-3 text-muted-foreground font-medium">Type</th>
              <th className="pb-3 text-muted-foreground font-medium">Device</th>
              <th className="pb-3 text-muted-foreground font-medium">IP</th>
              <th className="pb-3 text-muted-foreground font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {logs.map((log) => (
              <tr key={log.id}>
                <td className="py-3 text-foreground">
                  {new Date(log.timestamp).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td className="py-3 text-foreground">{log.accessType}</td>
                <td className="py-3 text-muted-foreground">{log.device}</td>
                <td className="py-3 text-muted-foreground font-mono text-xs">{log.ipAddress}</td>
                <td className="py-3">
                  <Badge
                    variant={log.status === "Granted" ? "default" : log.status === "Denied" ? "destructive" : "secondary"}
                    className={log.status === "Granted" ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100" : ""}
                  >
                    {log.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AccessLogTab;
