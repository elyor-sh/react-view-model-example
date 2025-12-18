import { createRoot } from "react-dom/client";
import { App } from "./app";
import { GlobalContext, Globals } from "@/app/globals.ts";

createRoot(document.getElementById("root")!).render(
  <GlobalContext value={new Globals()}>
    <App />
  </GlobalContext>,
);
