import React, { useState } from 'react';
import { ShoppingCart, Search, BookOpen, Sparkles, Heart, User } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  cartItemsCount: number;
  onCartClick: () => void;
  favoritesCount: number;
  onFavoritesClick: () => void;
  onProfileClick: () => void;
  profileName: string;
}

export default function Header({
  searchQuery,
  setSearchQuery,
  cartItemsCount,
  onCartClick,
  favoritesCount,
  onFavoritesClick,
  onProfileClick,
  profileName,
}: HeaderProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Logo & Brand Name */}
          <div className="flex items-center gap-2.5 shrink-0 select-none">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white shadow-md shadow-teal-100">
              <BookOpen className="w-5.5 h-5.5 sm:w-6 sm:h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-slate-950 flex items-center gap-1">
                বইঘর
                <span className="text-xs bg-emerald-100 text-emerald-800 font-medium px-2 py-0.5 rounded-full">বাংলা</span>
              </span>
              <span className="text-[10px] sm:text-xs text-slate-500 tracking-wider font-semibold -mt-1 hidden sm:inline">
                অনলাইন বইয়ের দোকান
              </span>
            </div>
          </div>

          {/* Search Bar - Aesthetic & Functional */}
          <div className="flex-1 max-w-lg mx-2 sm:mx-6">
            <div className={`relative transition-all duration-300 rounded-full bg-slate-50 border ${
              isFocused ? 'border-teal-500 ring-4 ring-teal-50/70 bg-white' : 'border-slate-200'
            }`}>
              <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none text-slate-400">
                <Search className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
              </div>
              <input
                type="text"
                placeholder="বইয়ের নাম, লেখক অথবা ক্যাটাগরি দিয়ে খুঁজুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="block w-full pl-10 pr-4 py-2 sm:py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 bg-transparent rounded-full focus:outline-none focus:ring-0 border-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 text-xs font-semibold sm:text-sm"
                >
                  মুছুন
                </button>
              )}
            </div>
          </div>

          {/* Utility Navigation Block */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Favorites Icon */}
            <button
              onClick={onFavoritesClick}
              className="relative p-2 sm:p-2.5 rounded-full text-slate-600 hover:bg-slate-50 hover:text-rose-600 transition-colors group cursor-pointer"
              title="পছন্দের তালিকা"
            >
              <Heart className={`w-5 h-5 sm:w-5.5 sm:h-5.5 ${favoritesCount > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
              {favoritesCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] sm:text-xs font-bold leading-none text-white bg-rose-500 rounded-full ring-2 ring-white">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* User Account Trigger button */}
            <button
              onClick={onProfileClick}
              className="flex items-center gap-1.5 p-1 sm:p-1.5 rounded-full border border-slate-200 hover:border-slate-305 bg-slate-50 hover:bg-white text-slate-800 transition-all cursor-pointer group shrink-0"
              title="ইউজার অ্যাকাউন্ট"
            >
              <div className="w-7 sm:w-8 h-7 sm:h-8 rounded-full bg-gradient-to-tr from-teal-500 to-emerald-600 flex items-center justify-center text-white font-black text-[10px] sm:text-xs uppercase shrink-0">
                {profileName ? profileName.substring(0, 2) : 'ইউ'}
              </div>
              <span className="text-[11px] font-bold text-slate-655 tracking-tight hidden md:inline group-hover:text-teal-700 px-1 select-none">
                আমার অ্যাকাউন্ট
              </span>
            </button>

            {/* Cart Icon Menu Button */}
            <button
              id="cart-trigger"
              onClick={onCartClick}
              className="relative flex items-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full bg-slate-950 hover:bg-slate-900 text-white transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-slate-100 cursor-pointer group"
            >
              <ShoppingCart className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-teal-400 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-xs sm:text-sm font-medium hidden sm:inline">কার্ট</span>
              <span className="ml-0.5 inline-flex items-center justify-center w-5 h-5 text-[10px] sm:text-xs font-bold text-slate-950 bg-teal-400 rounded-full group-hover:scale-105 transition-transform duration-300">
                {cartItemsCount}
              </span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
