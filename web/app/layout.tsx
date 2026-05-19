import type { Metadata } from 'next';
import './globals.css';
import Sidebar from '@/components/Sidebar';

export const metadata: Metadata = {
  title: 'MagicPass Builder',
  description: 'Builder dashboard for MagicPass visitor management',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 antialiased">
        <div className="flex min-h-screen">
          <Sidebar />
          {/* Main content — offset on mobile for fixed top bar */}
          <main className="flex-1 min-w-0 pt-14 lg:pt-0 overflow-auto">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
