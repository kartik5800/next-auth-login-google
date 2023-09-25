"use client";
import { Button, Dialog, Flex, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { AiFillDelete } from "react-icons/ai";

const DeleteButton = ({ id }) => {
  const router = useRouter();
  const handleDelete = async () => {
    let data = await fetch(`http://localhost:3000/api/project/${id}`, {
      method: "DELETE",
    });
    data = await data.json();
    if (data.success) {
      router.push("http://localhost:3000");
    } else {
      alert("something went wrong");
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button color="red">
          <AiFillDelete />
        </Button>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>Delete Task</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          <Text>Are you sure to Delete...?</Text>
        </Dialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button onClick={handleDelete}>Delete</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default DeleteButton;
