"use client";
import { Button, Dialog, Flex } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const EditEmployee = ({ Employee }) => {
  const router = useRouter();
  const [updateEmployeeData, setUpdateEmployeeData] = useState({
    name: Employee.name ?? "",
    email: Employee.email ?? "",
    designation: Employee.designation ?? "",
  });

  const handleUpdateEmployee = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/employee/${Employee._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateEmployeeData),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        if (responseData.success) {
          alert("Project updated successfully");
          router.push(`employees`);
        } else {
          alert("Failed to update project");
        }
      } else {
        alert("Failed to update project");
      }
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  return (
    <div>
      <Dialog.Root>
        <Dialog.Trigger>
          <Button color="gray">Edit</Button>
        </Dialog.Trigger>

        <Dialog.Content style={{ maxWidth: 450 }}>
          <Dialog.Title>Edit Employee</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            Modify Employee Details
          </Dialog.Description>

          <Flex direction="column" gap="3">
            <input
              type="text"
              placeholder="Name"
              value={updateEmployeeData.name}
              onChange={(e) =>
                setUpdateEmployeeData({
                  ...updateEmployeeData,
                  name: e.target.value,
                })
              }
              className="border rounded p-2 mt-2 w-full"
            />

            <input
              type="email"
              placeholder="Email"
              value={updateEmployeeData.email}
              onChange={(e) =>
                setUpdateEmployeeData({
                  ...updateEmployeeData,
                  email: e.target.value,
                })
              }
              className="border rounded p-2 mt-2 w-full"
            />

            <input
              type="text"
              placeholder="Designation"
              value={updateEmployeeData.designation}
              onChange={(e) =>
                setUpdateEmployeeData({
                  ...updateEmployeeData,
                  designation: e.target.value,
                })
              }
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
              <Button onClick={handleUpdateEmployee}>Edit Employee</Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
};

export default EditEmployee;
