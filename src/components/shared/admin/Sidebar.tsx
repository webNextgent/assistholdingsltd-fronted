"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { href: "/admin/dashboard", label: "Dashboard" },
    { href: "/admin/dashboard/properties", label: "Properties" },
    { href: "/admin/dashboard/slider", label: "Slider" },
    { href: "/admin/dashboard/testimonial", label: "Testimonial" },
    { href: "/admin/dashboard/schedule", label: "Schedule" },
    { href: "/admin/dashboard/blog", label: "Blog" },
    { href: "/admin/dashboard/gallery", label: "Gallery" },
    { href: "/admin/dashboard/setting", label: "Setting" },
    { href: "/admin/dashboard/newAdmin", label: "Add New Admin" }
  ];

  return (
    <div className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2">
      <div className="text-white flex items-center space-x-2 px-4">
        <span className="text-2xl font-extrabold">Admin Panel</span>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`block py-2.5 px-4 rounded transition duration-200 ${
              pathname === item.href
                ? "bg-[#7A3E1B] text-white"
                : "hover:bg-gray-700 hover:text-white"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}