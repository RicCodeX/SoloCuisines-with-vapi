import React from 'react';
import { Utensils, Phone, Mail, MapPin, ArrowUp, Instagram, Facebook, Twitter, MessageSquareText } from 'lucide-react';
import { BUSINESS_INFO } from '../data/cateringData';

interface FooterProps {
  onOpenQuoteForm: () => void;
  onOpenVoiceAssistant: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenQuoteForm, onOpenVoiceAssistant }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#140E0C] text-stone-300 pt-16 pb-12 border-t border-stone-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#B45309] to-[#78350F] flex items-center justify-center text-white shadow-md">
                <Utensils className="w-5 h-5" />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-white block">
                  Solo<span className="text-[#B45309]">Cuisines</span>
                </span>
                <span className="text-[10px] tracking-widest uppercase font-medium text-amber-400 block -mt-1">
                  Catering & Events
                </span>
              </div>
            </div>

            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Owned by {BUSINESS_INFO.founder}, SoloCuisines provides exceptional Nigerian catering, multi-course banquets, live Suya bars, and professional event coordination across Lagos and Nigeria.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={BUSINESS_INFO.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-400 hover:text-amber-400 hover:border-amber-600 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={BUSINESS_INFO.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-400 hover:text-amber-400 hover:border-amber-600 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={BUSINESS_INFO.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-400 hover:text-amber-400 hover:border-amber-600 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <button
                onClick={onOpenVoiceAssistant}
                className="bg-[#B45309]/30 hover:bg-[#B45309] text-amber-300 hover:text-white px-3 py-1.5 rounded-full text-xs font-semibold border border-[#B45309]/50 transition-all flex items-center gap-1.5 ml-2"
              >
                <MessageSquareText className="w-3.5 h-3.5" />
                <span>AI Voice Assistant</span>
              </button>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-bold text-white uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#home" className="hover:text-amber-400 transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-amber-400 transition-colors">About Solomon</a></li>
              <li><a href="#services" className="hover:text-amber-400 transition-colors">Event Services</a></li>
              <li><a href="#menu" className="hover:text-amber-400 transition-colors">Sample Menu</a></li>
              <li><a href="#packages" className="hover:text-amber-400 transition-colors">Catering Packages</a></li>
              <li><a href="#gallery" className="hover:text-amber-400 transition-colors">Event Gallery</a></li>
              <li><a href="#faq" className="hover:text-amber-400 transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Services Column */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-bold text-white uppercase tracking-wider">Event Services</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>Wedding Catering</li>
              <li>Corporate Galas & Luncheons</li>
              <li>Birthday & Private Parties</li>
              <li>Conferences & Seminars</li>
              <li>Graduation Banquets</li>
              <li>Funeral & Memorial Receptions</li>
              <li>Religious Gatherings</li>
            </ul>
          </div>

          {/* Contact Summary Column */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-bold text-white uppercase tracking-wider">Contact Info</h4>
            <div className="space-y-2 text-xs text-stone-400">
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{BUSINESS_INFO.phoneDisplay}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{BUSINESS_INFO.email}</span>
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{BUSINESS_INFO.location}</span>
              </p>
            </div>

            <button
              onClick={onOpenQuoteForm}
              className="mt-3 w-full bg-[#B45309] hover:bg-amber-600 text-white py-2 rounded-lg text-xs font-semibold shadow transition-colors"
            >
              Plan Your Event
            </button>
          </div>

        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            <p>© {new Date().getFullYear()} {BUSINESS_INFO.name}. All rights reserved.</p>
            <p className="text-[11px] text-stone-600 mt-0.5">{BUSINESS_INFO.demoNotice}</p>
          </div>

          <button
            onClick={scrollToTop}
            className="bg-stone-900 border border-stone-800 hover:border-amber-500 text-stone-300 hover:text-white p-2.5 rounded-full transition-colors flex items-center gap-1 text-xs"
          >
            <span>Back to top</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
};
