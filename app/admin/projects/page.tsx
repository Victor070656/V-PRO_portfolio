"use client";

import Header from "@/components/admin/Header";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import { PlusIcon, PencilIcon, TrashIcon } from "lucide-react";

interface Project {
  _id: string;
  name: string;
  imageUrl: string;
  link: string;
  status: string;
  description: string;
  technologies: string[];
  category: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function AdminProjectsPage() {
  const { data: session, status } = useSession();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
    link: "",
    status: "Development",
    description: "",
    technologies: "",
    category: "Project",
    featured: false
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/signin");
    }
    if (status === "authenticated") {
      fetchProjects();
    }
  }, [status]);

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects");
      const data = await response.json();
      setProjects(data.projects || []);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const projectData = {
        ...formData,
        technologies: formData.technologies.split(",").map(tech => tech.trim()).filter(Boolean),
        ...(editingProject && { id: editingProject._id })
      };

      const response = await fetch("/api/projects", {
        method: editingProject ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });

      if (response.ok) {
        await fetchProjects();
        resetForm();
        setShowForm(false);
      } else {
        const error = await response.json();
        alert(error.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error saving project:", error);
      alert("Error saving project");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      name: project.name,
      imageUrl: project.imageUrl,
      link: project.link,
      status: project.status,
      description: project.description,
      technologies: project.technologies.join(", "),
      category: project.category,
      featured: project.featured
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const response = await fetch(`/api/projects?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchProjects();
      } else {
        const error = await response.json();
        alert(error.message || "Error deleting project");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Error deleting project");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      imageUrl: "",
      link: "",
      status: "Development",
      description: "",
      technologies: "",
      category: "Project",
      featured: false
    });
    setEditingProject(null);
  };

  if (status === "loading") {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (status === "unauthenticated") {
    return null;
  }

  return (
    <>
      <Header />
      <main className="flex-1 p-8 overflow-y-auto bg-[var(--background-color)]">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Projects</h1>
          <button
            onClick={() => setShowForm(true)}
            className="bg-[var(--accent-color)] text-white px-4 py-2 rounded-lg font-medium hover:bg-[var(--accent-color)]/90 transition-colors flex items-center gap-2"
          >
            <PlusIcon size={20} />
            Add Project
          </button>
        </div>

        {showForm && (
          <div className="admin-card p-6 rounded-xl mb-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {editingProject ? "Edit Project" : "Add New Project"}
              </h2>
              <button
                onClick={() => {
                  setShowForm(false);
                  resetForm();
                }}
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-semibold mb-2">
                    Project Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="admin-input p-3 rounded-xl w-full text-md"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="imageUrl" className="block text-sm font-semibold mb-2">
                    Image URL *
                  </label>
                  <input
                    type="url"
                    id="imageUrl"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                    className="admin-input p-3 rounded-xl w-full text-md"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="link" className="block text-sm font-semibold mb-2">
                    Project Link *
                  </label>
                  <input
                    type="url"
                    id="link"
                    value={formData.link}
                    onChange={(e) => setFormData({...formData, link: e.target.value})}
                    className="admin-input p-3 rounded-xl w-full text-md"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="status" className="block text-sm font-semibold mb-2">
                    Status *
                  </label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="admin-input p-3 rounded-xl text-md w-full"
                    required
                  >
                    <option value="Development">Development</option>
                    <option value="Live">Live</option>
                    <option value="Maintenance">Maintenance</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="category" className="block text-sm font-semibold mb-2">
                    Category
                  </label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="admin-input p-3 rounded-xl text-md w-full"
                  >
                    <option value="Project">Project</option>
                    <option value="Full-stack">Full-stack</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="technologies" className="block text-sm font-semibold mb-2">
                    Technologies (comma-separated)
                  </label>
                  <input
                    type="text"
                    id="technologies"
                    value={formData.technologies}
                    onChange={(e) => setFormData({...formData, technologies: e.target.value})}
                    className="admin-input p-3 rounded-xl w-full text-md"
                    placeholder="React, Node.js, MongoDB"
                  />
                </div>
                <div className="mb-4 md:col-span-2">
                  <label htmlFor="description" className="block text-sm font-semibold mb-2">
                    Description *
                  </label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="admin-input p-3 rounded-xl w-full text-md"
                    rows={4}
                    required
                  />
                </div>
                <div className="mb-4 md:col-span-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                      className="w-4 h-4"
                    />
                    <span className="text-sm font-semibold">Featured Project</span>
                  </label>
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-[var(--accent-color)] text-white px-6 py-2 rounded-lg font-medium hover:bg-[var(--accent-color)]/90 transition-colors disabled:opacity-50"
                >
                  {isLoading ? "Saving..." : editingProject ? "Update Project" : "Add Project"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    resetForm();
                  }}
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="admin-card p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Project List</h2>
          {isLoading ? (
            <div className="text-center py-8">Loading projects...</div>
          ) : projects.length === 0 ? (
            <div className="admin-card rounded-lg p-8 text-center">
              <p className="text-[var(--text-secondary)] mb-4">
                No projects found. Add your first project to get started.
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="bg-[var(--accent-color)] text-white px-4 py-2 rounded-lg font-medium hover:bg-[var(--accent-color)]/90 transition-colors"
              >
                Add Project
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div key={project._id} className="admin-card rounded-lg p-4 hover:shadow-lg transition-all duration-200 hover:scale-[1.02]">
                  <div className="relative mb-4">
                    <img
                      src={project.imageUrl}
                      alt={project.name}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    {project.featured && (
                      <span className="absolute top-2 left-2 bg-[var(--accent-color)] text-white px-2 py-1 rounded-full text-xs font-bold">
                        Featured
                      </span>
                    )}
                    <span className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold ${
                      project.status === "Live" ? "bg-green-500/20 text-green-400" :
                      project.status === "Development" ? "bg-yellow-500/20 text-yellow-400" :
                      "bg-blue-500/20 text-blue-400"
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{project.name}</h3>
                  <p className="text-[var(--text-secondary)] text-sm mb-3 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <span key={index} className="bg-[var(--accent-color)]/10 text-[var(--accent-color)] px-2 py-1 rounded text-xs">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="bg-gray-500/20 text-gray-400 px-2 py-1 rounded text-xs">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(project)}
                      className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors"
                    >
                      <PencilIcon size={14} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(project._id)}
                      className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                    >
                      <TrashIcon size={14} />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}