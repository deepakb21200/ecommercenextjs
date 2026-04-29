"use client";

import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { UserMenu } from "@/components/admin/UserMenu";

 
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" bg-gray-100">
      <div className="flex ">
      <AdminSidebar/>

        <div className="flex flex-1 flex-col">
          {/* Header */}
          <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white px-4 shadow-sm lg:px-6">
            <h1 className="text-lg font-semibold text-gray-700">
              Admin Panel
            </h1>

            <div className="flex items-center gap-4">
              <UserMenu/>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 p-4 lg:p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}