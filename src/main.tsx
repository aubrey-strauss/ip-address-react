import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { IpProvider } from "./context/IpContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <IpProvider>
      <App />
    </IpProvider>
  </StrictMode>,
);
