"use client";
import { Button, Dialog, Flex } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const EditTask = ({ id, taskData }) => {
  const router = useRouter();
  const [updateTaskData, setUpdateTaskData] = useState({
    taskName: taskData.taskName ?? "",
    assignedUser: taskData.assignedUser ?? "",
    status: taskData.status ?? "",
  });

  const handleUpdateProject = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/task/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateTaskData),
      });

      if (response.ok) {
        const responseData = await response.json();
        if (responseData.success) {
          alert("Project updated successfully");
          router.push(
            `/project/projectdetails/${taskData.projectId}/task/${id}`
          );
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

            <select
              value={updateTaskData.assignedUser}
              onChange={(e) =>
                setUpdateTaskData({
                  ...updateTaskData,
                  assignedUser: e.target.value,
                })
              }
              className="border rounded p-2 mt-2 w-full"
            >
              <option value="kartik">kartik</option>
              <option value="deep">deep</option>
              <option value="kishan">kishan</option>
              <option value="mit">mit</option>
            </select>

            <select
              value={updateTaskData.status}
              onChange={(e) =>
                setUpdateTaskData({
                  ...updateTaskData,
                  status: e.target.value,
                })
              }
              className="border rounded p-2 mt-2 w-full"
            >
              <option value="Progress">Progress</option>
              <option value="Complete">Complete</option>
            </select>
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
