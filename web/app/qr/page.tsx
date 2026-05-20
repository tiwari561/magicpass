'use client';

import { useMemo, useState } from 'react';
import { QrCode, Download, Printer, RefreshCw } from 'lucide-react';
import { MOCK_PROPERTIES } from '@/lib/mockData';

function buildQRDataURL(token: string): string {
  const url = `https://api.qrserver.com/v1/create-qr-code/?size=320x320&margin=8&data=${encodeURIComponent(
    `magicpass://visit/${token}`,
  )}`;
  return url;
}

export default function QRPage() {
  const [selectedId, setSelectedId] = useState(MOCK_PROPERTIES[0].id);
  const [tokenOverride, setTokenOverride] = useState<Record<string, string>>({});

  const property = useMemo(
    () => MOCK_PROPERTIES.find((p) => p.id === selectedId) ?? MOCK_PROPERTIES[0],
    [selectedId],
  );

  const token = tokenOverride[property.id] ?? property.qrToken;
  const qrSrc = buildQRDataURL(token);

  const regenerate = () => {
    const next = Math.random().toString(36).substring(2, 8).toUpperCase();
    setTokenOverride((prev) => ({ ...prev, [property.id]: next }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">QR Codes</h1>
        <p className="text-sm text-gray-500 mt-1">
          Print and share property entry QR codes for brokers to scan on arrival.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Property list */}
        <div className="lg:col-span-1 bg-white rounded-xl border border-gray-200 divide-y divide-gray-100 max-h-[640px] overflow-y-auto">
          {MOCK_PROPERTIES.map((p) => {
            const active = p.id === selectedId;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedId(p.id)}
                className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors ${
                  active ? 'bg-primary-light' : 'hover:bg-gray-50'
                }`}
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${active ? 'bg-primary' : 'bg-gray-100'}`}>
                  <QrCode size={16} className={active ? 'text-white' : 'text-gray-500'} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-gray-900 truncate">{p.name}</p>
                  <p className="text-xs text-gray-400 truncate">{p.locality}</p>
                </div>
                <span className="text-xs font-mono text-gray-400">{tokenOverride[p.id] ?? p.qrToken}</span>
              </button>
            );
          })}
        </div>

        {/* QR preview */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6 space-y-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs uppercase font-semibold text-gray-400 tracking-wide">Selected</p>
              <h2 className="text-lg font-bold text-gray-900 mt-0.5">{property.name}</h2>
              <p className="text-xs text-gray-500">{property.locality} · {property.city}</p>
            </div>
            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-primary-light text-primary">
              {property.constructionStatus}
            </span>
          </div>

          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <img
                src={qrSrc}
                alt={`QR for ${property.name}`}
                width={260}
                height={260}
                className="block"
              />
            </div>

            <div className="flex-1 w-full space-y-3">
              <div className="bg-gray-50 rounded-lg px-4 py-3">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Token</p>
                <p className="font-mono text-lg font-bold text-gray-900 mt-0.5">{token}</p>
              </div>
              <div className="bg-gray-50 rounded-lg px-4 py-3">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Caretaker</p>
                <p className="text-sm text-gray-900 mt-0.5">{property.caretakerName || '—'}</p>
                <p className="text-xs text-gray-500">{property.caretakerPhone}</p>
              </div>

              <div className="flex gap-2 pt-1">
                <a
                  href={qrSrc}
                  download={`magicpass-${token}.png`}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-primary text-white text-sm font-semibold py-2 rounded-lg hover:bg-primary-dark transition-colors"
                >
                  <Download size={15} /> Download
                </a>
                <button
                  onClick={() => window.print()}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-white border border-gray-300 text-gray-700 text-sm font-semibold py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Printer size={15} /> Print
                </button>
                <button
                  onClick={regenerate}
                  className="flex items-center justify-center gap-1.5 bg-white border border-gray-300 text-gray-700 text-sm font-semibold py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors"
                  aria-label="Regenerate token"
                  title="Regenerate token"
                >
                  <RefreshCw size={15} />
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-4">
            <p className="text-xs text-gray-500">
              Brokers scan this code on arrival. A 6-digit entry code is then issued by the
              caretaker after you approve the request.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
