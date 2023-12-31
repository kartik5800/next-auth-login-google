import Provider from "@/components/SessionProvider";
import "./globals.css";
import { getServerSession } from "next-auth";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className=" w-full">
        <Provider session={session}>{children}</Provider>
      </body>
    </html>
  );
}
