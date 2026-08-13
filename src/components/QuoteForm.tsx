import React, { useState } from 'react';
import { Send, CheckCircle2, Calendar, Users, MapPin, Phone, Mail, DollarSign, FileText, Sparkles, X } from 'lucide-react';
import { QuoteFormData } from '../types';

interface QuoteFormProps {
  initialEventType?: string;
  initialPackageName?: string;
}

export const QuoteForm: React.FC<QuoteFormProps> = ({ initialEventType = '', initialPackageName = '' }) => {
  const [formData, setFormData] = useState<QuoteFormData>({
    fullName: '',
    phone: '',
    email: '',
    eventType: initialEventType || 'Wedding',
    eventDate: '',
    eventLocation: 'Lagos, Nigeria',
    numberOfGuests: 150,
    preferredService: initialPackageName ? `Package: ${initialPackageName}` : 'Buffet Catering',
    budgetRange: '₦1,000,000 - ₦2,500,000',
    additionalDetails: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const eventTypes = [
    'Wedding',
    'Birthday',
    'Corporate Event',
    'Conference',
    'Graduation',
    'Funeral/Memorial',
    'Religious Event',
    'Private Party',
    'Other'
  ];

  const serviceStyles = [
    'Buffet Catering',
    'VIP Plated Table Service',
    'Live Suya & Cooking Stations',
    'Cocktail & Small Chops Bar',
    'Executive Packaged Bento Meals',
    'Custom Combination'
  ];

  const budgetRanges = [
    'Under ₦1,000,000',
    '₦1,000,000 - ₦2,500,000',
    '₦2,500,000 - ₦5,000,000',
    '₦5,000,000 - ₦10,000,000',
    'Above ₦10,000,000',
    'Flexible / Seeking Guidance'
  ];

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required.';
    if (!formData.phone.trim()) newErrors.phone = 'Phone Number is required.';
    if (!formData.email.trim() || !formData.email.includes('@')) newErrors.email = 'Valid Email is required.';
    if (!formData.eventDate) newErrors.eventDate = 'Event Date is required.';
    if (!formData.eventLocation.trim()) newErrors.eventLocation = 'Event Location is required.';
    if (formData.numberOfGuests < 10) newErrors.numberOfGuests = 'Minimum 10 guests required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <section id="quote-form" className="py-20 bg-[#FAF8F5] text-[#2C221E] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-[#B45309] font-semibold text-xs tracking-widest uppercase bg-amber-100 px-3 py-1 rounded-full inline-block">
            Start Planning
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E1714]">
            Plan Your Event with SoloCuisines
          </h2>
          <p className="text-stone-600 text-sm sm:text-base">
            Tell us about your upcoming celebration. We will formulate a tailored menu proposal and pricing estimate within 24 hours.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/80 warm-shadow">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Contact Details Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Chief Funmi Adebayo"
                  className={`w-full px-4 py-2.5 text-xs sm:text-sm bg-stone-50 border rounded-xl focus:outline-none transition-all ${
                    errors.fullName ? 'border-red-500 bg-red-50' : 'border-stone-200 focus:border-[#B45309]'
                  }`}
                />
                {errors.fullName && <p className="text-red-500 text-[11px] mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                  Phone / WhatsApp <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+234 800 000 0000"
                  className={`w-full px-4 py-2.5 text-xs sm:text-sm bg-stone-50 border rounded-xl focus:outline-none transition-all ${
                    errors.phone ? 'border-red-500 bg-red-50' : 'border-stone-200 focus:border-[#B45309]'
                  }`}
                />
                {errors.phone && <p className="text-red-500 text-[11px] mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@example.com"
                  className={`w-full px-4 py-2.5 text-xs sm:text-sm bg-stone-50 border rounded-xl focus:outline-none transition-all ${
                    errors.email ? 'border-red-500 bg-red-50' : 'border-stone-200 focus:border-[#B45309]'
                  }`}
                />
                {errors.email && <p className="text-red-500 text-[11px] mt-1">{errors.email}</p>}
              </div>

            </div>

            {/* Event Specifics Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                  Event Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.eventType}
                  onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                  className="w-full px-4 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-[#B45309]"
                >
                  {eventTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                  Event Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.eventDate}
                  onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                  className={`w-full px-4 py-2.5 text-xs sm:text-sm bg-stone-50 border rounded-xl focus:outline-none transition-all ${
                    errors.eventDate ? 'border-red-500 bg-red-50' : 'border-stone-200 focus:border-[#B45309]'
                  }`}
                />
                {errors.eventDate && <p className="text-red-500 text-[11px] mt-1">{errors.eventDate}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                  Event Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.eventLocation}
                  onChange={(e) => setFormData({ ...formData, eventLocation: e.target.value })}
                  placeholder="e.g. Victoria Island, Lagos"
                  className={`w-full px-4 py-2.5 text-xs sm:text-sm bg-stone-50 border rounded-xl focus:outline-none transition-all ${
                    errors.eventLocation ? 'border-red-500 bg-red-50' : 'border-stone-200 focus:border-[#B45309]'
                  }`}
                />
                {errors.eventLocation && <p className="text-red-500 text-[11px] mt-1">{errors.eventLocation}</p>}
              </div>

            </div>

            {/* Scale & Budget Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                  Estimated Guests <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min={10}
                  max={5000}
                  value={formData.numberOfGuests}
                  onChange={(e) => setFormData({ ...formData, numberOfGuests: Number(e.target.value) })}
                  className="w-full px-4 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-[#B45309]"
                />
                {errors.numberOfGuests && <p className="text-red-500 text-[11px] mt-1">{errors.numberOfGuests}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                  Service Style
                </label>
                <select
                  value={formData.preferredService}
                  onChange={(e) => setFormData({ ...formData, preferredService: e.target.value })}
                  className="w-full px-4 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-[#B45309]"
                >
                  {serviceStyles.map((style) => (
                    <option key={style} value={style}>
                      {style}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                  Budget Range (Optional)
                </label>
                <select
                  value={formData.budgetRange}
                  onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                  className="w-full px-4 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-[#B45309]"
                >
                  {budgetRanges.map((range) => (
                    <option key={range} value={range}>
                      {range}
                    </option>
                  ))}
                </select>
              </div>

            </div>

            {/* Additional Details */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                Additional Event Details or Dietary Preferences
              </label>
              <textarea
                rows={3}
                value={formData.additionalDetails}
                onChange={(e) => setFormData({ ...formData, additionalDetails: e.target.value })}
                placeholder="Mention special dish requests, theme preferences, VIP high-table needs, or timing details..."
                className="w-full px-4 py-3 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-[#B45309]"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="pt-2 text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto bg-gradient-to-r from-[#B45309] to-[#D97706] hover:from-[#92400E] hover:to-[#B45309] text-white px-10 py-4 rounded-xl font-bold text-base shadow-xl transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Processing Proposal Request...</span>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Request Event Quote</span>
                  </>
                )}
              </button>
              <p className="text-[11px] text-stone-400 mt-2">
                * No immediate payment required. Our team will review your specifications and contact you directly.
              </p>
            </div>

          </form>
        </div>

      </div>

      {/* Confirmation Modal */}
      {submitted && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in zoom-in-95 duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-amber-200 relative text-[#2C221E]">
            <button
              onClick={() => setSubmitted(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#1E1714]">Quote Request Received!</h3>
              <p className="text-stone-600 text-xs sm:text-sm">
                Thank you, <strong>{formData.fullName}</strong>. Solomon and the SoloCuisines catering team have received your request.
              </p>
            </div>

            {/* Summary Details Card */}
            <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 space-y-2 text-xs text-stone-700">
              <p className="font-bold text-[#B45309] uppercase tracking-wider">Event Summary:</p>
              <div className="grid grid-cols-2 gap-2">
                <p><strong>Event:</strong> {formData.eventType}</p>
                <p><strong>Date:</strong> {formData.eventDate}</p>
                <p><strong>Location:</strong> {formData.eventLocation}</p>
                <p><strong>Guests:</strong> {formData.numberOfGuests}</p>
                <p className="col-span-2"><strong>Style:</strong> {formData.preferredService}</p>
              </div>
            </div>

            <p className="text-xs text-stone-500 text-center">
              A detailed proposal will be sent to <strong>{formData.email}</strong> or reached via WhatsApp at <strong>{formData.phone}</strong> shortly.
            </p>

            <button
              onClick={() => setSubmitted(false)}
              className="w-full bg-[#1E1714] text-white py-3 rounded-xl font-semibold text-xs hover:bg-stone-800 transition-colors"
            >
              Close Confirmation
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
