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
    setProjects(data.result);
    if (data.success) {
      data.result;
      router.push("http://localhost:3000/");
    } else {
      return { success: false };
    }
  };

  return (
    <>
      <div className="p-6 w-full">
        <div className="mt-8">
          <div className="flex justify-end p-2">
            <Link href={"/addproject"}>
              <button className="p-3  bg-slate-600 rounded-md border-none text-white">
                Add project
              </button>
            </Link>
          </div>
          <h3 className="text-4xl p-4 text-center font-bold bg-slate-400 w-full">
            Project
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-slate-600">
              <thead>
                <tr className="text-left">
                  <th className="px-4 py-2  border border-slate-600">
                    Project Name
                  </th>
                  <th className="px-4 py-2 border border-slate-600">
                    Front-end
                  </th>
                  <th className="px-4 py-2 border border-slate-600">
                    Back-end
                  </th>
                  <th className="px-4 py-2 border border-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects?.map((project) => (
                  <tr key={project._id} className="border border-slate-600">
                    <td className="border border-slate-600 px-4 py-2">
                      <Link href={`project/projectdetails/${project._id}`}>
                        {project.projectName}
                      </Link>
                    </td>
                    <td className="border border-slate-600 px-4 py-2">
                      {project.frontend}
                    </td>
                    <td className="border border-slate-600 px-4 py-2">
                      {project.backend}
                    </td>
                    <td className="border border-slate-600 px-3">
                      <div className="flex gap-2 ">
                        <button className="p-2 bg-slate-300 px-5 rounded-md">
                          <DeleteButton id={project._id} />
                        </button>
                        <Link href={`/project/${project._id}`}>
                          <button className="p-2 bg-slate-300 px-5 rounded-md">
                            <AiFillEdit className="cursor-pointer" />
                          </button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectList;
