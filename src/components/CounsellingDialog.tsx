import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button, type ButtonProps } from "@/components/ui/button";
import { CounsellingForm } from "@/components/forms/CounsellingForm";

type CounsellingContextValue = { open: (source?: string) => void };

const CounsellingContext = createContext<CounsellingContextValue>({ open: () => {} });

export function CounsellingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState("counselling-modal");

  const open = useCallback((nextSource?: string) => {
    setSource(nextSource ?? "counselling-modal");
    setIsOpen(true);
  }, []);

  const value = useMemo(() => ({ open }), [open]);

  return (
    <CounsellingContext.Provider value={value}>
      {children}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Book a Free Counselling Session</DialogTitle>
            <DialogDescription>
              Share a few details and a counsellor will get in touch to discuss suitable countries, universities and
              scholarship options for your profile.
            </DialogDescription>
          </DialogHeader>
          {isOpen ? <CounsellingForm source={source} /> : null}
        </DialogContent>
      </Dialog>
    </CounsellingContext.Provider>
  );
}

export function useCounselling() {
  return useContext(CounsellingContext);
}

export function CounsellingButton({
  label = "Book Free Counselling",
  source = "cta",
  ...buttonProps
}: { label?: string; source?: string } & Omit<ButtonProps, "onClick" | "children">) {
  const { open } = useCounselling();
  return (
    <Button type="button" onClick={() => open(source)} {...buttonProps}>
      {label}
    </Button>
  );
}
