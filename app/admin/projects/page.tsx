"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Edit,
  ExternalLink,
  Filter,
  FolderKanban,
  Loader2,
  Plus,
  Search,
  Star,
  Trash2,
  X,
} from "lucide-react";

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
  const { status } = useSession();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
    link: "",
    status: "Development",
    description: "",
    technologies: "",
    category: "Project",
    featured: false,
  });

  useEffect(() => {
    if (status === "unauthenticated") redirect("/signin");
    if (status === "authenticated") fetchProjects();
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
        technologies: formData.technologies
          .split(",")
          .map((tech) => tech.trim())
          .filter(Boolean),
        ...(editingProject && { id: editingProject._id }),
      };

      const response = await fetch("/api/projects", {
        method: editingProject ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
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
      featured: project.featured,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const response = await fetch(`/api/projects?id=${id}`, { method: "DELETE" });
      if (response.ok) await fetchProjects();
      else {
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
      featured: false,
    });
    setEditingProject(null);
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || project.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const featuredCount = projects.filter((p) => p.featured).length;
  const liveCount = projects.filter((p) => p.status === "Live").length;

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  if (status === "unauthenticated") return null;

  return (
    <div className="space-y-6">
      <section className="arch-panel p-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="arch-kicker mb-3">Portfolio Admin</p>
            <h1 className="arch-heading-md">Projects</h1>
            <p className="text-muted-foreground mt-2">Manage portfolio entries and publication status.</p>
          </div>
          <button onClick={() => setShowForm(true)} className="arch-button">
            <Plus className="w-4 h-4" />
            Add Project
          </button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Metric label="Total Projects" value={projects.length.toString()} />
        <Metric label="Live Projects" value={liveCount.toString()} />
        <Metric label="Featured" value={featuredCount.toString()} />
      </section>

      <section className="grid gap-4 md:grid-cols-[1fr_auto]">
        <div className="arch-panel p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="arch-input pl-10"
            />
          </div>
        </div>
        <div className="arch-panel p-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="arch-input py-2">
              <option value="all">All Status</option>
              <option value="Live">Live</option>
              <option value="Development">Development</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </div>
        </div>
      </section>

      {showForm ? (
        <section className="arch-panel p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="arch-heading-md">{editingProject ? "Edit Project" : "Add New Project"}</h2>
            <button
              onClick={() => {
                setShowForm(false);
                resetForm();
              }}
              className="arch-button-secondary !px-3 !py-2"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
            <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="arch-input" placeholder="Project Name" required />
            <input type="url" value={formData.imageUrl} onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })} className="arch-input" placeholder="Image URL" required />
            <input type="url" value={formData.link} onChange={(e) => setFormData({ ...formData, link: e.target.value })} className="arch-input" placeholder="Project Link" required />
            <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="arch-input" required>
              <option value="Development">Development</option>
              <option value="Live">Live</option>
              <option value="Maintenance">Maintenance</option>
            </select>
            <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="arch-input">
              <option value="Project">Project</option>
              <option value="Full-stack">Full-stack</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
            </select>
            <input type="text" value={formData.technologies} onChange={(e) => setFormData({ ...formData, technologies: e.target.value })} className="arch-input" placeholder="Technologies (comma-separated)" />
            <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="arch-input md:col-span-2" rows={4} placeholder="Description" required />
            <label className="inline-flex items-center gap-2 text-sm text-muted-foreground md:col-span-2">
              <input type="checkbox" checked={formData.featured} onChange={(e) => setFormData({ ...formData, featured: e.target.checked })} />
              Featured Project
            </label>
            <div className="md:col-span-2 flex gap-2">
              <button type="submit" disabled={isLoading} className="arch-button">
                {isLoading ? "Saving..." : editingProject ? "Update Project" : "Add Project"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  resetForm();
                }}
                className="arch-button-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </section>
      ) : null}

      {isLoading ? (
        <div className="arch-panel p-10 text-center text-muted-foreground">Loading projects...</div>
      ) : filteredProjects.length === 0 ? (
        <div className="arch-panel p-10 text-center">
          <FolderKanban className="w-10 h-10 text-primary mx-auto mb-3" />
          <p className="text-muted-foreground">
            {searchTerm ? "No projects found matching your search." : "No projects yet."}
          </p>
        </div>
      ) : (
        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <article key={project._id} className="arch-panel overflow-hidden">
              <div className="h-40 bg-muted relative">
                <img src={project.imageUrl} alt={project.name} className="w-full h-full object-cover" />
                {project.featured ? (
                  <div className="absolute top-2 left-2 arch-chip bg-primary text-primary-foreground border-primary">
                    <Star className="w-3 h-3 mr-1" />
                    Featured
                  </div>
                ) : null}
                <div className="absolute top-2 right-2 arch-chip">{project.status}</div>
              </div>
              <div className="p-5">
                <h3 className="font-semibold line-clamp-1">{project.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mt-2 mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.technologies.slice(0, 3).map((tech, idx) => (
                    <span key={idx} className="arch-chip">{tech}</span>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <button onClick={() => handleEdit(project)} className="arch-button-secondary !px-2 !py-2 text-xs">
                    <Edit className="w-3 h-3" />
                  </button>
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="arch-button-secondary !px-2 !py-2 text-xs">
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <button onClick={() => handleDelete(project._id)} className="arch-button-secondary !px-2 !py-2 text-xs text-red-300 border-red-500/40">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <article className="arch-panel p-5">
      <p className="arch-kicker">{label}</p>
      <p className="text-2xl font-semibold">{value}</p>
    </article>
  );
}
