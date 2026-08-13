import {
  BusinessInfo,
  ServiceItem,
  MenuCategory,
  MenuItem,
  EventPackage,
  WhyChooseUsItem,
  GalleryItem,
  Testimonial,
  FAQItem
} from '../types';

// Importing generated images
import heroImage from '../assets/images/solocuisines_hero_catering_1786622492874.jpg';
import smallChopsImage from '../assets/images/solocuisines_small_chops_1786622507407.jpg';

export const BUSINESS_INFO: BusinessInfo = {
  name: 'SoloCuisines',
  tagline: 'Exceptional Catering for Every Occasion',
  subTagline: 'Memorable food and professional catering services crafted for events of every size.',
  founder: 'Solomon',
  phone: '+234 800 765 6284', // Placeholder easily customizable
  phoneDisplay: '+234 XXX XXX XXXX',
  whatsapp: '+234 800 765 6284',
  email: 'hello@solocuisines.com',
  location: 'Lagos, Nigeria',
  addressDetails: 'Serving Victoria Island, Ikeja, Lekki, Ikoyi, and across Nigeria',
  operatingHours: 'Mon - Sat: 8:00 AM - 7:00 PM | Sun: Event Operations Only',
  socials: {
    instagram: 'https://instagram.com/solocuisines',
    facebook: 'https://facebook.com/solocuisines',
    twitter: 'https://twitter.com/solocuisines'
  },
  demoNotice: 'Demonstration Prototype Website — Easily customizable for SoloCuisines live launch.'
};

