import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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
  Download,
  Eye,
  X,
  MessageSquare,
  Check,
  XCircle,
  Settings, 
} from "lucide-react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import students from "../../data/student";

export default function TeacherDashboard() {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [teacherComment, setTeacherComment] = useState("");
  const navigate = useNavigate();

  const [pendingVerifications, setPendingVerifications] = useState([
    { 
      id: 1,
      student: "Aniket Kumar", 
      achievement: "Hackathon Certificate", 
      date: "Today",
      category: "Competition",
      description: "Smart India Hackathon 2024 - First Place"
    },
    { 
      id: 2,
      student: "Aditya Shankar", 
      achievement: "Project Award", 
      date: "Yesterday",
      category: "Project",
      description: "Best Final Year Project Award"
    },
    { 
      id: 3,
      student: "Akash Gupta", 
      achievement: "Research Paper", 
      date: "2 days ago",
      category: "Research",
      description: "Published in IEEE Conference"
    },
  ]);

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
      value: String(pendingVerifications.length),
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

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  const openReviewModal = (achievement) => {
    setSelectedAchievement(achievement);
    setTeacherComment("");
  };

  const closeModal = () => {
    setSelectedAchievement(null);
    setTeacherComment("");
  };

  const applyDecision = (decision) => {
    if (!selectedAchievement) return;

    // Update the pending verifications list by removing the processed achievement
    setPendingVerifications(prevVerifications => 
      prevVerifications.filter(item => item.id !== selectedAchievement.id)
    );

    // Log the decision (in a real app, this would send to backend)
    console.log({
      achievementId: selectedAchievement.id,
      student: selectedAchievement.student,
      achievement: selectedAchievement.achievement,
      decision: decision,
      comment: teacherComment,
      verifiedBy: "Prof. Teacher",
      timestamp: new Date().toISOString()
    });

    // Show success message
    alert(`Achievement ${decision === 'approved' ? 'approved' : 'rejected'} successfully!`);

    // Close the modal
    closeModal();
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
            {pendingVerifications.length === 0 ? (
              <div className="p-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg text-center">
                <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">All Caught Up!</h3>
                <p className="text-gray-600 dark:text-gray-400">No pending verifications at the moment.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingVerifications.map((item, index) => (
                  <motion.div
                    key={item.id}
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
                          onClick={() => openReviewModal(item)}
                          className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-xl font-semibold flex items-center gap-2"
                          whileHover={{ scale: 1.05 }}
                        >
                          <Eye className="w-4 h-4" />
                          Review
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
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
              {pendingVerifications.length === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-12 h-12 mx-auto mb-3 text-green-500" />
                  <p className="text-gray-600 dark:text-gray-400">No pending verifications</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingVerifications.slice(0, 3).map((item, index) => (
                    <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                      <div>
                        <p className="font-semibold text-gray-800 dark:text-white">{item.achievement}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{item.student}</p>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-500">{item.date}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        );
    }
  };

  return (
    <>
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

      {/* Review Modal */}
      <AnimatePresence>
        {selectedAchievement && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-black text-gray-800 dark:text-white">Review Achievement</h2>
                <button
                  onClick={closeModal}
                  className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6">
                {/* Achievement Details */}
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                      <Trophy className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                        {selectedAchievement.achievement}
                      </h3>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          <span className="font-semibold">Student:</span> {selectedAchievement.student}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          <span className="font-semibold">Category:</span> {selectedAchievement.category}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          <span className="font-semibold">Date:</span> {selectedAchievement.date}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          <span className="font-semibold">Description:</span> {selectedAchievement.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Comment Section */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Add Comment (Optional)
                  </label>
                  <textarea
                    value={teacherComment}
                    onChange={(e) => setTeacherComment(e.target.value)}
                    placeholder="Add your feedback or comments..."
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    rows="4"
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
                <motion.button
                  onClick={() => applyDecision('approved')}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <CheckCircle className="w-5 h-5" />
                  Approve
                </motion.button>
                <motion.button
                  onClick={() => applyDecision('rejected')}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <X className="w-5 h-5" />
                  Reject
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}