import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { AuthContextProvider } from "./AuthContext";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthContextProvider>
     <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
  </AuthContextProvider>
 
);
