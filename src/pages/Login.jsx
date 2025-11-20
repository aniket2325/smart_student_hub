 import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, GraduationCap, Users, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";
import FloatingShapes from "../components/common/FloatingShapes";

export default function Login() {
  const [selectedRole, setSelectedRole] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const roles = [
    {
      id: "student",
      name: "Student",
      icon: GraduationCap,
      color: "from-blue-500 to-cyan-500",
      description: "Access your portfolio and achievements",
    },
    {
      id: "teacher",
      name: "Teacher",
      icon: Users,
      color: "from-purple-500 to-pink-500",
      description: "Verify students and manage attendance",
    },
    {
      id: "admin",
      name: "Admin",
      icon: ShieldCheck,
      color: "from-green-500 to-emerald-500",
      description: "Full system access and management",
    },
  ];

  const handleLogin = (e) => {
    e.preventDefault();

    if (!selectedRole) {
      alert("Please select your role first!");
      return;
    }

    if (!formData.email || !formData.password) {
      alert("Please fill in all fields");
      return;
    }

    // Demo credentials validation
    const demoCredentials = {
      student: { email: "student@its.edu.in", password: "student123" },
      teacher: { email: "teacher@its.edu.in", password: "teacher123" },
      admin: { email: "admin@its.edu.in", password: "admin123" },
    };

    const validCredentials = demoCredentials[selectedRole];

    if (
      formData.email === validCredentials.email &&
      formData.password === validCredentials.password
    ) {
      // Store role in localStorage
      localStorage.setItem("userRole", selectedRole);
      localStorage.setItem("isAuthenticated", "true");

      // Navigate to role-specific dashboard
      navigate(`/dashboard/${selectedRole}`);
    } else {
      alert(`Invalid credentials! Demo ${selectedRole} login:\nEmail: ${validCredentials.email}\nPassword: ${validCredentials.password}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-4 relative">
      <FloatingShapes />

      <motion.div
        className="w-full max-w-4xl relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-center mb-8">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm">
              SECURE LOGIN
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-6xl font-black mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Welcome Back
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Sign in to access your dashboard
          </p>
        </div>

        {/* Role Selection */}
        {!selectedRole ? (
          <div className="grid md:grid-cols-3 gap-6">
            {roles.map((role, index) => (
              <motion.button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className="group relative p-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all border-2 border-transparent hover:border-gray-200 dark:hover:border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${role.color} flex items-center justify-center shadow-lg`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <role.icon className="w-10 h-10 text-white" />
                </motion.div>

                <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-white">
                  {role.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {role.description}
                </p>

                <div className="flex items-center justify-center gap-2 text-blue-600 dark:text-blue-400 font-semibold group-hover:gap-3 transition-all">
                  <span>Select Role</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </motion.button>
            ))}
          </div>
        ) : (
          /* Login Form */
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-md mx-auto"
            >
              <div className="p-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-2xl">
                {/* Selected Role Display */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${
                        roles.find((r) => r.id === selectedRole)?.color
                      } flex items-center justify-center shadow-lg`}
                    >
                      {React.createElement(
                        roles.find((r) => r.id === selectedRole)?.icon,
                        { className: "w-7 h-7 text-white" }
                      )}
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-gray-800 dark:text-white">
                        {roles.find((r) => r.id === selectedRole)?.name} Login
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Sign in to continue
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedRole(null);
                      setFormData({ email: "", password: "" });
                    }}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                  >
                    Change Role
                  </button>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-5 py-4 rounded-xl bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 outline-none transition-all text-gray-900 dark:text-white"
                      placeholder={`${selectedRole}@its.edu.in`}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        className="w-full px-5 py-4 rounded-xl bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 outline-none transition-all text-gray-900 dark:text-white pr-12"
                        placeholder="••••••••"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    className={`w-full px-6 py-4 bg-gradient-to-r ${
                      roles.find((r) => r.id === selectedRole)?.color
                    } text-white rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Sign In <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </form>

                {/* Demo Credentials Info */}
                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                  <p className="text-xs font-semibold text-blue-800 dark:text-blue-300 mb-2">
                    Demo Credentials:
                  </p>
                  <p className="text-xs text-blue-700 dark:text-blue-400">
                    Email: {selectedRole}@its.edu.in
                    <br />
                    Password: {selectedRole}123
                  </p>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Don't have an account?{" "}
                    <button
                      onClick={() => navigate("/signup")}
                      className="text-blue-600 dark:text-blue-400 font-bold hover:underline"
                    >
                      Sign Up
                    </button>
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </motion.div>
    </div>
  );
}