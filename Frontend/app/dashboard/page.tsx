"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Calendar, Users, Settings, BarChart } from "lucide-react";
import TabButton from "./TabButton";
import OverviewTab from "./OverviewTab";
import BookingsTab from "./BookingsTab";
import UsersTab from "./UsersTab";
import ReportsTab from "./ReportsTab";
import SettingsTab from "./SettingsTab";

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [bookingsData, setBookingsData] = useState([]);
  const [usersData, setUsersData] = useState([]);

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    // Verify token on backend
    fetch("http://localhost:5000/api/v1/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (res.status === 401) {
          localStorage.removeItem("token");
          router.push("/login");
        } else {
          const data = await res.json();
          setBookingsData(data.bookings || []);
          setUsersData(data.users || []);
        }
      })
      .catch(() => {
        localStorage.removeItem("token");
        router.push("/login");
      })
      .finally(() => setIsLoading(false));
  }, [router]);

  const handleTabChange = useCallback((tabId: string) => setActiveTab(tabId), []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 text-green-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-4 sm:py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <header className="mb-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-green-800">Admin Panel</h1>
          <p className="text-gray-600">Manage bookings, users, and reports</p>
        </header>

        <nav className="mb-6 overflow-x-auto">
          <div className="flex space-x-1 bg-white rounded-lg p-1 min-w-max shadow-sm">
            <TabButton id="overview" label="Overview" icon={BarChart} activeTab={activeTab} onClick={handleTabChange} />
            <TabButton id="bookings" label="Bookings" icon={Calendar} activeTab={activeTab} onClick={handleTabChange} />
            <TabButton id="users" label="Users" icon={Users} activeTab={activeTab} onClick={handleTabChange} />
            <TabButton id="reports" label="Reports" icon={BarChart} activeTab={activeTab} onClick={handleTabChange} />
            <TabButton id="settings" label="Settings" icon={Settings} activeTab={activeTab} onClick={handleTabChange} />
          </div>
        </nav>

        <main>
          {activeTab === "overview" && <OverviewTab bookingsData={bookingsData} usersData={usersData} />}
          {activeTab === "bookings" && (
            <BookingsTab bookingsData={bookingsData} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          )}
          {activeTab === "users" && <UsersTab usersData={usersData} />}
          {activeTab === "reports" && <ReportsTab />}
          {activeTab === "settings" && <SettingsTab />}
        </main>
      </div>
    </div>
  );
}
