"use client";

import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { UserMenu } from "@/components/admin/UserMenu";
import { HiOutlineSparkles } from "react-icons/hi2"
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#070B14] text-white min-h-screen ">
    
      <div className="flex  h-full ">
        <AdminSidebar />
         
        <div className="  bg-[#070B14] text-white xl:pl-[280px] w-full h-full">
          

          {/* Header */}
          <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0B1120]/80 backdrop-blur-xl">
            <div className="flex h-16 items-center justify-between pl-16 pr-4 lg:px-8">
              

              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 shadow-lg shadow-violet-500/20">
                  <HiOutlineSparkles className="text-base text-white" />
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-sm font-semibold tracking-wide text-white">Velvet Admin</h1>
                  <p className="text-xs text-zinc-400">Ecommerce Management Panel</p>
                </div>
              </div>

              <UserMenu />
            </div>
          </header>

          {/* Main Content */}
          <main className=" p-5 h-full  ">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}



 