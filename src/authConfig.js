import { PublicClientApplication } from "@azure/msal-browser";


export const msalConfig = {
    auth: {
        clientId: "",
        authority: "https://login.microsoftonline.com/",
        redirectUri: window.location.origin,
        postLogoutRedirectUri:`${window.location.origin}/logout`
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: true, 
    }
};

export const loginRequest = {
    scopes: ["user.read"]
};

export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
};

export const msalInstance = new PublicClientApplication(msalConfig);