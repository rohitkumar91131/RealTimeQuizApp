"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { setIsLoginPageInWidow } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login data:", formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md space-y-5"
      >
        <h2 className="text-2xl font-bold text-center text-purple-600">
          Login to QuizRush
        </h2>

        <div>
          <label className="block mb-1 text-sm font-medium">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition"
        >
          Login
        </button>

        <span className="text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <p
            onClick={() => setIsLoginPageInWidow(false)}
            className="text-purple-600 hover:underline inline cursor-pointer"
          >
            Sign up
          </p>
        </span>
      </form>
    </div>
  );
}
