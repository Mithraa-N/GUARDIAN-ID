import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Phone, Landmark, MapPin, X, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const LAWYER_DATA = {
  name: "Sarah K. Whitfield, Esq.",
  phone: "+15552345678",
  phoneDisplay: "+1 (555) 234-5678",
  emergencyContact: "Margaret Mitchell (Wife)",
  emergencyPhone: "+15558765432",
  emergencyPhoneDisplay: "+1 (555) 876-5432",
};

const ArrestMode = () => {
  const navigate = useNavigate();
  const [alertsSent, setAlertsSent] = useState(false);
  const [locationShared, setLocationShared] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    // Simulate sending alerts after 2 seconds
    const alertTimer = setTimeout(() => {
      setAlertsSent(true);
      toast.success("Alerts sent to lawyer and emergency contact");
    }, 2000);

    // Elapsed timer
    const interval = setInterval(() => {
      setElapsed((prev) => prev + 1);
    }, 1000);

    return () => {
      clearTimeout(alertTimer);
      clearInterval(interval);
    };
  }, []);

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60).toString().padStart(2, "0");
    const secs = (s % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const handleShareLocation = () => {
    setLocationShared(true);
    toast.success("Live location shared with lawyer and emergency contact");
  };

  const handleDeactivate = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-foreground flex flex-col">
      {/* Pulsing red top bar */}
      <motion.div
        className="emergency-banner py-3 px-6"
        animate={{ opacity: [1, 0.7, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            <span className="font-semibold text-sm font-body tracking-wider">ARREST MODE ACTIVE</span>
          </div>
          <span className="font-mono text-sm">{formatTime(elapsed)}</span>
        </div>
      </motion.div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        {/* Landmark icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="mb-8"
        >
          <div className="w-20 h-20 rounded-full gold-gradient flex items-center justify-center">
            <Landmark className="w-10 h-10 text-primary" />
          </div>
        </motion.div>

        {/* Main message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-card mb-4 leading-tight">
            "I wish to speak<br />to my lawyer."
          </h1>
          <p className="text-card/50 text-sm font-body max-w-sm">
            You have the right to legal representation. Do not make any statements until your lawyer is present.
          </p>
        </motion.div>

        {/* Alert status */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="w-full max-w-sm space-y-3 mb-8"
        >
          <div className={`rounded-lg px-4 py-3 flex items-center justify-between text-sm font-body ${alertsSent ? "bg-emerald-900/30 text-emerald-400" : "bg-card/10 text-card/40"}`}>
            <span>SMS to Lawyer</span>
            <span>{alertsSent ? "✓ Sent" : "Sending..."}</span>
          </div>
          <div className={`rounded-lg px-4 py-3 flex items-center justify-between text-sm font-body ${alertsSent ? "bg-emerald-900/30 text-emerald-400" : "bg-card/10 text-card/40"}`}>
            <span>SMS to Emergency Contact</span>
            <span>{alertsSent ? "✓ Sent" : "Sending..."}</span>
          </div>
          <div className={`rounded-lg px-4 py-3 flex items-center justify-between text-sm font-body ${locationShared ? "bg-emerald-900/30 text-emerald-400" : "bg-card/10 text-card/50"}`}>
            <span>Live Location</span>
            <span>{locationShared ? "✓ Sharing" : "Not shared"}</span>
          </div>
        </motion.div>

        {/* Call buttons */}
        <div className="w-full max-w-sm space-y-3 mb-6">
          <a
            href={`tel:${LAWYER_DATA.phone}`}
            className="flex items-center gap-3 gold-gradient text-primary font-semibold px-6 py-4 rounded-lg w-full justify-center hover:opacity-90 transition-opacity"
          >
            <Phone className="w-5 h-5" />
            Call Lawyer: {LAWYER_DATA.phoneDisplay}
          </a>
          <a
            href={`tel:${LAWYER_DATA.emergencyPhone}`}
            className="flex items-center gap-3 bg-card/10 text-card font-semibold px-6 py-4 rounded-lg w-full justify-center hover:bg-card/20 transition-colors border border-card/20"
          >
            <Phone className="w-5 h-5" />
            Call: {LAWYER_DATA.emergencyPhoneDisplay}
          </a>
        </div>

        {/* Share location */}
        {!locationShared && (
          <button
            onClick={handleShareLocation}
            className="flex items-center gap-2 text-card/60 hover:text-card text-sm font-body transition-colors mb-8"
          >
            <MapPin className="w-4 h-4" />
            Share Live Location
          </button>
        )}

        {/* Lawyer info */}
        <div className="w-full max-w-sm bg-card/5 rounded-lg p-4 border border-card/10 mb-6">
          <p className="text-card/40 text-xs font-body uppercase tracking-wider mb-1">Your Lawyer</p>
          <p className="text-card font-heading font-semibold">{LAWYER_DATA.name}</p>
        </div>

        {/* Deactivate */}
        <button
          onClick={handleDeactivate}
          className="flex items-center gap-2 text-card/30 hover:text-card/60 text-xs font-body transition-colors"
        >
          <X className="w-3 h-3" />
          Deactivate Arrest Mode
        </button>
      </div>

      {/* Bottom disclaimer */}
      <div className="px-6 py-4 text-center">
        <p className="text-card/20 text-[10px] font-body">
          GuardianID · This does not constitute legal advice · All communications logged
        </p>
      </div>
    </div>
  );
};

export default ArrestMode;
