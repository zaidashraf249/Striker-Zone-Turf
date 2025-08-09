"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Calendar, BarChart, Filter, Loader2, X } from "lucide-react";

function isValidDateRange(start: string, end: string) {
  if (!start || !end) return false;
  return new Date(start) <= new Date(end);
}

// Format date like "Aug 8, 2025"
function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateStr).toLocaleDateString(undefined, options);
}

export default function ReportsTab() {
  const { toast } = useToast();

  const [reportType, setReportType] = useState("sales");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null); // Clear errors on input change
  }, [reportType, startDate, endDate]);

  const handleReset = () => {
    setReportType("sales");
    setStartDate("");
    setEndDate("");
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!startDate || !endDate) {
      setError("Please select both start and end dates.");
      toast({
        title: "Validation Error",
        description: "Please select both start and end dates.",
        variant: "destructive",
      });
      return;
    }

    if (!isValidDateRange(startDate, endDate)) {
      setError("Start date cannot be after end date.");
      toast({
        title: "Validation Error",
        description: "Start date cannot be after end date.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setError(null);

    const data = { reportType, startDate, endDate };
    console.log("Report request submitted:", data);

    // Simulate async report generation (replace with real API call)
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Report Submitted",
        description: `Generating ${reportType} report from ${formatDate(startDate)} to ${formatDate(endDate)}.`,
        variant: "default",
      });
      handleReset();
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-lg shadow-lg rounded-lg">
        <CardHeader className="flex items-center space-x-2 bg-white border-b border-gray-200 rounded-t-lg px-4 py-3">
          <BarChart className="w-6 h-6 text-green-600" aria-hidden="true" />
          <CardTitle className="text-lg font-semibold text-gray-900">Reports & Analytics</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col items-center justify-center min-h-[400px] px-6 py-8">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6 w-full"
            aria-label="Generate reports form"
            noValidate
          >
            {/* Report Type Selector */}
            <div>
              <label htmlFor="reportType" className="block mb-1 font-medium text-gray-900">
                Select Report Type
              </label>
              <select
                id="reportType"
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                required
                aria-required="true"
              >
                <option value="sales">Sales Report</option>
                <option value="users">User Activity</option>
                <option value="bookings">Bookings Report</option>
              </select>
            </div>

            {/* Date Range Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="startDate" className="block mb-1 font-medium text-gray-900">
                  Start Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    id="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                    required
                    aria-required="true"
                    aria-invalid={!!error && !startDate}
                    aria-describedby="startDateError"
                  />
                  <Calendar
                    className="absolute right-3 top-2.5 w-5 h-5 text-gray-400 pointer-events-none"
                    aria-hidden="true"
                  />
                </div>
                {error && !startDate && (
                  <p id="startDateError" className="text-red-600 text-xs mt-1">
                    Please select a start date.
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="endDate" className="block mb-1 font-medium text-gray-900">
                  End Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    id="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                    required
                    aria-required="true"
                    aria-invalid={!!error && !endDate}
                    aria-describedby="endDateError"
                  />
                  <Calendar
                    className="absolute right-3 top-2.5 w-5 h-5 text-gray-400 pointer-events-none"
                    aria-hidden="true"
                  />
                </div>
                {error && !endDate && (
                  <p id="endDateError" className="text-red-600 text-xs mt-1">
                    Please select an end date.
                  </p>
                )}
              </div>
            </div>

            {/* Date Range Error */}
            {error && startDate && endDate && (
              <p className="text-red-600 text-sm text-center">{error}</p>
            )}

            {/* Buttons */}
            <div className="flex space-x-4 justify-center sm:justify-start">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-md transition disabled:opacity-60 disabled:cursor-not-allowed"
                aria-busy={loading}
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                ) : (
                  <Filter className="w-5 h-5" />
                )}
                <span>{loading ? "Generating..." : "Generate Report"}</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                disabled={loading}
                className="inline-flex items-center space-x-2 border border-gray-300 rounded-md px-6 py-2 text-gray-700 hover:bg-gray-100 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <X className="w-5 h-5" />
                <span>Reset</span>
              </button>
            </div>
          </form>

          {/* Summary Display */}
          {startDate && endDate && !loading && !error && (
            <div className="mt-8 max-w-lg w-full text-center text-gray-700 border border-green-300 rounded-md p-4 bg-green-50">
              <p>
                Preview:{" "}
                <strong>
                  {reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report
                </strong>{" "}
                from{" "}
                <time dateTime={startDate} className="underline">
                  {formatDate(startDate)}
                </time>{" "}
                to{" "}
                <time dateTime={endDate} className="underline">
                  {formatDate(endDate)}
                </time>
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
