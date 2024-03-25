import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";
import { AuthClient } from "@dfinity/auth-client";

const init = async () => {
  try {
    const authClient = await AuthClient.create(); 

    await authClient.login({
      identityProvider: "https://identity.ic0.app/#authorize",
      onSuccess: () => {
      const root = createRoot(document.getElementById("root"));
      root.render(
        <App />
      );
    }
  });
} catch (error) {
  console.error("Error initializing aithentication: ", error);
}
};


init();


 







  