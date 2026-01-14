/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { usePathname } from "next/navigation";
import { useCreateScheduleMutation } from "@/redux/features/schedule/scheduleApi";

const menuItems = [
  "Home",
  "About",
  "Properties",
  "Gallery",
  // "CSR",
  // "Career",
  "Blogs",
  "Contact",

];

// Utility function
function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/&/g, "-and-")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const PhoneIcon = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-5.6-5.6 19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.08 2h3a2 2 0 0 1 2 1.74a17.5 17.5 0 0 0 .61 1.74c.48.91-.18 2-1 2.55L6.5 10.28c.79 2 .57 4.14 1.35 5.16s2 1.34 4 1.34s4.21-.36 5.16-1.35l1.08-.68c.55-.81 1.63-1.4 2.55-1A2 2 0 0 1 22 16.92z" />
  </svg>
);

const CloseIcon = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const CalendarIcon = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

// Schedule Modal Component
const ScheduleModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    date: "",
  });

  const [createSchedule, { isLoading, isError, isSuccess }] =
    useCreateScheduleMutation();

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await createSchedule(formData).unwrap();
      if (result.success) {
        toast.success("Schedule created successfully!", {
          position: "top-right",
        });
      }

      // Reset form and close modal
      setFormData({
        name: "",
        phone: "",
        email: "",
        message: "",
        date: "",
      });
      onClose();
    } catch (error: any) {
      console.error("Failed to create schedule:", error);
      toast.error(
        error?.data?.message || "Failed to create schedule. Please try again.",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Show success/error toasts based on mutation state
  useEffect(() => {
    if (isSuccess) {
      toast.success("Schedule created successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }

    if (isError) {
      toast.error("Failed to create schedule. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }, [isSuccess, isError]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-gray-300 rounded-lg shadow-xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Schedule Appointment
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 cursor-pointer hover:text-gray-700 transition-colors"
              disabled={isLoading}
            >
              <CloseIcon className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex justify-between items-center gap-4">
              <div className="flex-1">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-full text-black px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#783D1B] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="flex-1">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-full px-3 py-2 text-black border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#783D1B] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            <div className="flex justify-between items-center gap-4">
              <div className="flex-1">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-full px-3 text-black py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#783D1B] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Enter your email"
                />
              </div>

              <div className="flex-1">
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Preferred Date *
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  required
                  value={formData.date}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-full px-3 py-2 text-black border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#783D1B] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full px-3 py-2 text-black border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#783D1B] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Any additional information..."
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                disabled={isLoading}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 px-4 py-2 text-white bg-[#783D1B] rounded-md hover:bg-[#6a3518] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Scheduling...
                  </>
                ) : (
                  "Schedule"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Active Link Component
const ActiveLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const pathname = usePathname();

  const isActive =
    pathname === href ||
    (href !== "/" && pathname.startsWith(href)) ||
    (href === "/" && pathname === "/");

  return (
    <Link
      href={href}
      className={`uppercase text-sm font-medium transition relative group ${
        isActive ? "text-[#F6BD2F]" : "text-white hover:text-gray-400"
      }`}
    >
      {children}
      {/* Underline */}
      <span
        className={`absolute -bottom-1 left-0 h-0.5 transition-all duration-300 ${
          isActive ? "w-full bg-[#F6BD2F]" : "w-0 bg-white group-hover:w-full"
        }`}
      />
    </Link>
  );
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const pathname = usePathname();

  const handleMenuToggle = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((error) => {
        console.log("Audio playback failed:", error);
      });
    }
    setOpen((s) => !s);
  }, []);

  const handleCloseMenu = useCallback(() => {
    setOpen(false);
  }, []);

  const handleScheduleClick = () => {
    setIsScheduleModalOpen(true);
  };

  // Check if a menu item is active (for mobile menu)
  const isMenuItemActive = (item: string) => {
    const itemHref = item.toLowerCase() === "home" ? "/" : `/${slugify(item)}`;
    return (
      pathname === itemHref ||
      (itemHref !== "/" && pathname.startsWith(itemHref))
    );
  };

  // Scroll handler to show/hide navbar
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    // Check if at the very top of the page
    setIsAtTop(currentScrollY === 0);

    if (currentScrollY <= 0) {
      // At the top of the page - always show
      setIsVisible(true);
    } else if (currentScrollY < lastScrollY) {
      // Scrolling UP - show navbar
      setIsVisible(true);
    } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
      // Scrolling DOWN and past 100px - hide navbar
      setIsVisible(false);
    }

    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    // Add scroll event listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <>
      <header
        className={`w-full fixed top-0 left-0 z-50 text-white transition-all duration-500 bg-black/60  ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${
          // Background conditions
          open
            ? "bg-black/80 backdrop-blur-md"
            : isAtTop
            ? "bg-black/50"
            : "bg-black/70 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-12 ">
          <div className="flex items-center justify-between  h-20">
            {/* Left: Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src='https://i.postimg.cc/wMKgd1D8/logo-icon.png'
                alt="Assist Holdings Limited Logo"
                width={96}
                height={96}
                className="h-16 w-auto"
              />
            </Link>

            {/* Desktop Navigation - Middle Menu Items */}
            <div className="hidden lg:flex items-center gap-8">
              <ActiveLink href="/">Home</ActiveLink>
              <ActiveLink href="/about">About us</ActiveLink>
              <ActiveLink href="/properties">Project</ActiveLink>

              <ActiveLink href="/gallery">Gallery</ActiveLink>
              {/* <ActiveLink href="/career">Career</ActiveLink> */}
              <ActiveLink href="/blogs">Blogs</ActiveLink>
              <ActiveLink href="/contact">Contact us</ActiveLink>
              <div className="flex items-center gap-3">
                <PhoneIcon className="text-white hover:text-sky-300 transition" />
                <a
                  href="tel:09649112235"
                  className="text-sm font-light text-white hover:text-sky-300 transition"
                >
                 09649-112235
                </a>
              </div>
            </div>

            {/* Desktop Navigation - Right Side */}
            <div className="hidden md:flex items-center gap-6">
              <button
                onClick={handleScheduleClick}
                className="flex items-center gap-2 px-4 border-2 border-[#F6BE2C] py-2 hover:bg-[#F6BE2C] hover:text-white  rounded-md  transition-colors"
              >
                <CalendarIcon className="w-4 h-4" />
                <span className="text-sm font-medium uppercase">
                  Schedule a visit
                </span>
              </button>
            </div>

            {/* Mobile Navigation */}
            <div className="flex md:hidden items-center gap-4">
              {/* Schedule Button for Mobile */}
              <button
                onClick={handleScheduleClick}
                className="flex items-center gap-1 p-2 bg-white text-black rounded-md hover:bg-gray-100 transition-colors"
              >
                <CalendarIcon className="w-4 h-4" />
              </button>

              <p className="uppercase text-sm font-medium hover:text-sky-300 transition">
                MENU
              </p>
              <div className="relative group">
                {!open ? (
                  <button
                    aria-expanded={open}
                    aria-controls="menu"
                    onClick={handleMenuToggle}
                    className="flex flex-col justify-between w-8 h-6 p-0 bg-transparent cursor-pointer focus:outline-none transition-all duration-300"
                  >
                    <span className="block h-px bg-white rounded-full w-full transition-all duration-300 group-hover:w-full"></span>
                    <span className="block h-px bg-white rounded-full w-full transition-all duration-300 group-hover:w-[70%] group-hover:self-center"></span>
                    <span className="block h-px bg-white rounded-full w-full transition-all duration-300 group-hover:w-[40%] group-hover:self-end"></span>
                  </button>
                ) : (
                  <button
                    onClick={handleCloseMenu}
                    className="flex items-center justify-center w-10 h-10 p-2 bg-transparent cursor-pointer focus:outline-none transition-all duration-300 border-2 border-white rounded-full hover:border-sky-300"
                  >
                    <CloseIcon className="text-white hover:text-sky-300 transition w-6 h-6" />
                  </button>
                )}

                {/* Dropdown Menu */}
                {open && (
                  <div
                    id="menu"
                    className="origin-top-right absolute right-0 -mt-15 w-80 p-5 rounded-md shadow-xl bg-[#2D2D2D] text-white ring-1 ring-gray-600 ring-opacity-50 z-50 transition-all duration-300 max-h-screen overflow-y-auto"
                  >
                    {/* Close Button inside menu */}
                    <div className="flex justify-end mb-4">
                      <button
                        onClick={handleCloseMenu}
                        className="flex items-center justify-center w-10 h-10 p-2 bg-transparent cursor-pointer focus:outline-none transition-all duration-300 border-2 border-white rounded-full hover:border-sky-300"
                      >
                        <CloseIcon className="text-white transition w-6 h-6" />
                      </button>
                    </div>

                    {/* Dropdown Links */}
                    <div className="py-4 px-6">
                      <div className="flex flex-col gap-6">
                        {/* Main Menu Items */}
                        <div className="flex flex-col gap-4">
                          {menuItems
                            .filter(
                              (item) =>
                                item === "Residential" ||
                                item === "Commercial" ||
                                item === "Home" ||
                                item === "About" ||
                                item === "Properties"
                            )
                            .map((item) => (
                              <Link
                                key={item}
                                href={
                                  item.toLowerCase() === "home"
                                    ? "/"
                                    : `/${slugify(item)}`
                                }
                                onClick={handleCloseMenu}
                                className={`relative text-xl font-medium transition ${
                                  isMenuItemActive(item)
                                    ? "text-[#F6BD2F]"
                                    : "text-white hover:text-gray-300"
                                }`}
                              >
                                {item}
                                {/* Underline for active item */}
                                {isMenuItemActive(item) && (
                                  <span className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-[#F6BD2F]" />
                                )}
                              </Link>
                            ))}
                        </div>

                        {/* Other Menu Items */}
                        <div className="grid grid-cols-1 gap-3">
                          {menuItems
                            .filter(
                              (item) =>
                                item !== "Residential" &&
                                item !== "Commercial" &&
                                item !== "Home" &&
                                item !== "About" &&
                                item !== "Properties"
                            )
                            .map((item) => (
                              <Link
                                key={item}
                                href={
                                  item.toLowerCase() === "home"
                                    ? "/"
                                    : `/${slugify(item)}`
                                }
                                onClick={handleCloseMenu}
                                className={`relative text-lg font-normal transition ${
                                  isMenuItemActive(item)
                                    ? "text-[#F6BD2F]"
                                    : "text-white hover:text-gray-300"
                                }`}
                              >
                                {item}
                                {/* Underline for active item */}
                                {isMenuItemActive(item) && (
                                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#F6BD2F]" />
                                )}
                              </Link>
                            ))}
                        </div>
                      </div>

                      {/* Separator */}
                      <div className="border-t border-gray-600 my-6"></div>

                      {/* Phone Number */}
                      <div className="flex items-center gap-3 mb-4">
                        <PhoneIcon className="text-white" />
                        <a
                          href="tel:09649112235"
                          className="text-sm font-light text-white hover:text-sky-300 transition"
                        >
                          09649112235
                        </a>
                      </div>

                      {/* Footer */}
                      <div className="text-sm text-gray-300">
                        <div className="mb-4">
                          <h3 className="font-semibold text-white mb-2">
                            Assist Holdings Limited
                          </h3>
                          <p>Plot:11(Level-9), Main Road, Block:D,</p>
                          <p>Aftabnagar, Dhaka-1212</p>
                        </div>
                        <div className="text-xs text-gray-400">
                          <p>
                            © 2025 Assist Holdings Limited | All Rights
                            Reserved.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Schedule Modal */}
      <ScheduleModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
      />
    </>
  );
}
