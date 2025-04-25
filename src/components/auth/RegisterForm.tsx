"use client";

import { signUp } from "@/api/auth-api";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-toastify";
import Button from "../button/button";

export default function RegisterForm({
  setIsLogin,
}: {
  setIsLogin: Dispatch<SetStateAction<boolean>>;
}) {
  const [email, setEmail] = useState("");
  const [name, setname] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.warn("Passwords do not match");
      return;
    }
    try {
      setIsLoading(true);
      const response = await signUp({
        email: email,
        password: password,
        name: name,
      });

      if (response) {
        setIsLoading(false);
        toast.success("Account sucessfullly created");
        setIsLogin(true);
      }
    } catch (error) {
      console.error("Error registering user:", error);
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-8 rounded-xl shadow-lg"
    >
      <div className="space-y-2">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          name
        </label>
        <input
          type="text"
          id="text"
          value={name}
          onChange={(e) => setname(e.target.value)}
          className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition duration-200"
          placeholder="Enter your name"
          required
        />
      </div>
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition duration-200"
          placeholder="Enter your email"
          required
        />
      </div>
      <div className="space-y-2">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition duration-200"
          placeholder="Create a password"
          required
        />
      </div>
      <div className="space-y-2">
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-700"
        >
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition duration-200"
          placeholder="Confirm your password"
          required
        />
      </div>
      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-gray-600 text-sm">
          By registering, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
      <Button type="submit" isLoading={isLoading}>
        Create Account
      </Button>
    </form>
  );
}
