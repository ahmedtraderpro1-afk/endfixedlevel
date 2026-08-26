import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  ShoppingBag,
  ArrowLeft,
  Lock,
  MessageCircle,
  Truck,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  CreditCard,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { useCart, CartItem } from '../context/CartContext';
import { createOrder } from '../services/orderService';
import { isSupabaseConfigured } from '../lib/supabase';

interface CustomerFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  address1: string;
  address2: string;
  city: string;
  region: string;
  postalCode: string;
  notes: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  country?: string;
  address1?: string;
  city?: string;
  postalCode?: string;
}

interface LocalOrderRecord {
  orderReference: string;
  createdAt: string;
  customer: CustomerFormData;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: 'WhatsApp Pending';
}

const STORAGE_ORDERS_KEY = 'jewelry_by_nadia_orders_v1';

// Generate human-readable order reference: JBN-YYMMDD-XXXX
function generateOrderReference(): string {
  const now = new Date();
  const yy = String(now.getFullYear()).slice(-2);
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let rand = '';
  for (let i = 0; i < 4; i++) {
    rand += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `JBN-${yy}${mm}${dd}-${rand}`;
}

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, subtotal, totalQuantity } = useCart();

  const [formData, setFormData] = useState<CustomerFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: 'United States',
    address1: '',
    address2: '',
    city: '',
    region: '',
    postalCode: '',
    notes: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdOrder, setCreatedOrder] = useState<LocalOrderRecord | null>(null);

  const rawWhatsAppNumber = import.meta.env.VITE_WHATSAPP_ORDER_NUMBER || '';
  const cleanWhatsAppNumber = rawWhatsAppNumber.replace(/[^0-9]/g, '');
  const isWhatsAppConfigured = Boolean(cleanWhatsAppNumber && cleanWhatsAppNumber.length >= 7);

  // If cart is empty and no order just created, show empty state
  if (items.length === 0 && !createdOrder) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 text-center max-w-lg mx-auto">
        <div className="w-16 h-16 rounded-full bg-[#151515] border border-[#c5a059]/20 flex items-center justify-center mb-5 text-[#c5a059]">
          <ShoppingBag className="w-7 h-7" />
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl text-[#f9f6f0] mb-3">
          Your Shopping Bag is Empty
        </h1>
        <p className="text-xs sm:text-sm text-[#f9f6f0]/60 leading-relaxed mb-8 font-light">
          There are no items currently queued for checkout. Browse our handcrafted bridal and statement collections to select your heirloom pieces.
        </p>
        <Link
          to="/"
          id="checkout-empty-continue-btn"
          className="inline-flex items-center gap-2 bg-[#c5a059] hover:bg-[#d4af37] text-[#0a0a0a] font-sans font-bold text-xs tracking-[0.2em] uppercase px-8 py-3.5 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Explore Collections</span>
        </Link>
      </div>
    );
  }

  const validateField = (field: keyof CustomerFormData, value: string): string | undefined => {
    switch (field) {
      case 'firstName':
        if (!value.trim()) return 'First name is required.';
        return undefined;
      case 'lastName':
        if (!value.trim()) return 'Last name is required.';
        return undefined;
      case 'email':
        if (!value.trim()) return 'Email address is required.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          return 'Please enter a valid email address.';
        }
        return undefined;
      case 'phone':
        if (!value.trim()) return 'Phone number is required for delivery coordination.';
        if (value.trim().length < 6) return 'Please provide a complete contact number.';
        return undefined;
      case 'country':
        if (!value.trim()) return 'Country/region is required.';
        return undefined;
      case 'address1':
        if (!value.trim()) return 'Delivery street address is required.';
        return undefined;
      case 'city':
        if (!value.trim()) return 'City is required.';
        return undefined;
      case 'postalCode':
        if (!value.trim()) return 'Postal / ZIP code is required.';
        return undefined;
      default:
        return undefined;
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const err = validateField(name as keyof CustomerFormData, value);
      setErrors((prev) => ({ ...prev, [name]: err }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const err = validateField(name as keyof CustomerFormData, value);
    setErrors((prev) => ({ ...prev, [name]: err }));
  };

  const validateAll = (): boolean => {
    const newErrors: FormErrors = {};
    const fieldsToValidate: (keyof CustomerFormData)[] = [
      'firstName',
      'lastName',
      'email',
      'phone',
      'country',
      'address1',
      'city',
      'postalCode',
    ];

    fieldsToValidate.forEach((f) => {
      const err = validateField(f, formData[f]);
      if (err) {
        newErrors[f as keyof FormErrors] = err;
      }
    });

    setErrors(newErrors);
    const allTouched: Record<string, boolean> = {};
    fieldsToValidate.forEach((f) => {
      allTouched[f] = true;
    });
    setTouched(allTouched);

    return Object.keys(newErrors).length === 0;
  };

  const buildWhatsAppMessage = (orderRef: string): string => {
    const customerBlock = `Customer:\n${formData.firstName} ${formData.lastName}\n${formData.email}\n${formData.phone}`;
    
    const deliveryLines = [
      formData.address1 + (formData.address2 ? `, ${formData.address2}` : ''),
      formData.city,
      formData.region || '',
      formData.postalCode,
      formData.country,
    ].filter(Boolean);
    const deliveryBlock = `Delivery:\n${deliveryLines.join('\n')}`;

    const itemLines = items.map((item) => {
      const lineTotal = (item.price * item.quantity).toFixed(2);
      return `${item.quantity}x ${item.title} — $${lineTotal} USD`;
    });
    const itemsBlock = `Items:\n${itemLines.join('\n')}`;

    const summaryBlock = `Subtotal: $${subtotal.toFixed(2)} USD\nShipping: Complimentary\nTotal: $${subtotal.toFixed(2)} USD`;

    const notesBlock = formData.notes.trim()
      ? `\n\nOrder Notes:\n${formData.notes.trim()}`
      : '';

    return `Jewelry By Nadia\nNew Order Request\n\nOrder: ${orderRef}\n\n${customerBlock}\n\n${deliveryBlock}\n\n${itemsBlock}\n\n${summaryBlock}${notesBlock}\n\nKindly confirm availability and fulfillment timeline for this order. Thank you!`;
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const isValid = validateAll();
    if (!isValid) {
      // Scroll smoothly to first error
      const firstErrorKey = Object.keys(errors)[0] || 'firstName';
      const el = document.getElementById(`input-${firstErrorKey}`);
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    if (!isWhatsAppConfigured) {
      return;
    }

    setIsSubmitting(true);

    try {
      const orderRef = generateOrderReference();
      const orderRecord: LocalOrderRecord = {
        orderReference: orderRef,
        createdAt: new Date().toISOString(),
        customer: { ...formData },
        items: [...items],
        subtotal,
        shipping: 0,
        total: subtotal,
        status: 'WhatsApp Pending',
      };

      // 1. If Supabase is configured, save order and items to the database
      if (isSupabaseConfigured()) {
        try {
          await createOrder(
            {
              orderReference: orderRef,
              firstName: formData.firstName,
              lastName: formData.lastName,
              email: formData.email,
              phone: formData.phone,
              country: formData.country,
              address1: formData.address1,
              address2: formData.address2,
              city: formData.city,
              region: formData.region,
              postalCode: formData.postalCode,
              notes: formData.notes,
              subtotal,
              shipping: 0,
              total: subtotal,
              currency: 'USD',
            },
            items
          );
        } catch (dbErr) {
          // Never block customer WhatsApp order if database save fails
          console.warn('Database order save error, proceeding with local fallback:', dbErr);
        }
      }

      // 2. Save order to localStorage backup
      try {
        const existingRaw = localStorage.getItem(STORAGE_ORDERS_KEY);
        const existingOrders = existingRaw ? JSON.parse(existingRaw) : [];
        if (Array.isArray(existingOrders)) {
          existingOrders.unshift(orderRecord);
          localStorage.setItem(STORAGE_ORDERS_KEY, JSON.stringify(existingOrders));
        } else {
          localStorage.setItem(STORAGE_ORDERS_KEY, JSON.stringify([orderRecord]));
        }
      } catch (saveErr) {
        console.error('Error saving order record to localStorage:', saveErr);
      }

      setCreatedOrder(orderRecord);

      // 3. Build message and open WhatsApp URL
      const messageText = buildWhatsAppMessage(orderRef);
      const encodedMsg = encodeURIComponent(messageText);
      const whatsappUrl = `https://wa.me/${cleanWhatsAppNumber}?text=${encodedMsg}`;

      // Open in new tab/app safely
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    } finally {
      setTimeout(() => {
        setIsSubmitting(false);
      }, 1000);
    }
  };

  return (
    <div className="w-full pb-20">
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-4 sm:py-6">
        <nav
          id="checkout-breadcrumbs"
          aria-label="Breadcrumb"
          className="flex items-center flex-wrap gap-2 text-[11px] font-sans tracking-[0.15em] uppercase text-[#f9f6f0]/50"
        >
          <Link to="/" className="hover:text-[#c5a059] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-[#c5a059]/40" />
          <span className="text-[#f9f6f0] font-medium">Checkout</span>
        </nav>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* If Order Just Placed: Show Order Confirmation Banner with WhatsApp Re-trigger */}
        {createdOrder && (
          <div
            id="order-submitted-banner"
            className="mb-10 p-6 sm:p-8 bg-[#0e0e0e] border border-[#c5a059]/40 relative overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[#c5a059] text-xs font-sans tracking-[0.2em] uppercase font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Order Request Generated</span>
                </div>
                <h2 className="font-serif text-xl sm:text-2xl text-[#f9f6f0]">
                  Reference: <span className="text-[#c5a059]">{createdOrder.orderReference}</span>
                </h2>
                <p className="text-xs text-[#f9f6f0]/70 max-w-xl font-light">
                  Your order draft has been logged. If WhatsApp did not open automatically, click the button below to send your order details to Nadia.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <a
                  href={`https://wa.me/${cleanWhatsAppNumber}?text=${encodeURIComponent(
                    buildWhatsAppMessage(createdOrder.orderReference)
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#c5a059] hover:bg-[#d4af37] text-[#0a0a0a] font-sans font-bold text-xs tracking-[0.18em] uppercase px-5 py-3 flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Open WhatsApp</span>
                </a>
                <Link
                  to="/"
                  className="border border-[#c5a059]/30 text-[#f9f6f0] hover:text-[#c5a059] hover:border-[#c5a059] font-sans text-xs tracking-[0.18em] uppercase px-5 py-3 flex items-center justify-center transition-colors text-center"
                >
                  Return to Boutique
                </Link>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT COLUMN: Customer Information, Shipping & Payment Method */}
          <div className="lg:col-span-7 space-y-8">
            <form id="checkout-form" onSubmit={handlePlaceOrder} noValidate className="space-y-8">
              {/* Section 1: Customer Contact */}
              <div className="p-6 sm:p-7 bg-[#0d0d0d] border border-[#c5a059]/20 space-y-5">
                <div className="flex items-center justify-between border-b border-[#f9f6f0]/10 pb-4">
                  <h2 className="font-serif text-lg sm:text-xl text-[#f9f6f0] flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#c5a059] text-[#0a0a0a] text-[11px] font-sans font-bold flex items-center justify-center">
                      1
                    </span>
                    <span>Customer Information</span>
                  </h2>
                  <span className="text-[10px] text-[#f9f6f0]/40 uppercase tracking-widest">
                    * Required
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* First Name */}
                  <div>
                    <label
                      htmlFor="input-firstName"
                      className="block text-[11px] font-sans uppercase tracking-[0.18em] text-[#f9f6f0]/80 mb-1.5"
                    >
                      First Name *
                    </label>
                    <input
                      id="input-firstName"
                      type="text"
                      name="firstName"
                      autoComplete="given-name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      placeholder="e.g. Eleanor"
                      className={`w-full bg-[#141414] border px-3.5 py-3 text-xs sm:text-sm text-[#f9f6f0] placeholder-[#f9f6f0]/25 rounded-none focus:outline-none transition-colors ${
                        errors.firstName && touched.firstName
                          ? 'border-rose-500/80 focus:border-rose-500'
                          : 'border-[#c5a059]/25 focus:border-[#c5a059]'
                      }`}
                    />
                    {errors.firstName && touched.firstName && (
                      <p className="mt-1 text-[11px] text-rose-400 font-sans" role="alert">
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  {/* Last Name */}
                  <div>
                    <label
                      htmlFor="input-lastName"
                      className="block text-[11px] font-sans uppercase tracking-[0.18em] text-[#f9f6f0]/80 mb-1.5"
                    >
                      Last Name *
                    </label>
                    <input
                      id="input-lastName"
                      type="text"
                      name="lastName"
                      autoComplete="family-name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      placeholder="e.g. Vance"
                      className={`w-full bg-[#141414] border px-3.5 py-3 text-xs sm:text-sm text-[#f9f6f0] placeholder-[#f9f6f0]/25 rounded-none focus:outline-none transition-colors ${
                        errors.lastName && touched.lastName
                          ? 'border-rose-500/80 focus:border-rose-500'
                          : 'border-[#c5a059]/25 focus:border-[#c5a059]'
                      }`}
                    />
                    {errors.lastName && touched.lastName && (
                      <p className="mt-1 text-[11px] text-rose-400 font-sans" role="alert">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div>
                    <label
                      htmlFor="input-email"
                      className="block text-[11px] font-sans uppercase tracking-[0.18em] text-[#f9f6f0]/80 mb-1.5"
                    >
                      Email Address *
                    </label>
                    <input
                      id="input-email"
                      type="email"
                      name="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      placeholder="eleanor@example.com"
                      className={`w-full bg-[#141414] border px-3.5 py-3 text-xs sm:text-sm text-[#f9f6f0] placeholder-[#f9f6f0]/25 rounded-none focus:outline-none transition-colors ${
                        errors.email && touched.email
                          ? 'border-rose-500/80 focus:border-rose-500'
                          : 'border-[#c5a059]/25 focus:border-[#c5a059]'
                      }`}
                    />
                    {errors.email && touched.email && (
                      <p className="mt-1 text-[11px] text-rose-400 font-sans" role="alert">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label
                      htmlFor="input-phone"
                      className="block text-[11px] font-sans uppercase tracking-[0.18em] text-[#f9f6f0]/80 mb-1.5"
                    >
                      Phone Number *
                    </label>
                    <input
                      id="input-phone"
                      type="tel"
                      name="phone"
                      autoComplete="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      placeholder="+1 (555) 000-0000"
                      className={`w-full bg-[#141414] border px-3.5 py-3 text-xs sm:text-sm text-[#f9f6f0] placeholder-[#f9f6f0]/25 rounded-none focus:outline-none transition-colors ${
                        errors.phone && touched.phone
                          ? 'border-rose-500/80 focus:border-rose-500'
                          : 'border-[#c5a059]/25 focus:border-[#c5a059]'
                      }`}
                    />
                    {errors.phone && touched.phone && (
                      <p className="mt-1 text-[11px] text-rose-400 font-sans" role="alert">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Section 2: Delivery Address */}
              <div className="p-6 sm:p-7 bg-[#0d0d0d] border border-[#c5a059]/20 space-y-5">
                <div className="flex items-center justify-between border-b border-[#f9f6f0]/10 pb-4">
                  <h2 className="font-serif text-lg sm:text-xl text-[#f9f6f0] flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#c5a059] text-[#0a0a0a] text-[11px] font-sans font-bold flex items-center justify-center">
                      2
                    </span>
                    <span>Delivery Address</span>
                  </h2>
                  <div className="flex items-center gap-1.5 text-[10px] text-[#c5a059] tracking-wider uppercase">
                    <Truck className="w-3.5 h-3.5" />
                    <span>Free Worldwide Insured</span>
                  </div>
                </div>

                {/* Country / Region */}
                <div>
                  <label
                    htmlFor="input-country"
                    className="block text-[11px] font-sans uppercase tracking-[0.18em] text-[#f9f6f0]/80 mb-1.5"
                  >
                    Country / Region *
                  </label>
                  <select
                    id="input-country"
                    name="country"
                    autoComplete="country-name"
                    value={formData.country}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className="w-full bg-[#141414] border border-[#c5a059]/25 px-3.5 py-3 text-xs sm:text-sm text-[#f9f6f0] rounded-none focus:outline-none focus:border-[#c5a059] transition-colors"
                  >
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Canada">Canada</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="Saudi Arabia">Saudi Arabia</option>
                    <option value="Qatar">Qatar</option>
                    <option value="Pakistan">Pakistan</option>
                    <option value="India">India</option>
                    <option value="Australia">Australia</option>
                    <option value="France">France</option>
                    <option value="Germany">Germany</option>
                    <option value="Switzerland">Switzerland</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Other">Other Country / Region</option>
                  </select>
                </div>

                {/* Street Address 1 */}
                <div>
                  <label
                    htmlFor="input-address1"
                    className="block text-[11px] font-sans uppercase tracking-[0.18em] text-[#f9f6f0]/80 mb-1.5"
                  >
                    Address Line 1 *
                  </label>
                  <input
                    id="input-address1"
                    type="text"
                    name="address1"
                    autoComplete="address-line1"
                    value={formData.address1}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    placeholder="Street name, house / building number"
                    className={`w-full bg-[#141414] border px-3.5 py-3 text-xs sm:text-sm text-[#f9f6f0] placeholder-[#f9f6f0]/25 rounded-none focus:outline-none transition-colors ${
                      errors.address1 && touched.address1
                        ? 'border-rose-500/80 focus:border-rose-500'
                        : 'border-[#c5a059]/25 focus:border-[#c5a059]'
                    }`}
                  />
                  {errors.address1 && touched.address1 && (
                    <p className="mt-1 text-[11px] text-rose-400 font-sans" role="alert">
                      {errors.address1}
                    </p>
                  )}
                </div>

                {/* Street Address 2 */}
                <div>
                  <label
                    htmlFor="input-address2"
                    className="block text-[11px] font-sans uppercase tracking-[0.18em] text-[#f9f6f0]/80 mb-1.5"
                  >
                    Address Line 2 (Optional)
                  </label>
                  <input
                    id="input-address2"
                    type="text"
                    name="address2"
                    autoComplete="address-line2"
                    value={formData.address2}
                    onChange={handleInputChange}
                    placeholder="Apartment, suite, unit, floor, etc."
                    className="w-full bg-[#141414] border border-[#c5a059]/25 px-3.5 py-3 text-xs sm:text-sm text-[#f9f6f0] placeholder-[#f9f6f0]/25 rounded-none focus:outline-none focus:border-[#c5a059] transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* City */}
                  <div>
                    <label
                      htmlFor="input-city"
                      className="block text-[11px] font-sans uppercase tracking-[0.18em] text-[#f9f6f0]/80 mb-1.5"
                    >
                      City *
                    </label>
                    <input
                      id="input-city"
                      type="text"
                      name="city"
                      autoComplete="address-level2"
                      value={formData.city}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      placeholder="e.g. New York"
                      className={`w-full bg-[#141414] border px-3.5 py-3 text-xs sm:text-sm text-[#f9f6f0] placeholder-[#f9f6f0]/25 rounded-none focus:outline-none transition-colors ${
                        errors.city && touched.city
                          ? 'border-rose-500/80 focus:border-rose-500'
                          : 'border-[#c5a059]/25 focus:border-[#c5a059]'
                      }`}
                    />
                    {errors.city && touched.city && (
                      <p className="mt-1 text-[11px] text-rose-400 font-sans" role="alert">
                        {errors.city}
                      </p>
                    )}
                  </div>

                  {/* State / County / Region */}
                  <div>
                    <label
                      htmlFor="input-region"
                      className="block text-[11px] font-sans uppercase tracking-[0.18em] text-[#f9f6f0]/80 mb-1.5"
                    >
                      State / Region (Optional)
                    </label>
                    <input
                      id="input-region"
                      type="text"
                      name="region"
                      autoComplete="address-level1"
                      value={formData.region}
                      onChange={handleInputChange}
                      placeholder="e.g. NY"
                      className="w-full bg-[#141414] border border-[#c5a059]/25 px-3.5 py-3 text-xs sm:text-sm text-[#f9f6f0] placeholder-[#f9f6f0]/25 rounded-none focus:outline-none focus:border-[#c5a059] transition-colors"
                    />
                  </div>

                  {/* Postal / ZIP Code */}
                  <div>
                    <label
                      htmlFor="input-postalCode"
                      className="block text-[11px] font-sans uppercase tracking-[0.18em] text-[#f9f6f0]/80 mb-1.5"
                    >
                      Postal / ZIP Code *
                    </label>
                    <input
                      id="input-postalCode"
                      type="text"
                      name="postalCode"
                      autoComplete="postal-code"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      placeholder="e.g. 10001"
                      className={`w-full bg-[#141414] border px-3.5 py-3 text-xs sm:text-sm text-[#f9f6f0] placeholder-[#f9f6f0]/25 rounded-none focus:outline-none transition-colors ${
                        errors.postalCode && touched.postalCode
                          ? 'border-rose-500/80 focus:border-rose-500'
                          : 'border-[#c5a059]/25 focus:border-[#c5a059]'
                      }`}
                    />
                    {errors.postalCode && touched.postalCode && (
                      <p className="mt-1 text-[11px] text-rose-400 font-sans" role="alert">
                        {errors.postalCode}
                      </p>
                    )}
                  </div>
                </div>

                {/* Order Notes */}
                <div>
                  <label
                    htmlFor="input-notes"
                    className="block text-[11px] font-sans uppercase tracking-[0.18em] text-[#f9f6f0]/80 mb-1.5"
                  >
                    Special Instructions / Bridal Notes (Optional)
                  </label>
                  <textarea
                    id="input-notes"
                    name="notes"
                    rows={3}
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Specific delivery date preferences, gift message, custom sizing requests..."
                    className="w-full bg-[#141414] border border-[#c5a059]/25 px-3.5 py-2.5 text-xs sm:text-sm text-[#f9f6f0] placeholder-[#f9f6f0]/25 rounded-none focus:outline-none focus:border-[#c5a059] transition-colors resize-y"
                  />
                </div>
              </div>

              {/* Section 3: Payment Method Presentation */}
              <div className="p-6 sm:p-7 bg-[#0d0d0d] border border-[#c5a059]/20 space-y-5">
                <div className="flex items-center justify-between border-b border-[#f9f6f0]/10 pb-4">
                  <h2 className="font-serif text-lg sm:text-xl text-[#f9f6f0] flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#c5a059] text-[#0a0a0a] text-[11px] font-sans font-bold flex items-center justify-center">
                      3
                    </span>
                    <span>Payment & Ordering Method</span>
                  </h2>
                  <div className="flex items-center gap-1 text-[10px] text-[#f9f6f0]/50 uppercase tracking-widest">
                    <Lock className="w-3 h-3 text-[#c5a059]" />
                    <span>Secure Protocol</span>
                  </div>
                </div>

                {/* Active Option: WhatsApp Direct Order */}
                <div
                  id="payment-option-whatsapp"
                  className="p-4 bg-[#141414] border-2 border-[#c5a059] relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full border-2 border-[#c5a059] bg-[#c5a059] flex items-center justify-center shrink-0 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-[#0a0a0a]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <MessageCircle className="w-4 h-4 text-[#c5a059]" />
                        <h3 className="text-xs sm:text-sm font-sans font-semibold text-[#f9f6f0] uppercase tracking-wider">
                          WhatsApp Order & Consultation
                        </h3>
                        <span className="bg-[#c5a059]/20 text-[#c5a059] text-[9px] px-2 py-0.5 uppercase tracking-wider font-semibold border border-[#c5a059]/40">
                          Active
                        </span>
                      </div>
                      <p className="text-[11px] text-[#f9f6f0]/70 mt-1 leading-relaxed font-light">
                        Connect directly with our boutique director via WhatsApp with your generated order reference to confirm piece availability, custom adjustments, and dispatch details.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Coming Soon Option: Direct Card & Digital Wallets */}
                <div
                  id="payment-option-online-coming-soon"
                  className="p-4 bg-[#111111] border border-[#f9f6f0]/10 opacity-75 relative"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full border border-[#f9f6f0]/20 flex items-center justify-center shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-transparent" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <CreditCard className="w-4 h-4 text-[#f9f6f0]/50" />
                          <span className="text-xs sm:text-sm font-sans text-[#f9f6f0]/80 uppercase tracking-wider">
                            Online Card & Digital Wallet Payment
                          </span>
                          <span className="bg-[#1e1e1e] text-[#f9f6f0]/50 text-[9px] px-2 py-0.5 uppercase tracking-wider font-semibold border border-[#f9f6f0]/10">
                            Coming Soon
                          </span>
                        </div>
                        <p className="text-[11px] text-[#f9f6f0]/40 mt-1 font-light">
                          Direct credit/debit card processing and express digital wallets will be enabled in an upcoming release.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-[10px] text-[#f9f6f0]/35 uppercase tracking-wider pl-8 sm:pl-0">
                      <span>Card</span>
                      <span>•</span>
                      <span>Apple Pay</span>
                      <span>•</span>
                      <span>Google Pay</span>
                      <span>•</span>
                      <span>PayPal</span>
                      <span>•</span>
                      <span>Klarna</span>
                    </div>
                  </div>
                </div>

                {/* Warning if WhatsApp number is unconfigured */}
                {!isWhatsAppConfigured && (
                  <div
                    id="whatsapp-unconfigured-notice"
                    className="p-4 bg-[#18120c] border border-[#c5a059]/40 text-[#dfc89e] text-xs flex items-start gap-3"
                  >
                    <AlertCircle className="w-5 h-5 text-[#c5a059] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">WhatsApp ordering is temporarily unavailable.</p>
                      <p className="text-[11px] text-[#dfc89e]/70 mt-0.5 font-light">
                        Our digital concierge service is currently undergoing routine maintenance. Please check back shortly or reach out via our official boutique channels.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Submit CTA */}
              <div className="space-y-3 pt-2">
                <button
                  type="submit"
                  id="place-order-whatsapp-btn"
                  disabled={isSubmitting || !isWhatsAppConfigured}
                  aria-label="Place Order via WhatsApp"
                  className={`w-full py-4 px-6 font-sans font-bold text-xs sm:text-sm tracking-[0.22em] uppercase flex items-center justify-center gap-3 transition-all shadow-xl ${
                    isWhatsAppConfigured && !isSubmitting
                      ? 'bg-[#c5a059] hover:bg-[#d4af37] text-[#0a0a0a] cursor-pointer shadow-[#c5a059]/15 hover:shadow-[#c5a059]/30'
                      : 'bg-[#1e1e1e] text-[#f9f6f0]/30 border border-[#f9f6f0]/10 cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Sparkles className="w-4 h-4 animate-spin text-[#0a0a0a]" />
                      <span>Generating Order Reference...</span>
                    </>
                  ) : (
                    <>
                      <MessageCircle className="w-4 h-4" />
                      <span>Place Order via WhatsApp</span>
                      <span className="text-[10px] bg-[#0a0a0a] text-[#c5a059] px-2 py-0.5 rounded-full font-semibold">
                        ${subtotal.toFixed(2)} USD
                      </span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-between text-[10px] text-[#f9f6f0]/45 pt-1 uppercase tracking-wider">
                  <Link
                    to="/"
                    className="hover:text-[#c5a059] transition-colors flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3 h-3" />
                    <span>Back to Boutique</span>
                  </Link>
                  <span>Encrypted 256-Bit SSL Checkout</span>
                </div>
              </div>
            </form>
          </div>

          {/* RIGHT COLUMN: Sticky Order Summary */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
            <div
              id="checkout-order-summary"
              className="p-6 sm:p-7 bg-[#0d0d0d] border border-[#c5a059]/25 shadow-2xl space-y-6"
            >
              <div className="flex items-center justify-between border-b border-[#f9f6f0]/10 pb-4">
                <h2 className="font-serif text-lg text-[#f9f6f0] flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-[#c5a059]" />
                  <span>Order Summary ({totalQuantity})</span>
                </h2>
                <span className="text-xs font-sans text-[#c5a059] font-medium">
                  ${subtotal.toFixed(2)} USD
                </span>
              </div>

              {/* Items List */}
              <div
                id="checkout-summary-items"
                className="max-h-72 overflow-y-auto space-y-4 pr-1 divide-y divide-[#f9f6f0]/5"
              >
                {items.map((item) => (
                  <div key={item.id} className="pt-3 first:pt-0 flex items-center gap-3 group">
                    <div className="relative w-14 h-16 shrink-0 bg-[#141414] border border-[#c5a059]/20 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <span className="absolute bottom-0 right-0 bg-[#c5a059] text-[#0a0a0a] text-[9px] font-sans font-bold px-1.5 py-0.2">
                        x{item.quantity}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-xs text-[#f9f6f0] truncate leading-tight">
                        {item.title}
                      </h4>
                      <p className="text-[10px] text-[#f9f6f0]/50 font-sans mt-0.5">
                        Qty: {item.quantity} × ${item.price.toFixed(2)} USD
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="font-sans text-xs font-medium text-[#f9f6f0]">
                        ${(item.price * item.quantity).toFixed(2)} USD
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cost Calculations */}
              <div className="border-t border-[#f9f6f0]/10 pt-4 space-y-2.5 text-xs font-sans">
                <div className="flex items-center justify-between text-[#f9f6f0]/70">
                  <span>Subtotal</span>
                  <span id="checkout-summary-subtotal" className="text-[#f9f6f0] font-medium">
                    ${subtotal.toFixed(2)} USD
                  </span>
                </div>

                <div className="flex items-center justify-between text-[#f9f6f0]/70">
                  <div className="flex items-center gap-1.5">
                    <span>Shipping</span>
                    <span className="bg-[#c5a059]/15 text-[#c5a059] text-[9px] px-1.5 py-0.2 uppercase font-medium">
                      Complimentary
                    </span>
                  </div>
                  <span id="checkout-summary-shipping" className="text-[#c5a059] font-medium">
                    $0.00 USD
                  </span>
                </div>

                <div className="border-t border-[#f9f6f0]/10 pt-3 flex items-baseline justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-[0.2em] text-[#f9f6f0] font-bold block">
                      Total
                    </span>
                    <span className="text-[10px] text-[#f9f6f0]/40 uppercase tracking-widest">
                      Taxes Included
                    </span>
                  </div>
                  <span
                    id="checkout-summary-final-total"
                    className="font-serif text-xl sm:text-2xl text-[#c5a059] font-normal"
                  >
                    ${subtotal.toFixed(2)} USD
                  </span>
                </div>
              </div>

              {/* Trust Strip in Summary */}
              <div className="border-t border-[#f9f6f0]/10 pt-4 space-y-2.5 text-[11px] text-[#f9f6f0]/70">
                <div className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                  <span>Insured discreet shipping with tamper-evident seal.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                  <span>Includes branded velvet chest & certificate of origin.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
