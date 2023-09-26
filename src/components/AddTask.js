import { Button, Dialog, Flex } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

function AddTask({ projectId, projectMembers }) {
  const { data: session } = useSession();
  const router = useRouter();

  const [taskData, setTaskData] = useState({
    taskName: "",
    createdBy: session.user.name,
    assignedUser: "",
    status: "not_started",
    priority: "low",
    taskDescription: "",
    startDate: null,
    endDate: null,
    estimatedTime: "",
    done: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleStartDateChange = (date) => {
    setTaskData({
      ...taskData,
      startDate: date,
    });
  };

  const handleEndDateChange = (date) => {
    setTaskData({
      ...taskData,
      endDate: date,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/task", {
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
          assignedUser: "",
          status: "",
          priority: "",
          taskDescription: "",
          startDate: null,
          estimatedTime: null,
          done: "",
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
          <Dialog.Title color="red">Create Task</Dialog.Title>

          <Flex direction="column" gap="3">
            <div className="mb-2">
              <label
                htmlFor="taskName"
                className="block text-gray-600 font-semibold"
              >
                Task Name
              </label>
              <input
                type="text"
                name="taskName"
                placeholder="Task name"
                value={taskData?.taskName}
                onChange={handleInputChange}
                className="border rounded p-2 w-full"
              />
            </div>

            <div className="mb-2">
              <label
                htmlFor="taskDescription"
                className="block text-gray-600 font-semibold"
              >
                Task Description
              </label>
              <textarea
                name="taskDescription"
                className="border rounded-md p-2 w-full"
                value={taskData?.taskDescription}
                onChange={handleInputChange}
                rows={2}
              />
            </div>

            <div className="mb-2">
              <label
                htmlFor="assignedUser"
                className="block text-gray-600 font-semibold"
              >
                Assigned User
              </label>
              <select
                name="assignedUser"
                value={taskData?.assignedUser}
                onChange={handleInputChange}
                className="border rounded p-2 mt-2 w-full"
              >
                {projectMembers?.map((member) => {
                  return (
                    <option key={member?._id} value={member?._id}>
                      {member?.name}
                    </option>
                  );
                })}
              </select>
            </div>

            <Flex className="gap-3">
              <div className="mb-2 w-full">
                <label
                  htmlFor="status"
                  className="block text-gray-600 font-semibold"
                >
                  Status
                </label>
                <select
                  name="status"
                  value={taskData?.status}
                  onChange={handleInputChange}
                  className="border rounded p-2 mt-2 w-full"
                >
                  <option value="not_started">Not started</option>
                  <option value="pending">Pending</option>
                  <option value="progress">Progress</option>
                  <option value="complete">Complete</option>
                </select>
              </div>

              <div className="mb-2 w-full">
                <label
                  htmlFor="priority"
                  className="block text-gray-600 font-semibold"
                >
                  Priority
                </label>
                <select
                  name="priority"
                  value={taskData?.priority}
                  onChange={handleInputChange}
                  className="border rounded p-2 mt-2 w-full"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </Flex>

            <Flex className="gap-3">
              <div className="mb-2 w-full">
                <label
                  htmlFor="startDate"
                  className="block text-gray-600 font-semibold"
                >
                  Start date
                </label>
                <DatePicker
                  name="startDate"
                  selected={taskData?.startDate}
                  onChange={handleStartDateChange}
                  className="border rounded-md p-2 w-full"
                  dateFormat="dd-MM-yyyy"
                />
              </div>

              <div className="mb-2 w-full">
                <label
                  htmlFor="endDate"
                  className="block text-gray-600 font-semibold"
                >
                  End date
                </label>
                <DatePicker
                  name="endDate"
                  selected={taskData?.endDate}
                  onChange={handleEndDateChange}
                  className="border rounded-md p-2 w-full"
                  dateFormat="dd-MM-yyyy"
                />
              </div>
            </Flex>
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
