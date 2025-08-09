"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Loader2, Calendar, Users, Settings, BarChart } from "lucide-react";
import TabButton from "./TabButton";
import OverviewTab from "./OverviewTab";
import BookingsTab from "./BookingsTab";
import UsersTab from "./UsersTab";
import ReportsTab from "./ReportsTab";
import SettingsTab from "./SettingsTab";
import bookingsData from "./data/bookingsData";
import usersData from "./data/usersData";


export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleTabChange = useCallback((tabId: string) => setActiveTab(tabId), []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" role="status" aria-label="Loading">
        <Loader2 className="h-12 w-12 text-green-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-4 sm:py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <header className="mb-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-green-800">Admin Panel</h1>
          <p className="text-gray-600">Manage bookings, users, and reports</p>
        </header>

        {/* Tabs */}
        <nav role="tablist" aria-label="Admin Panel Tabs" className="mb-6 overflow-x-auto">
          <div className="flex space-x-1 bg-white rounded-lg p-1 min-w-max shadow-sm">
            <TabButton id="overview" label="Overview" icon={BarChart} activeTab={activeTab} onClick={handleTabChange} />
            <TabButton id="bookings" label="Bookings" icon={Calendar} activeTab={activeTab} onClick={handleTabChange} />
            <TabButton id="users" label="Users" icon={Users} activeTab={activeTab} onClick={handleTabChange} />
            <TabButton id="reports" label="Reports" icon={BarChart} activeTab={activeTab} onClick={handleTabChange} />
            <TabButton id="settings" label="Settings" icon={Settings} activeTab={activeTab} onClick={handleTabChange} />
          </div>
        </nav>

        {/* Tab Content */}
        <main role="tabpanel" aria-live="polite" aria-atomic="true">
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
