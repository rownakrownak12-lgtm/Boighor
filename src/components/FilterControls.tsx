import React from 'react';
import { SlidersHorizontal, ArrowUpDown, DollarSign, Star, User, Tag, RotateCcw } from 'lucide-react';
import { Category } from '../types';

interface FilterControlsProps {
  categories: Category[];
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  
  authors: string[];
  selectedAuthor: string;
  setSelectedAuthor: (author: string) => void;
  
  maxPrice: number;
  setMaxPrice: (price: number) => void;
  
  minRating: number;
  setMinRating: (rating: number) => void;
  
  sortBy: string;
  setSortBy: (sort: string) => void;
  
  onReset: () => void;
  totalResultsCount: number;
}

export default function FilterControls({
  categories,
  activeCategory,
  setActiveCategory,
  authors,
  selectedAuthor,
  setSelectedAuthor,
  maxPrice,
  setMaxPrice,
  minRating,
  setMinRating,
  sortBy,
  setSortBy,
  onReset,
  totalResultsCount,
}: FilterControlsProps) {
  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-5 sm:p-6 shadow-sm space-y-6">
      
      {/* Title block with Reset trigger */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-teal-50 text-teal-700 rounded-lg">
            <SlidersHorizontal className="w-4.5 h-4.5" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-extrabold text-slate-950">ফিল্টারিং ও সর্টিং</h3>
            <p className="text-[10px] sm:text-xs text-slate-400 font-semibold">আপনার পছন্দের বই সহজে খুঁজুন</p>
          </div>
        </div>

        {/* Clear/Reset criteria button */}
        <button
          onClick={onReset}
          className="text-xs font-bold text-slate-500 hover:text-teal-750 flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-slate-50 transition-all cursor-pointer"
          title="সব ফিল্টার রিসেট করুন"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          রিসেট
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        {/* Column 1: Categories filter */}
        <div className="space-y-2.5">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Tag className="w-4 h-4 text-teal-650" />
            ক্যাটাগরি নির্বাচন
          </label>
          <select
            id="filter-category"
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
            className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:border-teal-500 focus:outline-none focus:bg-white focus:ring-4 focus:ring-teal-50 font-medium text-slate-800 transition-all cursor-pointer"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Column 2: Authors filter */}
        <div className="space-y-2.5">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <User className="w-4 h-4 text-teal-650" />
            লেখক নির্বাচন
          </label>
          <select
            id="filter-author"
            value={selectedAuthor}
            onChange={(e) => setSelectedAuthor(e.target.value)}
            className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:border-teal-500 focus:outline-none focus:bg-white focus:ring-4 focus:ring-teal-50 font-medium text-slate-800 transition-all cursor-pointer"
          >
            <option value="all">সব লেখক</option>
            {authors.map((author) => (
              <option key={author} value={author}>
                {author}
              </option>
            ))}
          </select>
        </div>

        {/* Column 3: Pricing range slider */}
        <div className="space-y-2.5">
          <div className="flex justify-between items-center text-xs font-bold text-slate-700">
            <span className="flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-teal-650" />
              সর্বোচ্চ দাম
            </span>
            <span className="text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md font-extrabold">৳{maxPrice}</span>
          </div>
          
          <div className="pt-1">
            <input
              id="filter-price-slider"
              type="range"
              min="100"
              max="500"
              step="10"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-teal-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-bold mt-1.5 select-none">
              <span>৳১০০</span>
              <span>৳৩০০</span>
              <span>৳৫০০</span>
            </div>
          </div>
        </div>

        {/* Column 4: Sorters selection */}
        <div className="space-y-2.5">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <ArrowUpDown className="w-4 h-4 text-teal-650" />
            সাজানোর ক্রম
          </label>
          <select
            id="sort-criteria"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:border-teal-500 focus:outline-none focus:bg-white focus:ring-4 focus:ring-teal-50 font-medium text-slate-800 transition-all cursor-pointer"
          >
            <option value="default">ডিফল্ট ক্যাটালগ</option>
            <option value="price-low">দাম: কম থেকে বেশি (৳ → ৳৳)</option>
            <option value="price-high">দাম: বেশি থেকে কম (৳৳ → ৳)</option>
            <option value="popularity">জনপ্রিয়তা: রেটিং অনুসারে (★)</option>
            <option value="pages-high">পৃষ্ঠার সংখ্যা বেশি</option>
          </select>
        </div>

      </div>

      {/* Auxiliary Row: Rating stars picker of choice */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-105">
        
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-bold text-slate-600 flex items-center gap-1">
            <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
            ন্যূনতম রেটিং:
          </span>
          
          <div className="flex items-center gap-1.5">
            {[0, 3, 4, 4.5, 4.8].map((ratingVal) => (
              <button
                key={ratingVal}
                type="button"
                onClick={() => setMinRating(ratingVal)}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                  minRating === ratingVal
                    ? 'bg-amber-100 text-amber-850 border border-amber-250'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-650 border border-slate-200'
                }`}
              >
                {ratingVal === 0 ? 'সব রেটিং' : `${ratingVal} ★ এবং উপরে`}
              </button>
            ))}
          </div>
        </div>

        <div className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1.5 rounded-full select-none text-center sm:text-right">
          ফিল্টার অনুযায়ী মোট বই: <span className="text-teal-700 font-extrabold">{totalResultsCount}টি</span>
        </div>

      </div>

    </div>
  );
}
