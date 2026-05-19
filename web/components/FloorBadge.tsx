import { FloorStatus } from '@/lib/mockData';

interface FloorBadgeProps {
  status: FloorStatus;
  label?: string;
}

const statusConfig: Record<FloorStatus, { bg: string; text: string; dot: string; display: string }> = {
  available: {
    bg: 'bg-success-light',
    text: 'text-success',
    dot: 'bg-success',
    display: 'Available',
  },
  unavailable: {
    bg: 'bg-warning-light',
    text: 'text-warning',
    dot: 'bg-warning',
    display: 'Unavailable',
  },
  sold_out: {
    bg: 'bg-error-light',
    text: 'text-error',
    dot: 'bg-error',
    display: 'Sold Out',
  },
};

export default function FloorBadge({ status, label }: FloorBadgeProps) {
  const config = statusConfig[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {label ?? config.display}
    </span>
  );
}
