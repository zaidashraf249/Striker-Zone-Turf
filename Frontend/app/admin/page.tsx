"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  Calendar,
  CreditCard,
  TrendingUp,
  Clock,
  Star,
  AlertCircle,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Trash2,
  Plus,
  Download,
  Filter,
  Search,
} from "lucide-react"

const dashboardStats = [
  {
    title: "Total Bookings",
    value: "1,234",
    change: "+12%",
    trend: "up",
    icon: Calendar,
    color: "text-blue-600",
  },
  {
    title: "Revenue",
    value: "₹2,45,680",
    change: "+8%",
    trend: "up",
    icon: CreditCard,
    color: "text-green-600",
  },
  {
    title: "Active Users",
    value: "856",
    change: "+15%",
    trend: "up",
    icon: Users,
    color: "text-purple-600",
  },
  {
    title: "Avg Rating",
    value: "4.8",
    change: "+0.2",
    trend: "up",
    icon: Star,
    color: "text-yellow-600",
  },
]

const recentBookings = [
  {
    id: "BK001",
    customer: "Rahul Sharma",
    date: "2024-01-25",
    time: "7:00 PM - 8:00 PM",
    amount: "₹1,200",
    status: "confirmed",
    phone: "+91 98765 43210",
  },
  {
    id: "BK002",
    customer: "Priya Patel",
    date: "2024-01-25",
    time: "6:00 PM - 7:00 PM",
    amount: "₹1,200",
    status: "pending",
    phone: "+91 98765 43211",
  },
  {
    id: "BK003",
    customer: "Arjun Singh",
    date: "2024-01-26",
    time: "8:00 PM - 9:00 PM",
    amount: "₹1,200",
    status: "confirmed",
    phone: "+91 98765 43212",
  },
  {
    id: "BK004",
    customer: "Sneha Gupta",
    date: "2024-01-26",
    time: "5:00 PM - 7:00 PM",
    amount: "₹2,400",
    status: "cancelled",
    phone: "+91 98765 43213",
  },
]

const customers = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul@email.com",
    phone: "+91 98765 43210",
    totalBookings: 15,
    totalSpent: "₹18,000",
    lastBooking: "2024-01-25",
    status: "active",
  },
  {
    id: 2,
    name: "Priya Patel",
    email: "priya@email.com",
    phone: "+91 98765 43211",
    totalBookings: 8,
    totalSpent: "₹9,600",
    lastBooking: "2024-01-20",
    status: "active",
  },
  {
    id: 3,
    name: "Arjun Singh",
    email: "arjun@email.com",
    phone: "+91 98765 43212",
    totalBookings: 22,
    totalSpent: "₹26,400",
    lastBooking: "2024-01-24",
    status: "vip",
  },
]

