"use client";
import { Button, Dialog, Flex } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function AddEmployee({ projectId }) {
  const { data: session } = useSession();
  const router = useRouter();

  const [empData, setEmpData] = useState({
    name: "",
    email: "",
    designation: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmpData({ ...empData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/employee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(empData),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          router.push("/employees");
        }
        setEmpData({
          name: "",
          email: "",
          designation: "",
        });
      } else {
        console.error("Error adding employee:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  return (
    <div>
      <Dialog.Root>
        <Dialog.Trigger>
          <Button color="blue">Add</Button>
        </Dialog.Trigger>

        <Dialog.Content style={{ maxWidth: 450 }}>
          <Dialog.Title>Add</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            Create a task to assign to the project
          </Dialog.Description>

          <Flex direction="column" gap="3">
            <input
              type="text"
              name="name"
              placeholder="Employee name"
              value={empData.name}
              onChange={handleInputChange}
              className="border rounded p-2 mt-2 w-full"
            />

            <input
              type="text"
              name="email"
              placeholder="enter email"
              value={empData.email}
              onChange={handleInputChange}
              className="border rounded p-2 mt-2 w-full"
            />

            <input
              type="text"
              name="designation"
              placeholder="Designation"
              value={empData.designation}
              onChange={handleInputChange}
              className="border rounded p-2 mt-2 w-full"
            />
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button onClick={handleSubmit}>Create task</Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
}

export default AddEmployee;
