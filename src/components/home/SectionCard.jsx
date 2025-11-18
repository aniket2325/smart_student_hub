import React from "react";
import { motion } from "framer-motion";

export default function SectionCard({ icon, title, description }) {
  return (
    <motion.div
      className="p-10 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 dark:border-gray-700/50"
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.02, y: -5 }}
    >
      {/* Icon Display */}
      <div className="text-6xl mb-6">{icon}</div>

      {/* Title */}
      <h3 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}