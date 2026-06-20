import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Sparkles, Heart, BookX, ShieldAlert, BadgeInfo } from 'lucide-react';

// Data & Types
import { Book, CartItem, UserProfile, OrderHistoryItem } from './types';
import { BOOKS, CATEGORIES } from './data/books';

// Components
import Header from './components/Header';
import Hero from './components/Hero';
import BookCard from './components/BookCard';
import BookDetailsModal from './components/BookDetailsModal';
import CartSidebar from './components/CartSidebar';
import CheckoutModal from './components/CheckoutModal';
import FilterControls from './components/FilterControls';
import UserProfileModal from './components/UserProfileModal';

// Seeding Default Profiles & Orders for instant preview validation
const DEFAULT_PROFILE: UserProfile = {
  name: 'আব্দুর রহমান',
  email: 'rahman.ab@gmail.com',
  phone: '01712345678',
  deliveryAddress: 'হাউজ ২৪, রোড ১২, ধানমণ্ডি, ঢাকা-১২০৯',
  avatarSeed: 'rahman',
};

const DEFAULT_ORDERS: OrderHistoryItem[] = [
  {
    orderId: 'BOI-482093-2026',
    date: '১০ মে ২০২৬',
    items: [
      {
        bookId: 'b1',
        title: 'হিমুর মধ্যদুপুর',
        author: 'হুমায়ূন আহমেদ',
        price: 220,
        quantity: 1,
      }
    ],
    paymentMethod: 'bkash',
    totalAmount: 280, // Price + 60 Shipping fee
    shippingAddress: 'হাউজ ২৪, রোড ১২, ধানমণ্ডি, ঢাকা-১২০৯',
    phone: '01712345678',
    status: 'delivered'
  }
];

