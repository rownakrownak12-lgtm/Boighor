import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingCart, Trash2, Plus, Minus, ArrowRight, Truck, Gift } from 'lucide-react';
import { CartItem } from '../types';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (bookId: string, quantity: number) => void;
  onRemoveItem: (bookId: string) => void;
  onCheckout: () => void;
}

export default function CartSidebar({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}: CartSidebarProps) {
  
  // Sum of items price in the cart
  const subtotal = cartItems.reduce((acc, item) => acc + item.book.price * item.quantity, 0);
  
  // Free shipping threshold
  const FREE_SHIPPING_THRESHOLD = 1000;
  const shippingFee = subtotal === 0 ? 0 : subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 60;
  
  const total = subtotal + shippingFee;

  // Percentage calculations for progress indicator representation
  const progressPercent = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const leftToFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          
          {/* Transparent Backdrop toggle closure */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/50 backdrop-blur-xs cursor-pointer"
          />

          {/* Sidebar Drawer container sliding from right */}
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="w-screen max-w-md bg-white shadow-2xl flex flex-col"
            >
              
              {/* Sidebar Header details */}
              <div className="px-5 py-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-teal-100 text-teal-800 rounded-xl">
                    <ShoppingCart className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-extrabold text-slate-950">আপনার শপিং ব্যাগ</h2>
                    <p className="text-xs text-slate-500 font-semibold">{cartItems.length} টি বই যোগ করা হয়েছে</p>
                  </div>
                </div>
                
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free delivery gamification badge container */}
              {subtotal > 0 && (
                <div className="bg-emerald-50 border-b border-emerald-100 px-5 py-4.5 space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <div className="flex items-center gap-1.5 text-emerald-800">
                      <Truck className="w-4.5 h-4.5 text-emerald-600 animate-bounce" />
                      {shippingFee === 0 ? (
                        <span>অভিনন্দন! আপনি <strong>ফ্রি হোম ডেলিভারি</strong> পাচ্ছেন!</span>
                      ) : (
                        <span>আর মাত্র <strong>৳{leftToFreeShipping}</strong> এর বই কিনলেই ফ্রি ডেলিভারি!</span>
                      )}
                    </div>
                    <span className="text-emerald-700 font-bold">{Math.round(progressPercent)}%</span>
                  </div>
                  
                  {/* Visual sliding scale progress bar */}
                  <div className="w-full bg-emerald-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Cart contents listing area */}
              <div className="flex-1 overflow-y-auto divide-y divide-slate-100 px-5">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                    <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center text-slate-350">
                      <ShoppingCart className="w-10 h-10" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">আপনার কার্টটি ফাঁকা রয়েছে</h3>
                      <p className="text-xs text-slate-400 mt-1 max-w-xs">
                        পছন্দের বইগুলো খুঁজে বের করুন এবং কার্টে যুক্ত করতে বুক ক্যাডালগ ঘুরে দেখুন।
                      </p>
                    </div>
                    <button
                      onClick={onClose}
                      className="px-5 py-2 text-xs font-extrabold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-150 rounded-xl transition-all cursor-pointer"
                    >
                      বই ক্যাটাগরি ও অফার দেখুন
                    </button>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div key={item.book.id} className="py-4.5 flex gap-4 items-center group">
                      
                      {/* Little thumbnail book Spine preview */}
                      <div className="w-14 aspect-[2/3] rounded-sm bg-slate-950 flex flex-col justify-between p-1.5 text-slate-900 select-none shadow-md shrink-0 bg-gradient-to-br from-amber-400 to-amber-600 font-bold relative overflow-hidden border-r-2 border-black/10">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-black/15 shadow-inner" />
                        <span className="text-[7px] text-amber-950 leading-tight text-center truncate w-full block font-black">
                          {item.book.title}
                        </span>
                        <span className="text-[5px] text-white/50 text-center block">বইঘর</span>
                      </div>

                      {/* Main text details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs sm:text-sm font-bold text-slate-950 truncate" title={item.book.title}>
                          {item.book.title}
                        </h4>
                        <p className="text-xs text-slate-500 truncate">{item.book.author}</p>
                        
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm font-extrabold text-slate-900">
                            ৳{item.book.price * item.quantity}
                          </span>
                          
                          {/* Book counter increments controls */}
                          <div className="flex items-center gap-2 bg-slate-100 rounded-lg p-1 border border-slate-205/60 shrink-0">
                            <button
                              onClick={() => {
                                if (item.quantity > 1) {
                                  onUpdateQuantity(item.book.id, item.quantity - 1);
                                } else {
                                  onRemoveItem(item.book.id);
                                }
                              }}
                              className="p-1 rounded-md bg-white hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-extrabold text-slate-800 px-1">{item.quantity}</span>
                            <button
                              onClick={() => {
                                if (item.quantity < item.book.stock) {
                                  onUpdateQuantity(item.book.id, item.quantity + 1);
                                }
                              }}
                              className="p-1 rounded-md bg-white hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Trash Delete button */}
                      <button
                        onClick={() => onRemoveItem(item.book.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                        title="কার্ট থেকে বাদ দিন"
                      >
                        <Trash2 className="w-4.5 h-4.5" />
                      </button>

                    </div>
                  ))
                )}
              </div>

              {/* Receipt Footer and Checkout Controls */}
              {cartItems.length > 0 && (
                <div className="border-t border-slate-100 bg-slate-50 px-5 py-6 space-y-4">
                  <div className="text-xs space-y-2 text-slate-600 font-semibold">
                    <div className="flex justify-between">
                      <span>সাব-টোটাল (বইয়ের মূল্য):</span>
                      <span className="text-slate-900 font-bold">৳{subtotal}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-1">
                        ডেলিভারি চার্জ:
                        {shippingFee === 0 && (
                          <span className="text-[9px] uppercase px-1.5 py-0.2 bg-emerald-150 text-emerald-800 font-bold rounded-md">ফ্রি</span>
                        )}
                      </span>
                      <span className="text-slate-900 font-bold">
                        {shippingFee === 0 ? '৳০' : `৳${shippingFee}`}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-slate-200 flex justify-between text-sm text-slate-900 font-black">
                      <span>সর্বমোট মূল্য:</span>
                      <span className="text-base text-teal-800 font-black">৳{total}</span>
                    </div>
                  </div>

                  {/* Checkout trigger button */}
                  <button
                    onClick={onCheckout}
                    className="w-full py-3.5 rounded-2xl bg-slate-950 hover:bg-slate-900 text-teal-400 hover:text-white font-extrabold text-sm transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer shadow-lg active:scale-95"
                  >
                    অর্ডার সম্পন্ন করুন
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                  </button>

                  <p className="text-center text-[10px] text-slate-400 font-semibold">
                    * bKash, Rocket, Nagad এবং Cash on Delivery (ক্যাশ অন ডেলিভারি) সমর্থন করে।
                  </p>
                </div>
              )}

            </motion.div>
          </div>

        </div>
      )}
    </AnimatePresence>
  );
}
