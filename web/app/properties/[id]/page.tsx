'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import {
  ArrowLeft,
  Building2,
  Car,
  Compass,
  MapPin,
  Phone,
  QrCode,
  Ruler,
  User,
  Plus,
  X,
  type LucideIcon,
} from 'lucide-react';
import FloorBadge from '@/components/FloorBadge';
import { MOCK_PROPERTIES, Floor, FloorStatus } from '@/lib/mockData';

function cycleStatus(s: FloorStatus): FloorStatus {
  const order: FloorStatus[] = ['available', 'unavailable', 'sold_out'];
  return order[(order.indexOf(s) + 1) % order.length];
}

export default function PropertyDetailPage() {
  const params = useParams<{ id: string }>();
  const base = useMemo(
    () => MOCK_PROPERTIES.find((p) => p.id === params.id),
    [params.id],
  );

  const [floors, setFloors] = useState<Floor[]>(base?.floors ?? []);
  const [showAddFloor, setShowAddFloor] = useState(false);
  const [newFloor, setNewFloor] = useState({
    code: '',
    label: '',
    type: 'Floor',
    carpetArea: '',
    askingPrice: '',
  });

  if (!base) {
    notFound();
  }

  const toggleStatus = (code: string) => {
    setFloors((prev) =>
      prev.map((f) => (f.code === code ? { ...f, status: cycleStatus(f.status) } : f)),
    );
  };

  const handleAddFloor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFloor.code.trim() || !newFloor.label.trim()) return;
    setFloors((prev) => [
      ...prev,
      {
        code: newFloor.code,
        label: newFloor.label,
        type: newFloor.type,
        carpetArea: Number(newFloor.carpetArea) || 0,
        askingPrice: newFloor.askingPrice || '—',
        status: 'available',
      },
    ]);
    setNewFloor({ code: '', label: '', type: 'Floor', carpetArea: '', askingPrice: '' });
    setShowAddFloor(false);
  };

  const availableCount = floors.filter((f) => f.status === 'available').length;

  return (
    <div className="space-y-6">
      <Link
        href="/properties"
        className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-primary transition-colors"
      >
        <ArrowLeft size={14} /> Back to properties
      </Link>

      {/* Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center flex-shrink-0">
                <Building2 size={18} className="text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{base.name}</h1>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <MapPin size={12} /> {base.locality}, {base.city}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-primary-light text-primary">
                {base.constructionStatus}
              </span>
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                {base.accommodation}
              </span>
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                Possession {base.possession}
              </span>
            </div>
          </div>
          <div className="text-left md:text-right">
            <p className="text-xs uppercase font-semibold text-gray-400 tracking-wide">Asking</p>
            <p className="text-2xl font-bold text-gray-900">{base.askingPrice}</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Spec icon={Ruler} label="Plot Size" value={`${base.plotSize} sq yd`} />
        <Spec icon={Building2} label="Covered Area" value={`${base.coveredArea} sq ft`} />
        <Spec icon={Compass} label="Facing" value={base.facing || '—'} />
        <Spec icon={Car} label="Car Parking" value={`${base.carParking}`} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Floors */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-gray-900">
              Floor Inventory
              <span className="ml-2 text-xs font-normal text-gray-500">
                {availableCount} of {floors.length} available
              </span>
            </h2>
            <button
              onClick={() => setShowAddFloor(true)}
              className="flex items-center gap-1.5 bg-primary text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-primary-dark transition-colors"
            >
              <Plus size={14} /> Add Floor
            </button>
          </div>

          {floors.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-10 text-center">
              <p className="text-sm text-gray-400">No floors added yet.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {floors.map((f) => (
                <div
                  key={f.code}
                  className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col sm:flex-row sm:items-center gap-4"
                >
                  <div className="w-14 h-14 rounded-lg bg-primary-light flex flex-col items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-primary">{f.code}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm">{f.label}</p>
                    <p className="text-xs text-gray-500">
                      {f.type} · {f.carpetArea} sq ft · {f.askingPrice}
                    </p>
                    {f.reason && (
                      <p className="text-xs text-warning mt-1">{f.reason}</p>
                    )}
                    {f.builderNote && (
                      <p className="text-xs text-primary mt-1">Note: {f.builderNote}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <FloorBadge status={f.status} />
                    <button
                      onClick={() => toggleStatus(f.code)}
                      className="text-xs text-primary border border-primary/30 rounded px-2 py-1 hover:bg-primary-light transition-colors"
                    >
                      Toggle
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Features */}
          {base.propertyFeatures.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3">
              <h3 className="text-sm font-semibold text-gray-900">Property Features</h3>
              <div className="flex flex-wrap gap-2">
                {base.propertyFeatures.map((f) => (
                  <span
                    key={f}
                    className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Side panel */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3">
            <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <QrCode size={16} className="text-primary" /> QR Access
            </h3>
            <div className="bg-gray-50 rounded-lg px-3 py-2">
              <p className="text-xs font-semibold text-gray-500 uppercase">Token</p>
              <p className="font-mono text-base font-bold text-gray-900">{base.qrToken}</p>
            </div>
            <div className="bg-gray-50 rounded-lg px-3 py-2">
              <p className="text-xs font-semibold text-gray-500 uppercase">Entry Code</p>
              <p className="font-mono text-base font-bold text-gray-900">{base.entryCode}</p>
            </div>
            <Link
              href="/qr"
              className="block text-center text-xs font-semibold text-primary border border-primary/30 rounded-lg py-2 hover:bg-primary-light transition-colors"
            >
              Manage QR codes
            </Link>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3">
            <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <User size={16} className="text-gray-500" /> Caretaker
            </h3>
            <p className="text-sm font-medium text-gray-900">{base.caretakerName || '—'}</p>
            {base.caretakerPhone && (
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <Phone size={12} /> {base.caretakerPhone}
              </p>
            )}
            {base.builderNote && (
              <p className="text-xs text-primary bg-primary-light px-3 py-2 rounded-lg">
                Note: {base.builderNote}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Add Floor Modal */}
      {showAddFloor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-base font-bold text-gray-900">Add Floor</h2>
              <button
                onClick={() => setShowAddFloor(false)}
                className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100"
              >
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleAddFloor} className="px-6 py-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Code"
                  placeholder="e.g. 2F"
                  value={newFloor.code}
                  onChange={(v) => setNewFloor((p) => ({ ...p, code: v }))}
                />
                <Input
                  label="Type"
                  placeholder="Floor / Triplex"
                  value={newFloor.type}
                  onChange={(v) => setNewFloor((p) => ({ ...p, type: v }))}
                />
              </div>
              <Input
                label="Label"
                placeholder="e.g. 2nd Floor"
                value={newFloor.label}
                onChange={(v) => setNewFloor((p) => ({ ...p, label: v }))}
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Carpet Area (sq ft)"
                  placeholder="1180"
                  value={newFloor.carpetArea}
                  onChange={(v) => setNewFloor((p) => ({ ...p, carpetArea: v }))}
                />
                <Input
                  label="Asking Price"
                  placeholder="₹1.85 Cr"
                  value={newFloor.askingPrice}
                  onChange={(v) => setNewFloor((p) => ({ ...p, askingPrice: v }))}
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddFloor(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-primary text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-primary-dark transition-colors"
                >
                  Add Floor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function Spec({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className="flex items-center gap-2 text-gray-400">
        <Icon size={14} />
        <p className="text-xs font-semibold uppercase tracking-wide">{label}</p>
      </div>
      <p className="text-sm font-bold text-gray-900 mt-1">{value}</p>
    </div>
  );
}

function Input({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-700 mb-1">{label}</label>
      <input
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
      />
    </div>
  );
}
