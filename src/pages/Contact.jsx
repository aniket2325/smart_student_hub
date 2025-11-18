import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageCircle, ArrowRight, Clock } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you! Your message has been sent successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="pt-20 min-h-screen">
      <div className="container mx-auto px-6 py-32">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <MessageCircle className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span className="text-purple-600 dark:text-purple-400 font-semibold text-sm">
              CONTACT US
            </span>
          </motion.div>

          <h1 className="text-6xl md:text-7xl font-black mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">Have questions? We'd love to hear from you!</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <motion.div
            className="p-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Send us a message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  Your Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-5 py-4 rounded-xl bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 outline-none transition-all text-gray-900 dark:text-white"
                  placeholder="Aniket Kumar"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-5 py-4 rounded-xl bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 outline-none transition-all text-gray-900 dark:text-white"
                  placeholder="aniket@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  Your Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows="5"
                  className="w-full px-5 py-4 rounded-xl bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 outline-none transition-all resize-none text-gray-900 dark:text-white"
                  placeholder="Tell us how we can help..."
                  required
                />
              </div>

              <motion.button
                type="submit"
                className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message <ArrowRight className="w-5 h-5" />
              </motion.button>
            </form>
          </motion.div>

          <motion.div className="space-y-6" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}>
            <div className="p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-xl">
              <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Contact Information</h3>
              <div className="space-y-6">
                <motion.div className="flex items-start gap-4" whileHover={{ x: 5 }}>
                  <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 dark:text-white mb-1">Email</p>
                    <p className="text-gray-600 dark:text-gray-400">aniketkumar231006@gmail.com</p>
                  </div>
                </motion.div>

                <motion.div className="flex items-start gap-4" whileHover={{ x: 5 }}>
                  <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 dark:text-white mb-1">Phone</p>
                    <p className="text-gray-600 dark:text-gray-400">+91 9135024982</p>
                  </div>
                </motion.div>

                <motion.div className="flex items-start gap-4" whileHover={{ x: 5 }}>
                  <div className="w-12 h-12 rounded-xl bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-pink-600 dark:text-pink-400" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 dark:text-white mb-1">Address</p>
                    <p className="text-gray-600 dark:text-gray-400">
                      ITS Engineering College
                      <br />
                      Greater Noida, UP, India
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

            <motion.div
              className="p-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl shadow-2xl text-white"
              whileHover={{ scale: 1.02 }}
            >
              <Clock className="w-12 h-12 mb-4" />
              <h3 className="text-2xl font-bold mb-4">Office Hours</h3>
              <div className="space-y-2 text-white/90">
                <p className="flex items-center justify-between">
                  <span>Monday - Friday</span>
                  <span className="font-semibold">9:00 AM - 6:00 PM</span>
                </p>
                <p className="flex items-center justify-between">
                  <span>Saturday</span>
                  <span className="font-semibold">9:00 AM - 2:00 PM</span>
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}