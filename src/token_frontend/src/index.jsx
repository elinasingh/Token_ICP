import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";
import { AuthClient } from "@dfinity/auth-client";

const init = async () => {
  try {
    const authClient = await AuthClient.create(); 
    if (await authClient.isAuthenticated()) {
      // console.log("logged in");
      handleAuthenticated(authClient);
    } else {
      await authClient.login({
        identityProvider: "https://identity.ic0.app/#authorize",
        onSuccess: () => {
          handleAuthenticated(authClient);
        }
      });
    }
} catch (error) {
  console.error("Error initializing authentication: ", error);
}

async function handleAuthenticated(authClient) {
  // console.log(authClient.getIdentity());
  const identity = await authClient.getIdentity();
  const userPrincipal = identity._principal.toString();
  console.log(userPrincipal);
  const root = createRoot(document.getElementById("root"));
  root.render(
    <App 
    loggedInPrincipal={userPrincipal}
    />
  );
}
};

init();


 







  