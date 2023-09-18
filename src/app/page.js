"use client";
import { useSession } from "next-auth/react";

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
    <div className="text-3xl font-bold underline text-center">hello world</div>
  );
}
