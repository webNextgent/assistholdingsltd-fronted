"use client";

import { useRouter } from "next/navigation";

export default function Topbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <header className="bg-white shadow-sm ">
      <div className="flex justify-between items-center px-6 py-4 ">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-[#7A3E1B] text-white px-4 py-2 rounded-lg hover:bg-[#7A3E1B] transition-colors"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
