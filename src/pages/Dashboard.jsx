// Dashboard.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Calendar,
  Trophy,
  FileText,
  User,
  LogOut,
  Bell,
  Settings,
  Users,
  TrendingUp,
  GraduationCap,
  Download,
  Clock,
  CheckCircle2,
  Share2,
  X,
  AlertCircle,
  CheckCircle,
  Info,
  Award,
  BarChart3,
  Target,
  Percent,
  BookOpen,
  ClipboardCheck,
  Edit,
  Trash2,
  Eye,
  Plus,
  Shield,
} from "lucide-react";
import students from "../data/student";

export default function Dashboard() {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: "New Achievement Uploaded", message: "Aniket Kumar uploaded a certificate", type: "success", time: "5 min ago", read: false },
    { id: 2, title: "Attendance Alert", message: "Monthly attendance report is ready", type: "info", time: "1 hour ago", read: false },
    { id: 3, title: "Verification Pending", message: "3 achievements waiting for verification", type: "warning", time: "2 hours ago", read: true },
    { id: 4, title: "Report Generated", message: "Q1 performance report is available", type: "success", time: "1 day ago", read: true },
  ]);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "attendance", label: "Attendance", icon: Calendar },
    { id: "achievements", label: "Achievements", icon: Trophy },
    { id: "reports", label: "Reports", icon: FileText },
    { id: "profile", label: "Profile", icon: User },
  ];

  const stats = [
    { label: "Total Students", value: String(students.length), icon: Users, color: "from-blue-500 to-cyan-500", change: "+12%" },
    { label: "Avg Attendance", value: computeAvgAttendance(students) + "%", icon: TrendingUp, color: "from-green-500 to-emerald-500", change: "+5.2%" },
    { label: "Achievements", value: "12", icon: Trophy, color: "from-purple-500 to-pink-500", change: "+8" },
    { label: "Reports", value: "8", icon: FileText, color: "from-orange-500 to-red-500", change: "+3" },
  ];

  const recentActivities = [
    { text: "Aniket Kumar uploaded new achievement certificate", time: "2 hours ago", icon: Trophy },
    { text: "Monthly attendance report generated successfully", time: "5 hours ago", icon: FileText },
    { text: "Aditya Shankar verified hackathon certificate", time: "1 day ago", icon: CheckCircle2 },
    { text: "Akash Gupta shared portfolio with recruiters", time: "2 days ago", icon: Share2 },
  ];

  // Export functionality (CSV)
  const handleExport = () => {
    const csvContent = [
      ["Roll No", "Name", "Class", "Year", "Attendance", "Email", "Phone"],
      ...students.map(s => [
        s.roll,
        s.name,
        s.class,
        s.year || "",
        `${s.attendance}%`,
        s.email || "",
        s.phone || ""
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `student-data-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  // Notification helpers
  const markAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const clearAllNotifications = () => setNotifications([]);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Render content area based on active menu
  const renderContent = () => {
    switch (activeMenu) {
      case "attendance":
        return <AttendanceView students={students} />;
      case "achievements":
        return <AchievementsView />;
      case "reports":
        return <ReportsView handleExport={handleExport} />;
      case "profile":
        return <ProfileView />;
      default:
        return (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                      <stat.icon className="w-7 h-7 text-white" />
                    </div>
                    <span className="text-green-600 dark:text-green-400 text-sm font-bold">{stat.change}</span>
                  </div>
                  <h3 className="text-4xl font-black text-gray-800 dark:text-white mb-1">{stat.value}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Students Table */}
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8 border border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black text-gray-800 dark:text-white">Student Overview</h2>
                <motion.button
                  onClick={handleExport}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold flex items-center gap-2 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download className="w-4 h-4" />
                  Export CSV
                </motion.button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                      <th className="text-left py-4 px-4 text-gray-600 dark:text-gray-400 font-bold">Roll No</th>
                      <th className="text-left py-4 px-4 text-gray-600 dark:text-gray-400 font-bold">Name</th>
                      <th className="text-left py-4 px-4 text-gray-600 dark:text-gray-400 font-bold">Class</th>
                      <th className="text-left py-4 px-4 text-gray-600 dark:text-gray-400 font-bold">Attendance</th>
                      <th className="text-left py-4 px-4 text-gray-600 dark:text-gray-400 font-bold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student, index) => (
                      <motion.tr
                        key={student.roll}
                        className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.05 }}
                      >
                        <td className="py-4 px-4">
                          <span className="font-bold text-gray-800 dark:text-white">{student.roll}</span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg">
                              {student.name.split(" ").map((n) => n[0]).join("")}
                            </div>
                            <span className="font-bold text-gray-800 dark:text-white">{student.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-gray-600 dark:text-gray-400 font-medium">{student.class}</td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <motion.div
                                className={`h-full ${student.attendance >= 90 ? "bg-gradient-to-r from-green-500 to-emerald-500" : "bg-gradient-to-r from-yellow-500 to-orange-500"}`}
                                initial={{ width: 0 }}
                                animate={{ width: `${student.attendance}%` }}
                                transition={{ delay: 0.5 + index * 0.05, duration: 1 }}
                              />
                            </div>
                            <span className="font-bold text-gray-800 dark:text-white min-w-[50px] text-right">
                              {student.attendance}%
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`px-4 py-2 rounded-xl text-sm font-bold ${
                              student.attendance >= 90
                                ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                                : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
                            }`}
                          >
                            {student.attendance >= 90 ? "Excellent" : "Good"}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <h2 className="text-2xl font-black mb-6 text-gray-800 dark:text-white">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all cursor-pointer border border-transparent hover:border-gray-200 dark:hover:border-gray-600"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.05 }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                      <activity.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-800 dark:text-white font-semibold mb-1">{activity.text}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {activity.time}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <motion.aside
        className="w-72 bg-white dark:bg-gray-800 shadow-2xl fixed h-full z-20 border-r border-gray-200 dark:border-gray-700"
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Smart Hub
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">Student Portal</p>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => setActiveMenu(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                activeMenu === item.id
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </motion.button>
          ))}

          <Link to="/">
            <motion.button
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all mt-8 font-medium"
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </motion.button>
          </Link>
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <div className="p-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl text-white">
            <p className="text-sm font-semibold mb-1">Need Help?</p>
            <p className="text-xs opacity-90 mb-3">Contact support anytime</p>
            <button className="text-xs bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-lg hover:bg-white/30 transition-colors font-medium w-full">
              Get Support
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <div className="ml-72 flex-1">
        {/* Top Navigation Bar */}
        <motion.header
          className="bg-white dark:bg-gray-800 shadow-md px-8 py-5 flex items-center justify-between sticky top-0 z-10 border-b border-gray-200 dark:border-gray-700"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h1 className="text-3xl font-black text-gray-800 dark:text-white">
              {menuItems.find(m => m.id === activeMenu)?.label || "Dashboard"}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Welcome back, <span className="font-semibold text-blue-600">Aniket Kumar</span>
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Notification Bell */}
            <div className="relative">
              <motion.button
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowSettings(false);
                }}
                className="p-3 rounded-xl bg-gray-100 dark:bg-gray-700 relative"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Bell className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center font-bold">
                    {unreadCount}
                  </span>
                )}
              </motion.button>

              {/* Notifications Dropdown */}
              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-96 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
                  >
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                      <h3 className="font-bold text-lg text-gray-800 dark:text-white">Notifications</h3>
                      <button
                        onClick={clearAllNotifications}
                        className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        Clear All
                      </button>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                          <Bell className="w-12 h-12 mx-auto mb-2 opacity-50" />
                          <p>No notifications</p>
                        </div>
                      ) : (
                        notifications.map((notif) => (
                          <motion.div
                            key={notif.id}
                            onClick={() => markAsRead(notif.id)}
                            className={`p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors ${
                              !notif.read ? "bg-blue-50 dark:bg-blue-900/10" : ""
                            }`}
                            whileHover={{ x: 5 }}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                notif.type === "success" ? "bg-green-100 dark:bg-green-900/30" :
                                notif.type === "warning" ? "bg-yellow-100 dark:bg-yellow-900/30" :
                                "bg-blue-100 dark:bg-blue-900/30"
                              }`}>
                                {notif.type === "success" && <CheckCircle className="w-5 h-5 text-green-600" />}
                                {notif.type === "warning" && <AlertCircle className="w-5 h-5 text-yellow-600" />}
                                {notif.type === "info" && <Info className="w-5 h-5 text-blue-600" />}
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold text-gray-800 dark:text-white mb-1">{notif.title}</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{notif.message}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-500">{notif.time}</p>
                              </div>
                              {!notif.read && (
                                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                              )}
                            </div>
                          </motion.div>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Settings Button */}
            <div className="relative">
              <motion.button
                onClick={() => {
                  setShowSettings(!showSettings);
                  setShowNotifications(false);
                }}
                className="p-3 rounded-xl bg-gray-100 dark:bg-gray-700"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <Settings className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </motion.button>

              {/* Settings Dropdown */}
              <AnimatePresence>
                {showSettings && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
                  >
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="font-bold text-lg text-gray-800 dark:text-white">Settings</h3>
                    </div>
                    <div className="p-2">
                      {[
                        { icon: User, label: "Account Settings", action: () => setActiveMenu("profile") },
                        { icon: Bell, label: "Notifications", action: () => { setShowNotifications(true); setShowSettings(false); } },
                        { icon: Shield, label: "Privacy & Security", action: () => alert("Privacy settings") },
                        { icon: BookOpen, label: "Help & Support", action: () => alert("Open support") },
                        { icon: Info, label: "About", action: () => alert("Smart Hub v1.0") },
                      ].map((item, index) => (
                        <motion.button
                          key={index}
                          onClick={() => {
                            if (item.action) item.action();
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
                          whileHover={{ x: 5 }}
                        >
                          <item.icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                          <span className="text-gray-800 dark:text-white font-medium">{item.label}</span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User Avatar */}
            <motion.div
              className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg cursor-pointer shadow-lg"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              AK
            </motion.div>
          </div>
        </motion.header>

        {/* Dashboard Content */}
        <div className="p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

/* --------------------------
   Subcomponents (same file)
   -------------------------- */

// Attendance View Component
const AttendanceView = ({ students }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <Calendar className="w-12 h-12 text-blue-600" />
            <span className="text-2xl font-black text-gray-800 dark:text-white">Today</span>
          </div>
          <p className="text-gray-600 dark:text-gray-400">Present: {students.length}/{students.length}</p>
          <div className="mt-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full w-full bg-gradient-to-r from-green-500 to-emerald-500"></div>
          </div>
        </div>

        <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <Target className="w-12 h-12 text-purple-600" />
            <span className="text-2xl font-black text-gray-800 dark:text-white">This Week</span>
          </div>
          <p className="text-gray-600 dark:text-gray-400">Avg: {computeAvgAttendance(students)}%</p>
          <div className="mt-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full" style={{ width: `${computeAvgAttendance(students)}%` }}>
              <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 w-full" />
            </div>
          </div>
        </div>

        <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <BarChart3 className="w-12 h-12 text-orange-600" />
            <span className="text-2xl font-black text-gray-800 dark:text-white">This Month</span>
          </div>
          <p className="text-gray-600 dark:text-gray-400">Avg: {computeAvgAttendance(students)}%</p>
          <div className="mt-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full" style={{ width: `${computeAvgAttendance(students)}%` }}>
              <div className="h-full bg-gradient-to-r from-orange-500 to-red-500 w-full" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h3 className="text-2xl font-black mb-6 text-gray-800 dark:text-white">Attendance Details</h3>
        <div className="space-y-4">
          {students.map((student, index) => (
            <motion.div
              key={student.roll}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold">
                  {student.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 dark:text-white">{student.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Roll: {student.roll}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-bold text-gray-800 dark:text-white">{student.attendance}%</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Attendance</p>
                </div>
                <div className={`px-4 py-2 rounded-xl font-semibold ${
                  student.attendance >= 90
                    ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                    : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
                }`}>
                  {student.attendance >= 90 ? "Excellent" : "Good"}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Achievements View Component
const AchievementsView = () => {
  const achievements = [
    { id: 1, title: "Hackathon Winner", student: "Aniket Kumar", date: "2024-03-15", status: "Verified", icon: Trophy },
    { id: 2, title: "Best Project Award", student: "Aditya Shankar", date: "2024-03-10", status: "Pending", icon: Award },
    { id: 3, title: "Coding Competition - 1st Place", student: "Akash Gupta", date: "2024-03-05", status: "Verified", icon: Trophy },
    { id: 4, title: "Research Paper Published", student: "Aniket Kumar", date: "2024-02-28", status: "Verified", icon: BookOpen },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-black text-gray-800 dark:text-white mb-2">Achievements</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage and verify student achievements</p>
        </div>
        <motion.button
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold flex items-center gap-2 shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus className="w-5 h-5" />
          Add New Achievement
        </motion.button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all"
            whileHover={{ y: -5 }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
                  <achievement.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-1">{achievement.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{achievement.student}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{achievement.date}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                achievement.status === "Verified"
                  ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                  : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
              }`}>
                {achievement.status}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <motion.button
                className="flex-1 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-xl font-semibold flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Eye className="w-4 h-4" />
                View
              </motion.button>
              <motion.button
                className="flex-1 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-xl font-semibold flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Edit className="w-4 h-4" />
                Edit
              </motion.button>
              <motion.button
                className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-xl font-semibold"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Trash2 className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Reports View Component
const ReportsView = ({ handleExport }) => {
  const reports = [
    { id: 1, title: "Monthly Attendance Report", date: "March 2024", type: "Attendance", icon: Calendar },
    { id: 2, title: "Achievement Summary", date: "Q1 2024", type: "Achievements", icon: Trophy },
    { id: 3, title: "Student Performance Report", date: "March 2024", type: "Performance", icon: BarChart3 },
    { id: 4, title: "Overall Statistics", date: "2024", type: "Statistics", icon: TrendingUp },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-black text-gray-800 dark:text-white mb-2">Reports</h2>
          <p className="text-gray-600 dark:text-gray-400">Generate and download reports</p>
        </div>
        <motion.button
          onClick={handleExport}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold flex items-center gap-2 shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Download className="w-5 h-5" />
          Export All Data
        </motion.button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {reports.map((report, index) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all"
            whileHover={{ y: -5 }}
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
                <report.icon className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-1">{report.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{report.date}</p>
                <span className="inline-block mt-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-xs font-semibold">
                  {report.type}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                onClick={handleExport}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download className="w-4 h-4" />
                Download
              </motion.button>
              <motion.button
                className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-xl font-semibold flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Eye className="w-4 h-4" />
                Preview
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Profile View Component
const ProfileView = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <div className="flex items-start gap-6 mb-8">
          <motion.div
            className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg"
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            AK
          </motion.div>
          <div className="flex-1">
            <h2 className="text-3xl font-black text-gray-800 dark:text-white mb-2">Aniket Kumar</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-1">B.Tech Computer Science Engineering</p>
            <p className="text-sm text-gray-500 dark:text-gray-500">Roll No: 2402220100060 | 2nd Year</p>
            <div className="flex items-center gap-2 mt-4">
              <span className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-xl font-semibold text-sm">
                Active Student
              </span>
              <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-xl font-semibold text-sm">
                92% Attendance
              </span>
            </div>
          </div>
          <motion.button
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold flex items-center gap-2 shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Edit className="w-5 h-5" />
            Edit Profile
          </motion.button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Personal Information</h3>
            <div className="space-y-3">
              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Email</p>
                <p className="font-semibold text-gray-800 dark:text-white">aniketak_cse24@its.edu.in</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Phone</p>
                <p className="font-semibold text-gray-800 dark:text-white">+91 9135024982</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Date of Birth</p>
                <p className="font-semibold text-gray-800 dark:text-white">23 July 2006</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Academic Details</h3>
            <div className="space-y-3">
              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Current CGPA</p>
                <p className="font-semibold text-gray-800 dark:text-white">9 / 10.0</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Semester</p>
                <p className="font-semibold text-gray-800 dark:text-white">2nd Semester</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Admission Year</p>
                <p className="font-semibold text-gray-800 dark:text-white">2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* --------------------------
   Utility functions
   -------------------------- */
function computeAvgAttendance(studentsList) {
  if (!studentsList || studentsList.length === 0) return 0;
  const total = studentsList.reduce((sum, s) => sum + Number(s.attendance || 0), 0);
  return Math.round((total / studentsList.length) * 10) / 10; // one decimal
}
