"use client";

import { useSession } from "next-auth/react";
import ProjectList from "./project/page";

export default function Home() {
  const session = useSession();

  if (session?.status === "loading") {
    return (
      <div className="flex justify-center items-center w-screen h-screen">
        <div className="text-center mt-4">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-slate-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {session?.status === "authenticated" ? (
        <div className=" flex flex-col justify-center items-center">
          <ProjectList />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
