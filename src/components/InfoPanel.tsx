import type { ReactNode } from "react";
type InfoPanelProps = {
  children: ReactNode;
};
function InfoPanel({ children }: InfoPanelProps) {
  return <section className="info-container">{children}</section>;
}

export default InfoPanel;
