import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  const location = useLocation();

  // Don't show footer on dashboard
  if (location.pathname === "/dashboard") return null;

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">Smart Student Hub</span>
            </div>
            <p className="text-gray-400 mb-4">
              Empowering students with digital excellence
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <motion.button
                  key={i}
                  className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-blue-600 transition-colors"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon className="w-5 h-5" />
                </motion.button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-3">
              {["Home", "About", "Contact"].map((link) => (
                <li key={link}>
                  <Link
                    to={`/${link.toLowerCase()}`}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-lg">Features</h4>
            <ul className="space-y-3 text-gray-400">
              <li>Attendance Tracking</li>
              <li>Achievement Upload</li>
              <li>Verified Portfolio</li>
              <li>Instant Reports</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-lg">Contact</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" /> aniketkumar231006@gmail.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" /> +91 9135024982
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" /> ITS Engineering College
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© 2024 Smart Student Hub. All rights reserved. | ITS Engineering College, Greater Noida</p>
        </div>
      </div>
    </footer>
  );
}