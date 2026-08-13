import React, { useState } from 'react';
import { Check, Sparkles, HelpCircle, ArrowRight, Users, Calculator } from 'lucide-react';
import { PACKAGES } from '../data/cateringData';

interface PackagesProps {
  onOpenQuoteForm: (packageName?: string) => void;
}

export const Packages: React.FC<PackagesProps> = ({ onOpenQuoteForm }) => {
  const [estimatedGuests, setEstimatedGuests] = useState<number>(150);

  const getRecommendedPackage = (guests: number) => {
    if (guests <= 80) return 'essential-package';
    if (guests <= 350) return 'signature-package';
    return 'premium-package';
  };

  const recommendedId = getRecommendedPackage(estimatedGuests);

  return (
    <section id="packages" className="py-20 bg-[#F3EEE8] text-[#2C221E] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-[#B45309] font-semibold text-xs tracking-widest uppercase bg-amber-200/60 px-3 py-1 rounded-full inline-block">
            Flexible Event Packages
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1E1714]">
            Curated Catering Packages
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Choose from our structured event packages or request a custom-built solution. Every package can be tailored to your guest count, menu preferences, and event layout.
          </p>
        </div>

        {/* Interactive Guest Estimator Tool */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200 warm-shadow max-w-2xl mx-auto mb-16 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-[#B45309]" />
              <h3 className="font-serif text-base font-bold text-[#1E1714]">Guest Count Assistant</h3>
            </div>
            <span className="bg-amber-100 text-[#B45309] font-bold text-xs px-3 py-1 rounded-full">
              {estimatedGuests} Guests
            </span>
          </div>

          <div className="space-y-2">
            <input
              type="range"
              min={20}
              max={1500}
              step={10}
              value={estimatedGuests}
              onChange={(e) => setEstimatedGuests(Number(e.target.value))}
              className="w-full accent-[#B45309] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-stone-400 font-medium">
              <span>20 Guests (Intimate)</span>
              <span>250 Guests (Medium)</span>
              <span>1,500+ Guests (Grand)</span>
            </div>
          </div>

          <p className="text-xs text-stone-600 text-center bg-amber-50 p-2.5 rounded-lg border border-amber-200/60">
            For <strong>{estimatedGuests} guests</strong>, we recommend our{' '}
            <strong className="text-[#B45309] capitalize">
              {PACKAGES.find((p) => p.id === recommendedId)?.name}
            </strong>
          </p>
        </div>

        {/* 3 Package Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PACKAGES.map((pkg) => {
            const isRecommended = pkg.id === recommendedId;

            return (
              <div
                key={pkg.id}
                className={`bg-white rounded-2xl p-8 border transition-all duration-300 flex flex-col justify-between relative ${
                  pkg.isPopular || isRecommended
                    ? 'border-[#B45309] ring-2 ring-[#B45309]/30 warm-shadow-hover scale-102 bg-gradient-to-b from-amber-50/40 to-white'
                    : 'border-stone-200/80 warm-shadow hover:border-stone-300'
                }`}
              >
                {/* Popular / Recommended Badge */}
                {(pkg.isPopular || isRecommended) && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#B45309] text-white text-xs font-bold px-4 py-1 rounded-full shadow-md flex items-center gap-1.5 uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isRecommended ? 'Recommended for Your Guests' : pkg.badge}</span>
                  </div>
                )}

                <div className="space-y-6">
                  {/* Package Title & Header */}
                  <div>
                    <span className="text-xs font-semibold text-stone-400 tracking-wider uppercase">
                      {pkg.guestRange}
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-[#1E1714] mt-1">{pkg.name}</h3>
                    <p className="text-stone-600 text-xs mt-1 italic">{pkg.tagline}</p>
                  </div>

                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed border-t border-stone-100 pt-4">
                    {pkg.description}
                  </p>

                  {/* Feature Checklist */}
                  <div className="space-y-3 pt-2">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">Package Inclusions:</p>
                    <ul className="space-y-2.5">
                      {pkg.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-stone-700">
                          <Check className="w-4 h-4 text-[#B45309] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="pt-8 mt-6 border-t border-stone-100 space-y-3">
                  <div className="text-center text-xs text-stone-500 italic">
                    * Pricing tailored to final menu & event details.
                  </div>
                  <button
                    onClick={() => onOpenQuoteForm(pkg.name)}
                    className={`w-full py-3 rounded-xl font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                      pkg.isPopular || isRecommended
                        ? 'bg-gradient-to-r from-[#B45309] to-[#D97706] text-white hover:from-[#92400E] hover:to-[#B45309]'
                        : 'bg-[#1E1714] text-white hover:bg-stone-800'
                    }`}
                  >
                    <span>Request Quote for {pkg.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Customization Note */}
        <div className="mt-12 text-center text-xs text-stone-500 max-w-xl mx-auto">
          Need a hybrid or specialized package? All SoloCuisines packages are fully customizable to meet unique dietary requirements, budget brackets, and venue constraints.
        </div>

      </div>
    </section>
  );
};
