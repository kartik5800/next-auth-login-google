"use client";
import DeleteButton from "@/components/DeleteButton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";

const ProjectList = () => {
  const router = useRouter();

  const [projects, setProjects] = useState([]);

  // Load project data when the component mounts
  useEffect(() => {
    getProject();
  }, []);

  const getProject = async () => {
    let data = await fetch("http://localhost:3000/api/project", {
      cache: "no-store",
    });
    data = await data.json();
    console.log(data);
    setProjects(data.result);
    if (data.success) {
      data.result;
      router.push("http://localhost:3000/");
    } else {
      return { success: false };
    }
  };

  return (
    <div className=" flex flex-col justify-center items-center">
      <div className="mt-8">
        <h3 className="text-2xl text-center font-bold underline">
          Project Listing
        </h3>
        <table className="w-full border-collapse border-2 mt-4">
          <thead>
            <tr>
              <th className="border p-2">Project Name</th>
              <th className="border p-2">Front-end</th>
              <th className="border p-2">Back-end</th>
              <th className="border p-2">action</th>
            </tr>
          </thead>
          <tbody>
            {projects?.map((project) => (
              <tr key={project.id}>
                <Link href={`project/projectdetails/${project._id}`}>
                  <td className="border p-2">{project.projectname}</td>
                </Link>
                <td className="border p-2">{project.frontend}</td>
                <td className="border p-2">{project.backend}</td>
                <td className="border p-2">
                  <div className="flex gap-4">
                    <DeleteButton id={project._id} />
                    <Link href={`/project/${project._id}`}>
                      <AiFillEdit />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectList;
