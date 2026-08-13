import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, HelpCircle, Info } from 'lucide-react';
import { FAQS } from '../data/cateringData';

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = FAQS.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 bg-[#F3EEE8] text-[#2C221E] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <span className="text-[#B45309] font-semibold text-xs tracking-widest uppercase bg-amber-200/60 px-3 py-1 rounded-full inline-block">
            Clear Guidance
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E1714]">
            Frequently Asked Questions
          </h2>
          <p className="text-stone-600 text-sm sm:text-base">
            Everything you need to know about booking SoloCuisines for your upcoming wedding, corporate event, or private party.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative max-w-lg mx-auto mb-8">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search questions (e.g. guest count, pricing, waiters)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white border border-stone-300 rounded-xl focus:outline-none focus:border-[#B45309] shadow-sm"
          />
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-stone-200/80 overflow-hidden warm-shadow transition-all"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif text-lg font-bold text-[#1E1714] hover:text-[#B45309] transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-[#B45309] shrink-0" />
                    <span>{faq.question}</span>
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-[#B45309] shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-stone-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-0 text-stone-600 text-xs sm:text-sm leading-relaxed border-t border-stone-100 mt-1">
                    <p className="pt-3">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Disclaimer Callout */}
        <div className="mt-10 bg-amber-50 p-4 rounded-xl border border-amber-200/80 flex items-start gap-3 text-xs text-amber-900">
          <Info className="w-4 h-4 text-[#B45309] shrink-0 mt-0.5" />
          <span>
            <strong>Note:</strong> Exact pricing, staffing requirements, and booking availability depend on specific event dates, locations, and guest sizes. Please confirm all details directly with SoloCuisines during quote request.
          </span>
        </div>

      </div>
    </section>
  );
};
