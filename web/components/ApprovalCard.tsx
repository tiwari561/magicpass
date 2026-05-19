'use client';

import { useState } from 'react';
import { Clock, CheckCircle, XCircle, MessageSquare } from 'lucide-react';

interface PendingApproval {
  id: string;
  brokerName: string;
  brokerInitials: string;
  brokerId: string;
  propertyName: string;
  requestedAt: string;
  waitingTime: string;
  brokerNote: string;
  floorsAvailable: string[];
  floorsUnavailable: string[];
  builderNote: string;
}

interface ApprovalCardProps {
  approval: PendingApproval;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export default function ApprovalCard({ approval, onApprove, onReject }: ApprovalCardProps) {
  const [loading, setLoading] = useState<'approve' | 'reject' | null>(null);

  const handleApprove = () => {
    setLoading('approve');
    setTimeout(() => {
      onApprove(approval.id);
      setLoading(null);
    }, 600);
  };

  const handleReject = () => {
    setLoading('reject');
    setTimeout(() => {
      onReject(approval.id);
      setLoading(null);
    }, 600);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
          <span className="text-xs font-bold text-white">{approval.brokerInitials}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <p className="font-semibold text-gray-900 text-sm">{approval.brokerName}</p>
            <div className="flex items-center gap-1 text-gray-400 text-xs flex-shrink-0">
              <Clock size={12} />
              <span>{approval.waitingTime}</span>
            </div>
          </div>
          {approval.brokerId && (
            <p className="text-xs text-gray-400 mt-0.5">RERA: {approval.brokerId}</p>
          )}
          <p className="text-sm text-gray-600 mt-1 font-medium">{approval.propertyName}</p>
        </div>
      </div>

      {/* Broker note */}
      {approval.brokerNote ? (
        <div className="flex gap-2 bg-gray-50 rounded-lg px-3 py-2">
          <MessageSquare size={14} className="text-gray-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-gray-600 italic">&ldquo;{approval.brokerNote}&rdquo;</p>
        </div>
      ) : null}

      {/* Floor chips */}
      <div className="space-y-2">
        {approval.floorsAvailable.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {approval.floorsAvailable.map((f) => (
              <span
                key={f}
                className="px-2 py-0.5 rounded-full text-xs font-medium bg-success-light text-success"
              >
                {f}
              </span>
            ))}
          </div>
        )}
        {approval.floorsUnavailable.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {approval.floorsUnavailable.map((f) => (
              <span
                key={f}
                className="px-2 py-0.5 rounded-full text-xs font-medium bg-warning-light text-warning"
              >
                {f}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Builder note */}
      {approval.builderNote && (
        <p className="text-xs text-primary font-medium bg-primary-light px-3 py-1.5 rounded-lg">
          Note: {approval.builderNote}
        </p>
      )}

      {/* Action buttons */}
      <div className="flex gap-2 pt-1">
        <button
          onClick={handleApprove}
          disabled={loading !== null}
          className="flex-1 flex items-center justify-center gap-1.5 bg-success text-white text-sm font-semibold py-2 rounded-lg hover:bg-green-700 disabled:opacity-60 transition-colors"
        >
          <CheckCircle size={15} />
          {loading === 'approve' ? 'Approving...' : 'Approve'}
        </button>
        <button
          onClick={handleReject}
          disabled={loading !== null}
          className="flex-1 flex items-center justify-center gap-1.5 bg-white border border-error text-error text-sm font-semibold py-2 rounded-lg hover:bg-error-light disabled:opacity-60 transition-colors"
        >
          <XCircle size={15} />
          {loading === 'reject' ? 'Rejecting...' : 'Reject'}
        </button>
      </div>
    </div>
  );
}
