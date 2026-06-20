import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, CreditCard, RefreshCw, Smartphone, MapPin, Truck, ShieldCheck, Ticket, Download, BookOpen } from 'lucide-react';
import { Book, CartItem, OrderDetails, UserProfile, OrderHistoryItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onOrderSuccess: (order: OrderHistoryItem) => void;
  activeProfile?: UserProfile;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  cartItems,
  onOrderSuccess,
  activeProfile,
}: CheckoutModalProps) {
  const [formData, setFormData] = useState<OrderDetails>({
    name: '',
    phone: '',
    deliveryAddress: '',
    paymentMethod: 'cod',
    paymentNumber: '',
    trxId: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [placedOrder, setPlacedOrder] = useState<OrderHistoryItem | null>(null);

  // Auto-fill checkout fields if an active profile is loaded
  useEffect(() => {
    if (activeProfile && isOpen) {
      setFormData(prev => ({
        ...prev,
        name: prev.name || activeProfile.name || '',
        phone: prev.phone || activeProfile.phone || '',
        deliveryAddress: prev.deliveryAddress || activeProfile.deliveryAddress || '',
      }));
    }
  }, [activeProfile, isOpen]);

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.book.price * item.quantity, 0);
  const shippingFee = subtotal >= 1000 ? 0 : 60;
  const total = subtotal + shippingFee;

  // Form input validation
  const validateForm = (): boolean => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'আপনার নামটি লিখুন';
    
    const phonePattern = /^01[3-9]\d{8}$/;
    if (!formData.phone.trim()) {
      errs.phone = 'মোবাইল নাম্বারটি দিন';
    } else if (!phonePattern.test(formData.phone.trim())) {
      errs.phone = 'সঠিক ১১-ডিজিটের মোবাইল নাম্বার দিন (যেমন: 01712345678)';
    }

    if (!formData.deliveryAddress.trim() || formData.deliveryAddress.trim().length < 8) {
      errs.deliveryAddress = 'বিস্তারিত ডেলিভারি ঠিকানা যেমন জেলা, থানা, বাড়ি নম্বর ইত্যাদি উল্লেখ করুন';
    }

    if (formData.paymentMethod !== 'cod') {
      if (!formData.paymentNumber?.trim()) {
        errs.paymentNumber = 'যে নাম্বার থেকে টাকা পাঠিয়েছেন তা লিখুন';
      } else if (!formData.paymentNumber.trim().startsWith('01')) {
        errs.paymentNumber = '১১-ডিজিটের সচল নাম্বার দিন';
      }
      if (!formData.trxId?.trim()) {
        errs.trxId = 'পেমেন্ট ট্রানজেকশন আইডি (TrxID) দিন';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const selectPaymentMethod = (method: 'bkash' | 'nagad' | 'rocket' | 'cod') => {
    setFormData(prev => ({ ...prev, paymentMethod: method }));
    setErrors({});
  };

  // Form dispatch order submission simulation
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    // Simulating database request wait time
    setTimeout(() => {
      const generatedId = `BOI-${Math.floor(100000 + Math.random() * 900000)}-${new Date().getFullYear()}`;
      setOrderId(generatedId);
      setIsSubmitting(false);
      setIsSuccess(true);

      const newOrder: OrderHistoryItem = {
        orderId: generatedId,
        date: new Date().toLocaleDateString('bn-BD'),
        items: cartItems.map(item => ({
          bookId: item.book.id,
          title: item.book.title,
          author: item.book.author,
          price: item.book.price,
          quantity: item.quantity
        })),
        paymentMethod: formData.paymentMethod,
        totalAmount: total,
        shippingAddress: formData.deliveryAddress,
        phone: formData.phone,
        status: 'processing'
      };
      setPlacedOrder(newOrder);
    }, 1500);
  };

  const handleSuccessClose = () => {
    if (placedOrder) {
      onOrderSuccess(placedOrder); // triggers clearing cart and saving to order lists
    }
    onClose();
    setIsSuccess(false);
    setFormData({
      name: '',
      phone: '',
      deliveryAddress: '',
      paymentMethod: 'cod',
      paymentNumber: '',
      trxId: '',
    });
    setPlacedOrder(null);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
        
        {/* Backdrop transparent blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={isSuccess ? handleSuccessClose : onClose}
          className="fixed inset-0 bg-slate-950/65 backdrop-blur-xs cursor-pointer"
        />

        {/* Modal Window block */}
        <motion.div
          initial={{ scale: 0.95, y: 15, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: 15, opacity: 0 }}
          className="relative bg-white rounded-3xl overflow-hidden shadow-2xl w-full max-w-2xl z-10 border border-slate-105 flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="px-6 py-5 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-950 flex items-center gap-2">
              <ShieldCheck className="w-5.5 h-5.5 text-teal-650" />
              {isSuccess ? 'অর্ডার সফল হয়েছে' : 'শিপিং ও পেমেন্ট বিবরণী'}
            </h2>
            
            <button
              onClick={isSuccess ? handleSuccessClose : onClose}
              className="p-2 rounded-full hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 overflow-y-auto flex-1">
            
            {/* Condition: SUCCESS RECEIPT */}
            {isSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-4 space-y-6"
              >
                {/* Big Animated success validation mark */}
                <div className="flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shadow-md">
                    <Check className="w-9 h-9 stroke-[3px]" />
                  </div>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900">আলহামদুলিল্লাহ্! আপনার অর্ডারটি গৃহীত হয়েছে।</h3>
                  <p className="text-slate-500 text-xs sm:text-sm mt-1 mb-3">
                    অর্ডারটি নিশ্চিত করার জন্য আমাদের প্রতিনিধি শীঘ্রই আপনার মোবাইল নাম্বারে যোগাযোগ করবেন।
                  </p>
                  
                  {/* Tracking Badge */}
                  <div className="inline-flex items-center gap-1.5 bg-slate-100 border border-slate-200 rounded-full px-4 py-1.5 font-mono text-xs font-bold text-slate-800">
                    <Ticket className="w-4 h-4 text-teal-600" />
                    <span>অর্ডার আইডি:</span>
                    <span className="text-teal-700">{orderId}</span>
                  </div>
                </div>

                {/* Aesthetic Billing Invoice breakdown receipt */}
                <div className="text-left bg-slate-50 rounded-2xl border border-slate-200/60 p-5 space-y-4 max-w-md mx-auto">
                  <div className="border-b border-slate-200 pb-3 flex justify-between items-center text-xs">
                    <span className="font-extrabold text-slate-800">রিসিপ্ট বিবরণী</span>
                    <span className="text-slate-450 font-medium">তারিখ: {new Date().toLocaleDateString('bn-BD')}</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-450 font-medium">ক্রেতার নাম:</span>
                      <span className="text-slate-850 font-bold">{formData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-450 font-medium">মোবাইল নাম্বার:</span>
                      <span className="text-slate-850 font-bold">{formData.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-450 font-medium">শিপিং ঠিকানা:</span>
                      <span className="text-slate-850 font-bold text-right max-w-[200px] truncate" title={formData.deliveryAddress}>
                        {formData.deliveryAddress}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-440 font-medium">পেমেন্টের ধরণ:</span>
                      <span className="text-slate-850 font-bold uppercase">{
                        formData.paymentMethod === 'bkash' ? 'বিকাশ (bKash)' :
                        formData.paymentMethod === 'nagad' ? 'নগদ (Nagad)' :
                        formData.paymentMethod === 'rocket' ? 'রকেট (Rocket)' : 'ক্যাশ অন ডেলিভারি (COD)'
                      }</span>
                    </div>
                  </div>

                  <div className="border-t border-slate-200 pt-3 text-xs space-y-1.5">
                    <h5 className="font-extrabold text-slate-750 mb-2 select-none">অর্ডারক্লিত বই:</h5>
                    {cartItems.map(item => (
                      <div key={item.book.id} className="flex justify-between text-[11px] text-slate-650">
                        <span className="truncate max-w-[240px] font-bold">📖 {item.book.title} (x{item.quantity})</span>
                        <span className="font-semibold">৳{item.book.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-slate-200 pt-3 flex justify-between text-xs sm:text-sm text-slate-900 font-extrabold">
                    <span>সর্বমোট পরিশোধিত মূল্য:</span>
                    <span className="text-teal-750 font-black">৳{total}</span>
                  </div>
                </div>

                <div className="flex justify-center gap-3 pt-3">
                  <button
                    onClick={handleSuccessClose}
                    className="px-6 py-3 rounded-full bg-slate-950 text-white hover:bg-slate-900 text-xs sm:text-sm font-bold transition-all shadow-md cursor-pointer"
                  >
                    আবার কেনাকাটা করুন
                  </button>
                </div>

              </motion.div>
            ) : (
              
              /* Condition: ORDER CHECKOUT FORM ENTRY */
              <form onSubmit={handleFormSubmit} className="space-y-6">
                
                {/* Section A: Contact Details */}
                <div className="space-y-4">
                  <h3 className="text-sm font-extrabold text-slate-800 border-b border-slate-100 pb-1 flex items-center gap-1.5">
                    <Smartphone className="w-4 h-4 text-teal-650" />
                    যোগাযোগের তথ্য
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-700">আপনার পূর্ণ নাম *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="উদা: আরিয়ান রহমান"
                        className={`px-4 py-2.5 rounded-xl border text-xs sm:text-sm bg-slate-50 focus:bg-white focus:outline-none transition-all ${
                          errors.name ? 'border-red-500 focus:ring-1 focus:ring-red-200' : 'border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-50'
                        }`}
                      />
                      {errors.name && <span className="text-[10px] text-red-500 font-bold">{errors.name}</span>}
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-700">১১-ডিজিটের সচল মোবাইল নাম্বার *</label>
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="উদা: 017XXXXXXXX"
                        maxLength={11}
                        className={`px-4 py-2.5 rounded-xl border text-xs sm:text-sm bg-slate-50 focus:bg-white focus:outline-none transition-all ${
                          errors.phone ? 'border-red-500 focus:ring-1 focus:ring-red-200' : 'border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-50'
                        }`}
                      />
                      {errors.phone && <span className="text-[10px] text-red-500 font-bold">{errors.phone}</span>}
                    </div>
                  </div>
                </div>

                {/* Section B: Delivery Destination */}
                <div className="space-y-4">
                  <h3 className="text-sm font-extrabold text-slate-800 border-b border-slate-100 pb-1 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-teal-650" />
                    ডেলিভারি ঠিকানা
                  </h3>
                  
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-700">বিস্তারিত ঠিকানা (বাড়ি নম্বর, সড়ক, এলাকা বা থানা ও জেলা) *</label>
                    <textarea
                      name="deliveryAddress"
                      value={formData.deliveryAddress}
                      onChange={handleInputChange}
                      placeholder="অর্ডার নিশ্চিত করার পর ৩-৫ কর্মদিবসে সুন্দরবন বা রেডেক্স কুরিয়ারের মাধ্যমে বই পাঠিয়ে দেওয়া হবে।"
                      rows={2.5}
                      className={`px-4 py-3 rounded-xl border text-xs sm:text-sm bg-slate-50 focus:bg-white focus:outline-none transition-all resize-none ${
                        errors.deliveryAddress ? 'border-red-500 focus:ring-1 focus:ring-red-200' : 'border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-50'
                      }`}
                    />
                    {errors.deliveryAddress && <span className="text-[10px] text-red-500 font-bold">{errors.deliveryAddress}</span>}
                  </div>
                </div>

                {/* Section C: Payment Mechanisms Toggles */}
                <div className="space-y-4">
                  <h3 className="text-sm font-extrabold text-slate-800 border-b border-slate-100 pb-1 flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4 text-teal-650" />
                    পেমেন্ট পদ্ধতি নির্বাচন করুন
                  </h3>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    <button
                      type="button"
                      onClick={() => selectPaymentMethod('cod')}
                      className={`py-3.5 px-3 rounded-2xl border flex flex-col items-center justify-center gap-1.5 transition-all text-center cursor-pointer ${
                        formData.paymentMethod === 'cod'
                          ? 'border-slate-900 bg-slate-950 text-white shadow-md'
                          : 'border-slate-200 bg-white text-slate-750 hover:bg-slate-50'
                      }`}
                    >
                      <Truck className={`w-5 h-5 ${formData.paymentMethod === 'cod' ? 'text-teal-400' : 'text-slate-450'}`} />
                      <span className="text-xs font-bold font-sans">ক্যাশ অন ডেলিভারি</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => selectPaymentMethod('bkash')}
                      className={`py-3.5 px-3 rounded-2xl border flex flex-col items-center justify-center gap-1.5 transition-all text-center cursor-pointer ${
                        formData.paymentMethod === 'bkash'
                          ? 'border-pink-600 bg-pink-600 text-white shadow-md'
                          : 'border-slate-200 bg-white text-slate-750 hover:bg-slate-50'
                      }`}
                    >
                      <span className={`text-[10px] uppercase font-mono font-black ${formData.paymentMethod === 'bkash' ? 'text-white' : 'text-pink-600'}`}>bKash</span>
                      <span className="text-xs font-bold leading-tight">বিকাশ পেমেন্ট</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => selectPaymentMethod('nagad')}
                      className={`py-3.5 px-3 rounded-2xl border flex flex-col items-center justify-center gap-1.5 transition-all text-center cursor-pointer ${
                        formData.paymentMethod === 'nagad'
                          ? 'border-orange-500 bg-orange-500 text-white shadow-md'
                          : 'border-slate-200 bg-white text-slate-750 hover:bg-slate-50'
                      }`}
                    >
                      <span className={`text-[10px] uppercase font-mono font-black ${formData.paymentMethod === 'nagad' ? 'text-white' : 'text-orange-500'}`}>Nagad</span>
                      <span className="text-xs font-bold leading-tight">নগদ পেমেন্ট</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => selectPaymentMethod('rocket')}
                      className={`py-3.5 px-3 rounded-2xl border flex flex-col items-center justify-center gap-1.5 transition-all text-center cursor-pointer ${
                        formData.paymentMethod === 'rocket'
                          ? 'border-indigo-600 bg-indigo-600 text-white shadow-md'
                          : 'border-slate-200 bg-white text-slate-750 hover:bg-slate-50'
                      }`}
                    >
                      <span className={`text-[10px] uppercase font-mono font-black ${formData.paymentMethod === 'rocket' ? 'text-white' : 'text-indigo-600'}`}>Rocket</span>
                      <span className="text-xs font-bold leading-tight">রকেট পেমেন্ট</span>
                    </button>
                  </div>

                  {/* Payment instruction alerts conditional rendering */}
                  {formData.paymentMethod !== 'cod' && (
                    <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200/80 text-xs text-slate-700 space-y-4">
                      <div className="space-y-1.5">
                        <span className="font-extrabold text-slate-900 flex items-center gap-1">
                          📋 পেমেন্ট ধাপসমূহ:
                        </span>
                        <ol className="list-decimal pl-4.5 space-y-1 text-slate-650">
                          <li>আমাদের পার্সোনাল মোবাইল পেমেন্ট নাম্বারে <strong>০১৭৯৯৯৮৮৮৭৭</strong> সেন্ড মানি (Send Money) করুন।</li>
                          <li>মোট বিলের পরিমাণ <strong>৳{total}</strong> টাকা পরিশোধ করুন।</li>
                          <li>পরিশোধ শেষ হওয়ার পর নিচে আপনার প্রেরক নাম্বার ও ট্রানজেকশন তথ্য দিন।</li>
                        </ol>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                        {/* Sender Number */}
                        <div className="flex flex-col gap-1">
                          <label className="font-bold text-slate-700">বিকাশ/নগদ/রকেট নাম্বার *</label>
                          <input
                            type="text"
                            name="paymentNumber"
                            value={formData.paymentNumber}
                            onChange={handleInputChange}
                            placeholder="উদা: 018XXXXXXXX"
                            className="px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500 text-xs sm:text-sm bg-white"
                          />
                          {errors.paymentNumber && <span className="text-[9px] text-red-500 font-bold">{errors.paymentNumber}</span>}
                        </div>

                        {/* Transaction ID */}
                        <div className="flex flex-col gap-1">
                          <label className="font-bold text-slate-700">ট্রানজেকশন আইডি (TrxID) *</label>
                          <input
                            type="text"
                            name="trxId"
                            value={formData.trxId}
                            onChange={handleInputChange}
                            placeholder="উদা: 8K9O0L89HJ"
                            className="px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500 text-xs sm:text-sm bg-white"
                          />
                          {errors.trxId && <span className="text-[9px] text-red-500 font-bold">{errors.trxId}</span>}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Billing Summary Box */}
                <div className="bg-slate-50 rounded-2xl p-4.5 border border-slate-100 flex items-center justify-between text-xs sm:text-sm">
                  <div className="text-slate-550 font-medium">
                    মোট বইয়ের সংখ্যা: <strong className="text-slate-800">{cartItems.reduce((acc, c) => acc + c.quantity, 0)} টি</strong>
                    <span className="block text-[11px] text-slate-400">ডেলিভারি চার্জ: {shippingFee === 0 ? 'ফ্রি' : `৳${shippingFee}`}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-550 block text-[11px] font-semibold">মোট প্রদেয় বিল:</span>
                    <strong className="text-base sm:text-lg font-black text-teal-800">৳{total}</strong>
                  </div>
                </div>

                {/* Submitting Actions footer bar */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3.5 rounded-2xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 shadow-md cursor-pointer active:scale-95 transition-all text-white ${
                    isSubmitting
                      ? 'bg-slate-350 cursor-not-allowed shadow-none'
                      : 'bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 shadow-teal-50'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      অর্ডার প্রসেস হচ্ছে... অনুগ্রহ করে অপেক্ষা করুন
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      কনফার্ম অর্ডার (৳{total})
                    </>
                  )}
                </button>

              </form>
            )}

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
