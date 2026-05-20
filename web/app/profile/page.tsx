'use client';

import { useState } from 'react';
import { Bell, Lock, LogOut, Mail, Phone, Building2, Save, type LucideIcon } from 'lucide-react';
import { MOCK_BUILDER } from '@/lib/mockData';

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: MOCK_BUILDER.name,
    company: MOCK_BUILDER.company,
    email: 'rohan.sharma@lodha.com',
    phone: '+91 98••••3210',
  });
  const [prefs, setPrefs] = useState({
    pushApprovals: true,
    pushScans: true,
    emailDigest: false,
    smsAlerts: true,
  });
  const [saved, setSaved] = useState(false);

  const togglePref = (key: keyof typeof prefs) =>
    setPrefs((p) => ({ ...p, [key]: !p[key] }));

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your account and notification preferences.</p>
      </div>

      {/* Identity card */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 flex items-center gap-5">
        <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
          <span className="text-lg font-bold text-white">{MOCK_BUILDER.initials}</span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-base font-bold text-gray-900">{profile.name}</p>
          <p className="text-sm text-gray-500">{profile.company}</p>
          <span className="inline-block mt-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-success-light text-success">
            Verified Builder
          </span>
        </div>
      </div>

      {/* Account form */}
      <form onSubmit={handleSave} className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h2 className="text-base font-semibold text-gray-900">Account details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field
            label="Full Name"
            value={profile.name}
            onChange={(v) => setProfile((p) => ({ ...p, name: v }))}
          />
          <Field
            label="Company"
            icon={Building2}
            value={profile.company}
            onChange={(v) => setProfile((p) => ({ ...p, company: v }))}
          />
          <Field
            label="Email"
            icon={Mail}
            value={profile.email}
            onChange={(v) => setProfile((p) => ({ ...p, email: v }))}
          />
          <Field
            label="Phone"
            icon={Phone}
            value={profile.phone}
            onChange={(v) => setProfile((p) => ({ ...p, phone: v }))}
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          {saved && <span className="text-xs text-success font-medium">Saved!</span>}
          <button
            type="submit"
            className="flex items-center gap-1.5 bg-primary text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
          >
            <Save size={15} /> Save Changes
          </button>
        </div>
      </form>

      {/* Notifications */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Bell size={18} className="text-gray-500" />
          <h2 className="text-base font-semibold text-gray-900">Notifications</h2>
        </div>
        <div className="divide-y divide-gray-100">
          <Toggle
            label="Push: pending approvals"
            description="Notify me when a broker requests access."
            value={prefs.pushApprovals}
            onChange={() => togglePref('pushApprovals')}
          />
          <Toggle
            label="Push: QR scans"
            description="Real-time alerts when a broker checks in."
            value={prefs.pushScans}
            onChange={() => togglePref('pushScans')}
          />
          <Toggle
            label="Email: weekly digest"
            description="Get a summary of visits every Monday."
            value={prefs.emailDigest}
            onChange={() => togglePref('emailDigest')}
          />
          <Toggle
            label="SMS: urgent alerts"
            description="Text me for high-priority requests."
            value={prefs.smsAlerts}
            onChange={() => togglePref('smsAlerts')}
          />
        </div>
      </div>

      {/* Danger / actions */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-3">
        <h2 className="text-base font-semibold text-gray-900">Security</h2>
        <button className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
          <span className="flex items-center gap-3 text-sm text-gray-700">
            <Lock size={16} className="text-gray-400" />
            Change password
          </span>
          <span className="text-xs text-gray-400">›</span>
        </button>
        <button className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg border border-error/30 text-error hover:bg-error-light transition-colors">
          <span className="flex items-center gap-3 text-sm font-semibold">
            <LogOut size={16} />
            Sign out
          </span>
          <span className="text-xs">›</span>
        </button>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  icon: Icon,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  icon?: LucideIcon;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-700 mb-1">{label}</label>
      <div className="relative">
        {Icon && (
          <Icon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        )}
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full ${Icon ? 'pl-9' : 'pl-3'} pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50`}
        />
      </div>
    </div>
  );
}

function Toggle({
  label,
  description,
  value,
  onChange,
}: {
  label: string;
  description: string;
  value: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div className="min-w-0">
        <p className="text-sm font-medium text-gray-900">{label}</p>
        <p className="text-xs text-gray-500 mt-0.5">{description}</p>
      </div>
      <button
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0 ${
          value ? 'bg-primary' : 'bg-gray-300'
        }`}
        aria-pressed={value}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
            value ? 'translate-x-5' : 'translate-x-0.5'
          }`}
        />
      </button>
    </div>
  );
}
