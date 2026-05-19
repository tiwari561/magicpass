'use client';

import { useState } from 'react';
import { Clock, QrCode, Users, Building2, CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import StatCard from '@/components/StatCard';
import ApprovalCard from '@/components/ApprovalCard';
import StatusBadge from '@/components/StatusBadge';
import { PENDING_APPROVALS, MOCK_VISITS, MOCK_BUILDER } from '@/lib/mockData';

export default function DashboardPage() {
  const [approvals, setApprovals] = useState(PENDING_APPROVALS);

  const handleApprove = (id: string) => {
    setApprovals((prev) => prev.filter((a) => a.id !== id));
  };

  const handleReject = (id: string) => {
    setApprovals((prev) => prev.filter((a) => a.id !== id));
  };

  const recentVisits = MOCK_VISITS.slice(0, 5);

  const stats = [
    {
      label: 'Pending Approvals',
      value: approvals.length,
      icon: Clock,
      iconBg: 'bg-warning-light',
      iconColor: 'text-warning',
    },
    {
      label: 'QR Scans Today',
      value: MOCK_BUILDER.qrScansToday,
      icon: QrCode,
      iconBg: 'bg-primary-light',
      iconColor: 'text-primary',
    },
    {
      label: 'Verified Brokers',
      value: MOCK_BUILDER.verifiedBrokers,
      icon: Users,
      iconBg: 'bg-success-light',
      iconColor: 'text-success',
    },
    {
      label: 'Properties',
      value: 5,
      icon: Building2,
      iconBg: 'bg-gray-100',
      iconColor: 'text-gray-500',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Welcome back, Rohan. Here&apos;s what&apos;s happening today.</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Pending approvals */}
        <div className="xl:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-gray-900">
              Pending Approvals
              {approvals.length > 0 && (
                <span className="ml-2 inline-flex items-center justify-center w-5 h-5 rounded-full bg-warning text-white text-xs font-bold">
                  {approvals.length}
                </span>
              )}
            </h2>
          </div>

          {approvals.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-10 text-center">
              <CheckCircle size={36} className="mx-auto text-success mb-3" />
              <p className="text-sm font-medium text-gray-700">All caught up!</p>
              <p className="text-xs text-gray-400 mt-1">No pending approvals right now.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {approvals.map((approval) => (
                <ApprovalCard
                  key={approval.id}
                  approval={approval}
                  onApprove={handleApprove}
                  onReject={handleReject}
                />
              ))}
            </div>
          )}
        </div>

        {/* Recent activity */}
        <div className="space-y-4">
          <h2 className="text-base font-semibold text-gray-900">Recent Activity</h2>
          <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
            {recentVisits.map((visit) => (
              <div key={visit.id} className="px-4 py-3 flex items-start gap-3">
                <div className="mt-0.5 flex-shrink-0">
                  {visit.status === 'approved' && (
                    <CheckCircle size={16} className="text-success" />
                  )}
                  {visit.status === 'rejected' && (
                    <XCircle size={16} className="text-error" />
                  )}
                  {visit.status === 'entered' && (
                    <ArrowRight size={16} className="text-primary" />
                  )}
                  {visit.status === 'pending' && (
                    <Clock size={16} className="text-warning" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{visit.propertyName}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{visit.requestedAt}</p>
                </div>
                <StatusBadge status={visit.status} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
