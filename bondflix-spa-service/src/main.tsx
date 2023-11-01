import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { PageNavigationContextProvider } from "./contexts/PageNavigation.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <PageNavigationContextProvider>
            <App />
        </PageNavigationContextProvider>
    </React.StrictMode>
);
