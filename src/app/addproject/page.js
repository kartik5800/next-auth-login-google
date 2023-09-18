import { useRouter } from "next/navigation";
import { useState } from "react";
import { v4 as uuid } from "uuid";

const AddProject = () => {
  const router = useRouter();
  const [projectData, setProjectData] = useState({
    id: uuid(),
    projectname: "",
    frontend: "",
    backend: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData({
      ...projectData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("projectData", projectData);
    const newErrors = {};

    if (Object.keys(newErrors).length === 0) {
      let result = await fetch("http://localhost:3000/api/project", {
        method: "POST",
        cache: "no-store",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectData),
      });

      if (result.ok) {
        alert("add project sucessfully");
        setProjectData({
          projectname: "",
          frontend: "",
          backend: "",
        });
        router.push("http://localhost:3000");
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div>
      <div className="text-3xl font-bold underline text-center">
        Add project
      </div>
      <div className=" flex-col justify-center items-center">
        <form className="p-4 flex-col justify-center items-center">
          <div className="mb-4">
            <label
              htmlFor="projectName"
              className="block text-gray-600 font-semibold"
            >
              Project Name
            </label>
            <input
              type="text"
              name="projectname"
              className="border rounded-md p-2 w-full"
              value={projectData.projectname}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="projectName"
              className="block text-gray-600 font-semibold"
            >
              Back-end
            </label>
            <input
              type="text"
              name="backend"
              className="border rounded-md p-2 w-full"
              value={projectData.backend}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="projectName"
              className="block text-gray-600 font-semibold"
            >
              Front-end
            </label>
            <input
              type="text"
              name="frontend"
              className="border rounded-md p-2 w-full"
              value={projectData.frontend}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white rounded p-2"
              onClick={handleSubmit}
            >
              Add Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProject;