export const HERO_DATA = {
  heroImage: heroImage,
  headline: 'Exceptional Catering for Every Occasion',
  subheadline: 'From intimate family dinners to grand wedding banquets and corporate galas, SoloCuisines brings authentic Nigerian culinary excellence and seamless event coordination to your table.',
  trustStatement: 'Weddings • Corporate Events • Private Celebrations • Special Occasions',
  stats: [
    { value: '500+', label: 'Events Catered' },
    { value: '100%', label: 'Fresh Ingredients' },
    { value: '50-2500+', label: 'Guest Capacity' },
    { value: '4.9★', label: 'Client Rating' }
  ]
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'wedding-catering',
    title: 'Wedding Catering',
    shortDescription: 'Exquisite multi-course dining, royal buffet spreads, and live station experiences for your dream wedding celebration.',
    fullDescription: 'Your wedding day deserves nothing less than culinary perfection. SoloCuisines provides end-to-end wedding catering, combining vibrant Nigerian delicacies with impeccable plated service or luxurious buffet setups that leave your guests raving.',
    iconName: 'HeartHandshake',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    highlights: ['Custom Tasting Sessions', 'Plated & Buffet Options', 'VIP High-Table Service', 'Cocktail & Small Chops Bar'],
    idealFor: 'Intimate ceremonies to grand receptions (100 – 2,500+ guests)'
  },
  {
    id: 'corporate-catering',
    title: 'Corporate Catering',
    shortDescription: 'Professional, punctual, and tastefully presented catering for board meetings, executive luncheons, and annual galas.',
    fullDescription: 'Impress clients and reward your teams with premium corporate meals. From packaged executive bento boxes to full conference buffet setups, SoloCuisines delivers culinary excellence on time, every time.',
    iconName: 'Briefcase',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80',
    highlights: ['Punctual Logistics', 'Individual Bento Box Options', 'Dietary Customization', 'Dedicated Event Lead'],
    idealFor: 'Executive meetings, product launches, corporate galas'
  },
  {
    id: 'birthday-private-parties',
    title: 'Birthday & Private Parties',
    shortDescription: 'Fun, flavorful, and hassle-free catering that lets you be a guest at your own party.',
    fullDescription: 'Celebrate milestone birthdays, anniversaries, or housewarmings with delicious food cooked fresh on-site or pre-packaged to perfection. Enjoy rich barbecues, interactive small chops bars, and signature cocktail pairings.',
    iconName: 'PartyPopper',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80',
    highlights: ['Live Grill & Suya Stations', 'Custom Cocktail Drinks', 'Flexible Menu Packages', 'Interactive Food Tables'],
    idealFor: 'Milestone birthdays, housewarmings, intimate dinner parties'
  },
  {
    id: 'conferences-seminars',
    title: 'Conferences & Seminars',
    shortDescription: 'Smooth tea breaks, energizing lunch buffets, and networking cocktail catering for multi-day events.',
    fullDescription: 'Keep delegates engaged and energized with wholesome, timely meals. SoloCuisines coordinates seamlessly with event timelines to manage high-volume meal distribution effortlessly.',
    iconName: 'Presentation',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80',
    highlights: ['Coffee & Snack Stations', 'Quick-Serve Buffet Flow', 'Hydration & Juice Bars', 'Dietary Labeling'],
    idealFor: 'Multi-day summits, workshops, symposiums'
  },
  {
    id: 'graduation-celebrations',
    title: 'Graduation Celebrations',
    shortDescription: 'Honor academic milestones with rich feast spreads and celebratory finger foods loved by all generations.',
    fullDescription: 'A monumental achievement calls for a memorable feast! Treat family and friends to hearty traditional dishes, vibrant jollof rice bowls, and delightful small chops.',
    iconName: 'GraduationCap',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
    highlights: ['Generous Portion Sizes', 'Youth & Family Friendly Menus', 'Dessert & Mocktail Stations'],
    idealFor: 'High school, university, and doctoral graduations'
  },
  {
    id: 'funeral-memorial',
    title: 'Funeral & Memorial Catering',
    shortDescription: 'Dignified, compassionate, and reliable catering to comfortably serve guests during remembrance gatherings.',
    fullDescription: 'During sensitive times, SoloCuisines takes the burden off your shoulders. We provide respectful, calm, and seamless food distribution to ensure every guest is well cared for.',
    iconName: 'Flower2',
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80',
    highlights: ['Dignified Service Staff', 'Flexible Guest Count Scaling', 'Self-Contained Meal Packs or Buffets'],
    idealFor: 'Remembrance services, post-funeral receptions, memorial gatherings'
  },
  {
    id: 'religious-events',
    title: 'Religious Events',
    shortDescription: 'Respectful, compliant, and joyful catering for thanksgiving services, festivals, and church/mosque celebrations.',
    fullDescription: 'Whether catering for Eid celebrations, Christmas banquets, church anniversaries, or dedication feasts, SoloCuisines strictly observes cultural and dietary preferences with utmost care.',
    iconName: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    highlights: ['Halal & Special Prep Available', 'Community-Scale Serving Capability', 'Family-Style Platter Options'],
    idealFor: 'Thanksgiving services, religious festivals, community celebrations'
  },
  {
    id: 'family-gatherings',
    title: 'Family Gatherings',
    shortDescription: 'Warm, soul-nourishing home-style cooking served in generous platters or buffet styles for family reunions.',
    fullDescription: 'Bring loved ones together over nostalgic, authentic Nigerian meals. From traditional swallows and rich soups to smoky grills, we bring the comfort of home cooking at scale.',
    iconName: 'Users',
    image: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80',
    highlights: ['Family-Style Shared Dishes', 'Warm Comfort Food Focus', 'Hassle-Free Setup & Cleanup'],
    idealFor: 'Reunions, holiday dinners, festive family lunches'
  },
  {
    id: 'custom-events',
    title: 'Custom Events',
    shortDescription: 'Bespoke culinary concepts tailored specifically to your theme, dietary requirements, and unique vision.',
    fullDescription: 'Have a unique vision or theme in mind? SoloCuisines collaborates with you to craft bespoke menus, thematic presentations, and specialized live food stations.',
    iconName: 'UtensilsCrossed',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80',
    highlights: ['Bespoke Culinary Design', 'Theme-Matched Food Styling', 'Specialty Cocktail & Drink Pairings'],
    idealFor: 'Pop-ups, fashion shows, brand activations, private chef experiences'
  }
];

export const MENU_CATEGORIES: MenuCategory[] = [
  { id: 'nigerian-classics', name: 'Nigerian Classics', description: 'Traditional crowd favorites cooked with authentic spices and smoky firewood depth.' },
  { id: 'rice-dishes', name: 'Rice Dishes', description: 'Fragrant, rich, and impeccably seasoned signature rice specialties.' },
  { id: 'swallows-soups', name: 'Swallows & Soups', description: 'Silky swallows paired with rich, nutrient-dense Nigerian soups.' },
  { id: 'grills-proteins', name: 'Grills & Proteins', description: 'Succulent, well-marinated peppered meats, fish, and suya grills.' },
  { id: 'small-chops', name: 'Small Chops', description: 'Crispy finger foods, spicy gizzards, puff puff, and gourmet appetizers.' },
  { id: 'continental-options', name: 'Continental Options', description: 'Refined international favorites for fusion and diverse guest palettes.' },
  { id: 'desserts', name: 'Desserts', description: 'Sweet indulgences and refreshing modern sweet treats.' },
  { id: 'drinks-refreshments', name: 'Drinks & Refreshments', description: 'Zesty zobo infusions, freshly squeezed juices, and signature mocktails.' }
];

