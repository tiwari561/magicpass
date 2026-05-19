'use client';

import { useState } from 'react';
import { Search, CheckCircle, Ban } from 'lucide-react';
import StatusBadge from '@/components/StatusBadge';
import { MOCK_BROKERS, Broker } from '@/lib/mockData';

type FilterTab = 'all' | 'verified' | 'pending' | 'blacklisted';

const TABS: { key: FilterTab; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'verified', label: 'Verified' },
  { key: 'pending', label: 'Pending' },
  { key: 'blacklisted', label: 'Blacklisted' },
];

export default function BrokersPage() {
  const [brokers, setBrokers] = useState<Broker[]>(MOCK_BROKERS);
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [search, setSearch] = useState('');

  const handleVerify = (id: string) => {
    setBrokers((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: 'verified' } : b))
    );
  };

  const handleBlacklist = (id: string) => {
    setBrokers((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: 'blacklisted' } : b))
    );
  };

  const filtered = brokers.filter((b) => {
    const matchesTab = activeTab === 'all' || b.status === activeTab;
    const matchesSearch =
      !search ||
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.company.toLowerCase().includes(search.toLowerCase()) ||
      b.reraNumber.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const counts = {
    all: brokers.length,
    verified: brokers.filter((b) => b.status === 'verified').length,
    pending: brokers.filter((b) => b.status === 'pending').length,
    blacklisted: brokers.filter((b) => b.status === 'blacklisted').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Brokers</h1>
        <p className="text-sm text-gray-500 mt-1">Manage and verify brokers on the platform</p>
      </div>

      {/* Filter tabs + Search */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1 w-fit">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                activeTab === tab.key
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
              <span
                className={`ml-1.5 px-1.5 py-0.5 rounded-full text-xs ${
                  activeTab === tab.key ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
                }`}
              >
                {counts[tab.key]}
              </span>
            </button>
          ))}
        </div>

        <div className="relative sm:ml-auto">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search brokers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-64 pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Broker</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide hidden sm:table-cell">RERA No.</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Company</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide hidden lg:table-cell">Visits</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-sm text-gray-400">
                    No brokers found.
                  </td>
                </tr>
              ) : (
                filtered.map((broker) => (
                  <tr key={broker.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-bold text-white">{broker.initials}</span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{broker.name}</p>
                          <p className="text-xs text-gray-400">{broker.email}</p>
                          <p className="text-xs text-gray-400 sm:hidden">{broker.reraNumber}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 hidden sm:table-cell text-gray-600 font-mono text-xs">{broker.reraNumber}</td>
                    <td className="px-4 py-4 hidden md:table-cell text-gray-700">{broker.company}</td>
                    <td className="px-4 py-4 hidden lg:table-cell">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-gray-900">{broker.visitsCount}</span>
                        <span className="text-gray-400 text-xs">visits</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <StatusBadge status={broker.status} />
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {broker.status !== 'verified' && (
                          <button
                            onClick={() => handleVerify(broker.id)}
                            className="flex items-center gap-1 text-xs font-semibold text-success border border-success/30 bg-success-light px-2.5 py-1.5 rounded-lg hover:bg-green-100 transition-colors"
                          >
                            <CheckCircle size={13} />
                            Verify
                          </button>
                        )}
                        {broker.status !== 'blacklisted' && (
                          <button
                            onClick={() => handleBlacklist(broker.id)}
                            className="flex items-center gap-1 text-xs font-semibold text-error border border-error/30 bg-error-light px-2.5 py-1.5 rounded-lg hover:bg-red-100 transition-colors"
                          >
                            <Ban size={13} />
                            Blacklist
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
