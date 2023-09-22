"use client";
import React, { useState } from "react";
import { Button, Dialog, Flex } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

const DeleteTask = (props) => {
  const router = useRouter();
  const taskid = props.taskId;
  const projectID = props.projectId;
  const [uniqID, setUniqID] = useState();

  const handleDeleteTask = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/task/${taskid}`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (data.success) {
        router.push(`/project/projectdetails/${projectID}`);
      } else {
        console.error("Error deleting task:", data.error);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
  return (
    <div>
      {" "}
      <Dialog.Root>
        <Dialog.Trigger>
          <Button color="gray">Delete</Button>
        </Dialog.Trigger>

        <Dialog.Content style={{ maxWidth: 450 }}>
          <Dialog.Title>Delete Task</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            Please enter "TASK ID" for delete task....
          </Dialog.Description>

          <Flex direction="column" gap="3">
            <input
              type="text"
              value={uniqID}
              onChange={(e) => setUniqID(e.target.value)}
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
              <Button
                onClick={handleDeleteTask}
                disabled={props?.UID != uniqID ? true : false}
              >
                Delete
              </Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
};

export default DeleteTask;
