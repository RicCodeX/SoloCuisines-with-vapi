export interface BusinessInfo {
  name: string;
  tagline: string;
  subTagline: string;
  founder: string;
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  email: string;
  location: string;
  addressDetails: string;
  operatingHours: string;
  socials: {
    instagram: string;
    facebook: string;
    twitter: string;
  };
  demoNotice: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  image: string;
  highlights: string[];
  idealFor: string;
}

export interface MenuItem {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  image: string;
  spicyLevel?: 0 | 1 | 2 | 3;
  dietaryTags?: string[];
  isSignature?: boolean;
  isPopular?: boolean;
}

export interface MenuCategory {
  id: string;
  name: string;
  description: string;
}

export interface EventPackage {
  id: string;
  name: string;
  badge?: string;
  tagline: string;
  description: string;
  guestRange: string;
  features: string[];
  isPopular?: boolean;
}

export interface WhyChooseUsItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Weddings' | 'Buffet Setup' | 'Plated Meals' | 'Small Chops' | 'Nigerian Dishes' | 'Corporate' | 'Table Setup';
  image: string;
  description: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  eventType: string;
  location: string;
  quote: string;
  rating: number;
  isDemo: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface QuoteFormData {
  fullName: string;
  phone: string;
  email: string;
  eventType: string;
  eventDate: string;
  eventLocation: string;
  numberOfGuests: number;
  preferredService: string;
  budgetRange: string;
  additionalDetails: string;
}

export interface AssistantMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedQuestions?: string[];
}
