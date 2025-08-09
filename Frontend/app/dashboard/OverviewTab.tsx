import React from "react";
import StatCard from "./StatCard";

export default function OverviewTab({
  bookingsData,
  usersData,
}: {
  bookingsData: { id: number; customer: string; date: string; status: string }[];
  usersData: { id: number; name: string; role: string }[];
}) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Total Bookings"
        value={bookingsData.length.toString()}
        color="text-green-600"
      />
      <StatCard
        title="Active Users"
        value={usersData.length.toString()}
        color="text-blue-600"
      />
      <StatCard title="Revenue" value="₹1,20,000" color="text-orange-600" />
      <StatCard
        title="Pending Approvals"
        value={bookingsData.filter((b) => b.status === "Pending").length.toString()}
        color="text-red-600"
      />
    </div>
  );
}
