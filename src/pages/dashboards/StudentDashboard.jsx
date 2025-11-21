import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import {
  Home,
  Calendar,
  Trophy,
  FileText,
  User,
  Settings, 
  GraduationCap,
  TrendingUp,
  Upload,
  BarChart3,
  CheckCircle2,
  Download,
  Share2,
  Eye,
  Clock,
  XCircle,
  AlertCircle,
  FileDown,
} from "lucide-react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";

export default function StudentDashboard() {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [achievementTab, setAchievementTab] = useState("all");
  const navigate = useNavigate();

  const [achievements, setAchievements] = useState([
    {
      id: 1,
      title: "Hackathon Winner - Smart India Hackathon",
      date: "2024-03-15",
      status: "approved",
      category: "Competition",
      teacherComment: "Excellent work! Very impressive project.",
      verifiedBy: "Dr. Sharma",
    },
    {
      id: 2,
      title: "Research Paper Published - IEEE Conference",
      date: "2024-03-10",
      status: "approved",
      category: "Research",
      teacherComment: "Great contribution to the field.",
      verifiedBy: "Prof. Gupta",
    },
    {
      id: 3,
      title: "Web Development Certificate - Coursera",
      date: "2024-03-05",
      status: "pending",
      category: "Course",
      teacherComment: null,
      verifiedBy: null,
    },
    {
      id: 4,
      title: "Coding Competition - HackerRank",
      date: "2024-02-28",
      status: "rejected",
      category: "Competition",
      teacherComment: "Certificate quality is not clear. Please reupload.",
      verifiedBy: "Dr. Kumar",
    },
    {
      id: 5,
      title: "Machine Learning Workshop Participation",
      date: "2024-02-20",
      status: "pending",
      category: "Workshop",
      teacherComment: null,
      verifiedBy: null,
    },
  ]);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "attendance", label: "My Attendance", icon: Calendar },
    { id: "achievements", label: "Achievements", icon: Trophy },
    { id: "reports", label: "Reports", icon: FileText },
    { id: "settings", label: "Settings", icon: Settings },
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
      label: "Approved",
      value: String(achievements.filter((a) => a.status === "approved").length),
      icon: CheckCircle2,
      color: "from-green-500 to-emerald-500",
      change: "+2",
    },
    {
      label: "Pending",
      value: String(achievements.filter((a) => a.status === "pending").length),
      icon: Clock,
      color: "from-yellow-500 to-orange-500",
      change: "0",
    },
    {
      label: "Overall Grade",
      value: "A",
      icon: TrendingUp,
      color: "from-purple-500 to-pink-500",
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

  const handleExportPortfolio = () => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 2000)),
      {
        loading: "Generating your portfolio PDF...",
        success: "Portfolio exported successfully!",
        error: "Failed to export portfolio",
      }
    );

    setTimeout(() => {
      const approvedAchievements = achievements.filter((a) => a.status === "approved");
      const content = `
        STUDENT PORTFOLIO
        ==================
        Name: Aniket Kumar
        Roll: 2402220100060
        Class: B.Tech CSE - 2nd Year
        
        ACHIEVEMENTS (${approvedAchievements.length} Approved)
        ==================
        ${approvedAchievements
          .map(
            (a, i) =>
              `${i + 1}. ${a.title}
           Date: ${a.date}
           Category: ${a.category}
           Verified by: ${a.verifiedBy}
           Comment: ${a.teacherComment}`
          )
          .join("\n\n")}
      `;

      const blob = new Blob([content], { type: "text/plain" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `portfolio_aniket_kumar_${new Date().toISOString().split("T")[0]}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 2000);
  };

  const getStatusBadge = (status) => {
    const badges = {
      approved: {
        bg: "bg-green-100 dark:bg-green-900/30",
        text: "text-green-700 dark:text-green-400",
        icon: CheckCircle2,
        label: "Approved",
      },
      pending: {
        bg: "bg-yellow-100 dark:bg-yellow-900/30",
        text: "text-yellow-700 dark:text-yellow-400",
        icon: Clock,
        label: "Pending",
      },
      rejected: {
        bg: "bg-red-100 dark:bg-red-900/30",
        text: "text-red-700 dark:text-red-400",
        icon: XCircle,
        label: "Rejected",
      },
    };

    const badge = badges[status];
    const Icon = badge.icon;

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${badge.bg} ${badge.text}`}>
        <Icon className="w-3 h-3" />
        {badge.label}
      </span>
    );
  };

  const filteredAchievements =
    achievementTab === "all"
      ? achievements
      : achievements.filter((a) => a.status === achievementTab);

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
                onClick={() => toast.success("Upload feature coming soon!")}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Upload className="w-5 h-5" />
                Upload New
              </motion.button>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 flex-wrap">
              {[
                { id: "all", label: "All", count: achievements.length },
                { id: "approved", label: "Approved", count: achievements.filter((a) => a.status === "approved").length },
                { id: "pending", label: "Pending", count: achievements.filter((a) => a.status === "pending").length },
                { id: "rejected", label: "Rejected", count: achievements.filter((a) => a.status === "rejected").length },
              ].map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setAchievementTab(tab.id)}
                  className={`px-6 py-2.5 rounded-xl font-semibold transition-all ${
                    achievementTab === tab.id
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tab.label} ({tab.count})
                </motion.button>
              ))}
            </div>

            {/* Achievements Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {filteredAchievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
                        <Trophy className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-1">
                          {achievement.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{achievement.category}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-500">{achievement.date}</p>
                      </div>
                    </div>
                    {getStatusBadge(achievement.status)}
                  </div>

                  {achievement.teacherComment && (
                    <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-l-4 border-blue-500">
                      <p className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-1">
                        Teacher Comment:
                      </p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{achievement.teacherComment}</p>
                      {achievement.verifiedBy && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                          - {achievement.verifiedBy}
                        </p>
                      )}
                    </div>
                  )}

                  <div className="flex items-center gap-2 mt-4">
                    <motion.button
                      onClick={() => toast.success("Viewing achievement details")}
                      className="flex-1 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-xl font-semibold flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </motion.button>
                    {achievement.status === "approved" && (
                      <motion.button
                        onClick={() => toast.success("Downloaded achievement certificate")}
                        className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-xl font-semibold"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Download className="w-4 h-4" />
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredAchievements.length === 0 && (
              <div className="text-center py-12">
                <AlertCircle className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600 dark:text-gray-400">No achievements in this category</p>
              </div>
            )}
          </div>
        );
      case "reports":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-black text-gray-800 dark:text-white">My Reports</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center">
                    <FileDown className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-gray-800 dark:text-white">Portfolio Export</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">All approved achievements</p>
                  </div>
                </div>
                <motion.button
                  onClick={handleExportPortfolio}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Download className="w-5 h-5" />
                  Export Portfolio PDF
                </motion.button>
              </motion.div>

              <motion.div
                className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                    <Share2 className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-gray-800 dark:text-white">Share Portfolio</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Get shareable link</p>
                  </div>
                </div>
                <motion.button
                  onClick={() => {
                    navigator.clipboard.writeText("https://smartstudenthub.com/portfolio/aniket-kumar");
                    toast.success("Portfolio link copied to clipboard!");
                  }}
                  className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Share2 className="w-5 h-5" />
                  Copy Portfolio Link
                </motion.button>
              </motion.div>
            </div>

            <div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Achievement Summary</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                  <p className="text-3xl font-black text-green-600">{achievements.filter((a) => a.status === "approved").length}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Approved</p>
                </div>
                <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
                  <p className="text-3xl font-black text-yellow-600">{achievements.filter((a) => a.status === "pending").length}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Pending</p>
                </div>
                <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
                  <p className="text-3xl font-black text-red-600">{achievements.filter((a) => a.status === "rejected").length}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Rejected</p>
                </div>
              </div>
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
    <>
      <Toaster position="top-right" />
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
    </>
  );
}