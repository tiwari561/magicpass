type BrokerStatus = 'verified' | 'pending' | 'blacklisted';
type VisitStatus = 'pending' | 'approved' | 'rejected' | 'entered';

type Status = BrokerStatus | VisitStatus;

interface StatusBadgeProps {
  status: Status;
}

const statusConfig: Record<Status, { bg: string; text: string; label: string }> = {
  verified: { bg: 'bg-success-light', text: 'text-success', label: 'Verified' },
  pending: { bg: 'bg-warning-light', text: 'text-warning', label: 'Pending' },
  blacklisted: { bg: 'bg-error-light', text: 'text-error', label: 'Blacklisted' },
  approved: { bg: 'bg-success-light', text: 'text-success', label: 'Approved' },
  rejected: { bg: 'bg-error-light', text: 'text-error', label: 'Rejected' },
  entered: { bg: 'bg-primary-light', text: 'text-primary', label: 'Entered' },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status] ?? { bg: 'bg-gray-100', text: 'text-gray-600', label: status };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}
    >
      {config.label}
    </span>
  );
}
