import type { ReactNode } from "react";
type InfoPanelProps = {
  children: ReactNode;
};
// Add aria labels
function InfoPanel({ children }: InfoPanelProps) {
  return (
    <section
      className="info-container"
      aria-live="polite"
      aria-label="Lookup results"
    >
      {children}
    </section>
  );
}

export default InfoPanel;
