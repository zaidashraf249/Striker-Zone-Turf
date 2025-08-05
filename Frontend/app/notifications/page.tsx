"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Bell,
  Calendar,
  CreditCard,
  Star,
  Gift,
  AlertCircle,
  CheckCircle,
  Settings,
  Smartphone,
  Mail,
  MessageCircle,
} from "lucide-react"

const notifications = [
  {
    id: 1,
    type: "booking",
    icon: Calendar,
    title: "Booking Reminder",
    message: "Your booking for tomorrow at 7:00 PM is confirmed. Don't forget to bring your gear!",
    time: "2 hours ago",
    read: false,
    priority: "high",
  },
  {
    id: 2,
    type: "payment",
    icon: CreditCard,
    title: "Payment Successful",
    message: "Payment of ₹1,200 for your booking on Jan 25 has been processed successfully.",
    time: "1 day ago",
    read: true,
    priority: "medium",
  },
  {
    id: 3,
    type: "review",
    icon: Star,
    title: "Rate Your Experience",
    message: "How was your recent game at Striker Zone? Share your feedback and help us improve.",
    time: "3 days ago",
    read: false,
    priority: "low",
  },
  {
    id: 4,
    type: "offer",
    icon: Gift,
    title: "Special Weekend Offer",
    message: "Get 20% off on weekend bookings! Use code WEEKEND20. Valid till Sunday.",
    time: "1 week ago",
    read: true,
    priority: "medium",
  },
  {
    id: 5,
    type: "system",
    icon: AlertCircle,
    title: "Maintenance Notice",
    message: "Scheduled maintenance on Jan 30 from 6:00 AM to 8:00 AM. All bookings will be rescheduled.",
    time: "2 weeks ago",
    read: true,
    priority: "high",
  },
]

