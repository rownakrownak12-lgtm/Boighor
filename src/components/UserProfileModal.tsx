import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, Mail, Phone, MapPin, ClipboardList, CheckCircle2, Clock, Truck, ShieldCheck, Save, LogOut, Key, Smile } from 'lucide-react';
import { UserProfile, OrderHistoryItem } from '../types';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  orders: OrderHistoryItem[];
  onSaveProfile: (profile: UserProfile) => void;
  onLogout: () => void;
  onLoginAsMockUser: (profile: UserProfile) => void;
}

const MOCK_PROFILES: UserProfile[] = [
  {
    name: 'আব্দুর রহমান',
    email: 'rahman.ab@gmail.com',
    phone: '01712345678',
    deliveryAddress: 'হাউজ ২৪, রোড ১২, ধানমণ্ডি, ঢাকা-১২০৯',
    avatarSeed: 'rahman',
  },
  {
    name: 'ফাতেমা ইয়াসমিন',
    email: 'fatema.y@hotmail.com',
    phone: '01987654321',
    deliveryAddress: 'সেক্টর ৪, রোড ৭, উত্তরা, ঢাকা-১২৩০',
    avatarSeed: 'fatema',
  },
];

export default function UserProfileModal({
  isOpen,
  onClose,
  profile,
  orders,
  onSaveProfile,
  onLogout,
  onLoginAsMockUser,
}: UserProfileModalProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders'>('profile');
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone);
  const [deliveryAddress, setDeliveryAddress] = useState(profile.deliveryAddress);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Sync state if profile changes
  React.useEffect(() => {
    setName(profile.name);
    setEmail(profile.email);
    setPhone(profile.phone);
    setDeliveryAddress(profile.deliveryAddress);
  }, [profile]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile({
      ...profile,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      deliveryAddress: deliveryAddress.trim(),
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const statusMap = {
    processing: { label: 'প্রক্রিয়াজাত করা হচ্ছে', color: 'bg-amber-105 text-amber-900 border-amber-200 icon:Clock', icon: Clock },
    shipped: { label: 'পোস্ট অফিসে পাঠানো হয়েছে', color: 'bg-blue-50 text-blue-800 border-blue-200 icon:Truck', icon: Truck },
    delivered: { label: 'ডেলিভারি সম্পন্ন', color: 'bg-emerald-50 text-emerald-800 border-emerald-200 icon:CheckCircle2', icon: CheckCircle2 },
  };

  const getInitials = (userName: string) => {
    return userName ? userName.substring(0, 2) : 'ইউ';
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-4">
        {/* Underlay mask */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs cursor-pointer"
        />

        {/* Content sheet */}
        <motion.div
          initial={{ scale: 0.96, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.96, y: 20, opacity: 0 }}
          className="relative bg-white rounded-3xl overflow-hidden shadow-2xl w-full max-w-2xl z-10 border border-slate-100 flex flex-col max-h-[90vh]"
        >
          {/* Header section with Close button */}
          <div className="bg-slate-50 border-b border-slate-100 p-5 sm:p-6 pb-0 flex flex-col relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-800 transition-colors cursor-pointer z-10"
              title="বন্ধ করুন"
            >
              <X className="w-4.5 h-4.5" />
            </button>

            {/* Profile Avatar details row */}
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-teal-500 to-emerald-600 flex items-center justify-center font-black text-white text-lg shadow-md uppercase select-none">
                {getInitials(profile.name)}
              </div>
              <div>
                <span className="text-[10px] bg-teal-100 text-teal-800 font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                  সদস্য অ্যাকাউন্ট
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-0.5">{profile.name || 'নতুন ক্রেতা'}</h3>
                <p className="text-xs text-slate-455 font-medium">{profile.email || 'ইমেইল সেট করা নেই'}</p>
              </div>
            </div>

            {/* Tabs control */}
            <div className="flex gap-2 text-xs">
              <button
                onClick={() => setActiveTab('profile')}
                className={`pb-3 font-extrabold px-3 relative cursor-pointer ${
                  activeTab === 'profile' ? 'text-teal-700' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                প্রোফাইল তথ্য
                {activeTab === 'profile' && (
                  <motion.div layoutId="profileTabLine" className="absolute bottom-0 left-0 right-0 h-1 bg-teal-600 rounded-full" />
                )}
              </button>

              <button
                onClick={() => setActiveTab('orders')}
                className={`pb-3 font-extrabold px-3 relative cursor-pointer flex items-center gap-1 ${
                  activeTab === 'orders' ? 'text-teal-700' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                অর্ডার ইতিহাস
                <span className="bg-slate-200 text-slate-700 text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                  {orders.length}
                </span>
                {activeTab === 'orders' && (
                  <motion.div layoutId="profileTabLine" className="absolute bottom-0 left-0 right-0 h-1 bg-teal-600 rounded-full" />
                )}
              </button>
            </div>
          </div>

          {/* Body contents */}
          <div className="overflow-y-auto p-5 sm:p-6 flex-1 min-h-[300px]">
            {activeTab === 'profile' ? (
              <div className="space-y-6">
                {/* Save message notification popup prompt */}
                {saveSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-emerald-50 border border-emerald-250 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2"
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    আপনার প্রোফাইল তথ্য সফলভাবে সেভ ও হালনাগাদ করা হয়েছে!
                  </motion.div>
                )}

                {/* Profiler form inputs */}
                <form id="profile-edit-form" onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* First name */}
                    <div className="space-y-1.5">
                      <label htmlFor="user-profile-name" className="text-xs font-bold text-slate-600 flex items-center gap-1 select-none">
                        <User className="w-3.5 h-3.5 text-teal-600" /> নাম
                      </label>
                      <input
                        id="user-profile-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="আপনার পুরো নাম লিখুন"
                        required
                        className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 focus:border-teal-500 rounded-xl px-3.5 py-2.5 outline-none focus:bg-white transition-all font-medium"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label htmlFor="user-profile-email" className="text-xs font-bold text-slate-600 flex items-center gap-1 select-none">
                        <Mail className="w-3.5 h-3.5 text-teal-600" /> ইমেল ঠিকানা
                      </label>
                      <input
                        id="user-profile-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="উদা: correct@example.com"
                        required
                        className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 focus:border-teal-500 rounded-xl px-3.5 py-2.5 outline-none focus:bg-white transition-all font-medium"
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-1.5">
                      <label htmlFor="user-profile-phone" className="text-xs font-bold text-slate-600 flex items-center gap-1 select-none">
                        <Phone className="w-3.5 h-3.5 text-teal-600" /> মোবাইল নম্বর
                      </label>
                      <input
                        id="user-profile-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="ডেলিভারির যোগাযোগের নম্বর"
                        required
                        className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 focus:border-teal-500 rounded-xl px-3.5 py-2.5 outline-none focus:bg-white transition-all font-medium"
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div className="space-y-1.5">
                    <label htmlFor="user-profile-address" className="text-xs font-bold text-slate-600 flex items-center gap-1 select-none">
                      <MapPin className="w-3.5 h-3.5 text-teal-600" /> ডেলিভারি ঠিকানা
                    </label>
                    <textarea
                      id="user-profile-address"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder="বাড়ি নং, ফ্ল্যাট নং, থানা ও শহর উল্লেখ পূর্বক বিস্তারিত ঠিকানা..."
                      rows={3}
                      required
                      className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 focus:border-teal-500 rounded-xl px-3.5 py-2.5 outline-none focus:bg-white transition-all font-medium resize-none shadow-xs"
                    />
                  </div>

                  {/* Save trigger buttons */}
                  <button
                    type="submit"
                    className="w-full py-3 bg-slate-900 border border-slate-950 text-teal-400 hover:text-white hover:bg-slate-800 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    প্রোফাইল সংরক্ষণ করুন
                  </button>
                </form>

                {/* Switching profiles logic block */}
                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <div>
                    <h4 className="text-xs font-black text-slate-850">সহজে পরীক্ষা করুন (সহজ সাইন ইন)</h4>
                    <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">
                      অর্ডার সিস্টেম পরীক্ষা করার জন্য নিচে যেকোনো একটি সচল টেস্ট ইউজার অ্যাকাউন্টে স্যুইচ করতে পারেন:
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    {MOCK_PROFILES.map((p) => (
                      <button
                        key={p.avatarSeed}
                        onClick={() => onLoginAsMockUser(p)}
                        type="button"
                        className="flex-1 p-3 bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-300 rounded-xl transition-all flex items-center gap-3 cursor-pointer text-left font-sans"
                      >
                        <div className="w-8 h-8 rounded-lg bg-teal-600 text-white font-extrabold text-[12px] flex items-center justify-center shrink-0">
                          {getInitials(p.name)}
                        </div>
                        <div className="truncate">
                          <p className="text-xs font-extrabold text-slate-800 truncate select-none">{p.name}</p>
                          <p className="text-[10px] text-slate-450 truncate">{p.phone}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Logout trigger button */}
                <div className="bg-rose-50 border border-rose-100 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <h5 className="font-extrabold text-rose-950">অ্যাকাউন্ট সাইন আউট</h5>
                    <p className="text-[10px] text-rose-455 font-semibold">আপনার সেশন শেষ করতে চান?</p>
                  </div>
                  <button
                    onClick={() => {
                      onLogout();
                      onClose();
                    }}
                    type="button"
                    className="bg-white hover:bg-rose-100 border border-rose-200 text-rose-800 font-extrabold px-4 py-2 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    লগআউট করুন
                  </button>
                </div>
              </div>
            ) : (
              /* Order History Tab content view */
              <div className="space-y-4">
                {orders.length === 0 ? (
                  <div className="flex flex-col items-center justify-center text-center py-12 px-4 space-y-3 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                    <ClipboardList className="w-12 h-12 text-slate-300" />
                    <div>
                      <h4 className="text-sm font-extrabold text-slate-800">এখনও কোনো অর্ডার করেননি!</h4>
                      <p className="text-xs text-slate-450 font-semibold mt-1">
                        আমাদের চমৎকার বইয়ের ক্যাটালগ ঘুরে পছন্দমতো বই কার্টে যুক্ত করুন এবং অর্ডার সম্পন্ন করুন।
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
                    {orders.slice().reverse().map((od) => (
                      <div key={od.orderId} className="bg-white rounded-2xl border border-slate-150 overflow-hidden shadow-xs">
                        
                        {/* Order ID banner header */}
                        <div className="bg-slate-50 border-b border-slate-100 px-4 py-3 flex flex-wrap items-center justify-between gap-2.5">
                          <div>
                            <span className="text-[10px] text-slate-400 font-bold uppercase block">অর্ডার আইডি</span>
                            <span className="text-xs font-mono font-black text-slate-800">{od.orderId}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 font-bold block text-right">অর্ডারের তারিখ</span>
                            <span className="text-xs font-bold text-slate-800">{od.date}</span>
                          </div>
                          
                          {/* Status Badge */}
                          {(() => {
                            const st = statusMap[od.status] || { label: 'প্রক্রিয়াজাত', color: 'bg-slate-50 text-slate-700', icon: Clock };
                            const IconCpt = st.icon;
                            return (
                              <span className={`text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full border flex items-center gap-1 ${st.color}`}>
                                <IconCpt className="w-3.5 h-3.5" />
                                {st.label}
                              </span>
                            );
                          })()}
                        </div>

                        {/* Order breakdown payload items */}
                        <div className="p-4 space-y-2.5 border-b border-slate-100">
                          {od.items.map((it, idx) => (
                            <div key={idx} className="flex justify-between items-center text-xs">
                              <div>
                                <span className="font-extrabold text-slate-800">{it.title}</span>
                                <span className="text-slate-405 block">লেখক: {it.author}</span>
                              </div>
                              <span className="font-bold text-slate-500 whitespace-nowrap ml-3 text-right">
                                ৳{it.price} × {it.quantity}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Delivery, Address, Payment breakdown */}
                        <div className="p-4 bg-slate-50/50 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs border-b border-slate-100 text-slate-600 font-semibold">
                          <div className="space-y-0.5">
                            <p className="text-[10px] text-slate-400 font-black">পাঠানোর ঠিকানা:</p>
                            <p className="text-slate-800 leading-relaxed text-[11px]">{od.shippingAddress}</p>
                          </div>
                          <div className="space-y-0.5">
                            <p className="text-[10px] text-slate-400 font-black">পেমেন্ট পদ্ধতি:</p>
                            <p className="text-slate-800 uppercase text-[11px]">
                              {od.paymentMethod === 'cod' ? 'Cash on Delivery (ক্যাশ অন ডেলিভারি)' : od.paymentMethod}
                            </p>
                            <p className="text-slate-500 text-[10px]">মোবাইল: {od.phone}</p>
                          </div>
                        </div>

                        {/* Order Slip total price */}
                        <div className="px-4 py-3 flex justify-between items-center bg-slate-50 text-slate-800">
                          <span className="text-xs font-bold">ডেলিভারি ফিসহ পরিশোধিত সর্বমোট:</span>
                          <span className="text-base font-black text-teal-850">৳{od.totalAmount}</span>
                        </div>

                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
