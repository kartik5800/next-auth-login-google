"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
  const session = useSession();
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Google Handler function
  async function handleGoogleSignin() {
    signIn("google", { callbackUrl: "http://localhost:3000" });
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: formData.password,
      callbackUrl: "/",
    });
    if (result.ok) {
      router.push(result.url);
    } else {
      alert(result.error);
    }
  };

  if (session.status === "loading") {
    return (
      <div className="flex justify-center items-center w-screen h-screen">
        <div className="text-center mt-4">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-slate-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center  h-screen">
      <section className=" flex flex-col gap-10">
        <div className="title text-center">
          <h3 className="text-gray-600 text-2xl font-bold py-4">
            Welcome Back.....!
          </h3>
          <h1 className="text-gray-800 text-4xl font-bold py-4">Explore....</h1>
        </div>

        {/* form */}
        <form className="flex flex-col gap-5 ">
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="border-2 p-3 border-gray-500 rounded-md"
              value={formData?.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <input
              type={`${show ? "text" : "password"}`}
              name="password"
              placeholder="password"
              className="border-2 p-3 rounded-md border-gray-500"
              value={formData?.password}
              onChange={handleChange}
            />
            {/* <span
              className="icon flex items-center px-4"
              onClick={() => setShow(!show)}
            >
              <HiFingerPrint size={25} />
            </span> */}
          </div>

          {/* login buttons */}
          <div className="input-button flex justify-center">
            <button
              className="p-2 w-max border-2 px-4 rounded-lg border-gray-500"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>

          <div className=" flex justify-center">
            <p>-----------------</p>
            <p>or</p>
            <p>-------------------</p>
          </div>

          <div className="input-button flex justify-center">
            <button
              type="button"
              className="flex justify-center items-center p-2 border-2 border-gray-500"
              onClick={handleGoogleSignin}
            >
              <Image
                src={"/google.png"}
                alt="loginimage"
                width={20}
                height={20}
              ></Image>{" "}
              Sign In with Google
            </button>
          </div>
        </form>

        {/* bottom */}
        <p className="text-center text-gray-400 ">
          don't have an account yet? <Link href={"/register"}>Sign Up</Link>
        </p>
      </section>
    </div>
  );
};

export default Login;
