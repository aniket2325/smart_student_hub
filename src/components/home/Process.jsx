import React from "react";
import { motion } from "framer-motion";
import { Upload, CheckCircle2, BarChart3, Share2, Activity } from "lucide-react";

export default function Process() {
  const steps = [
    {
      icon: Upload,
      title: "Student Uploads",
      description: "Students upload achievements and documents",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: CheckCircle2,
      title: "Faculty Verifies",
      description: "Faculty reviews and verifies submissions",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: BarChart3,
      title: "System Generates",
      description: "Automated report generation",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Share2,
      title: "Student Shares",
      description: "Share verified portfolio anywhere",
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <section className="py-32 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Activity className="w-4 h-4 text-green-600 dark:text-green-400" />
            <span className="text-green-600 dark:text-green-400 font-semibold text-sm">
              HOW IT WORKS
            </span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Simple 4-Step Process
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Get started in minutes and see results immediately
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8 relative">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
            >
              <motion.div className="text-center" whileHover={{ scale: 1.05 }}>
                <motion.div
                  className={`w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-2xl`}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <step.icon className="w-12 h-12 text-white" />
                </motion.div>

                <div className="mb-3 text-sm font-bold text-blue-600 dark:text-blue-400">
                  STEP {index + 1}
                </div>

                <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-white">
                  {step.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}