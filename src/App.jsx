import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ThemeProvider from "./context/ThemeContext.jsx";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
        <Router>
          <Header />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>

          <Footer />
        </Router>
      </div>
    </ThemeProvider>
  );
}