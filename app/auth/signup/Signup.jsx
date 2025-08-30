"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
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
    console.log("Signup data:", formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md space-y-5"
      >
        <h2 className="text-2xl font-bold text-center text-purple-600">
          Create an Account
        </h2>

        <div>
          <label className="block mb-1 text-sm font-medium">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Choose a username"
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
              placeholder="Create a password"
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
          Sign Up
        </button>

        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => setIsLoginPageInWidow(true)}
            className="text-purple-600 hover:underline inline cursor-pointer"
          >
            Sign in
          </span>
        </p>
      </form>
    </div>
  );
}
