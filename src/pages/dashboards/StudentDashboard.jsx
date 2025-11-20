import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Home,
  Calendar,
  Trophy,
  FileText,
  User,
  LogOut,
  Bell,
  Settings,
  GraduationCap,
  TrendingUp,
  Upload,
  BarChart3,
  CheckCircle2,
} from "lucide-react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";

export default function StudentDashboard() {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const navigate = useNavigate();

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "attendance", label: "My Attendance", icon: Calendar },
    { id: "achievements", label: "Achievements", icon: Trophy },
    { id: "reports", label: "Reports", icon: FileText },
    { id: "profile", label: "Profile", icon: User },
  ];

  const stats = [
    {
      label: "Attendance",
      value: "92%",
      icon: Calendar,
      color: "from-blue-500 to-cyan-500",
      change: "+2.1%",
    },
    {
      label: "Achievements",
      value: "8",
      icon: Trophy,
      color: "from-purple-500 to-pink-500",
      change: "+2",
    },
    {
      label: "Reports",
      value: "5",
      icon: FileText,
      color: "from-green-500 to-emerald-500",
      change: "+1",
    },
    {
      label: "Overall Grade",
      value: "A",
      icon: TrendingUp,
      color: "from-orange-500 to-red-500",
      change: "+0.2",
    },
  ];

  const recentActivities = [
    { text: "Uploaded new certificate", time: "2 hours ago", icon: Upload },
    { text: "Attendance marked (Present)", time: "5 hours ago", icon: CheckCircle2 },
    { text: "Report generated successfully", time: "1 day ago", icon: FileText },
    { text: "Achievement verified by faculty", time: "2 days ago", icon: Trophy },
  ];

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  const renderContent = () => {
    switch (activeMenu) {
      case "attendance":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-black text-gray-800 dark:text-white">My Attendance</h2>
            <div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
              <div className="text-center mb-6">
                <div className="text-6xl font-black text-blue-600 mb-2">92%</div>
                <p className="text-gray-600 dark:text-gray-400">Overall Attendance</p>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl text-center">
                  <p className="text-2xl font-bold text-green-600">45</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Present</p>
                </div>
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl text-center">
                  <p className="text-2xl font-bold text-red-600">4</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Absent</p>
                </div>
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-center">
                  <p className="text-2xl font-bold text-blue-600">49</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Days</p>
                </div>
              </div>
            </div>
          </div>
        );
      case "achievements":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-black text-gray-800 dark:text-white">My Achievements</h2>
              <motion.button
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold"
                whileHover={{ scale: 1.05 }}
              >
                Upload New
              </motion.button>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 dark:text-white">Achievement {i}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Verified</p>
                    </div>
                  </div>
                </div>
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
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-3xl font-bold">
                  AK
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Aniket Kumar</h3>
                  <p className="text-gray-600 dark:text-gray-400">B.Tech CSE - 2nd Year</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">Roll: 2402220100060</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Email</p>
                  <p className="font-semibold text-gray-800 dark:text-white">aniketak_cse24@its.edu.in</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Phone</p>
                  <p className="font-semibold text-gray-800 dark:text-white">+91 9135024982</p>
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
              <h2 className="text-2xl font-black mb-6 text-gray-800 dark:text-white">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <activity.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-white">{activity.text}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <DashboardLayout
      role="Student"
      roleIcon={GraduationCap}
      userName="Aniket Kumar"
      menuItems={menuItems}
      activeMenu={activeMenu}
      setActiveMenu={setActiveMenu}
      onLogout={handleLogout}
    >
      {renderContent()}
    </DashboardLayout>
  );
}