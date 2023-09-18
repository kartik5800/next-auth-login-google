"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Modal from "react-modal";

export default function SingleProject({ params }) {
  const [projectData, setProjectData] = useState({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [updatedProjectData, setUpdatedProjectData] = useState({
    projectname: "",
    frontend: "",
    backend: "",
  });

  const router = useRouter();
  const ID = params.projectid;

  useEffect(() => {
    getProjectData();
  }, [ID]);

  const getProjectData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/project/${ID}`);
      if (response.ok) {
        const data = await response.json();
        setProjectData(data.result);
      }
    } catch (error) {
      console.error("Error fetching project:", error);
    }
  };

  const handleEditClick = () => {
    setIsEditModalOpen(true);
    setUpdatedProjectData({
      projectname: projectData.projectname,
      frontend: projectData.frontend,
      backend: projectData.backend,
    });
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
        setIsEditModalOpen(false);
        getProjectData();
      } else {
        alert("Failed to update project");
      }
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div>
        <h1 className="text-3xl font-bold underline text-center">
          Project Details ................
        </h1>
      </div>
      <div className="p-4">
        <p>Project Name: {projectData.projectname}</p>
        <p>Front-end: {projectData.frontend}</p>
        <p>Back-end: {projectData.backend}</p>
      </div>
      <div>
        <button
          onClick={handleEditClick}
          className="bg-blue-500 text-white rounded p-2"
        >
          Edit Project
        </button>
        <Link href="/">
          <button className="bg-gray-500 text-white rounded p-2 ml-2">
            Back to Home
          </button>
        </Link>
      </div>

      {/* Edit Project Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
        contentLabel="Edit Project Modal"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <div className="text-2xl font-bold mb-4">Edit Project</div>
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
              name="projectname"
              className="border rounded-md p-2 w-full"
              value={updatedProjectData.projectname}
              onChange={(e) =>
                setUpdatedProjectData({
                  ...updatedProjectData,
                  projectname: e.target.value,
                })
              }
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
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setIsEditModalOpen(false)}
              className="bg-red-500 text-white rounded p-2 mr-2"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleUpdateProject}
              className="bg-blue-500 text-white rounded p-2"
            >
              Update Project
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
