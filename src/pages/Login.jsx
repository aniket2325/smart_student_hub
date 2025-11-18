import React from "react";

export default function Login() {
  return (
    <div className="flex items-center justify-center pt-24 pb-20 bg-transparent">

      <div className="w-full max-w-md p-10 bg-white/70 rounded-2xl shadow-xl backdrop-blur-xl">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">Login</h2>

        <form className="space-y-6">
          <input type="email" placeholder="Email"
                 className="w-full p-3 border rounded-xl" />
          <input type="password" placeholder="Password"
                 className="w-full p-3 border rounded-xl" />

          <button className="w-full p-3 bg-blue-600 text-white rounded-xl font-semibold">
            Login
          </button>
        </form>
      </div>

    </div>
  );
}
