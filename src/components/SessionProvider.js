"use client";

import { useRouter } from "next/navigation";
import { SessionProvider, useSession } from "next-auth/react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Provider = ({ children }) => {
  return (
    <SessionProvider>
      <AuthChecker>
        <div className="flex flex-col">
          <Navbar />
          <div className="flex">
            <Sidebar />
            <main className="bg-gray-200 w-full">{children}</main>
          </div>
        </div>
      </AuthChecker>
    </SessionProvider>
  );
};

const AuthChecker = ({ children }) => {
  const session = useSession();
  const router = useRouter();

  if (session?.status === "loading") {
    return (
      <div className="flex justify-center items-center w-screen h-screen">
        <div className="text-center mt-4">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-slate-600 mx-auto"></div>
        </div>
      </div>
    );
  }
  if (session?.status === "unauthenticated") {
    router.push("/login");
  }

  return <>{children}</>;
};

export default Provider;
