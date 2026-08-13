import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Menu } from './components/Menu';
import { Packages } from './components/Packages';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Gallery } from './components/Gallery';
import { Testimonials } from './components/Testimonials';
import { QuoteForm } from './components/QuoteForm';
import { FAQSection } from './components/FAQSection';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { VoiceAssistantModal } from './components/VoiceAssistantModal';
import { MessageSquareText, Calendar } from 'lucide-react';

export default function App() {
  const [isVoiceAssistantOpen, setIsVoiceAssistantOpen] = useState(false);
  const [quoteFormEventType, setQuoteFormEventType] = useState<string>('');
  const [quoteFormPackageName, setQuoteFormPackageName] = useState<string>('');

  const handleOpenQuoteForm = (eventTypeOrPackage?: string) => {
    if (eventTypeOrPackage) {
      if (eventTypeOrPackage.startsWith('Package:')) {
        setQuoteFormPackageName(eventTypeOrPackage.replace('Package:', '').trim());
      } else {
        setQuoteFormEventType(eventTypeOrPackage);
      }
    }
    const formSection = document.getElementById('quote-form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2C221E] font-sans antialiased selection:bg-[#D97706] selection:text-white relative">
      {/* Navigation Header */}
      <Navbar
        onOpenQuoteForm={handleOpenQuoteForm}
        onOpenVoiceAssistant={() => setIsVoiceAssistantOpen(true)}
      />

      {/* Main Page Content */}
      <main>
        <Hero
          onOpenQuoteForm={() => handleOpenQuoteForm()}
          onOpenVoiceAssistant={() => setIsVoiceAssistantOpen(true)}
        />
        <About />
        <Services onOpenQuoteForm={handleOpenQuoteForm} />
        <Menu onOpenQuoteForm={() => handleOpenQuoteForm()} />
        <Packages onOpenQuoteForm={(pkg) => handleOpenQuoteForm(pkg ? `Package: ${pkg}` : undefined)} />
        <WhyChooseUs />
        <Gallery />
        <Testimonials />
        <QuoteForm
          initialEventType={quoteFormEventType}
          initialPackageName={quoteFormPackageName}
        />
        <FAQSection />
        <Contact onOpenQuoteForm={() => handleOpenQuoteForm()} />
      </main>

      {/* Footer */}
      <Footer
        onOpenQuoteForm={() => handleOpenQuoteForm()}
        onOpenVoiceAssistant={() => setIsVoiceAssistantOpen(true)}
      />

      {/* Floating AI Voice Assistant Button */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        <button
          onClick={() => setIsVoiceAssistantOpen(true)}
          className="group relative bg-gradient-to-r from-[#1E1714] to-[#2A1D18] hover:from-[#B45309] hover:to-[#D97706] text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl border border-amber-500/40 hover:border-amber-400 transition-all duration-300 flex items-center gap-3 cursor-pointer hover:scale-105"
          aria-label="Talk to SoloCuisines AI"
        >
          {/* Animated Glow Effect */}
          <span className="absolute -inset-1 rounded-full bg-amber-500/30 blur-md group-hover:bg-amber-500/50 transition-opacity animate-pulse"></span>

          <div className="relative w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-300 group-hover:bg-white/20 group-hover:text-white transition-colors shrink-0">
            <MessageSquareText className="w-5 h-5" />
          </div>

          <div className="relative hidden sm:block text-left">
            <p className="text-[10px] font-bold uppercase tracking-wider text-amber-400 group-hover:text-amber-200">
              Voice AI Active
            </p>
            <p className="text-xs font-bold text-white">Talk to SoloCuisines AI</p>
          </div>
        </button>
      </div>

      {/* Voice Assistant Modal */}
      <VoiceAssistantModal
        isOpen={isVoiceAssistantOpen}
        onClose={() => setIsVoiceAssistantOpen(false)}
        onOpenQuoteForm={() => {
          setIsVoiceAssistantOpen(false);
          handleOpenQuoteForm();
        }}
      />
    </div>
  );
}
