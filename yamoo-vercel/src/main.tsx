import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import UserApp from "./UserApp";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserApp />
  </StrictMode>
);
