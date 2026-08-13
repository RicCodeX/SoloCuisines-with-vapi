import React from 'react';
import {
  ChefHat,
  SlidersHorizontal,
  Sparkles,
  CalendarCheck,
  Eye,
  Clock,
  Users,
  ShieldCheck
} from 'lucide-react';
import { WHY_CHOOSE_US } from '../data/cateringData';

export const WhyChooseUs: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ChefHat': return ChefHat;
      case 'SlidersHorizontal': return SlidersHorizontal;
      case 'Sparkles': return Sparkles;
      case 'CalendarCheck': return CalendarCheck;
      case 'Eye': return Eye;
      case 'Clock': return Clock;
      case 'Users': return Users;
      default: return ShieldCheck;
    }
  };

  return (
    <section id="why-us" className="py-20 bg-[#1E1714] text-white relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl -z-0"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#B45309]/10 rounded-full blur-3xl -z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-amber-400 font-semibold text-xs tracking-widest uppercase bg-amber-950/80 px-3 py-1 rounded-full border border-amber-800/40 inline-block">
            The SoloCuisines Advantage
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-amber-50">
            Why Choose SoloCuisines?
          </h2>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            We are committed to making your event seamless, delicious, and unforgettable. Here is what sets our catering operations apart.
          </p>
        </div>

        {/* 7 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_CHOOSE_US.map((item) => {
            const IconComp = getIcon(item.iconName);
            return (
              <div
                key={item.id}
                className="bg-stone-900/80 p-6 rounded-2xl border border-stone-800/80 hover:border-amber-700/60 transition-all duration-300 hover:bg-stone-900 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center group-hover:scale-110 group-hover:bg-amber-500/25 transition-transform">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-amber-100 group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust Banner Callout */}
        <div className="mt-16 bg-gradient-to-r from-amber-950/60 via-stone-900 to-amber-950/60 p-8 rounded-2xl border border-amber-800/40 text-center space-y-3">
          <p className="font-serif text-2xl font-bold text-amber-200">
            "Your Peace of Mind Is Our Highest Priority"
          </p>
          <p className="text-stone-300 text-xs sm:text-sm max-w-2xl mx-auto">
            From the first consultation call to the final dessert plate cleared, Solomon and the SoloCuisines team handle every detail with pride and professionalism.
          </p>
        </div>

      </div>
    </section>
  );
};
