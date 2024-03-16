import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";
import { AuthClient } from "@dfinity/auth-client";

const root = createRoot(document.getElementById("root"));

const authClient = await AuthClient.create();  

root.render(
  <App />
);


