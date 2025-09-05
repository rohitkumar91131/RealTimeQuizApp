"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const { setIsLoginPageInWidow } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        "credentials" : "include"
      });

      const data = await res.json();

      if (data.success) {
        toast.success(data.message);
        setIsLoginPageInWidow(true);
      } else {
        toast.error(data.message || "Signup failed!");
      }
      
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
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
            required
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
              required
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
          disabled={loading}
          className="w-full py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
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