export const MENU_ITEMS: MenuItem[] = [
  // Nigerian Classics
  {
    id: 'm1',
    categoryId: 'nigerian-classics',
    name: 'Party Jollof Rice Special',
    description: 'Iconic, smoky party Jollof rice cooked in rich tomato reduction, red peppers, and aromatic spices.',
    image: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?auto=format&fit=crop&w=600&q=80',
    spicyLevel: 2,
    dietaryTags: ['Halal', 'Gluten-Free'],
    isSignature: true,
    isPopular: true
  },
  {
    id: 'm2',
    categoryId: 'nigerian-classics',
    name: 'Gizdodo Delight',
    description: 'Crispy peppered gizzards tossed with sweet caramelized plantain cubes, bell peppers, and spring onions.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
    spicyLevel: 2,
    isPopular: true
  },
  {
    id: 'm3',
    categoryId: 'nigerian-classics',
    name: 'Spicy Asun (Goat Meat)',
    description: 'Tender habanero pepper-grilled goat meat bites infused with onions and local spices.',
    image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=600&q=80',
    spicyLevel: 3,
    isSignature: true
  },

  // Rice Dishes
  {
    id: 'm4',
    categoryId: 'rice-dishes',
    name: 'Solo Special Fried Rice',
    description: 'Vibrant Nigerian fried rice tossed with liver, sweetcorn, green peas, carrots, and prawns.',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=600&q=80',
    spicyLevel: 1,
    isPopular: true
  },
  {
    id: 'm5',
    categoryId: 'rice-dishes',
    name: 'Ofada Rice & Ayamase Sauce',
    description: 'Local unpolished short-grain rice served in banana leaves with fiery green-pepper Ayamase sauce, bleached palm oil, boiled eggs, and assorted meats.',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80',
    spicyLevel: 3,
    isSignature: true
  },
  {
    id: 'm6',
    categoryId: 'rice-dishes',
    name: 'Coconut Rice Elegance',
    description: 'Infused with natural coconut milk, smoked crayfish, shrimp, and sweet peppers.',
    image: 'https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=600&q=80',
    spicyLevel: 1
  },

  // Swallows & Soups
  {
    id: 'm7',
    categoryId: 'swallows-soups',
    name: 'Pounded Yam & Egusi Soup',
    description: 'Piping hot, smooth pounded yam served alongside rich melon seed Egusi soup loaded with stockfish, goat meat, and fresh ugu leaves.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    spicyLevel: 2,
    isPopular: true
  },
  {
    id: 'm8',
    categoryId: 'swallows-soups',
    name: 'Efo Riro Special',
    description: 'Rich Yoruba spinach stew cooked with locust beans (iru), smoked fish, ponmo, and assorted meats, paired with Amala or Semovita.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80',
    spicyLevel: 2,
    isSignature: true
  },
  {
    id: 'm9',
    categoryId: 'swallows-soups',
    name: 'Fisherman Soup & Yellow Garri',
    description: 'Coastal delicacy packed with jumbo prawns, crabs, fresh fish, and local spices in aromatic broth.',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80',
    spicyLevel: 2
  },

  // Grills & Proteins
  {
    id: 'm10',
    categoryId: 'grills-proteins',
    name: 'Beef Suya Platter',
    description: 'Thinly sliced flank beef grilled over open flame with yaji spice rub, sliced onions, and fresh tomatoes.',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80',
    spicyLevel: 3,
    isPopular: true
  },
  {
    id: 'm11',
    categoryId: 'grills-proteins',
    name: 'Peppered Grilled Chicken',
    description: 'Succulent quarter chicken grilled to smoky perfection and glazed in a rich scotch bonnet bell pepper sauce.',
    image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=600&q=80',
    spicyLevel: 2,
    isPopular: true
  },
  {
    id: 'm12',
    categoryId: 'grills-proteins',
    name: 'Charcoal Grilled Croaker Fish',
    description: 'Whole marinated croaker fish served with spicy dodo, fried yam chips, and hot pepper sauce.',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80',
    spicyLevel: 2
  },

  // Small Chops
  {
    id: 'm13',
    categoryId: 'small-chops',
    name: 'Gourmet Small Chops Platter',
    description: 'Golden puff-puff, crispy vegetable spring rolls, beef samosas, spicy peppered gizzards, and mini corn dogs.',
    image: smallChopsImage,
    spicyLevel: 1,
    isSignature: true,
    isPopular: true
  },
  {
    id: 'm14',
    categoryId: 'small-chops',
    name: 'Mini Beef Samosas & Spring Rolls',
    description: 'Flaky pastry pockets filled with seasoned minced beef or aromatic shredded vegetables.',
    image: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=600&q=80',
    spicyLevel: 1
  },

  // Continental Options
  {
    id: 'm15',
    categoryId: 'continental-options',
    name: 'Creamy Garlic Seafood Pasta',
    description: 'Al dente penne pasta tossed in a rich garlic butter cream sauce with prawns and squid.',
    image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281273?auto=format&fit=crop&w=600&q=80',
    spicyLevel: 0,
    dietaryTags: ['Continental']
  },
  {
    id: 'm16',
    categoryId: 'continental-options',
    name: 'Herb Roasted Beef Ribeye',
    description: 'Slow-roasted beef loin served with rosemary red-wine jus and mashed potatoes.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
    spicyLevel: 0
  },

  // Desserts
  {
    id: 'm17',
    categoryId: 'desserts',
    name: 'Tropical Fruit Skewers & Cream',
    description: 'Fresh pineapple, watermelon, melon, and grapes drizzled with mint honey syrup.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
    spicyLevel: 0,
    dietaryTags: ['Vegetarian', 'Gluten-Free']
  },
  {
    id: 'm18',
    categoryId: 'desserts',
    name: 'Red Velvet Mini Cupcakes',
    description: 'Moist cocoa mini sponge cakes topped with whipped cream cheese frosting.',
    image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=600&q=80',
    spicyLevel: 0
  },

  // Drinks & Refreshments
  {
    id: 'm19',
    categoryId: 'drinks-refreshments',
    name: 'Craft Hibiscus Zobo Infusion',
    description: 'Traditional hibiscus leaf tea brewed with pineapple, ginger, clove, and fresh mint leaves.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80',
    spicyLevel: 0,
    dietaryTags: ['Natural', 'Vegan'],
    isPopular: true
  },
  {
    id: 'm20',
    categoryId: 'drinks-refreshments',
    name: 'Fresh Citrus Mocktail Punch',
    description: 'Sparkling blend of fresh orange, passionfruit, lime, and grenadine over crushed ice.',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80',
    spicyLevel: 0
  }
];

