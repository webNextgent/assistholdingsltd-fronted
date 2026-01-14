"use client";

export default function DashboardPage() {


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center bg-white px-10 py-14 rounded-3xl shadow-md border border-gray-100">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">
          Welcome to Your Dashboard 🎉
        </h1>
        <p className="text-gray-500 text-lg max-w-md mx-auto">
          You're successfully logged in. Explore and manage your content easily
          from here.
        </p>
      </div>
    </div>
  );
}