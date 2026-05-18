"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Edit2, Mail, Save, User, X } from "lucide-react";

export default function ProfilePage() {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: session?.user?.name || "",
    email: session?.user?.email || "",
    bio: "",
    location: "",
  });

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <section className="arch-panel p-8">
        <p className="arch-kicker mb-3">Student Profile</p>
        <h1 className="arch-heading-md">My Profile</h1>
        <p className="text-muted-foreground mt-2">Manage your account information.</p>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <article className="arch-panel p-6">
          <div className="text-center">
            <div className="mx-auto mb-4 h-20 w-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
              {session?.user?.name?.charAt(0).toUpperCase() || "S"}
            </div>
            <h2 className="font-semibold">{session?.user?.name || "Student"}</h2>
            <p className="text-sm text-muted-foreground">{session?.user?.email}</p>
          </div>
        </article>

        <article className="arch-panel p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <h3 className="arch-heading-md">Profile Information</h3>
            {!isEditing ? (
              <button onClick={() => setIsEditing(true)} className="arch-button-secondary">
                <Edit2 className="w-4 h-4" />
                Edit
              </button>
            ) : (
              <div className="flex gap-2">
                <button onClick={handleSave} className="arch-button">
                  <Save className="w-4 h-4" />
                  Save
                </button>
                <button onClick={() => setIsEditing(false)} className="arch-button-secondary">
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <label className="arch-kicker">Full Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="arch-input mt-2"
                />
              ) : (
                <p className="mt-2 rounded border border-border bg-muted px-4 py-3">{formData.name || "Not set"}</p>
              )}
            </div>

            <div>
              <label className="arch-kicker">Email Address</label>
              <p className="mt-2 inline-flex items-center gap-2 rounded border border-border bg-muted px-4 py-3">
                <Mail className="w-4 h-4 text-muted-foreground" />
                {formData.email}
              </p>
            </div>

            <div>
              <label className="arch-kicker">Bio</label>
              {isEditing ? (
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={4}
                  className="arch-input mt-2"
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <p className="mt-2 rounded border border-border bg-muted px-4 py-3">
                  {formData.bio || "No bio added yet"}
                </p>
              )}
            </div>

            <div>
              <label className="arch-kicker">Location</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="arch-input mt-2"
                  placeholder="City, Country"
                />
              ) : (
                <p className="mt-2 rounded border border-border bg-muted px-4 py-3">
                  {formData.location || "Not set"}
                </p>
              )}
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}