export const PACKAGES: EventPackage[] = [
  {
    id: 'essential-package',
    name: 'Essential Package',
    badge: 'Intimate Gathering',
    tagline: 'Ideal for small parties, office luncheons, and family celebrations.',
    description: 'Covers essential dining needs with delicious food, clean buffet presentation, and basic setup.',
    guestRange: '30 – 100 Guests',
    features: [
      'Selection of 2 Rice Dishes (Jollof / Fried)',
      'Selection of 2 Proteins (Peppered Chicken & Beef)',
      'Platter of Small Chops Starters',
      'Chafing Dish Buffet Setup',
      'Standard Serving Utensils & Disposable Plates/Cutlery',
      '2 Professional Buffet Attendants'
    ]
  },
  {
    id: 'signature-package',
    name: 'Signature Package',
    badge: 'Most Popular',
    tagline: 'Designed for weddings, corporate galas, and milestone birthdays.',
    description: 'Our flagship catering experience featuring expanded menu variety, live station options, and full service staff.',
    guestRange: '100 – 500 Guests',
    isPopular: true,
    features: [
      'Selection of 3 Rice Dishes + Ofada / Special Fried Rice',
      'Selection of 3 Proteins (Beef, Chicken, Grilled Fish or Asun)',
      'Traditional Swallow & Soup Option (Pounded Yam / Egusi)',
      'Gourmet Small Chops Welcome Bar',
      'Choice of 1 Live Cooking Station (Suya Grill or Asun)',
      'Elegant Tabletop Setup & Uniformed Waitstaff',
      'Dedicated Event Lead Supervisor'
    ]
  },
  {
    id: 'premium-package',
    name: 'Premium VIP Package',
    badge: 'Royal Banquet',
    tagline: 'For high-end luxury weddings, state events, and large-scale summits.',
    description: 'Comprehensive VIP catering with multi-course plated or luxury buffet, specialized mocktail bars, and dedicated table servers.',
    guestRange: '500 – 2,500+ Guests',
    features: [
      'Full Unlimited Menu Selection (Classics, Continental & Desserts)',
      'VIP High-Table Plated Multi-Course Service',
      'Interactive Live Suya, Asun & Cocktail Bar',
      'Craft Zobo & Fresh Juice Station',
      'Custom Food Styling & Table Floral Accents',
      'Senior Catering Manager + Full Waiter & Hostess Crew',
      'Complimentary Pre-Event Menu Tasting Session'
    ]
  }
];

