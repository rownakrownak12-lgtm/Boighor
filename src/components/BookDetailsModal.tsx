import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingCart, Star, Sparkles, Feather, Bookmark, FileText, Calendar, Hash, Send, UserCircle, RefreshCcw } from 'lucide-react';
import { Book, BookReview } from '../types';
import { BOOK_COVER_THEMES } from '../data/books';

interface BookDetailsModalProps {
  book: Book | null;
  onClose: () => void;
  onAddToCart: (book: Book) => void;
  allBooks: Book[];
  onViewBook: (book: Book) => void; // facilitates smooth navigation across related list
}

export default function BookDetailsModal({
  book,
  onClose,
  onAddToCart,
  allBooks,
  onViewBook,
}: BookDetailsModalProps) {
  const [newReviewerName, setNewReviewerName] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [localReviews, setLocalReviews] = useState<Record<string, BookReview[]>>({});

  if (!book) return null;

  // Book cover visual properties
  const theme = BOOK_COVER_THEMES[book.id] || {
    gradient: 'from-slate-700 to-slate-950',
    accentColor: 'text-slate-100',
    spineBg: 'bg-slate-800'
  };

  const discountPercent = book.originalPrice 
    ? Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100) 
    : 0;

  // Retrieve matching related books in the same category (excluding current book)
  const relatedBooks = allBooks
    .filter(b => b.category === book.category && b.id !== book.id)
    .slice(0, 4);

  // Combine static reviews with local newly typed reviews
  const currentBookReviews = [
    ...(book.reviews || []),
    ...(localReviews[book.id] || [])
  ];

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewerName.trim() || !newReviewComment.trim()) return;

    const reviewItem: BookReview = {
      id: `rev-${Date.now()}`,
      reviewerName: newReviewerName.trim(),
      rating: newReviewRating,
      date: 'আজকে',
      comment: newReviewComment.trim()
    };

    setLocalReviews(prev => ({
      ...prev,
      [book.id]: [...(prev[book.id] || []), reviewItem]
    }));

    // Reset fields
    setNewReviewerName('');
    setNewReviewRating(5);
    setNewReviewComment('');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-4">
        
        {/* Backdrop glass blur overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs cursor-pointer"
        />

        {/* Modal Main container */}
        <motion.div
          initial={{ scale: 0.95, y: 15, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: 15, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="relative bg-white rounded-3xl overflow-hidden shadow-2xl w-full max-w-4xl z-10 border border-slate-100 flex flex-col md:flex-row max-h-[92vh] md:max-h-[88vh]"
        >
          {/* Close button top right absolute */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-25 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors cursor-pointer"
            title="বন্ধ করুন"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Panel: Cover & Core Specs (Sticky on desktop) */}
          <div className="md:w-[35%] bg-slate-50 p-6 sm:p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-100 relative shrink-0">
            <div className="absolute top-4 left-4 inline-flex items-center gap-1 text-[10px] text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
              <Bookmark className="w-3 h-3 text-teal-600" />
              {book.categoryName}
            </div>

            {/* Giant 3D simulated cover representation */}
            <div className="relative aspect-[2/3] w-36 sm:w-44 shadow-2xl rounded-r-lg border-r-[4px] border-black/15 group select-none py-6">
              
              {/* Back pages edge effect */}
              <div className="absolute top-0 right-0 bottom-0 w-2.5 bg-slate-100 border-r border-slate-200 rounded-r shadow-xs transform origin-left translate-x-[9px] -skew-y-[4deg]" />

              <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} rounded-l rounded-r-md p-4 sm:p-5 flex flex-col justify-between text-slate-950`}>
                {/* Spine shadows */}
                <div className={`absolute left-0 top-0 bottom-0 w-3.5 ${theme.spineBg} opacity-40 mix-blend-overlay shadow-inner`} />
                <div className="absolute left-3 top-0 bottom-0 w-[1px] bg-white/20" />
                
                <div className="text-[9px] text-white/50 font-mono tracking-widest text-center self-center uppercase">
                  {book.publisher}
                </div>

                <div className="text-center self-center pt-4 flex flex-col items-center">
                  <span className={`text-sm sm:text-base font-bold leading-tight px-1 drop-shadow-xs ${theme.accentColor}`}>
                    {book.title}
                  </span>
                  <span className="text-[10px] font-semibold text-white/70 mt-1">
                    {book.author}
                  </span>
                </div>

                <div className="flex justify-center flex-col items-center opacity-80 pt-2">
                  <Sparkles className="w-5 h-5 text-white/40" />
                  <span className="text-[5px] text-white/30 tracking-widest mt-1">BOIGHOR CLASSIC EDITION</span>
                </div>
              </div>
            </div>

            {/* Micro specs table sidebar */}
            <div className="mt-8 w-full bg-white rounded-2xl border border-slate-100 p-4 space-y-2.5 text-xs text-slate-500 font-semibold shadow-xs">
              <div className="flex justify-between border-b border-slate-50 pb-1.5">
                <span className="text-slate-400 flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5" /> পৃষ্ঠা সংখ্যা
                </span>
                <span className="text-slate-800 font-bold">{book.pages} পৃষ্ঠা</span>
              </div>
              <div className="flex justify-between border-b border-slate-50 pb-1.5">
                <span className="text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> প্রকাশের তারিখ
                </span>
                <span className="text-slate-800 font-bold">{book.publishedDate || `${book.publishedYear} সাল`}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 flex items-center gap-1">
                  <Hash className="w-3.5 h-3.5" /> আইএসবিএন (ISBN)
                </span>
                <span className="text-slate-800 font-mono font-bold">{book.isbn || '978-X-XX-XXXX-X'}</span>
              </div>
            </div>
          </div>

          {/* Right Panel: Extensively detailed content (Scrollable) */}
          <div className="md:w-[65%] p-6 sm:p-8 overflow-y-auto flex flex-col justify-between max-h-[50vh] md:max-h-[88vh]">
            <div className="space-y-6">
              
              {/* Header Titles */}
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-xs bg-teal-50 text-teal-800 font-bold px-2.5 py-0.5 rounded-full border border-teal-100">
                    {book.categoryName}
                  </span>
                  {discountPercent > 0 && (
                    <span className="text-xs bg-red-500 text-white font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                      {discountPercent}% ছাড়!
                    </span>
                  )}
                  <span className="text-[11px] text-slate-450 font-bold">প্রকাশক: {book.publisher}</span>
                </div>
                
                <h2 className="text-xl sm:text-2.5xl font-black text-slate-900 leading-snug">
                  {book.title}
                </h2>
                
                <p className="text-sm font-medium text-slate-500 mt-1 flex items-center gap-1.5">
                  <Feather className="w-4 h-4 text-teal-500 shrink-0" />
                  লেখক: <span className="text-teal-900 font-extrabold text-base hover:underline cursor-pointer">{book.author}</span>
                </p>
              </div>

              {/* Dynamic overall rating bar scores */}
              <div className="flex flex-wrap items-center gap-5 py-3 border-y border-slate-100">
                <div className="flex items-center gap-1.5 bg-amber-50 rounded-xl px-3 py-1.5 border border-amber-100 text-amber-900 shrink-0">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                  <span className="text-base font-black">{book.rating}</span>
                </div>
                <div className="text-xs text-slate-500">
                  <p className="font-extrabold text-slate-755">{currentBookReviews.length} টি সচল ক্রেতা রিভিউ</p>
                  <p className="text-slate-400 font-medium">১০০% ভেরিফাইড ক্রেতার মতামত</p>
                </div>
                
                {/* Visual rating scale meter */}
                <div className="hidden sm:flex flex-col gap-1 flex-1">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                    <span>৫ তারকা</span>
                    <div className="bg-slate-100 h-2 flex-1 rounded-full overflow-hidden">
                      <div className="bg-amber-400 h-full w-[85%] rounded-full" />
                    </div>
                    <span className="w-8 text-right">৮৫%</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                    <span>৪ তারকা</span>
                    <div className="bg-slate-100 h-2 flex-1 rounded-full overflow-hidden">
                      <div className="bg-amber-400 h-full w-[15%] rounded-full" />
                    </div>
                    <span className="w-8 text-right">১৫%</span>
                  </div>
                </div>
              </div>

              {/* Book description block */}
              <div className="space-y-2">
                <h4 className="text-xs uppercase tracking-widest font-extrabold text-slate-400">বইয়ের মূল পরিচিতি</h4>
                <p className="text-slate-650 text-xs sm:text-sm leading-relaxed text-slate-700">
                  {book.description}
                </p>
              </div>

              {/* SECTION: RELATED BOOKS (সম্পর্কিত অন্যান্য বই) */}
              <div className="space-y-3.5">
                <h4 className="text-xs uppercase tracking-widest font-extrabold text-slate-400">সম্পর্কিত অন্যান্য বইসমূহ</h4>
                
                {relatedBooks.length === 0 ? (
                  <p className="text-xs text-slate-400 font-semibold italic">এই ক্যাটেগরিতে অন্য কোনো বই মেলেনি।</p>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {relatedBooks.map((relBook) => {
                      const relTheme = BOOK_COVER_THEMES[relBook.id] || { gradient: 'from-slate-600 to-slate-800' };
                      return (
                        <div
                          key={relBook.id}
                          onClick={() => onViewBook(relBook)}
                          className="bg-slate-50 hover:bg-teal-50/50 p-2.5 rounded-xl border border-slate-150 hover:border-teal-200 transition-all duration-300 cursor-pointer flex flex-col items-center justify-between text-center group h-full"
                        >
                          <div className={`w-10 aspect-[2/3] bg-gradient-to-br ${relTheme.gradient} rounded-xs shadow-md transition-transform duration-300 group-hover:-translate-y-1`} />
                          <div className="mt-2 w-full">
                            <span className="text-[10px] font-bold text-slate-900 block truncate group-hover:text-teal-700 leading-tight">
                              {relBook.title}
                            </span>
                            <span className="text-[8px] text-slate-400 block truncate">{relBook.author}</span>
                            <span className="text-[10px] font-extrabold text-teal-800 block mt-1">৳{relBook.price}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* SECTION: REVIEWS LIST & SUBMISSION */}
              <div className="space-y-4">
                <h4 className="text-xs uppercase tracking-widest font-extrabold text-slate-400">পাঠকদের রিভিউ ও রেটিং</h4>

                {/* Review logs */}
                <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                  {currentBookReviews.length === 0 ? (
                    <p className="text-xs italic text-slate-400 bg-slate-50 py-3 text-center rounded-xl font-semibold">
                      এই বইটির কোনো রিভিউ এখন পর্যন্ত দেওয়া হয়নি। প্রথম রিভিউটি দিতে নিচে ফরম পূরণ করুন!
                    </p>
                  ) : (
                    currentBookReviews.map((rev) => (
                      <div key={rev.id} className="bg-slate-50/80 p-3 sm:p-4 rounded-xl border border-slate-100 space-y-1.5 text-xs text-slate-650">
                        <div className="flex items-center justify-between">
                          <span className="font-extrabold text-slate-800 flex items-center gap-1.5">
                            <UserCircle className="w-4 h-4 text-slate-400 shrink-0" />
                            {rev.reviewerName}
                          </span>
                          <span className="text-[10px] text-slate-400 font-bold">{rev.date}</span>
                        </div>
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`}
                            />
                          ))}
                        </div>
                        <p className="text-slate-700 font-sans leading-relaxed">{rev.comment}</p>
                      </div>
                    ))
                  )}
                </div>

                {/* Interactively write a review */}
                <form onSubmit={handleReviewSubmit} className="bg-slate-50 p-4 rounded-2xl border border-slate-200/60 space-y-3">
                  <h5 className="text-xs font-extrabold text-slate-800 flex items-center gap-1 select-none">
                    <Send className="w-3.5 h-3.5 text-teal-605" />
                    আপনার মতামত পেশ করুন
                  </h5>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Reviewers Name */}
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-slate-400">আপনার নাম</label>
                      <input
                        type="text"
                        value={newReviewerName}
                        onChange={(e) => setNewReviewerName(e.target.value)}
                        placeholder="উদা: আরমান চৌধুরী"
                        className="px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white focus:outline-none focus:border-teal-500"
                        required
                      />
                    </div>

                    {/* Choose Rating */}
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-slate-400">বইটির রেটিং</label>
                      <div className="flex items-center gap-1.5 mt-1.5">
                        {[1, 2, 3, 4, 5].map((val) => (
                          <button
                            key={val}
                            type="button"
                            onClick={() => setNewReviewRating(val)}
                            className="p-1 rounded bg-transparent focus:outline-none cursor-pointer"
                          >
                            <Star 
                              className={`w-5 h-5 ${
                                val <= newReviewRating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                              }`} 
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Comment */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-slate-400">রিভিউ মন্তব্য</label>
                    <textarea
                      value={newReviewComment}
                      onChange={(e) => setNewReviewComment(e.target.value)}
                      placeholder="বইটি পড়ার পর আপনার ভালো লাগা, খারাপ লাগা এবং অনুভূতিগুলো লিখে শেয়ার করুন..."
                      rows={2}
                      className="px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white focus:outline-none focus:border-teal-500 resize-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-teal-400 hover:text-white font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ml-auto"
                  >
                    রিভিউ সাবমিট
                  </button>
                </form>

              </div>

            </div>

            {/* Bottom pricing section & Cart CTA triggers */}
            <div className="mt-8 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white sticky bottom-0 z-10 py-1">
              
              <div className="flex items-baseline gap-2">
                <span className="text-[10px] text-slate-405 uppercase font-black">মূল্য:</span>
                <span className="text-sm text-slate-400 line-through">৳{book.originalPrice || book.price + 45}</span>
                <span className="text-2.5xl font-black text-slate-900">৳{book.price}</span>
              </div>

              <div className="w-full sm:w-auto flex gap-2">
                <button
                  onClick={() => {
                    onAddToCart(book);
                  }}
                  disabled={book.stock === 0}
                  className={`w-full sm:w-auto px-6 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer ${
                    book.stock === 0
                      ? 'bg-slate-200 text-slate-450 cursor-not-allowed border border-slate-300 shadow-none'
                      : 'bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white shadow-teal-100'
                  }`}
                >
                  <ShoppingCart className="w-4.5 h-4.5 shrink-0" />
                  কার্টে যোগ করুন
                </button>
              </div>

            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
