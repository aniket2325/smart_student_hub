import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

export default function TeamCard({ name, roll, class: className, year, attendance }) {
  // Generate initials from name
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <motion.div
      className="p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-xl text-center border border-gray-100 dark:border-gray-700"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -10, scale: 1.05 }}
    >
      {/* Avatar with Initials */}
      <motion.div
        className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg"
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.6 }}
      >
        {initials}
      </motion.div>

      {/* Name */}
      <h3 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">
        {name}
      </h3>

      {/* Class */}
      <p className="text-blue-600 dark:text-blue-400 font-semibold mb-1">
        {className}
      </p>

      {/* Roll Number */}
      <p className="text-gray-500 dark:text-gray-500 text-sm mb-4">
        Roll No: {roll}
      </p>

      {/* Attendance Badge (if provided) */}
      {attendance && (
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full"
          whileHover={{ scale: 1.05 }}
        >
          <Star className="w-4 h-4 text-green-600 dark:text-green-400" />
          <span className="text-sm font-semibold text-green-600 dark:text-green-400">
            {attendance}% Attendance
          </span>
        </motion.div>
      )}
    </motion.div>
  );
}