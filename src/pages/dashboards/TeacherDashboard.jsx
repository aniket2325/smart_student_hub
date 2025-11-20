import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Home,
  Users,
  CheckCircle,
  Trophy,
  FileText,
  User,
  Calendar,
  ClipboardCheck,
  Award,
  BarChart3,
} from "lucide-react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import students from "../../data/student";

export default function TeacherDashboard() {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const navigate = useNavigate();

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "students", label: "Students", icon: Users },
    { id: "attendance", label: "Attendance", icon: Calendar },
    { id: "verify", label: "Verify Achievements", icon: CheckCircle },
    { id: "reports", label: "Reports", icon: FileText },
    { id: "profile", label: "Profile", icon: User },
  ];

  const stats = [
    {
      label: "Total Students",
      value: String(students.length),
      icon: Users,
      color: "from-blue-500 to-cyan-500",
      change: "+3",
    },
    {
      label: "Avg Attendance",
      value: "94%",
      icon: Calendar,
      color: "from-green-500 to-emerald-500",
      change: "+2%",
    },
    {
      label: "Pending Verifications",
      value: "5",
      icon: Award,
      color: "from-yellow-500 to-orange-500",
      change: "-2",
    },
    {
      label: "Reports Generated",
      value: "12",
      icon: BarChart3,
      color: "from-purple-500 to-pink-500",
      change: "+3",
    },
  ];

  const pendingVerifications = [
    { student: "Aniket Kumar", achievement: "Hackathon Certificate", date: "Today" },
    { student: "Aditya Shankar", achievement: "Project Award", date: "Yesterday" },
    { student: "Akash Gupta", achievement: "Research Paper", date: "2 days ago" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  const renderContent = () => {
    switch (activeMenu) {
      case "students":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-black text-gray-800 dark:text-white">Student Management</h2>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
              <div className="space-y-4">
                {students.map((student, index) => (
                  <motion.div
                    key={student.roll}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold">
                        {student.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 dark:text-white">{student.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{student.roll}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-800 dark:text-white">{student.attendance}%</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Attendance</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        );
      case "verify":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-black text-gray-800 dark:text-white">Verify Achievements</h2>
            <div className="space-y-4">
              {pendingVerifications.map((item, index) => (
                <motion.div
                  key={index}
                  className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
                        <Trophy className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 dark:text-white">{item.achievement}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{item.student}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-500">{item.date}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <motion.button
                        className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-xl font-semibold"
                        whileHover={{ scale: 1.05 }}
                      >
                        Approve
                      </motion.button>
                      <motion.button
                        className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-xl font-semibold"
                        whileHover={{ scale: 1.05 }}
                      >
                        Reject
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );
      case "profile":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-black text-gray-800 dark:text-white">My Profile</h2>
            <div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white text-3xl font-bold">
                  PT
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Prof. Teacher</h3>
                  <p className="text-gray-600 dark:text-gray-400">Computer Science Department</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">Faculty ID: FAC12345</p>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                      <stat.icon className="w-7 h-7 text-white" />
                    </div>
                    <span className="text-green-600 text-sm font-bold">{stat.change}</span>
                  </div>
                  <h3 className="text-4xl font-black text-gray-800 dark:text-white mb-1">{stat.value}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-black mb-6 text-gray-800 dark:text-white">Pending Verifications</h2>
              <div className="space-y-4">
                {pendingVerifications.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-white">{item.achievement}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{item.student}</p>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-500">{item.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <DashboardLayout
      role="Teacher"
      roleIcon={ClipboardCheck}
      userName="Prof. Teacher"
      menuItems={menuItems}
      activeMenu={activeMenu}
      setActiveMenu={setActiveMenu}
      onLogout={handleLogout}
    >
      {renderContent()}
    </DashboardLayout>
  );
}