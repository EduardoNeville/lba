import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer.tsx";

import LandingPage from "./pages/LandingPage";
import InvestPlanPage from "./pages/InvestPlanPage.tsx";
import CorporateResponsibility from "./pages/CorporateResponsibility.tsx";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ThankYouPage from "./pages/ThankYouPage.tsx";
import "./i18n.ts"; // Import i18n configuration

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcS6ugm3ikZLUn_W72ZSs1yhj4OuoeAnc",
  authDomain: "legal-boutique-advisers-bf25a.firebaseapp.com",
  projectId: "legal-boutique-advisers-bf25a",
  storageBucket: "legal-boutique-advisers-bf25a.firebasestorage.app",
  messagingSenderId: "349550465017",
  appId: "1:349550465017:web:e1e07f7f7850f8d7bcb728",
  measurementId: "G-X730YGS783",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/invest_and_plan" element={<InvestPlanPage />} />
        <Route
          path="/corporate_responsibility"
          element={<CorporateResponsibility />}
        />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/thankyou" element={<ThankYouPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
