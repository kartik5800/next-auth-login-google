"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";

const AddProject = () => {
  const router = useRouter();
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [allEmployees, setAllEmployees] = useState([]);
  const [projectData, setProjectData] = useState({
    id: uuid(),
    projectName: "",
    frontend: "",
    backend: "",
    projectDescription: "",
    startDate: null,
    endDate: null,
    projectMembers: [],
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData({
      ...projectData,
      [name]: value,
    });
  };

  const handleStartDateChange = (date) => {
    setProjectData({
      ...projectData,
      startDate: date,
    });
  };

  const handleEndDateChange = (date) => {
    setProjectData({
      ...projectData,
      endDate: date,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    projectData.projectMembers = selectedEmployees;
    if (Object.keys(newErrors).length === 0) {
      let result = await fetch("http://localhost:3000/api/project", {
        method: "POST",
        cache: "no-store",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectData),
      });

      if (result.ok) {
        alert("Add project successfully");
        setProjectData({
          projectName: "",
          frontend: "",
          backend: "",
          projectDescription: "",
          startDate: null,
          endDate: null,
        });
        setSelectedEmployees([]);
        router.push("http://localhost:3000");
      }
    } else {
      setErrors(newErrors);
    }
  };

  useEffect(() => {
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

    fetchEmployees();
  }, []);

  const handleEmployeeSelection = (selectedOptions) => {
    setSelectedEmployees(selectedOptions?.map((option) => option.value));
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="text-3xl font-bold underline text-center">
        Add Project
      </div>

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
            name="projectName"
            className="border rounded-md p-2 w-full"
            value={projectData?.projectName}
            onChange={handleChange}
          />
        </div>

        <div className="flex gap-4 col-auto">
          <div className="mb-4 w-full">
            <label
              htmlFor="backend"
              className="block text-gray-600 font-semibold"
            >
              Back-end
            </label>
            <input
              type="text"
              name="backend"
              className="border rounded-md p-2 w-full"
              value={projectData?.backend}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4 w-full">
            <label
              htmlFor="frontend"
              className="block text-gray-600 font-semibold"
            >
              Front-end
            </label>
            <input
              type="text"
              name="frontend"
              className="border rounded-md p-2 w-full"
              value={projectData?.frontend}
              onChange={handleChange}
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
            className="border rounded-md p-2 w-full"
            value={projectData?.projectDescription}
            onChange={handleChange}
            rows={5}
          />
        </div>

        <div className="flex gap-4 col-auto">
          <div className="mb-4 w-full">
            <label
              htmlFor="startDate"
              className="block text-gray-600 font-semibold"
            >
              Start Date
            </label>
            <DatePicker
              name="startDate"
              selected={projectData?.startDate}
              onChange={handleStartDateChange}
              className="border rounded-md p-2 w-full"
              dateFormat="dd-MM-yyyy"
            />
          </div>

          <div className="mb-4 w-full">
            <label
              htmlFor="endDate"
              className="block text-gray-600 font-semibold"
            >
              End Date
            </label>
            <DatePicker
              name="endDate"
              selected={projectData?.endDate}
              onChange={handleEndDateChange}
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
            value={allEmployees?.filter((employee) =>
              selectedEmployees?.includes(employee.value)
            )}
            onChange={handleEmployeeSelection}
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
  );
};

export default AddProject;
