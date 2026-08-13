import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/cateringData';
import { GalleryItem } from '../types';
import { Eye, X, ZoomIn } from 'lucide-react';

export const Gallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Weddings', 'Buffet Setup', 'Plated Meals', 'Small Chops', 'Nigerian Dishes', 'Corporate', 'Table Setup'];

  const filteredItems = GALLERY_ITEMS.filter((item) =>
    activeCategory === 'All' ? true : item.category === activeCategory
  );

  return (
    <section id="gallery" className="py-20 bg-[#FAF8F5] text-[#2C221E] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <span className="text-[#B45309] font-semibold text-xs tracking-widest uppercase bg-amber-100 px-3 py-1 rounded-full inline-block">
            Visual Showcase
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1E1714]">
            Event & Culinary Gallery
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Take a visual tour of our past banquets, buffet setups, plated presentations, and signature small chops bars.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-[#1E1714] text-amber-400 shadow-md'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setLightboxItem(item)}
              className="group relative h-64 rounded-2xl overflow-hidden bg-stone-900 shadow-md cursor-pointer border border-stone-200/80"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity"></div>

              <div className="absolute top-3 left-3">
                <span className="bg-amber-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider backdrop-blur-sm">
                  {item.category}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                <p className="font-serif text-base font-bold text-amber-100 group-hover:text-amber-300 transition-colors">
                  {item.title}
                </p>
                <p className="text-stone-300 text-xs line-clamp-1 font-light">
                  {item.description}
                </p>
              </div>

              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 p-1.5 rounded-full text-white">
                <ZoomIn className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxItem && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setLightboxItem(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-stone-900 rounded-2xl overflow-hidden shadow-2xl border border-stone-800"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxItem(null)}
              className="absolute top-4 right-4 z-10 bg-black/70 hover:bg-black text-white p-2 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative max-h-[70vh] bg-black flex items-center justify-center">
              <img
                src={lightboxItem.image}
                alt={lightboxItem.title}
                className="max-h-[70vh] w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="p-6 text-white space-y-2">
              <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">
                {lightboxItem.category}
              </span>
              <h3 className="font-serif text-2xl font-bold text-amber-50">{lightboxItem.title}</h3>
              <p className="text-stone-300 text-sm">{lightboxItem.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
