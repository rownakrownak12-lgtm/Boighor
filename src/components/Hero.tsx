import React, { useState, useEffect } from 'react';
import { Sparkles, ShoppingBag, Flame, Clock, Gift } from 'lucide-react';
import { Book } from '../types';

interface HeroProps {
  bestseller: Book;
  onAddToCart: (book: Book) => void;
  onViewDetails: (book: Book) => void;
}

export default function Hero({ bestseller, onAddToCart, onViewDetails }: HeroProps) {
  // Deal of the Day dynamic timer simulation
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 45,
    seconds: 32,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 24, minutes: 0, seconds: 0 }; // Loop simulation
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="relative overflow-hidden bg-radial from-slate-900 via-slate-950 to-slate-950 text-white py-12 px-4 sm:px-6 lg:px-8 sm:py-16 md:py-20 rounded-3xl mb-12 shadow-2xl shadow-slate-900/40">
      
      {/* Visual background sparkles & blobs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      <div className="absolute -top-12 -left-12 w-48 h-48 bg-purple-500/5 rounded-full blur-2xl" />

      <div className="relative max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 md:gap-14">
        
        {/* Banner Left Details */}
        <div className="flex-1 space-y-5 sm:space-y-6 text-center lg:text-left">
          
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500/20 to-emerald-500/25 border border-teal-500/30 px-3.5 py-1.5 rounded-full text-teal-300 text-xs sm:text-sm font-medium animate-pulse">
            <Flame className="w-4 h-4 text-amber-400" />
            <span>আজকের ধামাকা অফার: ২৫% পর্যন্ত ছাড়!</span>
          </div>

          <h1 className="text-3.5xl sm:text-5xl font-black leading-tight tracking-tight bg-gradient-to-r from-white via-slate-100 to-teal-300 bg-clip-text text-transparent">
            বইয়ের পাতায় হোক স্বপ্নের পথচলা <br />
            <span className="text-teal-400">আপনার পছন্দের বইঘর</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed">
            বাঙালি সাহিত্যের কালজয়ী সেরা উপন্যাস, বৈজ্ঞানিক কল্পকাহিনী, আত্মউন্নয়নমূলক বই এবং অনুবাদ সাহিত্যের এক বিশাল সমাহার। ঘরে বসেই অর্ডার করুন অবিশ্বাস্য মূল্যে।
          </p>

          {/* Countdown & Flash Deal Metadata */}
          <div className="flex justify-center lg:justify-start items-center gap-4 py-1.5">
            <div className="flex items-center gap-2 text-slate-400 text-xs sm:text-sm">
              <Clock className="w-4.5 h-4.5 text-teal-400 shrink-0" />
              <span>সীমিত অফার শেষ হবে:</span>
            </div>
            
            <div className="flex items-center gap-1.5 font-mono text-xs sm:text-sm font-bold">
              <span className="bg-slate-800/80 px-2.5 py-1 rounded-md text-teal-400 border border-slate-700/50">
                {formatTime(timeLeft.hours)}
              </span>
              <span className="text-slate-500">:</span>
              <span className="bg-slate-800/80 px-2.5 py-1 rounded-md text-teal-400 border border-slate-700/50">
                {formatTime(timeLeft.minutes)}
              </span>
              <span className="text-slate-500">:</span>
              <span className="bg-slate-800/80 px-2.5 py-1 rounded-md text-amber-400 border border-slate-700/50">
                {formatTime(timeLeft.seconds)}
              </span>
            </div>
          </div>

          {/* Promo CTAs */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
            <button
              onClick={() => {
                const element = document.getElementById('book-grid-section');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-teal-400 to-emerald-500 hover:from-teal-500 hover:to-emerald-600 text-slate-950 font-bold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/20 active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <ShoppingBag className="w-4.5 h-4.5" />
              বইগুলো দেখুন
            </button>
            <div className="flex items-center gap-1.5 px-4 py-3 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs sm:text-sm font-medium">
              <Gift className="w-4 h-4 text-emerald-400" />
              <span>১০০০৳ অর্ডারে ডেলিভারি ফ্রি!</span>
            </div>
          </div>

        </div>

        {/* Feature Spotlight Book Graphic - interactive representation */}
        <div className="flex-1 flex flex-col items-center justify-center relative w-full max-w-sm lg:max-w-md">
          
          {/* Card Frame containing Bestseller spotlight */}
          <div className="relative bg-slate-900/60 border border-slate-800 p-6 sm:p-8 rounded-2xl w-full backdrop-blur-sm shadow-xl flex flex-col sm:flex-row gap-6 items-center">
            
            <div className="absolute -top-3 -right-3 bg-red-500 text-white font-bold text-xs px-3 py-1 rounded-full shadow-lg flex items-center gap-1 rotate-6">
              <Gift className="w-3.5 h-3.5" />
              বেস্ট সেলার
            </div>

            {/* Simulated 3D Book Graphic */}
            <div 
              onClick={() => onViewDetails(bestseller)}
              className="relative w-28 sm:w-36 aspect-[2/3] group cursor-pointer transition-transform duration-500 hover:scale-105"
            >
              {/* Cover Shadows & Spine Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-600 rounded-r-lg shadow-2xl overflow-hidden flex flex-col justify-between p-3.5 text-slate-950 border-r-4 border-amber-500">
                
                {/* Spine shadow spacer */}
                <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-black/15 shadow-inner" />

                <div className="relative text-center self-center pt-3 flex flex-col items-center">
                  <span className="text-[10px] tracking-widest uppercase font-semibold text-amber-950 opacity-60">হুমায়ূন আহমেদ</span>
                  <span className="text-sm sm:text-base font-bold text-slate-950 leading-tight mt-1 px-1 line-clamp-2">
                    {bestseller.title}
                  </span>
                </div>

                <div className="relative border-t border-amber-950/20 pt-1 flex flex-col items-center gap-1">
                  <Sparkles className="w-4 h-4 text-amber-950/80" />
                  <span className="text-[8px] tracking-wider uppercase font-semibold text-amber-950/80">বইঘর এডিশন</span>
                </div>
              </div>

              {/* Backside spine element */}
              <div className="absolute left-0 top-0 bottom-0 w-3 bg-amber-700/40 rounded-l-md transform -skew-y-6 origin-right" />
            </div>

            {/* Spotlight Book quick info */}
            <div className="flex-1 text-center sm:text-left space-y-3">
              <div>
                <span className="text-xs bg-amber-400/10 text-amber-400 font-bold px-2.5 py-0.5 rounded-full border border-amber-400/30">
                  সুপার হিট
                </span>
                <h3 className="text-lg font-bold text-white mt-1.5 leading-tight">{bestseller.title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{bestseller.author}</p>
              </div>

              <div className="flex items-center justify-center sm:justify-start gap-1">
                <span className="text-sm font-semibold text-slate-300 line-through">৳{bestseller.originalPrice}</span>
                <span className="text-xl font-bold text-teal-400 ml-1.5">৳{bestseller.price}</span>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => onAddToCart(bestseller)}
                  className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-teal-300 hover:text-white border border-slate-700 hover:border-teal-500 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  কার্টে যোগ করুন
                </button>
                <button
                  onClick={() => onViewDetails(bestseller)}
                  className="w-full text-center text-[11px] text-slate-400 hover:text-slate-200 transition-colors font-semibold"
                >
                  বিস্তারিত বিবরণ দেখুন
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
