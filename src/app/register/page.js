"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Ragister = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length === 0) {
      let result = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (result.ok) {
        alert("add user sucessfully");
        setFormData({
          username: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
        });
        router.push("http://localhost:3000/login");
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <section className=" flex flex-col gap-10">
        <div className="title text-center">
          <h1 className="text-gray-800 text-4xl font-bold py-4">Register</h1>
        </div>

        {/* form */}
        <form className="flex flex-col gap-5 ">
          <div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="border-2 p-3 rounded-md"
              value={formData?.username}
              onChange={handleChange}
            />
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="border-2 p-3 rounded-md"
              value={formData?.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              className="border-2 p-3 rounded-md"
              value={formData?.phone}
              onChange={handleChange}
            />
          </div>

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border-2 p-3 rounded-md"
            value={formData?.password}
            onChange={handleChange}
          />

          <div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="border-2 p-3 rounded-md"
              value={formData?.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <p className="text-red-500">{errors.confirmPassword}</p>
            )}
          </div>

          <div>
            {/* <input
              type={`${show ? "text" : "password"}`}
              name="password"
              placeholder="password"
              className="border-2 p-3 rounded-md"
            /> */}
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
              className="p-2 w-max border-2 px-4 rounded-lg"
              onClick={handleSubmit}
            >
              Sign up
            </button>
          </div>
        </form>

        {/* bottom */}
        <p className="text-center text-gray-400 ">
          Have an account? <Link href={"/login"}>Sign In</Link>
        </p>
      </section>
    </div>
  );
};

export default Ragister;
