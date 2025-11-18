import React from "react";
import { motion } from "framer-motion";
import { Users, Briefcase, GraduationCap, CheckCircle2, Heart } from "lucide-react";
import FloatingShapes from "../common/FloatingShapes";

export default function WhyChooseUs() {
  const benefits = [
    {
      icon: Users,
      title: "For Students",
      points: [
        "Build verified digital portfolio",
        "Track all achievements",
        "Generate instant reports",
        "Share credentials anywhere",
      ],
      color: "blue",
    },
    {
      icon: Briefcase,
      title: "For Faculty",
      points: [
        "Easy verification workflow",
        "Automated attendance",
        "Quick student insights",
        "Bulk report generation",
      ],
      color: "purple",
    },
    {
      icon: GraduationCap,
      title: "For Institution",
      points: [
        "Centralized student data",
        "Advanced analytics",
        "Paperless management",
        "Enhanced transparency",
      ],
      color: "pink",
    },
  ];

  const colorMap = {
    blue: "from-blue-600 to-cyan-600",
    purple: "from-purple-600 to-pink-600",
    pink: "from-pink-600 to-rose-600",
  };

  return (
    <section className="py-32 relative overflow-hidden">
      <FloatingShapes />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Heart className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span className="text-purple-600 dark:text-purple-400 font-semibold text-sm">
              WHY CHOOSE US
            </span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Built For Everyone
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A comprehensive solution that benefits students, faculty, and institutions
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="relative p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 dark:border-gray-700/50 h-full">
                <motion.div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colorMap[benefit.color]} flex items-center justify-center mb-6 shadow-lg`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <benefit.icon className="w-8 h-8 text-white" />
                </motion.div>

                <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
                  {benefit.title}
                </h3>

                <ul className="space-y-3">
                  {benefit.points.map((point, i) => (
                    <motion.li
                      key={i}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 + i * 0.1 }}
                    >
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600 dark:text-gray-400">{point}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}