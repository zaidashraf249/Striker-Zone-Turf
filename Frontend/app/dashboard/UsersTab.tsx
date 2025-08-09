"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Role color map for badges
const roleColors: Record<string, string> = {
  Player: "bg-green-100 text-green-800",
  Manager: "bg-blue-100 text-blue-800",
  Admin: "bg-red-100 text-red-800",
  Guest: "bg-gray-100 text-gray-800",
};

type User = {
  id: number;
  name: string;
  role: string;
};

export default function UsersTab({ usersData }: { usersData: User[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "role">("name");
  const [sortAsc, setSortAsc] = useState(true);

  // Sort & filter users memoized
  const filteredUsers = useMemo(() => {
    let filtered = usersData.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filtered.sort((a, b) => {
      const fieldA = a[sortBy].toLowerCase();
      const fieldB = b[sortBy].toLowerCase();
      if (fieldA < fieldB) return sortAsc ? -1 : 1;
      if (fieldA > fieldB) return sortAsc ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [usersData, searchTerm, sortBy, sortAsc]);

  // Toggle sorting by column
  const handleSortChange = (field: "name" | "role") => {
    if (field === sortBy) {
      setSortAsc(!sortAsc);
    } else {
      setSortBy(field);
      setSortAsc(true);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
        <CardTitle>Manage Users</CardTitle>
        <input
          type="text"
          placeholder="Search by name or role..."
          className="border border-gray-300 rounded-md px-3 py-1 text-sm w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-green-600"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search users"
        />
      </CardHeader>
      <CardContent>
        {filteredUsers.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            No users found matching your search.
          </p>
        ) : (
          <ul className="divide-y divide-gray-200">
            <li className="hidden sm:flex justify-between px-3 py-2 font-semibold text-gray-700 bg-gray-50 rounded-t-md cursor-pointer select-none">
              <span onClick={() => handleSortChange("name")}>
                Name{" "}
                {sortBy === "name" && (
                  <span>{sortAsc ? "▲" : "▼"}</span>
                )}
              </span>
              <span onClick={() => handleSortChange("role")}>
                Role{" "}
                {sortBy === "role" && (
                  <span>{sortAsc ? "▲" : "▼"}</span>
                )}
              </span>
            </li>

            {filteredUsers.map((user) => (
              <li
                key={user.id}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-3 py-3 hover:bg-gray-50 rounded-md transition cursor-default"
              >
                <span className="font-medium text-gray-900">{user.name}</span>
                <span
                  className={`mt-2 sm:mt-0 inline-block px-3 py-0.5 rounded-full text-xs font-semibold ${roleColors[user.role] ?? "bg-gray-100 text-gray-800"}`}
                >
                  {user.role}
                </span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
