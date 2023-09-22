"use client";
import React from "react";
import { Button, Dialog, Flex } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

const DeleteEmployee = (props) => {
  const router = useRouter();
  const empid = props.ID;

  const handleDeleteEmployee = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/employee/${empid}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();
      if (data.success) {
        router.push(`/employees`);
      } else {
        console.error("Error deleting employee:", data.error);
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };
  return (
    <div>
      <Dialog.Root>
        <Dialog.Trigger>
          <Button color="gray">Delete</Button>
        </Dialog.Trigger>

        <Dialog.Content style={{ maxWidth: 450 }}>
          <Dialog.Title>Delete Employee</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            are you sure to delete employee....????
          </Dialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button onClick={handleDeleteEmployee}>Delete</Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
};

export default DeleteEmployee;
