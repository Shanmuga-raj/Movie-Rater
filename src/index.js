import App from "./App";
import Auth from "./components/auth/auth.component";
import { CookiesProvider } from "react-cookie";
import React from "react";
import ReactDOM from "react-dom/client";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

const Router = () => {
  return (
    <React.StrictMode>
      <CookiesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Auth />} exact />
            <Route path="/movies" element={<App />} exact />
          </Routes>
        </BrowserRouter>
      </CookiesProvider>
    </React.StrictMode>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Router />);

reportWebVitals();
