"use client";

import { useState } from "react";
import { Bell, Eye, Globe, Lock, Save, Settings as SettingsIcon } from "lucide-react";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    courseUpdates: true,
    weeklyDigest: false,
    darkMode: false,
    language: "en",
  });

  const handleSave = () => {
    alert("Settings saved successfully!");
  };

  return (
    <div className="space-y-6">
      <section className="arch-panel p-8">
        <p className="arch-kicker mb-3">Preferences</p>
        <h1 className="arch-heading-md">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your notifications, appearance, and security.
        </p>
      </section>

      <section className="arch-panel p-6 space-y-6">
        <SettingBlock icon={Bell} title="Notifications">
          <Toggle
            label="Email Notifications"
            description="Receive email updates about your courses"
            checked={settings.emailNotifications}
            onChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
          />
          <Toggle
            label="Course Updates"
            description="Get notified when new content is added"
            checked={settings.courseUpdates}
            onChange={(checked) => setSettings({ ...settings, courseUpdates: checked })}
          />
          <Toggle
            label="Weekly Digest"
            description="Receive a weekly learning summary"
            checked={settings.weeklyDigest}
            onChange={(checked) => setSettings({ ...settings, weeklyDigest: checked })}
          />
        </SettingBlock>

        <div className="arch-divider" />

        <SettingBlock icon={Eye} title="Appearance">
          <select
            value={settings.darkMode ? "dark" : "light"}
            onChange={(e) => setSettings({ ...settings, darkMode: e.target.value === "dark" })}
            className="arch-input"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System</option>
          </select>
        </SettingBlock>

        <div className="arch-divider" />

        <SettingBlock icon={Globe} title="Language & Region">
          <select
            value={settings.language}
            onChange={(e) => setSettings({ ...settings, language: e.target.value })}
            className="arch-input"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
          </select>
        </SettingBlock>

        <div className="arch-divider" />

        <SettingBlock icon={Lock} title="Security">
          <button className="arch-button-secondary">Change Password</button>
          <button className="arch-button-secondary">Two-Factor Authentication</button>
        </SettingBlock>
      </section>

      <div className="flex justify-end">
        <button onClick={handleSave} className="arch-button">
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>
    </div>
  );
}

function SettingBlock({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="inline-flex items-center gap-2 mb-4">
        <Icon className="w-4 h-4 text-primary" />
        <h3 className="font-semibold">{title}</h3>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Toggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between rounded border border-border bg-muted px-4 py-3">
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          checked ? "bg-primary" : "bg-slate-600"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}
