"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Reusable ToggleSwitch Component
function ToggleSwitch({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex items-center justify-between cursor-pointer select-none space-x-4">
      <span className="text-gray-800 font-medium">{label}</span>
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only"
          aria-checked={checked}
        />
        <div
          className={`w-12 h-6 rounded-full transition-colors duration-300 ease-in-out ${
            checked ? "bg-green-600" : "bg-gray-300"
          }`}
        />
        <div
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-300 ease-in-out ${
            checked ? "translate-x-6" : "translate-x-0"
          }`}
        />
      </div>
    </label>
  );
}

// PasswordInput with show/hide toggle

function PasswordInput({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <label htmlFor={id} className="block mb-2 font-medium text-gray-900">
        {label}
      </label>
      <div className="relative flex items-center">
        <input
          id={id}
          type={visible ? "text" : "password"}
          value={value}
          onChange={onChange}
          className="w-full border rounded-md px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-green-600"
          autoComplete={
            id === "current-password" ? "current-password" : "new-password"
          }
          required
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute right-2 flex items-center justify-center text-gray-600 hover:text-green-600 focus:outline-none"
          aria-label={visible ? "Hide password" : "Show password"}
          tabIndex={-1}
          style={{ top: "50%", transform: "translateY(-50%)" }}
        >
          {visible ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
    </div>
  );
}

export default function SettingsTab() {
  // Profile info state
  const [name, setName] = useState("Admin User");
  const [email, setEmail] = useState("admin@example.com");
  const [profileUpdated, setProfileUpdated] = useState(false);

  // Password change state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordChanged, setPasswordChanged] = useState(false);

  // Preferences toggles
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);

  const { toast } = useToast();

  // Handle profile form submit
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    console.log("Profile Data Submitted:", { name, email });

    toast({
      title: "Success",
      description: "Profile updated successfully!",
      variant: "default",
      duration: 3000,
    });
  };

  // Handle password form submit
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "Validation Error",
        description: "New password and confirmation do not match.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    console.log("Password Change Data Submitted:", {
      currentPassword,
      newPassword,
      confirmPassword,
    });

    toast({
      title: "Success",
      description: "Password changed successfully!",
      variant: "default",
      duration: 3000,
    });

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="max-w-3xl w-full shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Admin Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-12 px-6 py-8">
          {/* Profile Section */}
          <section>
            <h2 className="text-xl font-semibold mb-6 text-gray-900">
              Profile Information
            </h2>
            <form
              onSubmit={handleProfileSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl"
            >
              <div>
                <label htmlFor="name" className="block mb-2 font-medium">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                  required
                  autoComplete="name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                  required
                  autoComplete="email"
                />
              </div>
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
                  disabled={!name || !email}
                >
                  Update Profile
                </button>
                {profileUpdated && (
                  <p className="mt-3 text-green-700 font-semibold">
                    Profile updated successfully!
                  </p>
                )}
              </div>
            </form>
          </section>

          {/* Password Section */}
          <section>
            <h2 className="text-xl font-semibold mb-6 text-gray-900">
              Change Password
            </h2>
            <form
              onSubmit={handlePasswordSubmit}
              className="max-w-2xl space-y-6"
              noValidate
            >
              <PasswordInput
                id="current-password"
                label="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <PasswordInput
                id="new-password"
                label="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <PasswordInput
                id="confirm-password"
                label="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              {passwordError && (
                <p className="text-red-600 font-semibold">{passwordError}</p>
              )}

              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
                disabled={!currentPassword || !newPassword || !confirmPassword}
              >
                Change Password
              </button>
              {passwordChanged && (
                <p className="mt-3 text-green-700 font-semibold">
                  Password changed successfully!
                </p>
              )}
            </form>
          </section>

          {/* Preferences Section */}
          <section>
            <h2 className="text-xl font-semibold mb-6 text-gray-900">
              Preferences
            </h2>
            <div className="max-w-md space-y-6">
              <ToggleSwitch
                label="Email Notifications"
                checked={emailNotifications}
                onChange={() => setEmailNotifications((prev) => !prev)}
              />
              <ToggleSwitch
                label="SMS Notifications"
                checked={smsNotifications}
                onChange={() => setSmsNotifications((prev) => !prev)}
              />
            </div>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
