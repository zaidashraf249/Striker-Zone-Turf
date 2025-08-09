"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Booking = {
  id: number;
  customer: string;
  date: string; // YYYY-MM-DD or ISO
  status: "Confirmed" | "Pending" | "Cancelled" | string;
};

const statusColors: Record<string, string> = {
  Confirmed: "bg-green-100 text-green-800",
  Pending: "bg-yellow-100 text-yellow-800",
  Cancelled: "bg-red-100 text-red-800",
};

export default function BookingsTab({
  bookingsData,
  searchTerm,
  setSearchTerm,
}: {
  bookingsData: Booking[];
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [statusFilter, setStatusFilter] = useState<"" | "Confirmed" | "Pending" | "Cancelled">("");

  const [sortAsc, setSortAsc] = useState(true);

  const filteredBookings = useMemo(() => {
    let filtered = bookingsData.filter((b) => {
      const searchLower = searchTerm.toLowerCase();

      const matchesSearch =
        b.customer.toLowerCase().includes(searchLower) ||
        b.status.toLowerCase().includes(searchLower);

      const matchesStatus = statusFilter ? b.status === statusFilter : true;

      return matchesSearch && matchesStatus;
    });

    filtered.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortAsc ? dateA - dateB : dateB - dateA;
    });

    return filtered;
  }, [bookingsData, searchTerm, statusFilter, sortAsc]);

  const toggleSort = () => setSortAsc((prev) => !prev);

  const handleStatusFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "" || value === "Confirmed" || value === "Pending" || value === "Cancelled") {
      setStatusFilter(value);
    }
  };

  return (
    <Card >
      <CardHeader className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <CardTitle>Manage Bookings</CardTitle>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
          <input
            type="search"
            placeholder="Search by customer or status..."
            className="border px-3 py-1 rounded-md text-sm w-full sm:w-auto focus:ring-2 focus:ring-green-600"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search bookings"
          />
          <select
            aria-label="Filter by status"
            className="border px-3 py-1 rounded-md text-sm w-full sm:w-auto focus:ring-2 focus:ring-green-600"
            value={statusFilter}
            onChange={handleStatusFilterChange}
          >
            <option value="">All Statuses</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <button
            onClick={toggleSort}
            className="bg-green-600 text-white px-3 py-1 rounded-md text-sm hover:bg-green-700 transition"
            aria-label={`Sort by date ${sortAsc ? "descending" : "ascending"}`}
          >
            Date {sortAsc ? "▲" : "▼"}
          </button>
        </div>
      </CardHeader>

      <CardContent>
        <table className="w-full text-sm border-collapse" role="table" aria-label="Bookings table">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Customer</th>
              <th className="p-2 text-center cursor-pointer select-none" onClick={toggleSort}>
                Date {sortAsc ? "▲" : "▼"}
              </th>
              <th className="p-2 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.length ? (
              filteredBookings.map((b) => (
                <tr key={b.id} className="border-b hover:bg-gray-50">
                  <td className="p-2">{b.customer}</td>
                  <td className="p-2 text-center">{b.date}</td>
                  <td className="p-2 text-center">
                    <span
                      className={`inline-block px-3 py-0.5 rounded-full text-xs font-semibold ${
                        statusColors[b.status] || "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="p-4 text-center text-gray-500">
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
