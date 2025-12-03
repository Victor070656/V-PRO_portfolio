"use client";

import { useState } from "react";
import { FaPlay, FaYoutube, FaGoogleDrive } from "react-icons/fa";

interface VideoUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function VideoUploader({ value, onChange, label = "Video URL" }: VideoUploaderProps) {
  const [preview, setPreview] = useState(false);

  const getEmbedUrl = (url: string) => {
    if (!url) return "";
    
    // YouTube
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const videoId = url.includes("v=") 
        ? url.split("v=")[1].split("&")[0]
        : url.split("/").pop();
      return `https://www.youtube.com/embed/${videoId}`;
    }
    
    // Google Drive
    if (url.includes("drive.google.com")) {
      return url.replace("/view", "/preview");
    }

    return url;
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-2">{label}</label>
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-3 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg"
          placeholder="https://youtube.com/..."
        />
        <button
          type="button"
          onClick={() => setPreview(!preview)}
          className="bg-[var(--bg-primary)] border border-[var(--border-color)] px-4 rounded-lg hover:bg-[var(--hover-bg)]"
          title="Toggle Preview"
        >
          <FaPlay />
        </button>
      </div>
      
      {preview && value && (
        <div className="aspect-video bg-black rounded-lg overflow-hidden mt-4">
          <iframe
            src={getEmbedUrl(value)}
            className="w-full h-full"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>
      )}
      
      <div className="text-xs text-[var(--text-secondary)] mt-1 flex gap-4">
        <span className="flex items-center gap-1"><FaYoutube /> YouTube supported</span>
        <span className="flex items-center gap-1"><FaGoogleDrive /> Google Drive supported</span>
      </div>
    </div>
  );
}
