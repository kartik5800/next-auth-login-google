"use client";
import { Button, Dialog, Flex } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const EditTask = ({ id, projectId }) => {
  // const router = useRouter();
  const [updateTaskData, setUpdateTaskData] = useState({
    taskName: "",
    assignedUser: "",
    status: "",
  });

  console.log("updateTaskData", updateTaskData);

  useEffect(() => {
    getProject();
  }, []);

  const getProject = async () => {
    let data = await fetch(`http://localhost:3000/api/project/task/${id}`, {
      cache: "no-store",
    });
    data = await data.json();
    if (data.success) {
      setUpdateTaskData(data.task);
    } else {
      return { success: false };
    }
  };

  const handleUpdateProject = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/project/task/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateTaskData),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        if (responseData.success) {
          alert("Project updated successfully");
          // router.push(`/project/projectdetails/${projectId}/task/${id}`);
          getProject();
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
      {" "}
      <Dialog.Root>
        <Dialog.Trigger>
          <Button color="gray">Edit</Button>
        </Dialog.Trigger>

        <Dialog.Content style={{ maxWidth: 450 }}>
          <Dialog.Title>Edit Task</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            After creating task you got task ID
          </Dialog.Description>

          <Flex direction="column" gap="3">
            <input
              type="text"
              value={updateTaskData.taskName}
              onChange={(e) =>
                setUpdateTaskData({
                  ...updateTaskData,
                  taskName: e.target.value,
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
              <Button onClick={handleUpdateProject}>Edit task</Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
};

export default EditTask;
