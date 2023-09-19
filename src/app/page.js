"use client";

import { useSession } from "next-auth/react";

import ProjectList from "./project/page";
import AddProject from "./addproject/page";

export default function Home() {
  const session = useSession();

  if (session?.status === "loading") {
    return (
      <div className="flex justify-center items-center w-screen h-screen">
        Processing...
      </div>
    );
  }

  return (
    <div className=" flex flex-col justify-center items-center">
      <ProjectList />
      <AddProject />
    </div>
  );
}