export default function AdminDashboard() {
  const [selectedTab, setSelectedTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      case "active":
        return "bg-green-100 text-green-800"
      case "vip":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="h-4 w-4" />
      case "pending":
        return <Clock className="h-4 w-4" />
      case "cancelled":
        return <XCircle className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-sm sm:text-base text-gray-600">Manage your turf bookings and customers</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <Button variant="outline" className="cursor-pointer bg-transparent text-sm">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
            <Button className="bg-green-600 hover:bg-green-700 cursor-pointer text-sm">
              <Plus className="h-4 w-4 mr-2" />
              New Booking
            </Button>
          </div>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
            <TabsTrigger value="overview" className="text-xs sm:text-sm">
              Overview
            </TabsTrigger>
            <TabsTrigger value="bookings" className="text-xs sm:text-sm">
              Bookings
            </TabsTrigger>
            <TabsTrigger value="customers" className="text-xs sm:text-sm">
              Customers
            </TabsTrigger>
            <TabsTrigger value="analytics" className="text-xs sm:text-sm">
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              {dashboardStats.map((stat, index) => (
                <Card key={index}>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-gray-600">{stat.title}</p>
                        <p className="text-lg sm:text-2xl font-bold text-gray-900">{stat.value}</p>
                        <p className={`text-xs sm:text-sm ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                          {stat.change} from last month
                        </p>
                      </div>
                      <stat.icon className={`h-6 w-6 sm:h-8 sm:w-8 ${stat.color}`} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base sm:text-lg">Recent Bookings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 sm:space-y-4">
                    {recentBookings.slice(0, 5).map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{booking.customer}</p>
                          <p className="text-xs text-gray-500">
                            {booking.date} • {booking.time}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2 ml-3">
                          <span className="text-sm font-medium">{booking.amount}</span>
                          <Badge className={`text-xs ${getStatusColor(booking.status)}`}>{booking.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base sm:text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start bg-green-600 hover:bg-green-700 cursor-pointer text-sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Booking
                  </Button>
                  <Button variant="outline" className="w-full justify-start cursor-pointer bg-transparent text-sm">
                    <Users className="h-4 w-4 mr-2" />
                    Manage Customers
                  </Button>
                  <Button variant="outline" className="w-full justify-start cursor-pointer bg-transparent text-sm">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    View Analytics
                  </Button>
                  <Button variant="outline" className="w-full justify-start cursor-pointer bg-transparent text-sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export Reports
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">All Bookings</h2>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search bookings..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <Button variant="outline" size="sm" className="cursor-pointer bg-transparent text-sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Booking ID
                        </th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Customer
                        </th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date & Time
                        </th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {recentBookings.map((booking) => (
                        <tr key={booking.id} className="hover:bg-gray-50">
                          <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {booking.id}
                          </td>
                          <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{booking.customer}</div>
                              <div className="text-sm text-gray-500">{booking.phone}</div>
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{booking.date}</div>
                            <div className="text-sm text-gray-500">{booking.time}</div>
                          </td>
                          <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {booking.amount}
                          </td>
                          <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                            <Badge className={`inline-flex items-center space-x-1 ${getStatusColor(booking.status)}`}>
                              {getStatusIcon(booking.status)}
                              <span className="capitalize">{booking.status}</span>
                            </Badge>
                          </td>
                          <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="sm" className="cursor-pointer">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="cursor-pointer">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="cursor-pointer text-red-600">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Customers Tab */}
          <TabsContent value="customers" className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Customer Management</h2>
              <Button className="bg-green-600 hover:bg-green-700 cursor-pointer text-sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Customer
              </Button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {customers.map((customer) => (
                <Card key={customer.id}>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900">{customer.name}</h3>
                        <p className="text-sm text-gray-600">{customer.email}</p>
                        <p className="text-sm text-gray-600">{customer.phone}</p>
                      </div>
                      <Badge className={getStatusColor(customer.status)}>{customer.status.toUpperCase()}</Badge>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Bookings:</span>
                        <span className="font-medium">{customer.totalBookings}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Spent:</span>
                        <span className="font-medium">{customer.totalSpent}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Last Booking:</span>
                        <span className="font-medium">{customer.lastBooking}</span>
                      </div>
                    </div>

                    <div className="flex space-x-2 mt-4">
                      <Button variant="outline" size="sm" className="flex-1 cursor-pointer bg-transparent text-xs">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 cursor-pointer bg-transparent text-xs">
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Analytics & Reports</h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <TrendingUp className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Revenue Analytics</h3>
                  <p className="text-gray-600 text-sm">Track your revenue trends and growth</p>
                  <Button className="mt-4 bg-green-600 hover:bg-green-700 cursor-pointer text-sm">View Report</Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Customer Insights</h3>
                  <p className="text-gray-600 text-sm">Analyze customer behavior and preferences</p>
                  <Button className="mt-4 bg-blue-600 hover:bg-blue-700 cursor-pointer text-sm">View Report</Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Calendar className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Booking Patterns</h3>
                  <p className="text-gray-600 text-sm">Understand peak hours and booking trends</p>
                  <Button className="mt-4 bg-purple-600 hover:bg-purple-700 cursor-pointer text-sm">View Report</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
