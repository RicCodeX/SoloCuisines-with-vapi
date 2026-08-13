import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Menu, X, Utensils, MessageSquareText, Calendar } from 'lucide-react';
import { BUSINESS_INFO } from '../data/cateringData';

interface NavbarProps {
  onOpenQuoteForm: (eventType?: string) => void;
  onOpenVoiceAssistant: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuoteForm, onOpenVoiceAssistant }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = ['home', 'about', 'services', 'menu', 'packages', 'why-us', 'gallery', 'testimonials', 'faq', 'contact'];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Our Menu', href: '#menu' },
    { name: 'Packages', href: '#packages' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300">
      {/* Top Utility Bar */}
      <div className={`bg-[#1E1714] text-[#E0D5C7] text-xs py-2 px-4 transition-all duration-300 ${isScrolled ? 'hidden md:block' : 'block'}`}>
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-6">
            <a href={`tel:${BUSINESS_INFO.phone}`} className="flex items-center gap-1.5 hover:text-[#D97706] transition-colors">
              <Phone className="w-3.5 h-3.5 text-[#D97706]" />
              <span>{BUSINESS_INFO.phoneDisplay}</span>
            </a>
            <a href={`mailto:${BUSINESS_INFO.email}`} className="hidden sm:flex items-center gap-1.5 hover:text-[#D97706] transition-colors">
              <Mail className="w-3.5 h-3.5 text-[#D97706]" />
              <span>{BUSINESS_INFO.email}</span>
            </a>
            <div className="hidden lg:flex items-center gap-1.5 text-stone-400">
              <MapPin className="w-3.5 h-3.5 text-[#D97706]" />
              <span>{BUSINESS_INFO.location}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden md:inline text-stone-400 text-[11px]">{BUSINESS_INFO.operatingHours}</span>
            <button
              onClick={onOpenVoiceAssistant}
              className="flex items-center gap-1.5 bg-[#B45309]/30 hover:bg-[#B45309]/50 text-[#FBBF24] px-2.5 py-1 rounded-full border border-[#B45309]/40 text-[11px] font-medium transition-all"
            >
              <MessageSquareText className="w-3 h-3 text-[#FBBF24] animate-pulse" />
              <span>Talk to SoloCuisines AI</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <nav
        className={`transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF8F5]/95 backdrop-blur-md shadow-md py-3 border-b border-[#E8DFC8]'
            : 'bg-[#1E1714]/80 backdrop-blur-sm text-white py-4 border-b border-white/10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center gap-2.5 group"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#home');
            }}
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#B45309] to-[#78350F] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <span className={`font-serif text-2xl font-bold tracking-tight block ${isScrolled ? 'text-[#1E1714]' : 'text-white'}`}>
                Solo<span className="text-[#B45309]">Cuisines</span>
              </span>
              <span className={`text-[10px] tracking-widest uppercase font-medium block -mt-1 ${isScrolled ? 'text-amber-800' : 'text-amber-300/80'}`}>
                Catering & Events
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                    isScrolled
                      ? isActive
                        ? 'text-[#B45309] bg-amber-50 font-semibold'
                        : 'text-[#3E302A] hover:text-[#B45309] hover:bg-stone-100/60'
                      : isActive
                      ? 'text-amber-400 bg-white/10 font-semibold'
                      : 'text-stone-200 hover:text-amber-300 hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </div>

          {/* CTA Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => onOpenQuoteForm()}
              className="bg-gradient-to-r from-[#B45309] to-[#D97706] text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md hover:from-[#92400E] hover:to-[#B45309] hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Plan Your Event</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => onOpenQuoteForm()}
              className="sm:hidden bg-[#B45309] text-white px-3 py-1.5 rounded-md text-xs font-semibold shadow"
            >
              Book Event
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg transition-colors ${
                isScrolled ? 'text-stone-800 hover:bg-stone-100' : 'text-white hover:bg-white/10'
              }`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#1E1714] text-white border-b border-stone-800 shadow-2xl animate-in slide-in-from-top duration-200">
            <div className="px-4 pt-3 pb-6 space-y-2 max-h-[80vh] overflow-y-auto">
              <div className="p-3 bg-stone-900/80 rounded-xl mb-3 flex items-center justify-between border border-stone-800">
                <div className="text-xs text-stone-300">
                  <p className="font-semibold text-amber-400">{BUSINESS_INFO.name}</p>
                  <p>{BUSINESS_INFO.phoneDisplay}</p>
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenVoiceAssistant();
                  }}
                  className="bg-[#B45309] hover:bg-amber-600 text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-medium"
                >
                  <MessageSquareText className="w-3.5 h-3.5" />
                  <span>AI Assistant</span>
                </button>
              </div>

              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="block px-3 py-2.5 rounded-lg text-base font-medium text-stone-200 hover:text-amber-400 hover:bg-stone-800/60 transition-colors"
                >
                  {link.name}
                </a>
              ))}

              <div className="pt-3 border-t border-stone-800 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenQuoteForm();
                  }}
                  className="w-full bg-[#B45309] text-white py-3 rounded-lg font-semibold text-center shadow hover:bg-amber-700 transition-colors"
                >
                  Plan Your Event
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
