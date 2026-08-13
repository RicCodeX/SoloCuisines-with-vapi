import React, { useState } from 'react';
import {
  HeartHandshake,
  Briefcase,
  PartyPopper,
  Presentation,
  GraduationCap,
  Flower2,
  Sparkles,
  Users,
  UtensilsCrossed,
  ArrowRight,
  Check,
  X
} from 'lucide-react';
import { SERVICES } from '../data/cateringData';
import { ServiceItem } from '../types';

interface ServicesProps {
  onOpenQuoteForm: (eventType?: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onOpenQuoteForm }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'HeartHandshake': return HeartHandshake;
      case 'Briefcase': return Briefcase;
      case 'PartyPopper': return PartyPopper;
      case 'Presentation': return Presentation;
      case 'GraduationCap': return GraduationCap;
      case 'Flower2': return Flower2;
      case 'Sparkles': return Sparkles;
      case 'Users': return Users;
      default: return UtensilsCrossed;
    }
  };

  return (
    <section id="services" className="py-20 bg-[#F3EEE8] text-[#2C221E] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-[#B45309] font-semibold text-xs tracking-widest uppercase bg-amber-200/60 px-3 py-1 rounded-full inline-block">
            Tailored Event Solutions
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1E1714]">
            Catering Services for Every Celebration
          </h2>
          <p className="text-stone-600 text-base leading-relaxed">
            From intimate gatherings to massive banquets, SoloCuisines provides specialized catering and complete dining management across Lagos and beyond.
          </p>
        </div>

        {/* 9 Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service) => {
            const IconComponent = getIcon(service.iconName);
            return (
              <div
                key={service.id}
                className="bg-white rounded-2xl overflow-hidden border border-stone-200/80 warm-shadow warm-shadow-hover transition-all duration-300 flex flex-col group"
              >
                {/* Image & Icon Overlay */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md p-2.5 rounded-xl text-[#B45309] shadow-md">
                    <IconComponent className="w-5 h-5" />
                  </div>

                  <div className="absolute bottom-3 left-4 right-4">
                    <h3 className="font-serif text-xl font-bold text-white drop-shadow-sm">{service.title}</h3>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                    {service.shortDescription}
                  </p>

                  <div className="space-y-2">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">Key Highlights:</p>
                    <ul className="space-y-1">
                      {service.highlights.slice(0, 3).map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs text-stone-700">
                          <Check className="w-3.5 h-3.5 text-[#B45309] shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setSelectedService(service)}
                      className="text-xs font-semibold text-stone-600 hover:text-[#B45309] transition-colors"
                    >
                      View Details
                    </button>

                    <button
                      onClick={() => onOpenQuoteForm(service.title)}
                      className="bg-[#B45309] hover:bg-amber-700 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Inquire Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Service Details Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-amber-200 animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
            <div className="relative h-52">
              <img
                src={selectedService.image}
                alt={selectedService.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/80 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className="text-amber-300 text-xs font-semibold tracking-widest uppercase">SoloCuisines Service</span>
                <h3 className="font-serif text-2xl font-bold">{selectedService.title}</h3>
              </div>
            </div>

            <div className="p-6 space-y-4 overflow-y-auto flex-1 text-[#2C221E]">
              <p className="text-stone-700 text-sm leading-relaxed">{selectedService.fullDescription}</p>

              <div className="bg-amber-50 p-4 rounded-xl border border-amber-200/80">
                <p className="text-xs font-bold text-[#B45309] uppercase tracking-wider mb-2">Service Inclusions:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedService.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-stone-800">
                      <Check className="w-4 h-4 text-[#B45309]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-xs text-stone-500">
                <strong>Recommended Guest Range:</strong> {selectedService.idealFor}
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-stone-200">
                <button
                  onClick={() => setSelectedService(null)}
                  className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const eventTitle = selectedService.title;
                    setSelectedService(null);
                    onOpenQuoteForm(eventTitle);
                  }}
                  className="bg-[#B45309] hover:bg-amber-700 text-white px-5 py-2 rounded-lg text-xs font-semibold shadow flex items-center gap-2"
                >
                  <span>Request Quote for {selectedService.title}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
