"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaSave, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import VideoUploader from "./VideoUploader";

interface CourseFormProps {
  initialData?: any;
  isEdit?: boolean;
}

export default function CourseForm({ initialData, isEdit = false }: CourseFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialData || {
    title: "",
    description: "",
    price: 0,
    category: "",
    level: "beginner",
    language: "English",
    thumbnail: "",
    requirements: [""],
    objectives: [""],
    instructor: {
      name: "",
      bio: "",
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev: any) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev: any) => ({ ...prev, [name]: value }));
    }
  };

  const handleArrayChange = (index: number, value: string, field: "requirements" | "objectives") => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData((prev: any) => ({ ...prev, [field]: newArray }));
  };

  const addArrayItem = (field: "requirements" | "objectives") => {
    setFormData((prev: any) => ({ ...prev, [field]: [...prev[field], ""] }));
  };

  const removeArrayItem = (index: number, field: "requirements" | "objectives") => {
    const newArray = [...formData[field]];
    newArray.splice(index, 1);
    setFormData((prev: any) => ({ ...prev, [field]: newArray }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = isEdit ? `/api/admin/courses/${initialData._id}` : "/api/admin/courses";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push("/admin/courses");
        router.refresh();
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[var(--card-bg)] p-8 rounded-xl border border-[var(--border-color)]">
      {/* Progress Steps */}
      <div className="flex justify-between mb-8 border-b border-[var(--border-color)] pb-4">
        <button
          type="button"
          onClick={() => setStep(1)}
          className={`font-semibold ${step === 1 ? "text-[var(--accent-color)]" : "text-[var(--text-secondary)]"}`}
        >
          1. Basic Info
        </button>
        <button
          type="button"
          onClick={() => setStep(2)}
          className={`font-semibold ${step === 2 ? "text-[var(--accent-color)]" : "text-[var(--text-secondary)]"}`}
        >
          2. Details & Media
        </button>
        <button
          type="button"
          onClick={() => setStep(3)}
          className={`font-semibold ${step === 3 ? "text-[var(--accent-color)]" : "text-[var(--text-secondary)]"}`}
        >
          3. Curriculum (Later)
        </button>
      </div>

      {step === 1 && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Course Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full p-3 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Price ($)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full p-3 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg"
                min="0"
                step="0.01"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-3 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg"
              />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="bg-[var(--accent-color)] text-white px-6 py-2 rounded-lg flex items-center gap-2"
            >
              Next <FaArrowRight />
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Level</label>
              <select
                name="level"
                value={formData.level}
                onChange={handleChange}
                className="w-full p-3 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Language</label>
              <input
                type="text"
                name="language"
                value={formData.language}
                onChange={handleChange}
                className="w-full p-3 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Thumbnail URL</label>
            <input
              type="text"
              name="thumbnail"
              value={formData.thumbnail}
              onChange={handleChange}
              className="w-full p-3 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg"
              placeholder="https://drive.google.com/uc?export=view&id="
            />
          </div>

          <VideoUploader
            label="Preview Video URL (YouTube/Drive)"
            value={formData.previewVideoUrl || ""}
            onChange={(url) => setFormData((prev: any) => ({ ...prev, previewVideoUrl: url }))}
          />

          <div>
            <label className="block text-sm font-medium mb-2">What will students learn? (Objectives)</label>
            {formData.objectives.map((obj: string, index: number) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={obj}
                  onChange={(e) => handleArrayChange(index, e.target.value, "objectives")}
                  className="w-full p-3 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem(index, "objectives")}
                  className="text-red-500 px-2"
                >
                  &times;
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem("objectives")}
              className="text-[var(--accent-color)] text-sm"
            >
              + Add Objective
            </button>
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-[var(--text-secondary)] px-6 py-2 rounded-lg flex items-center gap-2"
            >
              <FaArrowLeft /> Back
            </button>
            <button
              type="button"
              onClick={() => setStep(3)}
              className="bg-[var(--accent-color)] text-white px-6 py-2 rounded-lg flex items-center gap-2"
            >
              Next <FaArrowRight />
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <div className="text-center py-12 bg-[var(--bg-primary)] rounded-lg border border-dashed border-[var(--border-color)]">
            <p className="text-[var(--text-secondary)]">Curriculum management will be implemented in the next phase.</p>
            <p className="text-sm text-[var(--text-secondary)] mt-2">You can save the course as a draft for now.</p>
          </div>

          <div className="flex justify-between mt-6">
             <button
              type="button"
              onClick={() => setStep(2)}
              className="text-[var(--text-secondary)] px-6 py-2 rounded-lg flex items-center gap-2"
            >
              <FaArrowLeft /> Back
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center gap-2"
            >
              {loading ? "Saving..." : <><FaSave /> Save Course</>}
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
