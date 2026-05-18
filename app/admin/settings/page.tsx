"use client";

import { useState } from "react";
import { CreditCard, Globe, Mail, Save, User } from "lucide-react";

export default function SettingsPage() {
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    siteName: "V-PRO LMS",
    siteDescription: "Professional Learning Management System",
    contactEmail: "admin@vpro.com",
    supportEmail: "support@vpro.com",
    enableRegistration: true,
    enablePayments: true,
    currency: "NGN",
  });

  const handleSave = async () => {
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSaving(false);
    alert("Settings saved successfully!");
  };

  const handleChange = (field: string, value: string | boolean) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <section className="arch-panel p-8">
        <p className="arch-kicker mb-3">Configuration</p>
        <h1 className="arch-heading-md">Settings</h1>
        <p className="text-muted-foreground mt-2">Configure LMS operational defaults.</p>
      </section>

      <section className="arch-panel p-6 space-y-5">
        <div>
          <div className="inline-flex items-center gap-2 mb-3">
            <Globe className="w-4 h-4 text-primary" />
            <h2 className="font-semibold">General</h2>
          </div>
          <div className="grid gap-4">
            <input
              value={settings.siteName}
              onChange={(e) => handleChange("siteName", e.target.value)}
              className="arch-input"
              placeholder="Site name"
            />
            <textarea
              value={settings.siteDescription}
              onChange={(e) => handleChange("siteDescription", e.target.value)}
              rows={3}
              className="arch-input"
              placeholder="Site description"
            />
          </div>
        </div>

        <div className="arch-divider" />

        <div>
          <div className="inline-flex items-center gap-2 mb-3">
            <Mail className="w-4 h-4 text-primary" />
            <h2 className="font-semibold">Email</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <input
              type="email"
              value={settings.contactEmail}
              onChange={(e) => handleChange("contactEmail", e.target.value)}
              className="arch-input"
              placeholder="Contact email"
            />
            <input
              type="email"
              value={settings.supportEmail}
              onChange={(e) => handleChange("supportEmail", e.target.value)}
              className="arch-input"
              placeholder="Support email"
            />
          </div>
        </div>

        <div className="arch-divider" />

        <div>
          <div className="inline-flex items-center gap-2 mb-3">
            <CreditCard className="w-4 h-4 text-primary" />
            <h2 className="font-semibold">Payments</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <input
                type="checkbox"
                checked={settings.enablePayments}
                onChange={(e) => handleChange("enablePayments", e.target.checked)}
              />
              Enable payments
            </label>
            <select
              value={settings.currency}
              onChange={(e) => handleChange("currency", e.target.value)}
              className="arch-input"
            >
              <option value="NGN">Nigerian Naira (NGN)</option>
              <option value="USD">US Dollar (USD)</option>
              <option value="EUR">Euro (EUR)</option>
              <option value="GBP">British Pound (GBP)</option>
            </select>
          </div>
        </div>

        <div className="arch-divider" />

        <div>
          <div className="inline-flex items-center gap-2 mb-3">
            <User className="w-4 h-4 text-primary" />
            <h2 className="font-semibold">User Access</h2>
          </div>
          <label className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <input
              type="checkbox"
              checked={settings.enableRegistration}
              onChange={(e) => handleChange("enableRegistration", e.target.checked)}
            />
            Enable registration
          </label>
        </div>
      </section>

      <div className="flex justify-end">
        <button onClick={handleSave} disabled={saving} className="arch-button">
          <Save className="w-4 h-4" />
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </div>
    </div>
  );
}
