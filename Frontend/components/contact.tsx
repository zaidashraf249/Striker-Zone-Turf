// "use client";

// import type React from "react";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { useToast } from "@/hooks/use-toast";
// import { MapPin, Phone, Mail, Clock, MessageCircle, Send } from "lucide-react";

// export function Contact() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     message: "",
//     eventType: "general",
//   });
//   const { toast } = useToast();

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     toast({
//       title: "Message Sent..!",
//       description: "We'll get back to you within 24 hours.",
//       variant: "destructive", // success type dikhane ke liye
//       duration: 3000, // kitni der dikhe toast
//     });

//     console.log("Submitted Form Data:", formData); // <-- Logs the data to console

//     toast({
//       title: "Message Sent!",
//       description: "We'll get back to you within 24 hours.",
//       duration: 3000,
//     });

//     setFormData({
//       name: "",
//       email: "",
//       phone: "",
//       message: "",
//       eventType: "general",
//     });
//   };

//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >
//   ) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   return (
//     <section className="py-20 bg-gray-50">
//       <div className="container mx-auto px-4">
//         {/* Header */}
//         <div className="text-center mb-16">
//           <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
//             Get in Touch
//           </h2>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//             Have questions about booking, facilities, or special events? We're
//             here to help you plan the perfect game experience.
//           </p>
//         </div>

//         <div className="grid lg:grid-cols-2 gap-12">
//           {/* Contact Information */}
//           <div className="space-y-8">
//             <div>
//               <h3 className="text-2xl font-bold text-gray-900 mb-6">
//                 Contact Information
//               </h3>

//               <div className="space-y-6">
//                 <div className="flex items-start space-x-4">
//                   <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center">
//                     <MapPin className="h-6 w-6 text-green-600" />
//                   </div>
//                   <div>
//                     <p className="font-semibold text-gray-900">Address</p>
//                     <p className="text-gray-600">
//                       Striker Zone Sports Complex
//                       <br />
//                       Nagpur, Maharashtra
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex items-start space-x-4">
//                   <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
//                     <Phone className="h-6 w-6 text-blue-600" />
//                   </div>
//                   <div>
//                     <p className="font-semibold text-gray-900">Phone</p>
//                     <p className="text-gray-600">
//                       +91 98765 43210
//                       <br />
//                       +91 87654 32109
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex items-start space-x-4">
//                   <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center">
//                     <Mail className="h-6 w-6 text-purple-600" />
//                   </div>
//                   <div>
//                     <p className="font-semibold text-gray-900">Email</p>
//                     <p className="text-gray-600">
//                       info@strikezone.com
//                       <br />
//                       bookings@strikezone.com
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex items-start space-x-4">
//                   <div className="h-12 w-12 rounded-lg bg-orange-100 flex items-center justify-center">
//                     <Clock className="h-6 w-6 text-orange-600" />
//                   </div>
//                   <div>
//                     <p className="font-semibold text-gray-900">
//                       Operating Hours
//                     </p>
//                     <p className="text-gray-600">
//                       6:00 AM - 11:00 PM
//                       <br />
//                       All Days of the Week
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex items-start space-x-4">
//                   <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center">
//                     <MessageCircle className="h-6 w-6 text-green-600" />
//                   </div>
//                   <div>
//                     <p className="font-semibold text-gray-900">WhatsApp</p>
//                     <p className="text-gray-600">
//                       +91 98765 43210
//                       <br />
//                       Quick support & booking
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Quick Actions */}
//             <div className="bg-white rounded-xl p-6 shadow-sm">
//               <h4 className="text-lg font-semibold text-gray-900 mb-4">
//                 Quick Actions
//               </h4>
//               <div className="space-y-3">
//                 <Button className="w-full justify-start bg-green-600 hover:bg-green-700">
//                   <Phone className="h-4 w-4 mr-2" />
//                   Call Now for Instant Booking
//                 </Button>
//                 <Button
//                   variant="outline"
//                   className="w-full justify-start bg-transparent"
//                 >
//                   <MessageCircle className="h-4 w-4 mr-2" />
//                   Chat on WhatsApp
//                 </Button>
//                 <Button
//                   variant="outline"
//                   className="w-full justify-start bg-transparent"
//                 >
//                   <MapPin className="h-4 w-4 mr-2" />
//                   Get Directions
//                 </Button>
//               </div>
//             </div>
//           </div>

//           {/* Contact Form */}
//           <div className="bg-white rounded-xl p-8 shadow-sm">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">
//               Send us a Message
//             </h3>

//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="grid md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Full Name *
//                   </label>
//                   <Input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     placeholder="Enter your name"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Phone Number *
//                   </label>
//                   <Input
//                     type="tel"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     placeholder="+91 98765 43210"
//                     required
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Email Address *
//                 </label>
//                 <Input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder="your.email@example.com"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Inquiry Type
//                 </label>
//                 <select
//                   name="eventType"
//                   value={formData.eventType}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                 >
//                   <option value="general">General Inquiry</option>
//                   <option value="booking">Booking Question</option>
//                   <option value="event">Corporate Event</option>
//                   <option value="tournament">Tournament Booking</option>
//                   <option value="membership">Membership Plans</option>
//                   <option value="feedback">Feedback</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Message *
//                 </label>
//                 <Textarea
//                   name="message"
//                   value={formData.message}
//                   onChange={handleChange}
//                   placeholder="Tell us about your requirements, preferred dates, or any questions you have..."
//                   rows={5}
//                   required
//                 />
//               </div>

//               <Button
//                 type="submit"
//                 className="w-full bg-green-600 hover:bg-green-700 py-3"
//               >
//                 <Send className="h-4 w-4 mr-2" />
//                 Send Message
//               </Button>
//             </form>

//             <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
//               <p className="text-sm text-blue-800">
//                 <strong>Quick Response Guarantee:</strong> We respond to all
//                 inquiries within 2 hours during business hours. For urgent
//                 bookings, please call us directly.
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Map Section */}
//         <div className="mt-16">
//           <div className="bg-white rounded-xl p-6 shadow-sm">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Find Us</h3>
//             <div className="aspect-video rounded-lg overflow-hidden">
//               <iframe
//                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.588183653002!2d79.13370407526156!3d21.208512380486198!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c700347f32fd%3A0xd2dbc80d0481e8c7!2sStriker%E2%80%99s%20zone!5e0!3m2!1sen!2sin!4v1753078444887!5m2!1sen!2sin"
//                 width="100%"
//                 height="100%"
//                 style={{ border: 0 }}
//                 allowFullScreen
//                 loading="lazy"
//                 referrerPolicy="no-referrer-when-downgrade"
//                 className="rounded-lg"
//               />
//             </div>
//             <div className="mt-4 text-center">
//               <p className="text-gray-600">Striker Zone Sports Complex</p>
//               <p className="text-sm text-gray-500">Nagpur, Maharashtra</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
