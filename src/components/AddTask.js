import { Button, Dialog, Flex } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function AddTask({ projectId }) {
  const { data: session } = useSession();
  const router = useRouter();

  const [taskData, setTaskData] = useState({
    taskName: "",
    createdBy: session.user.name,
    assignedUser: "",
    status: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/project/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ projectId, ...taskData }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          router.push(`/project/projectdetails/${projectId}`);
        }
        setTaskData({
          taskName: "",
          createdBy: session.user.name,
          assignedUser: "Dummy User",
          status: "Progress",
        });
      } else {
        console.error("Error adding task:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div>
      <Dialog.Root>
        <Dialog.Trigger>
          <Button color="blue">Create Task</Button>
        </Dialog.Trigger>

        <Dialog.Content style={{ maxWidth: 450 }}>
          <Dialog.Title>Create Task</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            Create a task to assign to the project
          </Dialog.Description>

          <Flex direction="column" gap="3">
            <input
              type="text"
              name="taskName"
              placeholder="Task name"
              value={taskData.taskName}
              onChange={handleInputChange}
              className="border rounded p-2 mt-2 w-full"
            />

            <select
              name="assignedUser"
              value={taskData.assignedUser}
              onChange={handleInputChange}
              className="border rounded p-2 mt-2 w-full"
            >
              <option value="kartik">kartik</option>
              <option value="deep">deep</option>
              <option value="sujal">sujal</option>
            </select>

            <select
              name="status"
              value={taskData.status}
              onChange={handleInputChange}
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
              <Button onClick={handleSubmit}>Create task</Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
}

export default AddTask;
