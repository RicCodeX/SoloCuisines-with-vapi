import React, { useState } from 'react';
import { Search, Flame, Info, Filter, Utensils, Check } from 'lucide-react';
import { MENU_CATEGORIES, MENU_ITEMS } from '../data/cateringData';
import { MenuItem } from '../types';

interface MenuProps {
  onOpenQuoteForm: () => void;
}

export const Menu: React.FC<MenuProps> = ({ onOpenQuoteForm }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDietary, setSelectedDietary] = useState<string>('all');
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);

  const filteredDishes = MENU_ITEMS.filter((dish) => {
    const matchesCategory = activeCategory === 'all' || dish.categoryId === activeCategory;
    const matchesSearch =
      dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dish.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDietary =
      selectedDietary === 'all' || (dish.dietaryTags && dish.dietaryTags.includes(selectedDietary));

    return matchesCategory && matchesSearch && matchesDietary;
  });

  const renderSpicyLevel = (level?: number) => {
    if (!level || level === 0) return null;
    return (
      <div className="flex items-center gap-0.5 text-amber-600" title={`Spicy Level: ${level}/3`}>
        {Array.from({ length: level }).map((_, i) => (
          <Flame key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-600" />
        ))}
      </div>
    );
  };

  return (
    <section id="menu" className="py-20 bg-[#FAF8F5] text-[#2C221E] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <span className="text-[#B45309] font-semibold text-xs tracking-widest uppercase bg-amber-100 px-3 py-1 rounded-full inline-block">
            Culinary Offerings
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1E1714]">
            Our Demonstration Event Menu
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Explore a sampling of our authentic Nigerian delicacies, festive rice dishes, traditional swallows, succulent grills, and finger foods.
          </p>

          {/* Demonstration Notice Box */}
          <div className="mt-4 bg-amber-50/90 border border-amber-200/80 p-3 rounded-xl max-w-2xl mx-auto flex items-center justify-center gap-2 text-xs text-amber-900 shadow-sm">
            <Info className="w-4 h-4 text-[#B45309] shrink-0" />
            <span>
              <strong>Note:</strong> These are sample menu offerings for demonstration purposes. Custom items and exact menu combinations are finalized during event booking.
            </span>
          </div>
        </div>

        {/* Controls Bar: Search & Dietary Filter */}
        <div className="bg-white p-4 rounded-2xl border border-stone-200/80 warm-shadow mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search dishes (e.g. Jollof, Suya, Egusi)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-[#B45309] focus:ring-1 focus:ring-[#B45309] transition-all"
            />
          </div>

          {/* Dietary Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            <span className="text-xs font-semibold text-stone-500 whitespace-nowrap flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Dietary:
            </span>
            {['all', 'Halal', 'Gluten-Free', 'Vegetarian', 'Vegan'].map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedDietary(tag)}
                className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  selectedDietary === tag
                    ? 'bg-[#B45309] text-white shadow-sm'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {tag === 'all' ? 'All Types' : tag}
              </button>
            ))}
          </div>

        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
              activeCategory === 'all'
                ? 'bg-[#1E1714] text-amber-400 shadow-md'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            All Categories ({MENU_ITEMS.length})
          </button>
          {MENU_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#1E1714] text-amber-400 shadow-md'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Menu Cards Grid */}
        {filteredDishes.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-stone-200">
            <Utensils className="w-10 h-10 text-stone-300 mx-auto mb-3" />
            <p className="text-stone-600 font-medium">No dishes match your current filter.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
                setSelectedDietary('all');
              }}
              className="mt-3 text-xs text-[#B45309] font-bold underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDishes.map((dish) => (
              <div
                key={dish.id}
                className="bg-white rounded-2xl overflow-hidden border border-stone-200/80 warm-shadow warm-shadow-hover transition-all duration-300 flex flex-col group cursor-pointer"
                onClick={() => setSelectedDish(dish)}
              >
                <div className="relative h-44 overflow-hidden bg-stone-100">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    {dish.isSignature && (
                      <span className="bg-[#B45309] text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider shadow">
                        Chef Signature
                      </span>
                    )}
                    {dish.isPopular && (
                      <span className="bg-amber-500 text-stone-950 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider shadow">
                        Popular
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-2 right-3">
                    {renderSpicyLevel(dish.spicyLevel)}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#1E1714] group-hover:text-[#B45309] transition-colors">
                      {dish.name}
                    </h3>
                    <p className="text-stone-600 text-xs leading-relaxed mt-1 line-clamp-2">
                      {dish.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {dish.dietaryTags?.map((tag, idx) => (
                        <span key={idx} className="bg-stone-100 text-stone-600 text-[10px] font-medium px-2 py-0.5 rounded-md">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-[11px] font-semibold text-[#B45309] hover:underline">
                      View Dish &rarr;
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Menu CTA */}
        <div className="mt-16 text-center bg-gradient-to-r from-[#1E1714] to-[#2A1D18] text-white p-8 rounded-2xl shadow-xl space-y-4">
          <h3 className="font-serif text-2xl font-bold text-amber-100">
            Want a Custom Event Menu Combination?
          </h3>
          <p className="text-stone-300 text-sm max-w-xl mx-auto">
            We build custom menu boards tailored specifically to your event theme, guest preferences, and budget constraints.
          </p>
          <button
            onClick={onOpenQuoteForm}
            className="bg-[#B45309] hover:bg-amber-600 text-white px-6 py-3 rounded-xl font-semibold text-sm shadow-lg transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Request Custom Menu Quote</span>
          </button>
        </div>

      </div>

      {/* Dish Quick Detail Modal */}
      {selectedDish && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-stone-200 animate-in zoom-in-95 duration-200">
            <div className="relative h-48">
              <img
                src={selectedDish.image}
                alt={selectedDish.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <button
                onClick={() => setSelectedDish(null)}
                className="absolute top-3 right-3 bg-black/60 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold hover:bg-black"
              >
                ✕
              </button>
            </div>
            <div className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-xl font-bold text-[#1E1714]">{selectedDish.name}</h3>
                {renderSpicyLevel(selectedDish.spicyLevel)}
              </div>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">{selectedDish.description}</p>
              
              {selectedDish.dietaryTags && selectedDish.dietaryTags.length > 0 && (
                <div className="flex items-center gap-1.5 flex-wrap pt-1">
                  <span className="text-[11px] font-bold text-stone-400">Dietary:</span>
                  {selectedDish.dietaryTags.map((tag, idx) => (
                    <span key={idx} className="bg-amber-100 text-amber-900 text-[11px] font-medium px-2 py-0.5 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="pt-3 border-t border-stone-100 flex items-center justify-end gap-2">
                <button
                  onClick={() => setSelectedDish(null)}
                  className="px-3 py-1.5 text-xs text-stone-600 font-medium"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setSelectedDish(null);
                    onOpenQuoteForm();
                  }}
                  className="bg-[#B45309] text-white px-4 py-1.5 rounded-lg text-xs font-semibold hover:bg-amber-700"
                >
                  Add to Event Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
