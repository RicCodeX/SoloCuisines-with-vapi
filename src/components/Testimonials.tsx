import React from 'react';
import { Star, Quote, Info } from 'lucide-react';
import { TESTIMONIALS } from '../data/cateringData';

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 bg-[#F3EEE8] text-[#2C221E] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-[#B45309] font-semibold text-xs tracking-widest uppercase bg-amber-200/60 px-3 py-1 rounded-full inline-block">
            Demonstration Feedback
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1E1714]">
            What Our Clients Experience
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Read sample client feedback showcasing SoloCuisines' food taste, presentation standards, and on-time service delivery.
          </p>

          {/* Internal Demo Notice Disclaimer */}
          <div className="mt-3 inline-flex items-center gap-2 bg-amber-100 text-amber-900 border border-amber-300 text-xs px-3.5 py-1.5 rounded-full">
            <Info className="w-3.5 h-3.5 text-[#B45309]" />
            <span>
              <strong>Notice:</strong> Demonstration content — easily replaced with genuine verified customer reviews upon launch.
            </span>
          </div>
        </div>

        {/* 3 Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white p-8 rounded-2xl border border-stone-200/80 warm-shadow warm-shadow-hover transition-all duration-300 flex flex-col justify-between relative"
            >
              <Quote className="w-10 h-10 text-amber-200 absolute top-6 right-6 pointer-events-none" />

              <div className="space-y-4 relative z-10">
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-stone-700 text-xs sm:text-sm leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-stone-100">
                <p className="font-serif text-base font-bold text-[#1E1714]">{t.clientName}</p>
                <p className="text-stone-500 text-xs font-medium">{t.eventType}</p>
                <p className="text-stone-400 text-[11px]">{t.location}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
