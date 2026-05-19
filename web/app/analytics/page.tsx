import { Clock, QrCode, Users, Building2, TrendingUp } from 'lucide-react';
import StatCard from '@/components/StatCard';
import { MOCK_BROKERS } from '@/lib/mockData';

// Simulated visits per day (last 7 days)
const VISITS_PER_DAY = [
  { day: 'Mon', count: 5 },
  { day: 'Tue', count: 9 },
  { day: 'Wed', count: 7 },
  { day: 'Thu', count: 12 },
  { day: 'Fri', count: 8 },
  { day: 'Sat', count: 14 },
  { day: 'Sun', count: 6 },
];

// Simulated visit status breakdown
const VISIT_STATUS_DATA = [
  { label: 'Approved', count: 42, color: 'bg-success', hex: '#057a55' },
  { label: 'Entered', count: 31, color: 'bg-primary', hex: '#1a56db' },
  { label: 'Pending', count: 7, color: 'bg-warning', hex: '#d97706' },
  { label: 'Rejected', count: 12, color: 'bg-error', hex: '#e02424' },
];

// Top brokers by visit count (from MOCK_BROKERS, sorted)
const topBrokers = [...MOCK_BROKERS]
  .sort((a, b) => b.visitsCount - a.visitsCount)
  .slice(0, 5);

// Top properties by scan count (simulated)
const topProperties = [
  { name: 'B-515, NFC', locality: 'New Friends Colony', scans: 38 },
  { name: 'D-88, DLF Phase 3', locality: 'DLF Phase 3, Gurugram', scans: 29 },
  { name: 'E-204, Vasant Vihar', locality: 'Vasant Vihar, Delhi', scans: 21 },
  { name: 'C-42, GK II', locality: 'Greater Kailash II', scans: 17 },
  { name: 'A-17, South Ex', locality: 'South Extension Part 2', scans: 11 },
];

const maxVisits = Math.max(...VISITS_PER_DAY.map((d) => d.count));
const totalVisitStatuses = VISIT_STATUS_DATA.reduce((s, d) => s + d.count, 0);

// Build donut segments
function buildDonutSegments() {
  const r = 54;
  const circumference = 2 * Math.PI * r;
  let offset = 0;
  return VISIT_STATUS_DATA.map((d) => {
    const pct = d.count / totalVisitStatuses;
    const dash = pct * circumference;
    const seg = { ...d, dash, offset, gap: circumference - dash, pct };
    offset += dash;
    return seg;
  });
}

const donutSegments = buildDonutSegments();

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-sm text-gray-500 mt-1">Platform overview and performance reports</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Pending Approvals" value={7} icon={Clock} iconBg="bg-warning-light" iconColor="text-warning" />
        <StatCard label="QR Scans Today" value={28} icon={QrCode} iconBg="bg-primary-light" iconColor="text-primary" />
        <StatCard label="Verified Brokers" value={186} icon={Users} iconBg="bg-success-light" iconColor="text-success" />
        <StatCard label="Properties" value={5} icon={Building2} iconBg="bg-gray-100" iconColor="text-gray-500" />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bar chart — visits per day */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-base font-semibold text-gray-900 mb-6">Visits Per Day (Last 7 Days)</h2>
          <div className="flex items-end gap-3 h-40">
            {VISITS_PER_DAY.map((d) => {
              const heightPct = (d.count / maxVisits) * 100;
              return (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-xs font-semibold text-gray-600">{d.count}</span>
                  <div className="w-full flex items-end" style={{ height: '100px' }}>
                    <div
                      className="w-full bg-primary rounded-t-md transition-all"
                      style={{ height: `${heightPct}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-400">{d.day}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Donut chart — visit status breakdown */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Visit Status Breakdown</h2>
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <svg width="140" height="140" viewBox="0 0 140 140" className="-rotate-90">
                <circle cx="70" cy="70" r="54" fill="none" stroke="#f3f4f6" strokeWidth="18" />
                {donutSegments.map((seg, i) => (
                  <circle
                    key={i}
                    cx="70"
                    cy="70"
                    r="54"
                    fill="none"
                    stroke={seg.hex}
                    strokeWidth="18"
                    strokeDasharray={`${seg.dash} ${seg.gap}`}
                    strokeDashoffset={-seg.offset}
                    strokeLinecap="butt"
                  />
                ))}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-2xl font-bold text-gray-900">{totalVisitStatuses}</p>
                <p className="text-xs text-gray-400">Total</p>
              </div>
            </div>

            <div className="w-full space-y-2">
              {VISIT_STATUS_DATA.map((d) => (
                <div key={d.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${d.color}`} />
                    <span className="text-xs text-gray-600">{d.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-gray-900">{d.count}</span>
                    <span className="text-xs text-gray-400">
                      {Math.round((d.count / totalVisitStatuses) * 100)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Leaderboards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top brokers */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={16} className="text-primary" />
            <h2 className="text-base font-semibold text-gray-900">Top Brokers by Visits</h2>
          </div>
          <div className="space-y-3">
            {topBrokers.map((broker, idx) => {
              const maxCount = topBrokers[0].visitsCount;
              const pct = (broker.visitsCount / maxCount) * 100;
              return (
                <div key={broker.id} className="flex items-center gap-3">
                  <div className="w-6 text-center">
                    <span
                      className={`text-xs font-bold ${
                        idx === 0 ? 'text-yellow-500' : idx === 1 ? 'text-gray-400' : idx === 2 ? 'text-amber-600' : 'text-gray-400'
                      }`}
                    >
                      #{idx + 1}
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-white">{broker.initials}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-gray-900 truncate">{broker.name}</p>
                      <span className="text-sm font-bold text-gray-900 ml-2 flex-shrink-0">{broker.visitsCount}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                      <div
                        className="bg-primary h-1.5 rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top properties by scan count */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-2 mb-4">
            <QrCode size={16} className="text-primary" />
            <h2 className="text-base font-semibold text-gray-900">Top Properties by Scans</h2>
          </div>
          <div className="space-y-3">
            {topProperties.map((prop, idx) => {
              const maxScans = topProperties[0].scans;
              const pct = (prop.scans / maxScans) * 100;
              return (
                <div key={prop.name} className="flex items-center gap-3">
                  <div className="w-6 text-center">
                    <span
                      className={`text-xs font-bold ${
                        idx === 0 ? 'text-yellow-500' : idx === 1 ? 'text-gray-400' : idx === 2 ? 'text-amber-600' : 'text-gray-400'
                      }`}
                    >
                      #{idx + 1}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{prop.name}</p>
                        <p className="text-xs text-gray-400 truncate">{prop.locality}</p>
                      </div>
                      <span className="text-sm font-bold text-gray-900 ml-2 flex-shrink-0">{prop.scans}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                      <div
                        className="bg-primary h-1.5 rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
