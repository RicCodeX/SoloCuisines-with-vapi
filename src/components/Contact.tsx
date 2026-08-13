import React from 'react';
import { Phone, Mail, MapPin, MessageSquare, Clock, Calendar, ArrowRight, ExternalLink } from 'lucide-react';
import { BUSINESS_INFO } from '../data/cateringData';

interface ContactProps {
  onOpenQuoteForm: () => void;
}

export const Contact: React.FC<ContactProps> = ({ onOpenQuoteForm }) => {
  return (
    <section id="contact" className="py-20 bg-[#1E1714] text-white relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#B45309]/10 rounded-full blur-3xl -z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-amber-400 font-semibold text-xs tracking-widest uppercase bg-amber-950/80 px-3 py-1 rounded-full border border-amber-800/40 inline-block">
            Get In Touch
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-amber-50">
            Contact SoloCuisines
          </h2>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Ready to discuss your event catering? Call, WhatsApp, or email us today to lock in your date or request a consultation.
          </p>
        </div>

        {/* 4 Quick Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          
          {/* Call Us Card */}
          <a
            href={`tel:${BUSINESS_INFO.phone}`}
            className="bg-stone-900/90 p-6 rounded-2xl border border-stone-800 hover:border-amber-600 transition-all text-center space-y-3 group hover:scale-102"
          >
            <div className="w-12 h-12 bg-amber-500/15 border border-amber-500/30 text-amber-400 rounded-xl flex items-center justify-center mx-auto group-hover:bg-amber-500 group-hover:text-stone-950 transition-colors">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-amber-100">Call Us</h3>
            <p className="text-stone-300 text-xs font-semibold">{BUSINESS_INFO.phoneDisplay}</p>
            <span className="inline-flex items-center gap-1 text-[11px] text-amber-400 font-bold group-hover:underline">
              <span>Direct Phone Line</span>
              <ExternalLink className="w-3 h-3" />
            </span>
          </a>

          {/* WhatsApp Us Card */}
          <a
            href={`https://wa.me/${BUSINESS_INFO.whatsapp.replace(/[^0-9]/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-stone-900/90 p-6 rounded-2xl border border-stone-800 hover:border-emerald-600 transition-all text-center space-y-3 group hover:scale-102"
          >
            <div className="w-12 h-12 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 rounded-xl flex items-center justify-center mx-auto group-hover:bg-emerald-500 group-hover:text-stone-950 transition-colors">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-amber-100">WhatsApp Us</h3>
            <p className="text-stone-300 text-xs font-semibold">{BUSINESS_INFO.phoneDisplay}</p>
            <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-bold group-hover:underline">
              <span>Instant Chat</span>
              <ExternalLink className="w-3 h-3" />
            </span>
          </a>

          {/* Email Us Card */}
          <a
            href={`mailto:${BUSINESS_INFO.email}`}
            className="bg-stone-900/90 p-6 rounded-2xl border border-stone-800 hover:border-amber-600 transition-all text-center space-y-3 group hover:scale-102"
          >
            <div className="w-12 h-12 bg-amber-500/15 border border-amber-500/30 text-amber-400 rounded-xl flex items-center justify-center mx-auto group-hover:bg-amber-500 group-hover:text-stone-950 transition-colors">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-amber-100">Email Us</h3>
            <p className="text-stone-300 text-xs font-semibold">{BUSINESS_INFO.email}</p>
            <span className="inline-flex items-center gap-1 text-[11px] text-amber-400 font-bold group-hover:underline">
              <span>Send Email</span>
              <ExternalLink className="w-3 h-3" />
            </span>
          </a>

          {/* Request Quote Card */}
          <div
            onClick={onOpenQuoteForm}
            className="bg-gradient-to-br from-[#B45309] to-[#78350F] p-6 rounded-2xl border border-amber-500/40 text-center space-y-3 cursor-pointer hover:scale-102 transition-transform shadow-xl"
          >
            <div className="w-12 h-12 bg-white/20 text-white rounded-xl flex items-center justify-center mx-auto">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-white">Plan Your Event</h3>
            <p className="text-amber-100 text-xs">Fill Form for Quick Proposal</p>
            <span className="inline-flex items-center gap-1 text-[11px] text-white font-bold underline">
              <span>Request Quote Now</span>
              <ArrowRight className="w-3 h-3" />
            </span>
          </div>

        </div>

        {/* Location & Hours Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-stone-900/80 p-8 rounded-3xl border border-stone-800">
          
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold text-amber-100">Catering Operations Hub</h3>
            
            <div className="space-y-3 text-stone-300 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">{BUSINESS_INFO.location}</p>
                  <p className="text-stone-400 text-xs">{BUSINESS_INFO.addressDetails}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">Operating Hours</p>
                  <p className="text-stone-400 text-xs">{BUSINESS_INFO.operatingHours}</p>
                </div>
              </div>
            </div>

            <p className="text-stone-400 text-xs leading-relaxed pt-2 border-t border-stone-800">
              * Demonstration Contact Info: All placeholder contact values can easily be replaced with live business credentials in <code>src/data/cateringData.ts</code>.
            </p>
          </div>

          {/* Map Styled Visual Card */}
          <div className="bg-stone-950 rounded-2xl p-6 border border-stone-800 flex flex-col justify-between space-y-4 relative overflow-hidden">
            <div className="space-y-2 relative z-10">
              <span className="bg-amber-500/20 text-amber-400 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                Service Area Coverage
              </span>
              <p className="font-serif text-lg font-bold text-white">Lagos & Interstate Event Locations</p>
              <p className="text-stone-400 text-xs leading-relaxed">
                We travel with full mobile thermal equipment to cater events across Victoria Island, Lekki, Ikoyi, Ikeja, Surulere, Epe, Ibadan, Ogun, and major cities across Nigeria.
              </p>
            </div>

            <div className="pt-4 border-t border-stone-800 flex items-center justify-between text-xs text-amber-400 font-semibold relative z-10">
              <span>Outdoor & Indoor Banquets</span>
              <span>Mobile Thermal Logistics</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
