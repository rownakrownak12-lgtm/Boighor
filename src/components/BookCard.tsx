import React from 'react';
import { ShoppingCart, Star, Eye, Heart, Sparkles, AlertTriangle } from 'lucide-react';
import { Book } from '../types';
import { BOOK_COVER_THEMES } from '../data/books';

interface BookCardProps {
  book: Book;
  onAddToCart: (book: Book) => void;
  onViewDetails: (book: Book) => void;
  isFavorite: boolean;
  onToggleFavorite: (book: Book) => void;
}

export default function BookCard({
  book,
  onAddToCart,
  onViewDetails,
  isFavorite,
  onToggleFavorite,
}: BookCardProps) {
  // Retrieve cover theme or default to generic fallback
  const theme = BOOK_COVER_THEMES[book.id] || {
    gradient: 'from-slate-700 to-slate-950',
    accentColor: 'text-slate-100',
    spineBg: 'bg-slate-800'
  };

  // Calculations for discount percentile
  const discountPercent = book.originalPrice 
    ? Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100) 
    : 0;

  // Render review stars
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => {
      const isFilled = i < Math.floor(rating);
      return (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${
            isFilled ? 'fill-amber-400 text-amber-400' : 'text-slate-200 fill-slate-100'
          }`}
        />
      );
    });
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-100 hover:border-slate-250 transition-all duration-300 hover:shadow-xl hover:shadow-slate-100/50 flex flex-col h-full overflow-hidden">
      
      {/* Favorite & Discount Flags Header area */}
      <div className="absolute top-3.5 left-3.5 right-3.5 z-10 flex items-center justify-between pointer-events-none">
        {discountPercent > 0 ? (
          <span className="bg-red-500 text-white font-bold text-[10px] sm:text-xs px-2.5 py-1 rounded-full shadow-md transform group-hover:scale-105 transition-transform duration-300 pointer-events-auto">
            {discountPercent}% ছাড়!
          </span>
        ) : (
          <span className="bg-teal-50 text-teal-700 font-bold text-[10px] sm:text-xs px-2.5 py-1 rounded-full border border-teal-100 pointer-events-auto">
            নতুন কালেকশন
          </span>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(book);
          }}
          className={`p-2 rounded-full shadow-md bg-white border border-slate-50 pointer-events-auto transition-transform duration-300 active:scale-90 hover:scale-110 group-hover:translate-x-0 cursor-pointer ${
            isFavorite ? 'text-rose-500' : 'text-slate-400 hover:text-rose-500'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>
      </div>

      {/* Book Cover Aesthetic Showcase Section */}
      <div 
        onClick={() => onViewDetails(book)}
        className="relative bg-slate-50 cursor-pointer pt-12 pb-8 px-4 flex justify-center items-center overflow-hidden border-b border-slate-50"
      >
        {/* Ambient background shadow representing depth of the cover */}
        <div className="absolute inset-0 bg-radial from-slate-200/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* 3D simulated book container */}
        <div className="relative aspect-[2/3] w-24 sm:w-28 md:w-32 shadow-lg group-hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-1.5 transform preserve-3d">
          
          {/* Simulated book thickness pages reflection */}
          <div className="absolute top-0 right-0 bottom-0 w-2.5 bg-slate-100 border-y border-r border-slate-200 rounded-r shadow-xs transform origin-left translate-x-[9px] -skew-y-[4deg]" />
          
          {/* Main Book Cover with Title Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} rounded-l rounded-r-sm overflow-hidden p-3 flex flex-col justify-between text-slate-950 border-r-[3px] border-black/15 shadow-inner`}>
            {/* Spine Highlight Overlay */}
            <div className={`absolute left-0 top-0 bottom-0 w-2 ${theme.spineBg} opacity-45 mix-blend-overlay shadow-inner`} />
            <div className="absolute left-2 top-0 bottom-0 w-[1px] bg-white/20" />
            
            {/* Publisher indicator */}
            <div className="text-[7px] text-white/70 font-mono tracking-widest text-center self-center line-clamp-1">
              {book.publisher}
            </div>

            {/* Title & Author Info */}
            <div className="text-center self-center pt-2 select-none flex flex-col items-center">
              <span className={`text-[9px] sm:text-[10px] font-bold tracking-tight line-clamp-2 leading-tight uppercase ${theme.accentColor} filter drop-shadow-xs opacity-90`}>
                {book.title}
              </span>
              <span className="text-[7px] font-medium text-white/80 line-clamp-1 mt-1 opacity-80">
                {book.author}
              </span>
            </div>

            {/* Quality Emblem Logo */}
            <div className="flex justify-center flex-col items-center select-none pt-1">
              <Sparkles className="w-3.5 h-3.5 text-white/50 group-hover:animate-spin transition-all duration-1000" />
              <span className="text-[5px] text-white/40 tracking-wider">PRIMARY BOOK</span>
            </div>
          </div>
          
        </div>

        {/* Action button overlay "ঝলক দেখুন" */}
        <div className="absolute bottom-2 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(book);
            }}
            className="px-3 py-1.5 rounded-full bg-slate-950/95 text-white text-[10px] font-semibold flex items-center gap-1 hover:bg-slate-900 shadow-md backdrop-blur-xs focus:outline-none cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-teal-400" />
            একনজরে দেখুন
          </button>
        </div>
      </div>

      {/* Book Information Section */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        
        {/* Genre & Author text info */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-1">
            <span className="text-[10px] font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-md uppercase tracking-wider">
              {book.categoryName}
            </span>
            <div className="flex items-center gap-0.5">
              {renderStars(book.rating)}
              <span className="text-[10px] text-slate-400 font-bold ml-1">({book.reviewCount})</span>
            </div>
          </div>

          <h3 
            onClick={() => onViewDetails(book)}
            className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-teal-600 transition-colors cursor-pointer line-clamp-1"
            title={book.title}
          >
            {book.title}
          </h3>
          <p className="text-xs text-slate-500 hover:text-slate-700 transition-colors line-clamp-1">
            {book.author}
          </p>
        </div>

        {/* Price, Stock and Action Buttons Bottom Bar */}
        <div className="mt-4 pt-3.5 border-t border-slate-50 flex flex-col gap-3">
          
          <div className="flex items-center justify-between">
            {/* Price indicators */}
            <div className="flex flex-col">
              {book.originalPrice && (
                <span className="text-xs text-slate-400 line-through">৳{book.originalPrice}</span>
              )}
              <span className="text-base sm:text-lg font-extrabold text-slate-900">৳{book.price}</span>
            </div>

            {/* Adaptive Stock alert pills */}
            <div>
              {book.stock === 0 ? (
                <span className="text-[10px] font-bold bg-red-50 text-red-650 px-2 py-0.5 rounded-md border border-red-105">
                  স্টক শেষ
                </span>
              ) : book.stock <= 5 ? (
                <span className="text-[10px] font-bold bg-amber-50 text-amber-700 px-2 py-0.5 rounded-md border border-amber-100 flex items-center gap-0.5">
                  <AlertTriangle className="w-2.5 h-2.5 shrink-0" />
                  মাত্র {book.stock} বাকি!
                </span>
              ) : (
                <span className="text-[10px] font-medium text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md">
                  স্টক আছে
                </span>
              )}
            </div>
          </div>

          {/* Add to Cart Trigger Button */}
          <button
            onClick={() => onAddToCart(book)}
            disabled={book.stock === 0}
            className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
              book.stock === 0
                ? 'bg-slate-150 text-slate-400 cursor-not-allowed border border-slate-200'
                : 'bg-teal-50 hover:bg-teal-600 text-teal-800 hover:text-white border border-teal-100 hover:border-teal-600 shadow-xs hover:shadow-md hover:shadow-teal-100'
            }`}
          >
            <ShoppingCart className="w-3.5 h-3.5 shrink-0" />
            কার্টে যোগ করুন
          </button>

        </div>

      </div>

    </div>
  );
}