export const WHY_CHOOSE_US: WhyChooseUsItem[] = [
  {
    id: 'fresh-prep',
    title: 'Freshly Prepared Meals',
    description: 'We source farm-fresh produce, premium spices, and quality meats daily. Every meal is prepared fresh for your specific event date.',
    iconName: 'ChefHat'
  },
  {
    id: 'custom-menus',
    title: 'Customizable Menus',
    description: 'No two events are alike. We collaborate with you to craft bespoke menus tailored to your guests, preferences, and dietary needs.',
    iconName: 'SlidersHorizontal'
  },
  {
    id: 'professional-staff',
    title: 'Professional Service',
    description: 'Our uniformed waitstaff, chefs, and supervisors undergo rigorous training in hospitality, hygiene, and courteous guest care.',
    iconName: 'Sparkles'
  },
  {
    id: 'flexible-options',
    title: 'Flexible Event Options',
    description: 'Whether you need self-serve buffets, VIP plated table service, live cooking stations, or packaged bento boxes, we adapt to your venue.',
    iconName: 'CalendarCheck'
  },
  {
    id: 'presentation',
    title: 'Attention to Presentation',
    description: 'Food should delight the eyes before the palate. We invest in elegant chafing dishes, rustic platters, and pristine table layouts.',
    iconName: 'Eye'
  },
  {
    id: 'coordination',
    title: 'Reliable Coordination',
    description: 'Punctuality is non-negotiable. Our logistics team ensures hot meals arrive on schedule and flow seamlessly with your event timeline.',
    iconName: 'Clock'
  },
  {
    id: 'capacity',
    title: 'Small & Large Scale Capability',
    description: 'From an intimate dinner party of 20 to a grand wedding banquet of 3,000 guests, SoloCuisines maintains identical culinary precision.',
    iconName: 'Users'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Grand Wedding Buffet Setup',
    category: 'Weddings',
    image: heroImage,
    description: 'Elegant golden chafing dish buffet presentation for a 500-guest wedding reception.'
  },
  {
    id: 'g2',
    title: 'Gourmet Small Chops Platter',
    category: 'Small Chops',
    image: smallChopsImage,
    description: 'Freshly made puff-puff, samosas, and peppered gizzards served at a cocktail reception.'
  },
  {
    id: 'g3',
    title: 'Smoky Jollof & Grilled Chicken',
    category: 'Nigerian Dishes',
    image: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?auto=format&fit=crop&w=800&q=80',
    description: 'Authentic firewood-cooked Jollof rice plated with glazed pepper chicken.'
  },
  {
    id: 'g4',
    title: 'VIP Plated Table Service',
    category: 'Plated Meals',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    description: 'High-table plated dinner service for corporate executives and dignitaries.'
  },
  {
    id: 'g5',
    title: 'Corporate Summit Coffee & Snack Bar',
    category: 'Corporate',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80',
    description: 'Morning tea break and pastries for a 3-day tech conference in Victoria Island.'
  },
  {
    id: 'g6',
    title: 'Live Suya & Barbecue Station',
    category: 'Buffet Setup',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
    description: 'Open-flame live grilling station for a 40th birthday garden party.'
  },
  {
    id: 'g7',
    title: 'Luxury Event Table Decor & Glassware',
    category: 'Table Setup',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    description: 'Pristine table layout with gold cutlery and crystal glassware.'
  },
  {
    id: 'g8',
    title: 'Traditional Pounded Yam & Egusi',
    category: 'Nigerian Dishes',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    description: 'Freshly pounded yam paired with Egusi soup loaded with goat meat and stockfish.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    clientName: 'Dr. Adewale & Mrs. Funke Adebayo',
    eventType: 'Wedding Reception (600 Guests)',
    location: 'Lekki, Lagos',
    quote: 'SoloCuisines catered our wedding in December, and guests are still talking about the Jollof rice and small chops! Solomon and his team were extremely organized, hot food was served right on time, and the VIP table service was flawless.',
    rating: 5,
    isDemo: true
  },
  {
    id: 't2',
    clientName: 'Chief Emeka Okafor',
    eventType: '50th Birthday Party',
    location: 'Victoria Island, Lagos',
    quote: 'The live Suya grill and Asun station at my birthday were an absolute hit. The presentation was top-tier, the waiters were polite, and Solomon personally ensured everything ran smoothly. Highly recommended!',
    rating: 5,
    isDemo: true
  },
  {
    id: 't3',
    clientName: 'Amina Bello (Corporate Affairs Manager)',
    eventType: '3-Day Annual Corporate Conference',
    location: 'Ikeja, Lagos',
    quote: 'Handling lunch for 350 conference delegates over 3 days without a single delay is impressive. The food variety was fantastic, dietary preferences were catered for, and the team was exceptionally professional.',
    rating: 5,
    isDemo: true
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'What types of events do you cater for?',
    answer: 'SoloCuisines caters for all types of events including weddings, corporate luncheons, birthday parties, conferences, graduation celebrations, funerals, memorial services, religious gatherings, family reunions, and custom celebrations.'
  },
  {
    id: 'faq-2',
    question: 'How many guests can SoloCuisines cater for?',
    answer: 'We cater for gatherings of all scales, ranging from intimate private dinner parties of 20 to 30 guests up to grand wedding banquets and corporate conferences with over 2,500 guests.'
  },
  {
    id: 'faq-3',
    question: 'Can I customize the menu for my event?',
    answer: 'Yes! All menus are 100% customizable. You can mix traditional Nigerian classics, swallows, grills, small chops, continental options, and custom drinks according to your vision and dietary requirements.'
  },
  {
    id: 'faq-4',
    question: 'Do you provide waiters and serving staff?',
    answer: 'Yes. Depending on your package and setup, we provide experienced, uniformed waiters, hostesses, buffet attendants, live station chefs, and event supervisors.'
  },
  {
    id: 'faq-5',
    question: 'Do you provide buffet setup and chafing dishes?',
    answer: 'Yes. We bring clean, high-grade stainless steel or gold chafing dishes, serving utensils, food labels, and tabletop decor for buffet lines.'
  },
  {
    id: 'faq-6',
    question: 'Can you cater for corporate events and office luncheons?',
    answer: 'Absolutely. We offer tailored corporate options including individual executive bento meal boxes, standing cocktail spreads, and full conference buffet setups with strict adherence to event schedules.'
  },
  {
    id: 'faq-7',
    question: 'How far in advance should I book SoloCuisines?',
    answer: 'For large events like weddings and major corporate galas, we recommend booking 4 to 8 weeks in advance to secure your date. For smaller private parties, 1 to 2 weeks advance notice is usually sufficient.'
  },
  {
    id: 'faq-8',
    question: 'Do you handle last-minute or short-notice events?',
    answer: 'Subject to schedule availability and staff deployment, we do accept short-notice bookings. Exact availability depends on your guest count and chosen menu, so please contact us directly via call or WhatsApp.'
  },
  {
    id: 'faq-9',
    question: 'Can you accommodate special dietary requirements?',
    answer: 'Yes. We cater for vegetarian, vegan, Halal, gluten-free, and specific allergen restrictions. Please specify dietary needs during your quote request.'
  },
  {
    id: 'faq-10',
    question: 'How is pricing determined?',
    answer: 'Pricing depends on your guest count, selected menu items, service style (plated vs. buffet), venue location, and staffing requirements. Submit a quick quote request to receive a tailored estimate for your event.'
  },
  {
    id: 'faq-11',
    question: 'Do you provide drinks and refreshments?',
    answer: 'Yes! We offer homemade hibiscus Zobo, fresh juices, mocktails, soft drinks, bottled water, and dedicated bar setup options.'
  },
  {
    id: 'faq-12',
    question: 'Can SoloCuisines cater at external venues or outdoor locations?',
    answer: 'Yes. We cater at private homes, event halls, outdoor gardens, beach venues, churches, and corporate auditoriums. Our mobile setup includes thermal transporters and portable heating equipment.'
  }
];

export const INITIAL_ASSISTANT_MESSAGES = [
  {
    id: '1',
    sender: 'assistant' as const,
    text: "Hello! I am SoloCuisines AI assistant. I can answer questions about Solomon's catering services, menus, event packages, guest capacity, and booking guidance. How can I help you plan your event today?",
    timestamp: 'Just now',
    suggestedQuestions: [
      'What menu packages do you offer for weddings?',
      'How many guests can SoloCuisines cater for?',
      'Can I get a quote for a 200-person birthday party?',
      'Do you offer live Suya & Small Chops stations?'
    ]
  }
];
