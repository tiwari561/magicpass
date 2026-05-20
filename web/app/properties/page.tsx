'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronRight, Plus, X, Building2, ExternalLink } from 'lucide-react';
import FloorBadge from '@/components/FloorBadge';
import { MOCK_PROPERTIES, FloorStatus, Property } from '@/lib/mockData';

type FloorStateMap = Record<string, FloorStatus>;

function cycleStatus(current: FloorStatus): FloorStatus {
  const order: FloorStatus[] = ['available', 'unavailable', 'sold_out'];
  return order[(order.indexOf(current) + 1) % order.length];
}

interface AddPropertyForm {
  name: string;
  locality: string;
  city: string;
  accommodation: string;
  askingPrice: string;
  constructionStatus: string;
  possession: string;
}

const emptyForm: AddPropertyForm = {
  name: '',
  locality: '',
  city: '',
  accommodation: '',
  askingPrice: '',
  constructionStatus: '',
  possession: '',
};

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>(MOCK_PROPERTIES);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [floorStates, setFloorStates] = useState<Record<string, FloorStateMap>>({});
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<AddPropertyForm>(emptyForm);
  const [errors, setErrors] = useState<Partial<AddPropertyForm>>({});

  const toggleExpand = (id: string) => {
    setExpanded((prev) => (prev === id ? null : id));
  };

  const getFloorStatus = (propertyId: string, floorCode: string, original: FloorStatus): FloorStatus => {
    return floorStates[propertyId]?.[floorCode] ?? original;
  };

  const toggleFloorStatus = (propertyId: string, floorCode: string, current: FloorStatus) => {
    setFloorStates((prev) => ({
      ...prev,
      [propertyId]: {
        ...prev[propertyId],
        [floorCode]: cycleStatus(current),
      },
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<AddPropertyForm> = {};
    if (!form.name.trim()) newErrors.name = 'Required';
    if (!form.locality.trim()) newErrors.locality = 'Required';
    if (!form.city.trim()) newErrors.city = 'Required';
    if (!form.accommodation.trim()) newErrors.accommodation = 'Required';
    if (!form.askingPrice.trim()) newErrors.askingPrice = 'Required';
    if (!form.constructionStatus.trim()) newErrors.constructionStatus = 'Required';
    if (!form.possession.trim()) newErrors.possession = 'Required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newProperty: Property = {
      id: `prop_${Date.now()}`,
      name: form.name,
      locality: form.locality,
      city: form.city,
      builderName: 'Lodha Group',
      accommodation: form.accommodation,
      constructionStatus: form.constructionStatus,
      possession: form.possession,
      plotSize: 0,
      coveredArea: 0,
      floor: '',
      carParking: 0,
      askingPrice: form.askingPrice,
      facing: '',
      propertyFeatures: [],
      qrToken: Math.random().toString(36).substring(2, 8).toUpperCase(),
      entryCode: Math.floor(100000 + Math.random() * 900000).toString(),
      floors: [],
      caretakerName: '',
      caretakerPhone: '',
      builderNote: '',
    };

    setProperties((prev) => [newProperty, ...prev]);
    setForm(emptyForm);
    setErrors({});
    setShowModal(false);
  };

  const inputClass = (field: keyof AddPropertyForm) =>
    `w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 ${
      errors[field] ? 'border-error' : 'border-gray-300'
    }`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Properties</h1>
          <p className="text-sm text-gray-500 mt-1">{properties.length} properties listed</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-dark transition-colors"
        >
          <Plus size={16} />
          Add Property
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Property</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide hidden sm:table-cell">Locality</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Config</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide hidden lg:table-cell">Asking Price</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Floors</th>
                <th className="px-4 py-3 w-8"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {properties.map((property) => {
                const isExpanded = expanded === property.id;
                return (
                  <>
                    <tr
                      key={property.id}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => toggleExpand(property.id)}
                    >
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-primary-light flex items-center justify-center flex-shrink-0">
                            <Building2 size={14} className="text-primary" />
                          </div>
                          <div>
                            <Link
                              href={`/properties/${property.id}`}
                              onClick={(e) => e.stopPropagation()}
                              className="font-semibold text-gray-900 hover:text-primary inline-flex items-center gap-1"
                            >
                              {property.name}
                              <ExternalLink size={12} className="text-gray-400" />
                            </Link>
                            <p className="text-xs text-gray-400 sm:hidden">{property.locality}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 hidden sm:table-cell">
                        <p className="text-gray-700">{property.locality}</p>
                        <p className="text-xs text-gray-400">{property.city}</p>
                      </td>
                      <td className="px-4 py-4 hidden md:table-cell text-gray-700">{property.accommodation}</td>
                      <td className="px-4 py-4 hidden lg:table-cell">
                        <span className="font-semibold text-gray-900">{property.askingPrice}</span>
                      </td>
                      <td className="px-4 py-4 hidden md:table-cell">
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-primary-light text-primary">
                          {property.constructionStatus}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-gray-500 text-xs">{property.floors.length} floors</td>
                      <td className="px-4 py-4">
                        {isExpanded ? (
                          <ChevronDown size={16} className="text-gray-400" />
                        ) : (
                          <ChevronRight size={16} className="text-gray-400" />
                        )}
                      </td>
                    </tr>
                    {isExpanded && (
                      <tr key={`${property.id}-expanded`}>
                        <td colSpan={7} className="px-4 pb-4 bg-gray-50/50">
                          {property.floors.length === 0 ? (
                            <p className="text-sm text-gray-400 py-3 text-center">No floors added yet.</p>
                          ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-3">
                              {property.floors.map((floor) => {
                                const currentStatus = getFloorStatus(property.id, floor.code, floor.status);
                                return (
                                  <div
                                    key={floor.code}
                                    className="bg-white rounded-lg border border-gray-200 p-3 space-y-2"
                                  >
                                    <div className="flex items-start justify-between gap-2">
                                      <div>
                                        <p className="text-xs font-bold text-gray-700">{floor.code}</p>
                                        <p className="text-xs text-gray-500 leading-tight">{floor.label}</p>
                                      </div>
                                      <FloorBadge status={currentStatus} />
                                    </div>
                                    <div className="text-xs text-gray-500 space-y-0.5">
                                      <p>{floor.carpetArea} sq ft</p>
                                      <p className="font-semibold text-gray-800">{floor.askingPrice}</p>
                                    </div>
                                    {floor.reason && (
                                      <p className="text-xs text-warning bg-warning-light px-2 py-1 rounded truncate">{floor.reason}</p>
                                    )}
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        toggleFloorStatus(property.id, floor.code, currentStatus);
                                      }}
                                      className="w-full text-xs text-primary border border-primary/30 rounded py-1 hover:bg-primary-light transition-colors"
                                    >
                                      Toggle Status
                                    </button>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Property Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-base font-bold text-gray-900">Add New Property</h2>
              <button
                onClick={() => { setShowModal(false); setForm(emptyForm); setErrors({}); }}
                className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Property Name *</label>
                <input
                  className={inputClass('name')}
                  placeholder="e.g. B-515, NFC"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                />
                {errors.name && <p className="text-xs text-error mt-1">{errors.name}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Locality *</label>
                  <input
                    className={inputClass('locality')}
                    placeholder="e.g. New Friends Colony"
                    value={form.locality}
                    onChange={(e) => setForm((f) => ({ ...f, locality: e.target.value }))}
                  />
                  {errors.locality && <p className="text-xs text-error mt-1">{errors.locality}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">City *</label>
                  <input
                    className={inputClass('city')}
                    placeholder="e.g. New Delhi"
                    value={form.city}
                    onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                  />
                  {errors.city && <p className="text-xs text-error mt-1">{errors.city}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Accommodation *</label>
                  <select
                    className={inputClass('accommodation')}
                    value={form.accommodation}
                    onChange={(e) => setForm((f) => ({ ...f, accommodation: e.target.value }))}
                  >
                    <option value="">Select</option>
                    <option value="1 BHK">1 BHK</option>
                    <option value="2 BHK">2 BHK</option>
                    <option value="3 BHK">3 BHK</option>
                    <option value="4 BHK">4 BHK</option>
                    <option value="5 BHK">5 BHK</option>
                    <option value="Studio">Studio</option>
                    <option value="Duplex">Duplex</option>
                    <option value="Penthouse">Penthouse</option>
                  </select>
                  {errors.accommodation && <p className="text-xs text-error mt-1">{errors.accommodation}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Asking Price *</label>
                  <input
                    className={inputClass('askingPrice')}
                    placeholder="e.g. ₹6.25 Cr"
                    value={form.askingPrice}
                    onChange={(e) => setForm((f) => ({ ...f, askingPrice: e.target.value }))}
                  />
                  {errors.askingPrice && <p className="text-xs text-error mt-1">{errors.askingPrice}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Construction Status *</label>
                  <select
                    className={inputClass('constructionStatus')}
                    value={form.constructionStatus}
                    onChange={(e) => setForm((f) => ({ ...f, constructionStatus: e.target.value }))}
                  >
                    <option value="">Select</option>
                    <option value="Pre-launch">Pre-launch</option>
                    <option value="Booking">Booking</option>
                    <option value="Under Construction">Under Construction</option>
                    <option value="Nearing Completion">Nearing Completion</option>
                    <option value="Ready to Move">Ready to Move</option>
                  </select>
                  {errors.constructionStatus && <p className="text-xs text-error mt-1">{errors.constructionStatus}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Possession Date *</label>
                  <input
                    className={inputClass('possession')}
                    placeholder="e.g. June 2026"
                    value={form.possession}
                    onChange={(e) => setForm((f) => ({ ...f, possession: e.target.value }))}
                  />
                  {errors.possession && <p className="text-xs text-error mt-1">{errors.possession}</p>}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => { setShowModal(false); setForm(emptyForm); setErrors({}); }}
                  className="flex-1 border border-gray-300 text-gray-700 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-primary text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-primary-dark transition-colors"
                >
                  Add Property
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
