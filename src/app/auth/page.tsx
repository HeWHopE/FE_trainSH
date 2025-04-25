"use client";

import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import { useState } from "react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {isLogin ? "Welcome back" : "Create your account"}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isLogin ? "Sign in to continue" : "Join us today"}
          </p>
        </div>
        <div className="mt-8">
          {isLogin ? <LoginForm /> : <RegisterForm setIsLogin={setIsLogin} />}
        </div>
        <div className="text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-indigo-600 hover:text-indigo-500 font-medium"
          >
            {isLogin
              ? "Need an account? Sign up"
              : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}
