import React from 'react';
import { Calendar, UtensilsCrossed, Star, CheckCircle, ShieldCheck, ArrowRight, MessageSquareText } from 'lucide-react';
import { BUSINESS_INFO, HERO_DATA } from '../data/cateringData';

interface HeroProps {
  onOpenQuoteForm: () => void;
  onOpenVoiceAssistant: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuoteForm, onOpenVoiceAssistant }) => {
  return (
    <section id="home" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-gradient-to-b from-[#1C1411] via-[#2A1D18] to-[#1C1411] text-white">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#B45309]/15 rounded-full blur-3xl -z-0 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl -z-0 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Content Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Trust Pill Statement */}
            <div className="inline-flex items-center gap-2 bg-amber-950/60 border border-amber-700/40 text-amber-300 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium backdrop-blur-md">
              <SparkleIcon className="w-4 h-4 text-amber-400 animate-spin-slow" />
              <span>{HERO_DATA.trustStatement}</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-bold leading-[1.1] text-amber-50">
              Exceptional Catering for <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500">Every Occasion</span>
            </h1>

            {/* Sub-headline / Copy */}
            <p className="text-stone-300 text-base sm:text-lg leading-relaxed max-w-2xl font-light">
              {HERO_DATA.subheadline}
            </p>

            {/* Call to Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onOpenQuoteForm}
                className="bg-gradient-to-r from-[#B45309] to-[#D97706] hover:from-[#92400E] hover:to-[#B45309] text-white px-7 py-3.5 rounded-xl font-semibold text-base shadow-xl hover:shadow-amber-900/30 transition-all flex items-center justify-center gap-2.5 group cursor-pointer"
              >
                <Calendar className="w-5 h-5 text-amber-200" />
                <span>Plan Your Event</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#services"
                className="bg-stone-800/80 hover:bg-stone-700 text-stone-200 hover:text-white px-6 py-3.5 rounded-xl font-medium text-base border border-stone-700 transition-all text-center flex items-center justify-center gap-2"
              >
                <UtensilsCrossed className="w-4 h-4 text-amber-400" />
                <span>Explore Our Services</span>
              </a>
            </div>

            {/* AI Assistant Banner Teaser */}
            <div className="pt-2">
              <button
                onClick={onOpenVoiceAssistant}
                className="w-full sm:w-auto inline-flex items-center gap-3 bg-stone-900/90 border border-amber-800/50 hover:border-amber-600 px-4 py-2.5 rounded-xl text-xs sm:text-sm text-stone-300 hover:text-amber-200 transition-all group"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                <MessageSquareText className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                <span>Have event questions? <strong>Talk to SoloCuisines AI Assistant</strong></span>
                <span className="text-amber-400 text-xs font-semibold underline ml-auto sm:ml-2">Try Now &rarr;</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-4 border-t border-stone-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {HERO_DATA.stats.map((stat, idx) => (
                <div key={idx} className="bg-stone-900/40 p-3 rounded-lg border border-stone-800/60">
                  <p className="font-serif text-xl sm:text-2xl font-bold text-amber-400">{stat.value}</p>
                  <p className="text-stone-400 text-xs mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>

          </div>

          {/* Right Image Feature Card Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer Decorative Ring */}
              <div className="absolute -inset-2 bg-gradient-to-r from-amber-600 to-amber-900 rounded-2xl opacity-40 blur-lg"></div>

              {/* Main Image Container */}
              <div className="relative bg-stone-900 rounded-2xl overflow-hidden border border-amber-800/40 shadow-2xl">
                <img
                  src={HERO_DATA.heroImage}
                  alt="SoloCuisines Catering Banquet Spread"
                  className="w-full h-[380px] sm:h-[440px] object-cover hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent"></div>

                {/* Overlaid Card Details */}
                <div className="absolute bottom-0 left-0 right-0 p-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="bg-amber-600/90 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-md font-semibold tracking-wide uppercase">
                      Signature Nigerian Banquet
                    </span>
                    <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>5.0 Excellence Rating</span>
                    </div>
                  </div>

                  <p className="text-white font-serif text-lg font-bold">
                    Rich Party Jollof, Suya Grills & Gourmet Small Chops
                  </p>
                  <p className="text-stone-300 text-xs">
                    Tailored presentation for weddings, corporate galas & private parties.
                  </p>
                </div>
              </div>

              {/* Floating Highlight Badge */}
              <div className="absolute -top-4 -left-4 bg-[#1E1714] border border-amber-600/50 p-3 rounded-xl shadow-xl hidden sm:flex items-center gap-3 backdrop-blur-md max-w-xs">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Full Event Handling</p>
                  <p className="text-[11px] text-stone-400">Food • Service • Setup • Logistics</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

const SparkleIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);
