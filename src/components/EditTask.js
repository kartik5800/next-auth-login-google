"use client";
import { Button, Dialog, Flex } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

const EditTask = ({ id, taskData }) => {
  const router = useRouter();
  const [projectEmployee, setProjectEmployee] = useState([]);
  const [selectedUser, setSelectedUser] = useState({
    value: taskData?.assignedUser?._id,
    label: taskData?.assignedUser?.name,
  });

  const [updateTaskData, setUpdateTaskData] = useState({
    taskName: taskData?.taskName ?? "",
    assignedUser: selectedUser?.value,
    status: taskData?.status ?? "",
    priority: taskData?.priority ?? "",
    taskDescription: taskData?.taskDescription ?? "",
    startDate: new Date(taskData?.startDate ?? null),
    endDate: new Date(taskData?.endDate ?? null),
    estimatedTime: taskData?.estimatedTime ?? null,
    done: taskData?.done ?? 0,
  });

  const handleProjectMembersChange = (selectedOption) => {
    setSelectedUser(selectedOption);
    setUpdateTaskData((prevData) => ({
      ...prevData,
      assignedUser: selectedOption.value,
    }));
  };

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

  useEffect(() => {
    getEmployeeOfProject();
  }, []);

  const getEmployeeOfProject = async () => {
    const empData = await fetch(
      `http://localhost:3000/api/project/users/?projectId=${taskData?.projectId}`
    );
    const EmpResponseData = await empData.json();
    const selectedValues = EmpResponseData?.specificUsers?.map((option) => ({
      value: option?._id,
      label: option?.name,
    }));
    setProjectEmployee(selectedValues);
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
                value={updateTaskData?.taskName}
                onChange={(e) =>
                  setUpdateTaskData({
                    ...updateTaskData,
                    taskName: e.target.value,
                  })
                }
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
                value={updateTaskData?.taskDescription}
                onChange={(e) =>
                  setUpdateTaskData({
                    ...updateTaskData,
                    taskDescription: e.target.value,
                  })
                }
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
              <Select
                name="assignedUser"
                options={projectEmployee}
                value={selectedUser}
                onChange={handleProjectMembersChange}
              />
            </div>

            <Flex className="gap-3">
              <div className="mb-2 w-full">
                <label
                  htmlFor="Status"
                  className="block text-gray-600 font-semibold"
                >
                  Status
                </label>
                <select
                  value={updateTaskData?.status}
                  onChange={(e) =>
                    setUpdateTaskData({
                      ...updateTaskData,
                      status: e.target.value,
                    })
                  }
                  className="border rounded p-2 w-full"
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
                  value={updateTaskData?.priority}
                  onChange={(e) =>
                    setUpdateTaskData({
                      ...updateTaskData,
                      priority: e.target.value,
                    })
                  }
                  className="border rounded p-2 w-full"
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
                  selected={updateTaskData?.startDate}
                  onChange={(date) =>
                    setUpdateTaskData({
                      ...updateTaskData,
                      startDate: date,
                    })
                  }
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
                  selected={updateTaskData?.endDate}
                  onChange={(date) =>
                    setUpdateTaskData({
                      ...updateTaskData,
                      endDate: date,
                    })
                  }
                  className="border rounded-md p-2 w-full"
                  dateFormat="dd-MM-yyyy"
                />
              </div>
            </Flex>
            <Flex className="gap-3">
              <div className="mb-2 w-full">
                <label
                  htmlFor="done"
                  className="block text-gray-600 font-semibold"
                >
                  Done %
                </label>
                <select
                  name="done"
                  value={updateTaskData?.done}
                  onChange={(e) =>
                    setUpdateTaskData({
                      ...updateTaskData,
                      done: e.target.value,
                    })
                  }
                  className="border rounded p-2 w-full"
                >
                  <option value="0">0</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="40">40</option>
                  <option value="50">50</option>
                  <option value="60">60</option>
                  <option value="70">70</option>
                  <option value="80">80</option>
                  <option value="90">90</option>
                  <option value="100">100</option>
                </select>
              </div>

              <div className="mb-2 w-full">
                <label
                  htmlFor="estimatedTime"
                  className="block text-gray-600 font-semibold"
                >
                  Estimated time
                </label>
                <input
                  type="text"
                  name="estimatedTime"
                  value={updateTaskData?.estimatedTime}
                  onChange={(e) =>
                    setUpdateTaskData({
                      ...updateTaskData,
                      estimatedTime: e.target.value,
                    })
                  }
                  className="border rounded p-2 w-full"
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
              <Button onClick={handleUpdateProject}>Edit task</Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
};

export default EditTask;
