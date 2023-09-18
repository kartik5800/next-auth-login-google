"use client";
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
      alert("record delete sucessfully");
      router.push("/");
    } else {
      alert("something went wrong");
    }
  };

  return <AiFillDelete onClick={handleDelete} />;
};

export default DeleteButton;
