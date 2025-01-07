import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer.tsx";

import LandingPage from "./components/pages/LandingPage";
import InvestPlanPage from "./components/pages/InvestPlanPage.tsx";
import CorporateResponsibility from "./components/pages/CorporateResponsibility.tsx";
import AboutPage from "./components/pages/AboutPage";
import ContactPage from "./components/pages/ContactPage";
import "./i18n.ts"; // Import i18n configuration

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/invest_and_plan" element={<InvestPlanPage />} />
        <Route path="/corporate_responsibility" element={<CorporateResponsibility />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
