import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const PanicButton = () => {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  const handlePanic = () => {
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    setShowConfirm(false);
    navigate("/arrest-mode");
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handlePanic}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full emergency-banner shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow"
      >
        <AlertTriangle className="w-7 h-7" />
      </motion.button>

      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-heading flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              Activate Emergency Mode?
            </DialogTitle>
            <DialogDescription className="font-body text-sm space-y-2">
              <span className="block">This will immediately:</span>
              <span className="flex items-center gap-2"><Phone className="w-4 h-4" /> Send SMS alerts to your lawyer & emergency contact</span>
              <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Optionally share your live location</span>
              <span className="block">Your screen will lock to display lawyer contact information.</span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowConfirm(false)}>Cancel</Button>
            <Button className="emergency-banner hover:opacity-90" onClick={handleConfirm}>
              Activate Arrest Mode
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PanicButton;
