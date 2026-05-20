'use client';

import { useMemo, useState } from 'react';
import { CheckCircle, Search } from 'lucide-react';
import ApprovalCard from '@/components/ApprovalCard';
import { PENDING_APPROVALS } from '@/lib/mockData';

type Filter = 'all' | 'urgent' | 'recent';

export default function ApprovalsPage() {
  const [approvals, setApprovals] = useState(PENDING_APPROVALS);
  const [filter, setFilter] = useState<Filter>('all');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    let list = approvals;
    if (filter === 'urgent') {
      list = list.filter((a) => a.waitingTime.includes('hr'));
    } else if (filter === 'recent') {
      list = list.filter((a) => a.waitingTime.includes('min'));
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (a) =>
          a.brokerName.toLowerCase().includes(q) ||
          a.propertyName.toLowerCase().includes(q),
      );
    }
    return list;
  }, [approvals, filter, query]);

  const handleApprove = (id: string) => setApprovals((p) => p.filter((a) => a.id !== id));
  const handleReject = (id: string) => setApprovals((p) => p.filter((a) => a.id !== id));

  const filters: { key: Filter; label: string; count: number }[] = [
    { key: 'all', label: 'All', count: approvals.length },
    { key: 'urgent', label: 'Urgent (>1hr)', count: approvals.filter((a) => a.waitingTime.includes('hr')).length },
    { key: 'recent', label: 'Recent (<1hr)', count: approvals.filter((a) => a.waitingTime.includes('min')).length },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Approvals</h1>
        <p className="text-sm text-gray-500 mt-1">
          Review and respond to broker visit requests.
        </p>
      </div>

      {/* Search + filters */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search broker or property"
            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                filter === f.key
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {f.label}
              <span className="ml-1.5 opacity-80">{f.count}</span>
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <CheckCircle size={42} className="mx-auto text-success mb-3" />
          <p className="text-sm font-medium text-gray-700">All caught up!</p>
          <p className="text-xs text-gray-400 mt-1">No approvals match the current filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((a) => (
            <ApprovalCard key={a.id} approval={a} onApprove={handleApprove} onReject={handleReject} />
          ))}
        </div>
      )}
    </div>
  );
}
