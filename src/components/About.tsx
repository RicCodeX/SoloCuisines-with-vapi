import React from 'react';
import { ChefHat, CheckCircle2, Award, HeartHandshake, Sparkles, Clock, Utensils } from 'lucide-react';
import { BUSINESS_INFO } from '../data/cateringData';

export const About: React.FC = () => {
  const corePillars = [
    {
      icon: Utensils,
      title: 'Quality Food',
      description: 'Farm-fresh ingredients, traditional spices, and authentic Nigerian culinary recipes executed with precision.'
    },
    {
      icon: HeartHandshake,
      title: 'Professional Service',
      description: 'Uniformed, courteous waitstaff and supervisors dedicated to high-standard guest hospitality.'
    },
    {
      icon: Sparkles,
      title: 'Attention to Detail',
      description: 'Impeccable table decor, pristine chafing dish setups, and elegant food styling that elevate your venue.'
    },
    {
      icon: Award,
      title: 'Flexible Menus',
      description: 'Customized menu choices tailored to your dietary needs, cultural themes, and budget considerations.'
    },
    {
      icon: Clock,
      title: 'Reliable Event Execution',
      description: 'Punctual logistics, seamless food replenishment, and structured coordination from start to finish.'
    },
    {
      icon: ChefHat,
      title: 'Memorable Guest Experiences',
      description: 'Creating delightful culinary moments that leave your guests talking long after the event.'
    }
  ];

  const workflowSteps = [
    { number: '01', title: 'Consultation & Planning', text: 'We discuss your event vision, guest count, venue specs, and menu preferences.' },
    { number: '02', title: 'Custom Menu Design', text: 'Tailor a bespoke menu package with dietary options and presentation styles.' },
    { number: '03', title: 'Tasting & Preparation', text: 'Optional pre-event menu tasting followed by fresh sourcing on event day.' },
    { number: '04', title: 'Flawless Execution', text: 'On-time delivery, setup, courteous service, and complete post-event cleanup.' }
  ];

  return (
    <section id="about" className="py-20 bg-[#FAF8F5] text-[#2C221E] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-[#B45309] font-semibold text-xs tracking-widest uppercase bg-amber-100/80 px-3 py-1 rounded-full inline-block">
            Our Story & Philosophy
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1E1714]">
            About SoloCuisines
          </h2>
          <p className="text-stone-600 text-base leading-relaxed">
            Founded by <strong>{BUSINESS_INFO.founder}</strong>, SoloCuisines is built on a passion for authentic Nigerian food, high hospitality standards, and seamless event execution.
          </p>
        </div>

        {/* Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          {/* Founder & Image Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=80"
                alt="SoloCuisines Chef Solomon & Catering Team"
                className="w-full h-[420px] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <p className="font-serif text-xl font-bold">{BUSINESS_INFO.founder}</p>
                <p className="text-amber-300 text-xs font-medium">Founder & Head Culinary Director</p>
                <p className="text-stone-300 text-xs italic pt-1">
                  "Food is the heart of every gathering. Our mission is to ensure every bite tells a story of quality and passion."
                </p>
              </div>
            </div>

            {/* Accent Card */}
            <div className="absolute -bottom-6 -right-6 bg-[#1E1714] text-white p-5 rounded-xl shadow-xl hidden sm:block max-w-xs border border-amber-600/40">
              <p className="font-serif text-2xl font-bold text-amber-400">100%</p>
              <p className="text-xs text-stone-300">Dedicated to your complete event satisfaction and culinary delight.</p>
            </div>
          </div>

          {/* Philosophy Narrative Column */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E1714]">
              "SoloCuisines handles your event from the food to the overall catering experience."
            </h3>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              At SoloCuisines, we believe that catering extends far beyond simply delivering dishes. Whether you are hosting an intimate family celebration or orchestrating a major wedding banquet with over a thousand guests, our team treats your occasion with utmost dedication.
            </p>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Led by Solomon, we blend traditional firewood cooking techniques with modern culinary presentation. Every menu item is freshly prepared on event day using premium, locally-sourced ingredients and authentic African spices.
            </p>

            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-amber-50/80 border border-amber-200/60">
                <CheckCircle2 className="w-5 h-5 text-[#B45309] shrink-0 mt-0.5" />
                <span className="text-xs font-medium text-stone-800">Freshly prepared on event day</span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-amber-50/80 border border-amber-200/60">
                <CheckCircle2 className="w-5 h-5 text-[#B45309] shrink-0 mt-0.5" />
                <span className="text-xs font-medium text-stone-800">Strict hygiene & quality checks</span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-amber-50/80 border border-amber-200/60">
                <CheckCircle2 className="w-5 h-5 text-[#B45309] shrink-0 mt-0.5" />
                <span className="text-xs font-medium text-stone-800">Uniformed & trained event waiters</span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-amber-50/80 border border-amber-200/60">
                <CheckCircle2 className="w-5 h-5 text-[#B45309] shrink-0 mt-0.5" />
                <span className="text-xs font-medium text-stone-800">Complete setup & cleanup care</span>
              </div>
            </div>
          </div>

        </div>

        {/* 6 Philosophy Pillars */}
        <div className="mt-12 space-y-6">
          <div className="text-center">
            <h3 className="font-serif text-2xl font-bold text-[#1E1714]">Our 6 Core Commitments</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {corePillars.map((pillar, idx) => {
              const IconComp = pillar.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-xl border border-stone-200/80 warm-shadow warm-shadow-hover transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-lg bg-amber-100 text-[#B45309] flex items-center justify-center mb-4">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-[#1E1714] mb-2">{pillar.title}</h4>
                  <p className="text-stone-600 text-xs leading-relaxed">{pillar.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4 Step Process */}
        <div className="mt-20 bg-[#1E1714] text-white rounded-2xl p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-2xl mx-auto text-center mb-10 space-y-2">
            <span className="text-amber-400 text-xs font-semibold uppercase tracking-widest">How We Work</span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-amber-50">Our Seamless Event Workflow</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {workflowSteps.map((step, idx) => (
              <div key={idx} className="bg-stone-900/80 p-5 rounded-xl border border-amber-900/30 relative">
                <span className="text-amber-500 font-serif text-2xl font-bold block mb-2">{step.number}</span>
                <h4 className="font-serif text-base font-bold text-amber-100 mb-1.5">{step.title}</h4>
                <p className="text-stone-400 text-xs leading-relaxed">{step.text}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
