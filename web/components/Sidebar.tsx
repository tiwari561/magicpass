'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  LayoutDashboard,
  Building2,
  Users,
  BarChart3,
  Menu,
  X,
  QrCode,
  CheckSquare,
  UserCircle,
} from 'lucide-react';

const navLinks = [
  { href: '/',           label: 'Dashboard',  icon: LayoutDashboard },
  { href: '/approvals',  label: 'Approvals',  icon: CheckSquare },
  { href: '/properties', label: 'Properties', icon: Building2 },
  { href: '/qr',         label: 'QR Codes',   icon: QrCode },
  { href: '/brokers',    label: 'Brokers',     icon: Users },
  { href: '/analytics',  label: 'Analytics',  icon: BarChart3 },
  { href: '/profile',    label: 'Profile',    icon: UserCircle },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const NavContent = () => (
    <div className="flex flex-col h-full bg-ink">
      {/* Wordmark */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
        {/* Sparkles icon */}
        <div className="relative w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
          <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
            <path d="M12 2 L13.6 9 L20.5 11 L13.6 13 L12 20 L10.4 13 L3.5 11 L10.4 9 Z" fill="#00D084" />
            <path d="M19 4 L19.7 6.4 L22 7 L19.7 7.6 L19 10 L18.3 7.6 L16 7 L18.3 6.4 Z" fill="#00D084" />
          </svg>
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-primary" />
        </div>
        <div>
          <p className="text-sm font-extrabold tracking-tight text-white leading-tight font-display">
            Magic<span className="text-clay">.</span>Pass
          </p>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40 leading-tight mt-0.5">
            Builder
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navLinks.map(({ href, label, icon: Icon }) => {
          const isActive =
            href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                isActive
                  ? 'bg-primary text-ink'
                  : 'text-white/60 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon size={16} className={isActive ? 'text-ink' : 'text-white/40'} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Builder profile footer */}
      <div className="px-4 py-4 border-t border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
            <span className="text-[11px] font-bold text-ink">RS</span>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white truncate">Rohan Sharma</p>
            <p className="text-[11px] text-white/40 truncate">Lodha Group</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-56 h-screen sticky top-0 flex-shrink-0">
        <NavContent />
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-ink px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="relative w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
              <path d="M12 2 L13.6 9 L20.5 11 L13.6 13 L12 20 L10.4 13 L3.5 11 L10.4 9 Z" fill="#00D084" />
            </svg>
          </div>
          <span className="font-display font-extrabold text-sm tracking-tight text-white">
            Magic<span className="text-clay">.</span>Pass
          </span>
        </div>
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded-lg text-white/60 hover:bg-white/10"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-ink/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={`lg:hidden fixed top-0 left-0 bottom-0 z-50 w-64 shadow-2xl transform transition-transform duration-200 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-ink">
          <span className="font-display font-extrabold text-sm text-white tracking-tight">
            Magic<span className="text-clay">.</span>Pass
          </span>
          <button
            onClick={() => setMobileOpen(false)}
            className="p-1.5 rounded-lg text-white/50 hover:bg-white/10"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>
        <NavContent />
      </aside>
    </>
  );
}