export default function App() {
  // --- Search & Filter States ---
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedAuthor, setSelectedAuthor] = useState('all');
  const [maxPrice, setMaxPrice] = useState(500);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('default');

  // --- User Account States ---
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('boighor_user_profile');
      return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  const [ordersHistory, setOrdersHistory] = useState<OrderHistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('boighor_orders_history');
      return saved ? JSON.parse(saved) : DEFAULT_ORDERS;
    } catch {
      return DEFAULT_ORDERS;
    }
  });

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // --- Cart & Favorites States ---
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('boighor_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [favorites, setFavorites] = useState<Book[]>(() => {
    try {
      const saved = localStorage.getItem('boighor_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // --- Dialog Visibility Toggles ---
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // --- Sync storage ---
  useEffect(() => {
    localStorage.setItem('boighor_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('boighor_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('boighor_user_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem('boighor_orders_history', JSON.stringify(ordersHistory));
  }, [ordersHistory]);

  // --- Unique Authors list ---
  const authors = Array.from(new Set(BOOKS.map(b => b.author))).sort();

  // --- Filter & Sorting Computation Flow ---
  const filteredBooks = BOOKS.filter(book => {
    // 1. Category check
    if (activeCategory === 'favorites') {
      const isFav = favorites.some(f => f.id === book.id);
      if (!isFav) return false;
    } else if (activeCategory !== 'all') {
      if (book.category !== activeCategory) return false;
    }

    // 2. Author check
    if (selectedAuthor !== 'all') {
      if (book.author !== selectedAuthor) return false;
    }

    // 3. Price slider limit check
    if (book.price > maxPrice) return false;

    // 4. Rating limit check
    if (book.rating < minRating) return false;

    // 5. Query matching search text
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      const matchTitle = book.title.toLowerCase().includes(query);
      const matchAuthor = book.author.toLowerCase().includes(query);
      const matchCategory = book.categoryName.toLowerCase().includes(query);
      const matchPublisher = book.publisher.toLowerCase().includes(query);
      if (!matchTitle && !matchAuthor && !matchCategory && !matchPublisher) return false;
    }

    return true;
  });

  // Sorting
  const sortedAndFilteredBooks = [...filteredBooks].sort((a, b) => {
    if (sortBy === 'price-low') {
      return a.price - b.price;
    }
    if (sortBy === 'price-high') {
      return b.price - a.price;
    }
    if (sortBy === 'popularity') {
      return b.rating - a.rating;
    }
    if (sortBy === 'pages-high') {
      return b.pages - a.pages;
    }
    return 0; // Default placement
  });

  // --- Reset All Filtering Criteria ---
  const handleResetFilters = () => {
    setActiveCategory('all');
    setSelectedAuthor('all');
    setMaxPrice(500);
    setMinRating(0);
    setSortBy('default');
    setSearchQuery('');
  };

  // --- Cart handling ---
  const handleAddToCart = (book: Book) => {
    setCart(prev => {
      const existing = prev.find(item => item.book.id === book.id);
      if (existing) {
        const newQty = Math.min(existing.quantity + 1, book.stock);
        return prev.map(item => item.book.id === book.id ? { ...item, quantity: newQty } : item);
      }
      return [...prev, { book, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (bookId: string, quantity: number) => {
    setCart(prev => prev.map(item => item.book.id === bookId ? { ...item, quantity } : item));
  };

  const handleRemoveFromCart = (bookId: string) => {
    setCart(prev => prev.filter(item => item.book.id !== bookId));
  };

  // Checkout response
  const handleOrderSuccess = (newOrder: OrderHistoryItem) => {
    setOrdersHistory(prev => [...prev, newOrder]);
    setCart([]); // Clear cart
  };

  // --- Favorites Toggling ---
  const handleToggleFavorite = (book: Book) => {
    setFavorites(prev => {
      const isFav = prev.some(f => f.id === book.id);
      if (isFav) {
        return prev.filter(f => f.id !== book.id);
      }
      return [...prev, book];
    });
  };

  const handleFavoritesClickHeader = () => {
    if (activeCategory === 'favorites') {
      setActiveCategory('all');
    } else {
      setActiveCategory('favorites');
      const element = document.getElementById('book-grid-section');
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const spotlitBestseller = BOOKS.find(b => b.id === 'b1') || BOOKS[0];

  // Accounts Operations
  const handleSaveProfile = (updated: UserProfile) => {
    setUserProfile(updated);
  };

  const handleLogoutProfile = () => {
    setUserProfile({
      name: '',
      email: '',
      phone: '',
      deliveryAddress: '',
      avatarSeed: 'guest'
    });
  };

  const handleLoginAsMockUser = (mock: UserProfile) => {
    setUserProfile(mock);
  };

  const renderCategoryIcon = (iconName: string) => {
    const IconCpt = (IconsAsAny as any)[iconName] || BookOpen;
    return <IconCpt className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:scale-110" />;
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between selection:bg-teal-100 selection:text-teal-950">
      
      {/* 1. Navbar Container */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cartItemsCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
        favoritesCount={favorites.length}
        onFavoritesClick={handleFavoritesClickHeader}
        onProfileClick={() => setIsProfileOpen(true)}
        profileName={userProfile.name}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-12">
        
        {/* 2. Selling Spotlight Hero Banner */}
        <Hero
          bestseller={spotlitBestseller}
          onAddToCart={handleAddToCart}
          onViewDetails={(bk) => setSelectedBook(bk)}
        />

        {/* 3. Book Filtering, Sorters & Catalog layout */}
        <section id="book-grid-section" className="space-y-8 scroll-mt-24">
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200/60 pb-5">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-teal-600 animate-pulse" />
                {activeCategory === 'favorites' ? 'আপনার পছন্দের বইসমূহ' : 'বইয়ের ডিজিটাল ক্যাটালগ'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-1">
                {activeCategory === 'favorites' 
                  ? `আপনার ভালোলাগায় জমাকৃত ${favorites.length} টি বই` 
                  : `আমরা মোট ${sortedAndFilteredBooks.length} টি চমৎকার বই সাজিয়েছি আপনার জন্য`}
              </p>
            </div>

            {/* Clear all filters fast triggers */}
            {(searchQuery || activeCategory !== 'all' || selectedAuthor !== 'all' || maxPrice < 500 || minRating > 0 || sortBy !== 'default') && (
              <button
                onClick={handleResetFilters}
                className="text-xs font-bold text-teal-700 bg-teal-100/50 hover:bg-teal-100 px-3.5 py-1.5 rounded-full transition-all shrink-0 cursor-pointer"
              >
                সব ফিল্টার মুছুন
              </button>
            )}
          </div>

          {/* Expanded Bento Sorting & Filter panel */}
          <FilterControls
            categories={CATEGORIES}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            authors={authors}
            selectedAuthor={selectedAuthor}
            setSelectedAuthor={setSelectedAuthor}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            minRating={minRating}
            setMinRating={setMinRating}
            sortBy={sortBy}
            setSortBy={setSortBy}
            onReset={handleResetFilters}
            totalResultsCount={sortedAndFilteredBooks.length}
          />

          {/* Grid render */}
          {sortedAndFilteredBooks.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-100 p-12 text-center max-w-sm sm:max-w-md mx-auto space-y-4 shadow-sm">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-350 mx-auto">
                <BookX className="w-8 h-8 text-slate-300" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-950">কোনো বই পাওয়া যায়নি</h3>
                <p className="text-xs text-slate-450 mt-1 max-w-xs mx-auto">
                  আপনার অনুসন্ধানকৃত মানদণ্ড বা ফিল্টারের সাথে মিলে এমন কোনো বই পাওয়া যায়নি। দয়া করে অন্য কোনো নাম অথবা মূল্যসীমা দিয়ে চেষ্টা করুন।
                </p>
              </div>
              <button
                onClick={handleResetFilters}
                className="px-4.5 py-2 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-full cursor-pointer"
              >
                সব ফিল্টার রিসেট করুন
              </button>
            </div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8"
            >
              <AnimatePresence mode="popLayout">
                {sortedAndFilteredBooks.map((book) => (
                  <motion.div
                    key={book.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                  >
                    <BookCard
                      book={book}
                      onAddToCart={handleAddToCart}
                      onViewDetails={(item) => setSelectedBook(item)}
                      isFavorite={favorites.some(f => f.id === book.id)}
                      onToggleFavorite={handleToggleFavorite}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

        </section>

      </main>

      {/* Footer bar */}
      <footer className="bg-white border-t border-slate-200 mt-20 py-12 text-slate-500 text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center text-white font-bold text-sm">
              ব
            </div>
            <div>
              <p className="font-extrabold text-slate-900 text-sm">বইঘর লিমিটেড</p>
              <p className="text-[11px] text-slate-400 font-semibold mt-0.5">রবীন্দ্রনাথ থেকে সমকালীন সাহিত্য — সব কালজয়ী সৃষ্টি এক ঠিকানায়।</p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-xs font-semibold">
            <span className="hover:text-teal-600 cursor-pointer">শর্তাবলী</span>
            <span className="hover:text-teal-600 cursor-pointer">প্রাইভেসী পলিসি</span>
            <span className="hover:text-teal-605 cursor-pointer">যোগাযোগ</span>
            <span className="hover:text-teal-650 cursor-pointer flex items-center gap-1 text-teal-800">
              <ShieldAlert className="w-4 h-4 text-emerald-500" />
              ১০০% নিরাপদ শপিং এবং দ্রুত ডেলিভারি
            </span>
          </div>

          <div className="text-center md:text-right text-[11px] text-slate-400 font-semibold">
            <p>&copy; {new Date().getFullYear()} বইঘর। সর্বস্বত্ব সংরক্ষিত।</p>
            <p className="mt-0.5">গৌরবের সাথে প্রস্তুত করা হয়েছে বাংলায়</p>
          </div>
        </div>
      </footer>

      {/* --- Visual Overlay Modals --- */}

      {/* Book details complete pop up */}
      <BookDetailsModal
        book={selectedBook}
        onClose={() => setSelectedBook(null)}
        onAddToCart={handleAddToCart}
        allBooks={BOOKS}
        onViewBook={(bk) => setSelectedBook(bk)} // Smoothly swappable related links
      />

      {/* Cart sidebar sidebar drawer selection */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Checkout receipt billing and payment forms */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cart}
        onOrderSuccess={handleOrderSuccess}
        activeProfile={userProfile}
      />

      {/* User Account details dashboard */}
      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        profile={userProfile}
        orders={ordersHistory}
        onSaveProfile={handleSaveProfile}
        onLogout={handleLogoutProfile}
        onLoginAsMockUser={handleLoginAsMockUser}
      />

    </div>
  );
}

// Icon helper object replacing wildcard imports to keep linting super green
const IconsAsAny = {
  BookOpen: BookOpen,
  Compass: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" d="m16.24 7.76-1.414 5.657-5.657 1.414 1.414-5.657z" /></svg>,
  Search: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.3-4.3" /></svg>,
  Cpu: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M9 9h6v6H9zM9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3" /></svg>,
  TrendingUp: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8L6 19M21 7l-7 7-4-4-5 5" /></svg>,
  Feather: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="m18 2-6.5 6.5a2.5 2.5 0 1 0 3.5 3.5L22 5V2h-4zM10.5 13.5l-4.5 4.5V22h4l4.5-4.5M14.5 9.5 10 14" /></svg>,
  Smile: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" /></svg>,
  Milestone: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M18 6H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h13l4-3.5L18 6zM12 13v8M12 3v3" /></svg>,
};
