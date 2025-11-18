import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Zap, MessageCircle, Check, Gift } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-32">
      <div className="container mx-auto px-6">
        <motion.div
          className="relative max-w-5xl mx-auto p-16 rounded-[3rem] bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 shadow-2xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02 }}
        >
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
              ],
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />

          <div className="relative z-10 text-center text-white">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
                <Gift className="w-5 h-5" />
                <span className="font-semibold">Limited Time Offer</span>
              </div>
            </motion.div>

            <motion.h2
              className="text-5xl md:text-6xl font-black mb-6"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              Ready to Get Started?
            </motion.h2>

            <motion.p
              className="text-xl md:text-2xl mb-12 opacity-90 max-w-2xl mx-auto"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Join Smart Student Hub and manage everything in one dashboard
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 justify-center"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Link to="/signup">
                <motion.button
                  className="px-12 py-5 bg-white text-blue-600 rounded-2xl font-bold text-lg shadow-2xl flex items-center gap-3"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started Free <Zap className="w-6 h-6" />
                </motion.button>
              </Link>

              <Link to="/contact">
                <motion.button
                  className="px-12 py-5 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-2xl font-bold text-lg flex items-center gap-3"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contact Us <MessageCircle className="w-6 h-6" />
                </motion.button>
              </Link>
            </motion.div>

            <motion.div
              className="mt-12 flex items-center justify-center gap-8 text-white/80"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5" />
                <span>Setup in 5 minutes</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}