const notificationSettings = [
  {
    id: "booking_reminders",
    title: "Booking Reminders",
    description: "Get notified about upcoming bookings",
    enabled: true,
    channels: ["push", "email", "sms"],
  },
  {
    id: "payment_updates",
    title: "Payment Updates",
    description: "Notifications about payment confirmations and receipts",
    enabled: true,
    channels: ["push", "email"],
  },
  {
    id: "special_offers",
    title: "Special Offers",
    description: "Exclusive deals and promotional offers",
    enabled: true,
    channels: ["push", "email"],
  },
  {
    id: "review_requests",
    title: "Review Requests",
    description: "Requests to rate and review your experience",
    enabled: false,
    channels: ["push"],
  },
  {
    id: "system_updates",
    title: "System Updates",
    description: "Important announcements and maintenance notices",
    enabled: true,
    channels: ["push", "email", "sms"],
  },
]

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("notifications")
  const [settings, setSettings] = useState(notificationSettings)
  const [notificationList, setNotificationList] = useState(notifications)

  const markAsRead = (id: number) => {
    setNotificationList((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const markAllAsRead = () => {
    setNotificationList((prev) => prev.map((notif) => ({ ...notif, read: true })))
  }

  const toggleSetting = (id: string) => {
    setSettings((prev) =>
      prev.map((setting) => (setting.id === id ? { ...setting, enabled: !setting.enabled } : setting)),
    )
  }

  const unreadCount = notificationList.filter((n) => !n.read).length

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500 bg-red-50"
      case "medium":
        return "border-l-yellow-500 bg-yellow-50"
      case "low":
        return "border-l-blue-500 bg-blue-50"
      default:
        return "border-l-gray-500 bg-gray-50"
    }
  }

  const getIconColor = (type: string) => {
    switch (type) {
      case "booking":
        return "text-green-600"
      case "payment":
        return "text-blue-600"
      case "review":
        return "text-purple-600"
      case "offer":
        return "text-orange-600"
      case "system":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">Smart Notifications</h1>
          <p className="text-base sm:text-xl text-gray-600">Stay updated with real-time alerts and reminders</p>
        </div>

        {/* Tabs */}
        <div className="flex flex-col sm:flex-row justify-center mb-6 sm:mb-8">
          <div className="bg-white rounded-lg p-1 shadow-sm">
            <div className="grid grid-cols-2 gap-1">
              <button
                onClick={() => setActiveTab("notifications")}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-md text-sm sm:text-base font-medium transition-colors cursor-pointer ${
                  activeTab === "notifications" ? "bg-green-600 text-white" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Bell className="h-4 w-4 sm:h-5 sm:w-5 inline mr-2" />
                <span className="hidden sm:inline">Notifications</span>
                <span className="sm:hidden">Alerts</span>
                {unreadCount > 0 && <Badge className="ml-2 bg-red-500 text-white text-xs">{unreadCount}</Badge>}
              </button>
              <button
                onClick={() => setActiveTab("settings")}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-md text-sm sm:text-base font-medium transition-colors cursor-pointer ${
                  activeTab === "settings" ? "bg-green-600 text-white" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Settings className="h-4 w-4 sm:h-5 sm:w-5 inline mr-2" />
                Settings
              </button>
            </div>
          </div>
        </div>

        {activeTab === "notifications" && (
          <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
            {/* Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                Recent Notifications ({notificationList.length})
              </h2>
              {unreadCount > 0 && (
                <Button
                  onClick={markAllAsRead}
                  variant="outline"
                  size="sm"
                  className="cursor-pointer bg-transparent text-sm"
                >
                  Mark all as read
                </Button>
              )}
            </div>

            {/* Notifications List */}
            <div className="space-y-3 sm:space-y-4">
              {notificationList.map((notification) => (
                <Card
                  key={notification.id}
                  className={`cursor-pointer transition-all hover:shadow-md border-l-4 ${
                    !notification.read ? getPriorityColor(notification.priority) : "border-l-gray-300"
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start space-x-3 sm:space-x-4">
                      <div
                        className={`h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gray-100 flex items-center justify-center ${
                          !notification.read ? "ring-2 ring-green-200" : ""
                        }`}
                      >
                        <notification.icon className={`h-4 w-4 sm:h-5 sm:w-5 ${getIconColor(notification.type)}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                          <h3
                            className={`text-sm sm:text-base font-semibold ${
                              !notification.read ? "text-gray-900" : "text-gray-700"
                            }`}
                          >
                            {notification.title}
                          </h3>
                          <div className="flex items-center space-x-2 mt-1 sm:mt-0">
                            <span className="text-xs sm:text-sm text-gray-500">{notification.time}</span>
                            {!notification.read && <div className="h-2 w-2 bg-green-500 rounded-full"></div>}
                          </div>
                        </div>
                        <p className={`text-xs sm:text-sm ${!notification.read ? "text-gray-700" : "text-gray-600"}`}>
                          {notification.message}
                        </p>

                        {/* Action buttons for specific notification types */}
                        {notification.type === "review" && !notification.read && (
                          <div className="mt-3 flex flex-col sm:flex-row gap-2">
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700 cursor-pointer text-xs sm:text-sm"
                              onClick={() => (window.location.href = "/reviews")}
                            >
                              Rate Now
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="cursor-pointer bg-transparent text-xs sm:text-sm"
                            >
                              Later
                            </Button>
                          </div>
                        )}

                        {notification.type === "offer" && !notification.read && (
                          <div className="mt-3">
                            <Button
                              size="sm"
                              className="bg-orange-600 hover:bg-orange-700 cursor-pointer text-xs sm:text-sm"
                              onClick={() => (window.location.href = "/booking")}
                            >
                              Book Now
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {notificationList.length === 0 && (
              <Card>
                <CardContent className="p-8 sm:p-12 text-center">
                  <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No notifications</h3>
                  <p className="text-gray-600">You're all caught up! New notifications will appear here.</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {activeTab === "settings" && (
          <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Notification Preferences</h2>

            <div className="space-y-4 sm:space-y-6">
              {settings.map((setting) => (
                <Card key={setting.id}>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                      <div className="flex-1">
                        <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">{setting.title}</h3>
                        <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-0">{setting.description}</p>

                        {/* Notification Channels */}
                        <div className="flex flex-wrap gap-2 mt-2">
                          {setting.channels.map((channel) => (
                            <Badge key={channel} variant="secondary" className="text-xs flex items-center space-x-1">
                              {channel === "push" && <Smartphone className="h-3 w-3" />}
                              {channel === "email" && <Mail className="h-3 w-3" />}
                              {channel === "sms" && <MessageCircle className="h-3 w-3" />}
                              <span className="capitalize">{channel}</span>
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch checked={setting.enabled} onCheckedChange={() => toggleSetting(setting.id)} />
                        <span className="text-xs sm:text-sm text-gray-600">{setting.enabled ? "On" : "Off"}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Global Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Global Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                  <div>
                    <p className="font-medium text-sm sm:text-base">Do Not Disturb</p>
                    <p className="text-xs sm:text-sm text-gray-600">Pause all notifications temporarily</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                  <div>
                    <p className="font-medium text-sm sm:text-base">Sound Notifications</p>
                    <p className="text-xs sm:text-sm text-gray-600">Play sound for new notifications</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                  <div>
                    <p className="font-medium text-sm sm:text-base">Browser Notifications</p>
                    <p className="text-xs sm:text-sm text-gray-600">Show notifications in browser</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end">
              <Button className="bg-green-600 hover:bg-green-700 cursor-pointer">
                <CheckCircle className="h-4 w-4 mr-2" />
                Save Preferences
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
