import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { resolveHashRedirect } from "./utils/deepLinks";

const hashRedirect = resolveHashRedirect(window.location.pathname, window.location.hash);
if (hashRedirect) {
  window.location.replace(hashRedirect);
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
