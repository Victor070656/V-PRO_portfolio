"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import VideoUploader from "./VideoUploader";

interface CourseFormProps {
  initialData?: any;
  isEdit?: boolean;
}

export default function CourseForm({ initialData, isEdit = false }: CourseFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(
    initialData || {
      title: "",
      description: "",
      price: 0,
      category: "",
      level: "beginner",
      language: "English",
      thumbnail: "",
      previewVideoUrl: "",
      requirements: [""],
      objectives: [""],
      instructor: {
        name: "",
        bio: "",
      },
    }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
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
    const updated = [...formData[field]];
    updated[index] = value;
    setFormData((prev: any) => ({ ...prev, [field]: updated }));
  };

  const addArrayItem = (field: "requirements" | "objectives") => {
    setFormData((prev: any) => ({ ...prev, [field]: [...prev[field], ""] }));
  };

  const removeArrayItem = (index: number, field: "requirements" | "objectives") => {
    const updated = [...formData[field]];
    updated.splice(index, 1);
    setFormData((prev: any) => ({ ...prev, [field]: updated.length ? updated : [""] }));
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
    <form onSubmit={handleSubmit} className="arch-panel p-8 space-y-8">
      <section className="space-y-4">
        <p className="arch-kicker">Basic Information</p>
        <div className="grid gap-4 md:grid-cols-2">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="arch-input"
            placeholder="Course title"
            required
          />
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="arch-input"
            placeholder="Category"
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="arch-input"
            min="0"
            step="0.01"
            placeholder="Price"
          />
          <select name="level" value={formData.level} onChange={handleChange} className="arch-input">
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="arch-input"
          placeholder="Description"
          required
        />
      </section>

      <section className="space-y-4">
        <p className="arch-kicker">Media</p>
        <input
          type="text"
          name="thumbnail"
          value={formData.thumbnail}
          onChange={handleChange}
          className="arch-input"
          placeholder="Thumbnail URL"
        />
        <VideoUploader
          label="Preview Video URL (YouTube/Drive)"
          value={formData.previewVideoUrl || ""}
          onChange={(url) => setFormData((prev: any) => ({ ...prev, previewVideoUrl: url }))}
        />
      </section>

      <section className="space-y-4">
        <p className="arch-kicker">Learning Outcomes</p>
        <ArrayField
          label="Objectives"
          values={formData.objectives}
          field="objectives"
          onChange={handleArrayChange}
          onAdd={addArrayItem}
          onRemove={removeArrayItem}
        />
        <ArrayField
          label="Requirements"
          values={formData.requirements}
          field="requirements"
          onChange={handleArrayChange}
          onAdd={addArrayItem}
          onRemove={removeArrayItem}
        />
      </section>

      <section className="space-y-4">
        <p className="arch-kicker">Instructor</p>
        <div className="grid gap-4 md:grid-cols-2">
          <input
            type="text"
            name="instructor.name"
            value={formData.instructor.name}
            onChange={handleChange}
            className="arch-input"
            placeholder="Instructor name"
          />
          <input
            type="text"
            name="language"
            value={formData.language}
            onChange={handleChange}
            className="arch-input"
            placeholder="Language"
          />
        </div>
        <textarea
          name="instructor.bio"
          value={formData.instructor.bio}
          onChange={handleChange}
          rows={3}
          className="arch-input"
          placeholder="Instructor bio"
        />
      </section>

      <div className="flex justify-end">
        <button type="submit" disabled={loading} className="arch-button">
          {loading ? "Saving..." : isEdit ? "Update Course" : "Create Course"}
        </button>
      </div>
    </form>
  );
}

function ArrayField({
  label,
  values,
  field,
  onChange,
  onAdd,
  onRemove,
}: {
  label: string;
  values: string[];
  field: "requirements" | "objectives";
  onChange: (index: number, value: string, field: "requirements" | "objectives") => void;
  onAdd: (field: "requirements" | "objectives") => void;
  onRemove: (index: number, field: "requirements" | "objectives") => void;
}) {
  return (
    <div>
      <label className="block text-sm text-muted-foreground mb-2">{label}</label>
      <div className="space-y-2">
        {values.map((value, index) => (
          <div key={`${field}-${index}`} className="flex gap-2">
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(index, e.target.value, field)}
              className="arch-input"
            />
            <button
              type="button"
              onClick={() => onRemove(index, field)}
              className="arch-button-secondary !px-3"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <button type="button" onClick={() => onAdd(field)} className="mt-2 text-sm text-primary hover:underline">
        + Add {label.slice(0, -1)}
      </button>
    </div>
  );
}
