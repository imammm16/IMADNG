import React, { useState } from 'react';
import { useLocalization } from '../context/LocalizationContext';

export const AtelierWireSection: React.FC = () => {
  const { language } = useLocalization();
  const isId = language === 'id';
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setStatus(
        isId
          ? 'Klien berhasil terdaftar ke dalam jaringan privat Atelier Wire.'
          : 'Client successfully indexed into the Atelier Wire network.'
      );
      setEmail('');
      setTimeout(() => setStatus(null), 5000);
    }
  };

  return (
    <section className="w-full px-4 lg:px-12 py-16 sm:py-24 bg-[#fcf9f8]" id="atelier-wire">
      <div className="max-w-5xl mx-auto">
        <div className="relative rounded-3xl bg-gradient-to-br from-white via-[#f8f6f5] to-[#ece8e8] p-8 lg:p-14 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.06)] border border-black/[0.05] overflow-hidden">
          {/* Ambient Glow */}
          <div className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 bg-[#0056c8]/10 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6">
            <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#0056c8]">
              <span className="w-2 h-2 rounded-full bg-[#0056c8] animate-pulse" />
              <span>{isId ? 'Jaringan Privat Atelier' : 'Atelier Private Wire'}</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#1c1b1b] font-display text-balance">
              {isId
                ? 'Akses Prioritas Rilis Edisi 05 & Dokumen Spesifikasi'
                : 'Receive Edition 05 Preview & Runway Spec Sheets'}
            </h2>

            <p className="text-sm md:text-base text-[#565d6b] max-w-xl mx-auto leading-relaxed">
              {isId
                ? 'Dapatkan alokasi prioritas 24 jam sebelum rilis publik, lembar pengujian densitas kain, dan sampel prototipe terbatas.'
                : 'Direct priority allocation window on limited micro-batches, technical textile certificates, and sample prototypes.'}
            </p>

            <form
              onSubmit={handleSubmit}
              className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={isId ? 'Masukkan alamat email Anda...' : 'Enter client email address...'}
                required
                className="w-full px-5 py-3.5 rounded-full bg-white text-xs text-[#1c1b1b] placeholder:text-[#888e9b] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0056c8] shadow-sm"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#1c1b1b] text-white hover:bg-[#0056c8] text-xs font-semibold transition-colors duration-300 shrink-0 shadow-md btn-spring"
              >
                {isId ? 'Daftar Akses' : 'Access Wire'}
              </button>
            </form>

            {status && (
              <div className="text-xs text-[#0056c8] font-semibold animate-fade-in pt-1">
                ✓ {status}
              </div>
            )}

            {/* Wire Perks Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-8 border-t border-black/[0.06] text-left">
              <div className="p-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-black/[0.04] space-y-1">
                <span className="text-[10px] uppercase font-bold text-[#0056c8] tracking-wider block">
                  01. {isId ? 'Akses Awal' : 'Pre-Release'}
                </span>
                <h4 className="text-xs font-bold text-[#1c1b1b]">
                  {isId ? 'Jendela 24 Jam' : '24h Priority Window'}
                </h4>
                <p className="text-[11px] text-[#565d6b]">
                  {isId
                    ? 'Hak memesan 24 jam lebih awal sebelum batch dibuka untuk publik.'
                    : '24-hour priority allocation window before public catalogue drop.'}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-black/[0.04] space-y-1">
                <span className="text-[10px] uppercase font-bold text-[#0056c8] tracking-wider block">
                  02. {isId ? 'Lembar Teknis' : 'Material Spec'}
                </span>
                <h4 className="text-xs font-bold text-[#1c1b1b]">
                  {isId ? 'Sertifikasi Asal Serat' : 'Textile Provenance'}
                </h4>
                <p className="text-[11px] text-[#565d6b]">
                  {isId
                    ? 'Laporan uji lab densitas benang dan sertifikat GOTS Portugal.'
                    : 'Complete yarn density tear-sheets and Portugal GOTS certificates.'}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-black/[0.04] space-y-1">
                <span className="text-[10px] uppercase font-bold text-[#0056c8] tracking-wider block">
                  03. {isId ? 'Prototipe Sampel' : 'Prototype Drops'}
                </span>
                <h4 className="text-xs font-bold text-[#1c1b1b]">
                  {isId ? 'Warna Uji Coba' : 'Experimental Hues'}
                </h4>
                <p className="text-[11px] text-[#565d6b]">
                  {isId
                    ? 'Undangan privat untuk mencoba potongan potongan eksploratif terbatas.'
                    : 'Exclusive private invitations to limited colorway sample runs.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
