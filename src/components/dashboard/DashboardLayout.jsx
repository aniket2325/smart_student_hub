import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, Bell, Settings, X, AlertCircle, CheckCircle, Info } from "lucide-react";

export default function DashboardLayout({
  role,
  roleIcon: RoleIcon,
  userName,
  menuItems,
  activeMenu,
  setActiveMenu,
  onLogout,
  children,
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const notifications = [
    { id: 1, title: "New Update", message: "System updated successfully", type: "success", time: "5 min ago" },
    { id: 2, title: "Reminder", message: "Don't forget to check reports", type: "info", time: "1 hour ago" },
    { id: 3, title: "Alert", message: "Pending verification tasks", type: "warning", time: "2 hours ago" },
  ];

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
              <RoleIcon className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {role} Portal
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">Smart Hub</p>
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

          <motion.button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all mt-8 font-medium"
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </motion.button>
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

      {/* Main Content */}
      <div className="ml-72 flex-1">
        {/* Top Bar */}
        <motion.header
          className="bg-white dark:bg-gray-800 shadow-md px-8 py-5 flex items-center justify-between sticky top-0 z-10 border-b border-gray-200 dark:border-gray-700"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h1 className="text-3xl font-black text-gray-800 dark:text-white">
              {menuItems.find((m) => m.id === activeMenu)?.label || "Dashboard"}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Welcome back, <span className="font-semibold text-blue-600">{userName}</span>
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Notifications */}
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
                <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center font-bold">
                  3
                </span>
              </motion.button>

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
                      <button onClick={() => setShowNotifications(false)}>
                        <X className="w-5 h-5 text-gray-500" />
                      </button>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notif) => (
                        <div key={notif.id} className="p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                          <div className="flex items-start gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              notif.type === "success" ? "bg-green-100 dark:bg-green-900/30" :
                              notif.type === "warning" ? "bg-yellow-100 dark:bg-yellow-900/30" :
                              "bg-blue-100 dark:bg-blue-900/30"
                            }`}>
                              {notif.type === "success" && <CheckCircle className="w-5 h-5 text-green-600" />}
                              {notif.type === "warning" && <AlertCircle className="w-5 h-5 text-yellow-600" />}
                              {notif.type === "info" && <Info className="w-5 h-5 text-blue-600" />}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-800 dark:text-white">{notif.title}</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{notif.message}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{notif.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Settings */}
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

            {/* Avatar */}
            <motion.div
              className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg cursor-pointer shadow-lg"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              {userName.split(" ").map((n) => n[0]).join("")}
            </motion.div>
          </div>
        </motion.header>

        {/* Content Area */}
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
}