import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Home,
  Users,
  Settings,
  FileText,
  User,
  ShieldCheck,
  BarChart3,
  TrendingUp,
  Database,
  Activity,
} from "lucide-react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import students from "../../data/student";

export default function AdminDashboard() {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const navigate = useNavigate();

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "users", label: "User Management", icon: Users },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "reports", label: "System Reports", icon: FileText },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "profile", label: "Profile", icon: User },
  ];

  const stats = [
    {
      label: "Total Users",
      value: "156",
      icon: Users,
      color: "from-blue-500 to-cyan-500",
      change: "+12",
    },
    {
      label: "Active Sessions",
      value: "89",
      icon: Activity,
      color: "from-green-500 to-emerald-500",
      change: "+5",
    },
    {
      label: "System Health",
      value: "98%",
      icon: Database,
      color: "from-purple-500 to-pink-500",
      change: "+2%",
    },
    {
      label: "Performance",
      value: "Excellent",
      icon: TrendingUp,
      color: "from-orange-500 to-red-500",
      change: "+5%",
    },
  ];

  const systemActivity = [
    { action: "New user registered", user: "Student", time: "5 min ago" },
    { action: "Database backup completed", user: "System", time: "1 hour ago" },
    { action: "Report generated", user: "Teacher", time: "2 hours ago" },
    { action: "Security update applied", user: "Admin", time: "5 hours ago" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  const renderContent = () => {
    switch (activeMenu) {
      case "users":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-black text-gray-800 dark:text-white">User Management</h2>
              <motion.button
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold"
                whileHover={{ scale: 1.05 }}
              >
                Add New User
              </motion.button>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg text-center">
                <div className="text-4xl font-black text-blue-600 mb-2">{students.length}</div>
                <p className="text-gray-600 dark:text-gray-400">Students</p>
              </div>
              <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg text-center">
                <div className="text-4xl font-black text-purple-600 mb-2">12</div>
                <p className="text-gray-600 dark:text-gray-400">Teachers</p>
              </div>
              <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg text-center">
                <div className="text-4xl font-black text-green-600 mb-2">3</div>
                <p className="text-gray-600 dark:text-gray-400">Admins</p>
              </div>
            </div>
          </div>
        );
      case "analytics":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-black text-gray-800 dark:text-white">System Analytics</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">User Activity</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600 dark:text-gray-400">Students</span>
                      <span className="font-bold text-gray-800 dark:text-white">85%</span>
                    </div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full w-[85%] bg-gradient-to-r from-blue-500 to-cyan-500"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600 dark:text-gray-400">Teachers</span>
                      <span className="font-bold text-gray-800 dark:text-white">92%</span>
                    </div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full w-[92%] bg-gradient-to-r from-purple-500 to-pink-500"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">System Performance</h3>
                <div className="text-center">
                  <div className="text-6xl font-black text-green-600 mb-2">98%</div>
                  <p className="text-gray-600 dark:text-gray-400">Overall Health</p>
                </div>
              </div>
            </div>
          </div>
        );
      case "settings":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-black text-gray-800 dark:text-white">System Settings</h2>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
              <div className="space-y-6">
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <h4 className="font-bold text-gray-800 dark:text-white mb-2">Database Configuration</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Manage database connections and backups</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <h4 className="font-bold text-gray-800 dark:text-white mb-2">Security Settings</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Configure authentication and permissions</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <h4 className="font-bold text-gray-800 dark:text-white mb-2">System Maintenance</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Schedule maintenance and updates</p>
                </div>
              </div>
            </div>
          </div>
        );
      case "profile":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-black text-gray-800 dark:text-white">Admin Profile</h2>
            <div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center text-white text-3xl font-bold">
                  AD
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Admin User</h3>
                  <p className="text-gray-600 dark:text-gray-400">System Administrator</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">Admin ID: ADM001</p>
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
              <h2 className="text-2xl font-black mb-6 text-gray-800 dark:text-white">System Activity</h2>
              <div className="space-y-4">
                {systemActivity.map((activity, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                  >
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-white">{activity.action}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{activity.user}</p>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-500">{activity.time}</span>
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
      role="Admin"
      roleIcon={ShieldCheck}
      userName="Admin User"
      menuItems={menuItems}
      activeMenu={activeMenu}
      setActiveMenu={setActiveMenu}
      onLogout={handleLogout}
    >
      {renderContent()}
    </DashboardLayout>
  );
}