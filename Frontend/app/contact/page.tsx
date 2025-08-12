"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Send,
  Star,
  CheckCircle,
  Users,
  Calendar,
  Headphones,
} from "lucide-react";

const contactMethods = [
  {
    icon: Phone,
    title: "Call Us",
    description: "Speak directly with our team",
    value: "+91 98765 43210",
    action: "Call Now",
    color: "from-green-500 to-green-600",
    available: "24/7 Available",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    description: "Quick support via WhatsApp",
    value: "+91 98765 43210",
    action: "Chat Now",
    color: "from-green-400 to-green-500",
    available: "Instant Response",
  },
  {
    icon: Mail,
    title: "Email",
    description: "Send us detailed queries",
    value: "info@strikezone.com",
    action: "Send Email",
    color: "from-blue-500 to-blue-600",
    available: "2 Hour Response",
  },
  {
    icon: Calendar,
    title: "Book a Visit",
    description: "Schedule a facility tour",
    value: "Free Consultation",
    action: "Schedule Now",
    color: "from-purple-500 to-purple-600",
    available: "Same Day Available",
  },
];

const faqs = [
  {
    question: "What are your operating hours?",
    answer:
      "We're open 6:00 AM to 11:00 PM, all days of the week including holidays.",
  },
  {
    question: "How far in advance can I book?",
    answer:
      "You can book up to 30 days in advance. We recommend booking at least 24 hours ahead for peak hours.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept UPI, credit/debit cards, net banking, and popular digital wallets like Paytm, PhonePe, and Google Pay.",
  },
  {
    question: "Do you provide equipment rental?",
    answer:
      "Yes, we provide footballs, cricket equipment, and other sports gear on rental basis at affordable rates.",
  },
  {
    question: "Is parking available?",
    answer:
      "Yes, we have secure parking space for 50+ vehicles free of charge for all players.",
  },
  {
    question: "Can I cancel or reschedule my booking?",
    answer:
      "Yes, you can cancel or reschedule up to 4 hours before your slot time for a full refund.",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    inquiryType: "general",
  });
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Simple client side validation for required fields
  const validateForm = () => {
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.subject.trim() ||
      !formData.message.trim()
    ) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
        duration: 3000,
      });
      return false;
    }
    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/addmessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong");
      }

      toast({
        title: "Message Sent!",
        description: "We'll get back to you within 24 hours.",
        variant: "success",
        duration: 4000,
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        inquiryType: "general",
      });
    } catch (error: any) {
      toast({
        title: "Submission Failed",
        description: error.message || "Failed to send message.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 max-w-4xl mx-auto">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 rounded-full text-sm font-semibold mb-4 select-none">
            💬 We're Here to Help
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            Get in Touch
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions about booking, facilities, or special events? Our
            team is ready to assist you with anything you need.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactMethods.map((method, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-shadow duration-300 border-0 cursor-pointer"
              tabIndex={0}
              role="button"
              aria-label={`${method.title} - ${method.action}`}
            >
              <CardContent className="p-6 text-center">
                <div
                  className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${method.color} mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <method.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {method.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3">{method.description}</p>
                <p className="font-semibold text-gray-900 mb-2">{method.value}</p>
                <div className="text-xs text-green-600 font-medium mb-4">
                  {method.available}
                </div>
                <Button
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white cursor-pointer"
                  aria-label={method.action}
                >
                  {method.action}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <Card className="shadow-xl border-0">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <Send className="h-6 w-6 text-orange-500" aria-hidden="true" />
                Send us a Message
              </CardTitle>
              <p className="text-gray-600">
                Fill out the form below and we'll get back to you shortly.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Full Name *
                    </label>
                    <Input
                      id="name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                      disabled={loading}
                      className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                      aria-required="true"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Phone Number *
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      required
                      disabled={loading}
                      className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                      aria-required="true"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Email Address *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    required
                    disabled={loading}
                    className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    aria-required="true"
                  />
                </div>

                <div>
                  <label
                    htmlFor="inquiryType"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Inquiry Type
                  </label>
                  <select
                    id="inquiryType"
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleChange}
                    disabled={loading}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 cursor-pointer"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="booking">Booking Question</option>
                    <option value="event">Corporate Event</option>
                    <option value="tournament">Tournament Booking</option>
                    <option value="membership">Membership Plans</option>
                    <option value="feedback">Feedback & Suggestions</option>
                    <option value="complaint">Complaint</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Subject *
                  </label>
                  <Input
                    id="subject"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Brief subject of your inquiry"
                    required
                    disabled={loading}
                    className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    aria-required="true"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your requirements, preferred dates, or any questions you have..."
                    rows={5}
                    required
                    disabled={loading}
                    className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    aria-required="true"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 py-3 text-lg cursor-pointer flex items-center justify-center"
                  aria-busy={loading}
                >
                  {loading ? (
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      ></path>
                    </svg>
                  ) : (
                    <Send className="h-5 w-5 mr-2" />
                  )}
                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </form>

              <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-green-600" aria-hidden="true" />
                  <span className="font-semibold text-green-800">
                    Quick Response Guarantee
                  </span>
                </div>
                <p className="text-sm text-green-700">
                  We respond to all inquiries within 2 hours during business
                  hours (6 AM - 11 PM). For urgent bookings, please call us
                  directly.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information & FAQ */}
          <div className="space-y-8">
            {/* Contact Info */}
            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <MapPin className="h-6 w-6 text-orange-500" aria-hidden="true" />
                  Visit Our Facility
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  {
                    icon: MapPin,
                    title: "Address",
                    content: (
                      <>
                        Striker Zone Sports Complex
                        <br />
                        Nagpur, Maharashtra
                      </>
                    ),
                    button: (
                      <Button
                        variant="link"
                        className="p-0 h-auto text-orange-600 hover:text-orange-700 cursor-pointer"
                        aria-label="Get directions to Striker Zone Sports Complex"
                      >
                        Get Directions →
                      </Button>
                    ),
                    bgColor: "from-orange-500 to-red-500",
                  },
                  {
                    icon: Clock,
                    title: "Operating Hours",
                    content: (
                      <>
                        6:00 AM - 11:00 PM
                        <br />
                        All Days of the Week
                      </>
                    ),
                    bgColor: "from-green-500 to-green-600",
                  },
                  {
                    icon: Users,
                    title: "Capacity",
                    content: (
                      <>
                        11v11 Football, Cricket Nets
                        <br />
                        Multiple sports supported
                      </>
                    ),
                    bgColor: "from-blue-500 to-blue-600",
                  },
                ].map(({ icon: Icon, title, content, button, bgColor }, i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <div
                      className={`h-12 w-12 rounded-lg bg-gradient-to-r ${bgColor} flex items-center justify-center`}
                    >
                      <Icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{title}</p>
                      <p className="text-gray-600">{content}</p>
                      {button && <div className="mt-1">{button}</div>}
                    </div>
                  </div>
                ))}

                <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Star className="h-5 w-5 text-orange-500" aria-hidden="true" />
                    <span className="font-semibold text-orange-800">Premium Experience</span>
                  </div>
                  <p className="text-sm text-orange-700">
                    Visit us for a free facility tour and see why we're rated #1
                    in Nagpur for sports facilities.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* FAQ Section */}
            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <Headphones className="h-6 w-6 text-orange-500" aria-hidden="true" />
                  Frequently Asked Questions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg overflow-hidden"
                    >
                      <button
                        onClick={() =>
                          setExpandedFaq(expandedFaq === index ? null : index)
                        }
                        aria-expanded={expandedFaq === index}
                        aria-controls={`faq-answer-${index}`}
                        id={`faq-question-${index}`}
                        className="w-full px-4 py-3 text-left font-semibold text-gray-900 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500"
                      >
                        {faq.question}
                      </button>
                      <div
                        id={`faq-answer-${index}`}
                        role="region"
                        aria-labelledby={`faq-question-${index}`}
                        className={`px-4 pb-3 text-gray-600 text-sm transition-max-height duration-300 ease-in-out ${
                          expandedFaq === index ? "max-h-96" : "max-h-0 overflow-hidden"
                        }`}
                      >
                        {faq.answer}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Section */}
        <Card className="shadow-xl border-0 mb-16">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900 text-center">
              Find Us on Map
            </CardTitle>
            <p className="text-gray-600 text-center">
              Located in the heart of Nagpur with easy access and ample parking
            </p>
          </CardHeader>
          <CardContent>
            <div className="aspect-video rounded-xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.588183653002!2d79.13370407526156!3d21.208512380486198!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c700347f32fd%3A0xd2dbc80d0481e8c7!2sStriker%E2%80%99s%20zone!5e0!3m2!1sen!2sin!4v1753078444887!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-xl"
                title="Striker Zone Sports Complex Location"
              />
            </div>
            <div className="mt-6 grid md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-gray-900">5 min</div>
                <div className="text-gray-600">From City Center</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">50+</div>
                <div className="text-gray-600">Parking Spaces</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">24/7</div>
                <div className="text-gray-600">Security</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-3xl p-8 lg:p-12 max-w-4xl mx-auto">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Still Have Questions?
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Our friendly team is always ready to help. Whether it's about
              booking, facilities, or special requirements, we're just a call
              away.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-3 rounded-xl font-semibold cursor-pointer flex items-center justify-center"
                aria-label="Call Now"
              >
                <Phone className="h-5 w-5 mr-2" aria-hidden="true" />
                Call Now
              </Button>
              <Button
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-3 rounded-xl font-semibold cursor-pointer flex items-center justify-center"
                aria-label="WhatsApp Us"
              >
                <MessageCircle className="h-5 w-5 mr-2" aria-hidden="true" />
                WhatsApp Us
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
