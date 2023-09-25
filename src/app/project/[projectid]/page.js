"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";

export default function UpdateProject({ params }) {
  const router = useRouter();
  const ID = params.projectid;

  const [updatedProjectData, setUpdatedProjectData] = useState({
    projectName: "",
    frontend: "",
    backend: "",
    projectDescription: "",
    startDate: null,
    endDate: null,
    projectMembers: [],
  });

  const [allEmployees, setAllEmployees] = useState([]);

  useEffect(() => {
    getProjectData();
    fetchEmployees();
  }, [ID]);

  const fetchEmployees = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/employee");
      if (response.ok) {
        const data = await response.json();
        const employees = data.result;
        setAllEmployees(
          employees.map((employee) => ({
            value: employee._id,
            label: employee.name,
          }))
        );
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const getProjectData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/project/${ID}`);
      if (response.ok) {
        const data = await response.json();
        setUpdatedProjectData({
          projectName: data.result.projectName,
          frontend: data.result.frontend,
          backend: data.result.backend,
          projectDescription: data.result.projectDescription,
          startDate: new Date(data.result.startDate),
          endDate: new Date(data.result.endDate),
          projectMembers: data.result.projectMembers,
        });
      }
    } catch (error) {
      console.error("Error fetching project:", error);
    }
  };

  const handleUpdateProject = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/project/${ID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProjectData),
      });

      if (response.ok) {
        alert("Project updated successfully");
        getProjectData();
        router.push("/");
      } else {
        alert("Failed to update project");
      }
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const handleProjectMembersChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => ({
      _id: option.value,
      name: option.label,
    }));
    setUpdatedProjectData((prevData) => ({
      ...prevData,
      projectMembers: selectedValues,
    }));
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="text-3xl font-bold underline text-center">
        Edit Project
      </div>

      <form className="p-4">
        <div className="mb-4">
          <label
            htmlFor="projectName"
            className="block text-gray-600 font-semibold"
          >
            Project Name
          </label>
          <input
            type="text"
            name="projectName"
            className="border rounded-md p-2 w-full"
            value={updatedProjectData.projectName}
            onChange={(e) =>
              setUpdatedProjectData({
                ...updatedProjectData,
                projectName: e.target.value,
              })
            }
          />
        </div>

        <div className="flex gap-4">
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
              value={updatedProjectData.backend}
              onChange={(e) =>
                setUpdatedProjectData({
                  ...updatedProjectData,
                  backend: e.target.value,
                })
              }
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
              value={updatedProjectData.frontend}
              onChange={(e) =>
                setUpdatedProjectData({
                  ...updatedProjectData,
                  frontend: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="projectDescription"
            className="block text-gray-600 font-semibold"
          >
            Project Description
          </label>
          <textarea
            name="projectDescription"
            rows={5}
            className="border rounded-md p-2 w-full"
            value={updatedProjectData.projectDescription}
            onChange={(e) =>
              setUpdatedProjectData({
                ...updatedProjectData,
                projectDescription: e.target.value,
              })
            }
          />
        </div>

        <div className="flex gap-4">
          <div className="mb-4">
            <label
              htmlFor="startDate"
              className="block text-gray-600 font-semibold"
            >
              Start Date
            </label>
            <DatePicker
              name="startDate"
              selected={updatedProjectData.startDate}
              onChange={(date) =>
                setUpdatedProjectData({
                  ...updatedProjectData,
                  startDate: date,
                })
              }
              className="border rounded-md p-2 w-full"
              dateFormat="dd-MM-yyyy"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="endDate"
              className="block text-gray-600 font-semibold"
            >
              End Date
            </label>
            <DatePicker
              name="endDate"
              selected={updatedProjectData.endDate}
              onChange={(date) =>
                setUpdatedProjectData({
                  ...updatedProjectData,
                  endDate: date,
                })
              }
              className="border rounded-md p-2 w-full"
              dateFormat="dd-MM-yyyy"
            />
          </div>
        </div>

        <div>
          <label>Project Members:</label>
          <Select
            isMulti
            name="projectMembers"
            options={allEmployees}
            value={updatedProjectData.projectMembers.map((member) => ({
              value: member._id,
              label: member.name,
            }))}
            onChange={handleProjectMembersChange}
          />
        </div>

        <div className="flex justify-end">
          <Link href={"/"}>
            <button
              type="button"
              className="bg-red-500 text-white rounded p-2 mr-2"
            >
              Cancel
            </button>
          </Link>
          <button
            type="button"
            onClick={handleUpdateProject}
            className="bg-blue-500 text-white rounded p-2"
          >
            Update Project
          </button>
        </div>
      </form>
    </div>
  );
}
