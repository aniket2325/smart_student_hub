import React from "react";
import { motion } from "framer-motion";
import { Lightbulb, Target, Rocket, Star } from "lucide-react";
import students from "../data/student";

export default function About() {
  return (
    <div className="pt-20 min-h-screen">
      <div className="container mx-auto px-6 py-32">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Lightbulb className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm">
              ABOUT US
            </span>
          </motion.div>

          <h1 className="text-6xl md:text-7xl font-black mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              About Smart Student Hub
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Revolutionizing student management with cutting-edge technology
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <motion.div
            className="p-10 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl shadow-xl"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center mb-6 shadow-lg">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold mb-6 text-gray-800 dark:text-white">Our Mission</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
              To create a unified platform that streamlines student achievement tracking, attendance management,
              and portfolio building, making education more transparent and accessible.
            </p>
          </motion.div>

          <motion.div
            className="p-10 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl shadow-xl"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center mb-6 shadow-lg">
              <Rocket className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold mb-6 text-gray-800 dark:text-white">Our Vision</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
              To become the leading digital ecosystem for educational institutions across India,
              empowering millions of students with verified digital credentials.
            </p>
          </motion.div>
        </div>

        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-black mb-4 text-gray-800 dark:text-white">Meet Our Team</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">The brilliant minds behind Smart Student Hub</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {students.map((member, index) => (
            <motion.div
              key={member.roll}
              className="p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-xl text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.05 }}
            >
              <motion.div
                className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                {member.name.split(" ").map((n) => n[0]).join("")}
              </motion.div>
              <h3 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">{member.name}</h3>
              <p className="text-blue-600 dark:text-blue-400 font-semibold mb-1">{member.class}</p>
              <p className="text-gray-500 dark:text-gray-500">Roll No: {member.roll}</p>
              <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 rounded-full">
                <Star className="w-4 h-4 text-green-600" />
                <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                  {member.attendance}% Attendance
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}