import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer.tsx";

import LandingPage from "./components/pages/LandingPage";
import BuyPage from "./components/pages/BuyPage";
import SellPage from "./components/pages/SellPage";
import InvestPage from "./components/pages/InvestPage";
import AboutPage from "./components/pages/AboutPage";
import ContactPage from "./components/pages/ContactPage";
import "./i18n.ts"; // Import i18n configuration

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/buy" element={<BuyPage />} />
        <Route path="/sell" element={<SellPage />} />
        <Route path="/invest" element={<InvestPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
