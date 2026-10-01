import React, { useState } from 'react';
import { AiRecommendation, Product } from '../types';
import { useLocalization } from '../context/LocalizationContext';

interface AiStylistModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectRecommendedProduct: (productName: string) => void;
}

export const AiStylistModal: React.FC<AiStylistModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectRecommendedProduct,
}) => {
  const { t } = useLocalization();
  const [heightCm, setHeightCm] = useState<number>(180);
  const [weightKg, setWeightKg] = useState<number>(75);
  const [chestCm, setChestCm] = useState<number>(98);
  const [preferredFit, setPreferredFit] = useState<string>('Sculptural Ergonomic');
  const [movementContext, setMovementContext] = useState<string>('Everyday urban architectural wear');

  const [loading, setLoading] = useState<boolean>(false);
  const [recommendation, setRecommendation] = useState<AiRecommendation | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleConsult = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/ai-stylist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          heightCm,
          weightKg,
          chestCm,
          preferredFit,
          movementContext
        })
      });

      const data = await res.json();
      if (data.success && data.recommendation) {
        setRecommendation(data.recommendation);
      } else {
        throw new Error(data.error || 'Failed to get recommendation.');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Consultation service unavailable.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
      {/* Backdrop */}
      <div onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-md"></div>

      <div className="relative z-10 w-full max-w-xl bg-white rounded-3xl p-6 md:p-8 shadow-2xl border border-blue-100 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#d9e2ff] flex items-center justify-center text-[#0056c8]">
              <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
            </span>
            <div>
              <h2 className="text-xl font-bold text-[#1c1b1b] font-display">
                {t.stylistTitle}
              </h2>
              <span className="text-[10px] uppercase tracking-wider text-[#0056c8] font-bold block">
                {t.stylistPowered}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {!recommendation ? (
          <form onSubmit={handleConsult} className="space-y-5 pt-4">
            <p className="text-xs text-[#424655] leading-relaxed">
              {t.stylistIntro}
            </p>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-[10px] uppercase font-bold text-[#565d6b] block mb-1">
                  {t.heightLabel}
                </label>
                <input
                  type="number"
                  value={heightCm}
                  onChange={e => setHeightCm(Number(e.target.value))}
                  required
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-[#1c1b1b] font-semibold focus:ring-2 focus:ring-[#0056c8] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-[#565d6b] block mb-1">
                  {t.weightLabel}
                </label>
                <input
                  type="number"
                  value={weightKg}
                  onChange={e => setWeightKg(Number(e.target.value))}
                  required
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-[#1c1b1b] font-semibold focus:ring-2 focus:ring-[#0056c8] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-[#565d6b] block mb-1">
                  {t.chestLabel}
                </label>
                <input
                  type="number"
                  value={chestCm}
                  onChange={e => setChestCm(Number(e.target.value))}
                  required
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-[#1c1b1b] font-semibold focus:ring-2 focus:ring-[#0056c8] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold text-[#565d6b] block mb-1">
                {t.drapeSilhouetteLabel}
              </label>
              <select
                value={preferredFit}
                onChange={e => setPreferredFit(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs text-[#1c1b1b] font-medium focus:ring-2 focus:ring-[#0056c8] focus:outline-none"
              >
                <option value="Sculptural Ergonomic">{t.drapeSculptural}</option>
                <option value="Fluid Oversized">{t.drapeFluid}</option>
                <option value="Fitted Atelier">{t.drapeFitted}</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold text-[#565d6b] block mb-1">
                {t.movementContextLabel}
              </label>
              <input
                type="text"
                value={movementContext}
                onChange={e => setMovementContext(e.target.value)}
                placeholder={t.movementPlaceholder}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs text-[#1c1b1b] focus:ring-2 focus:ring-[#0056c8] focus:outline-none"
              />
            </div>

            {errorMsg && (
              <p className="text-xs text-red-500 font-medium pt-1">{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-full bg-[#0056c8] hover:bg-[#00429c] text-white text-xs font-semibold shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <span className="material-symbols-outlined text-[18px] animate-spin">refresh</span>
                  <span>{t.calculatingBtn}</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                  <span>{t.calculateBtn}</span>
                </>
              )}
            </button>
          </form>
        ) : (
          <div className="py-4 space-y-5 animate-fadeIn">
            {/* Recommendation Result */}
            <div className="p-4 bg-[#f0edec] rounded-2xl border border-blue-100 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-[#0056c8] tracking-widest">
                  {t.allocationResultTitle}
                </span>
                <span className="px-3 py-1 rounded-full bg-[#1c1b1b] text-white text-xs font-bold font-mono">
                  Size: {recommendation.recommendedSize}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-[#1c1b1b]">
                  {recommendation.idealGarment}
                </h3>
                <p className="text-xs text-[#424655] pt-1 leading-relaxed">
                  {recommendation.fitAnalysis}
                </p>
              </div>

              <div className="pt-2 border-t border-gray-200">
                <span className="text-[10px] uppercase font-bold text-[#565d6b] block">
                  {t.textileCareAdvice}
                </span>
                <p className="text-xs text-[#1c1b1b] italic pt-0.5">
                  "{recommendation.textileEngineeringTip}"
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setRecommendation(null)}
                className="flex-1 py-3 rounded-full border border-gray-200 text-xs font-semibold text-[#1c1b1b] hover:bg-gray-50"
              >
                {t.recalculateBtn}
              </button>
              <button
                onClick={() => {
                  onSelectRecommendedProduct(recommendation.idealGarment);
                  onClose();
                }}
                className="flex-1 py-3 rounded-full bg-[#0056c8] hover:bg-[#00429c] text-white text-xs font-semibold shadow-md"
              >
                {t.viewRecommendedPiece}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
