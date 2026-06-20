import { Book, Category } from '../types';

export const CATEGORIES: Category[] = [
  { id: 'all', name: 'সব বই', icon: 'BookOpen' },
  { id: 'novel', name: 'উপন্যাস ও গল্প', icon: 'Compass' },
  { id: 'thriller', name: 'থ্রিলার ও রহস্য', icon: 'Search' },
  { id: 'science-fiction', name: 'সায়েন্স ফিকশন', icon: 'Cpu' },
  { id: 'development', name: 'আত্মউন্নয়ন ও মোটিভেশন', icon: 'TrendingUp' },
  { id: 'poetry', name: 'কবিতা সমগ্র', icon: 'Feather' },
  { id: 'kids', name: 'শিশু-কিশোর সমগ্র', icon: 'Smile' },
  { id: 'history', name: 'ইতিহাস ও ঐতিহ্য', icon: 'Milestone' },
];

export const BOOKS: Book[] = [
  {
    id: 'b1',
    title: 'হিমুর মধ্যদুপুর',
    author: 'হুমায়ূন আহমেদ',
    price: 220,
    originalPrice: 260,
    coverImage: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400',
    category: 'novel',
    categoryName: 'উপন্যাস',
    rating: 4.8,
    reviewCount: 142,
    publisher: 'অন্যপ্রকাশ',
    publishedYear: '২০০২',
    publishedDate: '১২ সেপ্টেম্বর ২০০২',
    isbn: '978-984-868-220-4',
    pages: 120,
    language: 'বাংলা',
    stock: 15,
    featured: true,
    description: 'হলুদ পাঞ্জাবি পরে খালি পায়ে রোদে হেঁটে বেড়ানো হিমুর এক অদ্ভূত মধ্যদুপুরের অবিশ্বাস্য অভিযানের অমীয় গল্পকথা। হিমুর যুক্তিহীন অদ্ভুত জগত নিয়ে হূমায়ূন আহমেদের অন্যতম সেরা উপন্যাস।',
    reviews: [
      { id: 'r1', reviewerName: 'তানভীর আহমেদ', rating: 5, date: '১২ মার্চ ২০২৬', comment: 'অসাধারণ একটি বই। হিমুর চরিত্রটি সত্যিই অন্যরকম অনুভূতি জাগায়।' },
      { id: 'r2', reviewerName: 'নুসরাত জাহান', rating: 4, date: '২৮ এপ্রিল ২০২৬', comment: 'হুমায়ূন আহমেদের লেখনী সবসময়ই জাদুকরী। পড়ে খুব ভালো লেগেছে।' }
    ]
  },
  {
    id: 'b2',
    title: 'শেষের কবিতা',
    author: 'রবীন্দ্রনাথ ঠাকুর',
    price: 180,
    originalPrice: 210,
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400',
    category: 'novel',
    categoryName: 'উপন্যাস',
    rating: 4.9,
    reviewCount: 320,
    publisher: 'বিশ্বভারতি গ্রন্থালয়',
    publishedYear: '১৯২৯',
    publishedDate: '১৫ মে ১৯২৯',
    isbn: '978-984-444-110-1',
    pages: 168,
    language: 'বাংলা',
    stock: 8,
    featured: true,
    description: 'অমিত ও লাবণ্যের প্রেমের এক অনবদ্য ট্র্যাজিক এবং কাব্যিক কাহিনী। "শেষের কবিতা" রবীন্দ্রনাথের একটি কালজয়ী উপন্যাস, যা প্রেমের জটিল মনস্তত্ত্ব ও কবিতার চমৎকার মেলবন্ধনে রচিত।',
    reviews: [
      { id: 'r3', reviewerName: 'মারুফ চৌধুরী', rating: 5, date: '১০ নভেম্বর ২০২৫', comment: 'এটি কেবল একটি উপন্যাস নয়, এটি একটি জীবন্ত কবিতা। বাংলা সাহিত্যের অন্যতম শ্রেষ্ঠ মাইলফলক।' },
      { id: 'r4', reviewerName: 'সাদিয়া তাসনিম', rating: 5, date: '০৫ জানুয়ারি ২০২৬', comment: 'লাবণ্য আর অমিতের মতো প্রেম এখনও আর রচিত হয় না।' }
    ]
  },
  {
    id: 'b3',
    title: 'কপোট্রনিক সুখদুঃখ',
    author: 'মুহম্মদ জাফর ইকবাল',
    price: 250,
    originalPrice: 290,
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=400',
    category: 'science-fiction',
    categoryName: 'সায়েন্স ফিকশন',
    rating: 4.7,
    reviewCount: 88,
    publisher: 'সময় প্রকাশনী',
    publishedYear: '১৯৭৬',
    publishedDate: '০১ ফেব্রুয়ারি ১৯৭৬',
    isbn: '978-984-555-220-7',
    pages: 110,
    language: 'বাংলা',
    stock: 20,
    featured: true,
    description: 'বাংলা বৈজ্ঞানিক কল্পকাহিনীর রাজপুত্র মুহম্মদ জাফর ইকবালের এক অনন্য সৃষ্টি। রোবট এবং মানুষের জটিল সম্পর্ক ও আবেগকে অত্যন্ত স্পর্শকাতরভাবে তুলে ধরা হয়েছে এতে।',
    reviews: [
      { id: 'r5', reviewerName: 'আসিফ হাসনাত', rating: 5, date: '২০ সেপ্টেম্বর ২০২৫', comment: 'শৈশবের প্রিয় বইগুলোর একটি। রোবট কপুর কাহিনীটি আজও চোখে পানি এনে দেয়।' }
    ]
  },
  {
    id: 'b4',
    title: 'প্যারাডক্সিক্যাল সাজিদ',
    author: 'আরিফ আজাদ',
    price: 295,
    originalPrice: 380,
    coverImage: 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&q=80&w=400',
    category: 'development',
    categoryName: 'আত্মউন্নয়ন',
    rating: 4.6,
    reviewCount: 512,
    publisher: 'সমকালীন প্রকাশন',
    publishedYear: '২০১৭',
    publishedDate: '১৫ ফেব্রুয়ারি ২০১৭',
    isbn: '978-984-930-100-3',
    pages: 176,
    language: 'বাংলা',
    stock: 35,
    featured: false,
    description: 'একের পর এক বৈজ্ঞানিক ও তাত্ত্বিক প্রশ্নের সাবলীল ও যৌক্তিক উত্তরের মাধ্যমে বিশ্বাসের ক্যানভাসকে শক্তিশালী করার গল্প। যুব সমাজের সংশয় দূরীকরণে এক অত্যন্ত জনপ্রিয় তথ্যবহুল বই।',
    reviews: [
      { id: 'r6', reviewerName: 'ফারহান করিম', rating: 5, date: '১৮ মে ২০২৬', comment: 'সহজ ভাষায় অসাধারণ যুক্তি খণ্ডন করা হয়েছে। মুসলিম তরুণদের জন্য অত্যন্ত অনুপ্রেরণাদায়ক একটি বই।' }
    ]
  },
  {
    id: 'b11',
    title: 'দেয়াল',
    author: 'হুমায়ূন আহমেদ',
    price: 320,
    originalPrice: 380,
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400',
    category: 'novel',
    categoryName: 'উপন্যাস',
    rating: 4.9,
    reviewCount: 215,
    publisher: 'অন্যপ্রকাশ',
    publishedYear: '২০১৩',
    publishedDate: '২১ ফেব্রুয়ারি ২০১৩',
    isbn: '978-984-507-420-5',
    pages: 256,
    language: 'বাংলা',
    stock: 4,
    featured: true,
    description: 'হুমায়ূন আহমেদের জীবনের শেষ উপন্যাস "দেয়াল", যা স্বাধীনতাত্তর বাংলাদেশের রাজনীতি, বঙ্গবন্ধু হত্যাকাণ্ড এবং তার পরবর্তী ঐতিহাসিক বাস্তব ঘটনাপ্রবাহকে কেন্দ্র করে সাবলীল ও নাটকীয়ভাবে রচিত হয়েছে।',
    reviews: [
      { id: 'r21', reviewerName: 'রফিকুজ্জামান', rating: 5, date: '০১ জুড় ২০২৬', comment: 'অনবদ্য সৃষ্টি! হুমায়ূন আহমেদের জীবনের অন্যতম সেরা ট্র্যাজিক ও রাজনৈতিক ইতিহাসের জীবন্ত দলীল।' }
    ]
  },
  {
    id: 'b12',
    title: 'অনিল বাগচীর একদিন',
    author: 'হুমায়ূন আহমেদ',
    price: 150,
    originalPrice: 180,
    coverImage: 'https://images.unsplash.com/photo-1495640388908-05fa85288e61?auto=format&fit=crop&q=80&w=400',
    category: 'novel',
    categoryName: 'উপন্যাস',
    rating: 4.8,
    reviewCount: 95,
    publisher: 'জ্ঞানকোষ প্রকাশনী',
    publishedYear: '১৯৯২',
    publishedDate: '০১ নভেম্বর ১৯৯২',
    isbn: '978-984-701-150-1',
    pages: 112,
    language: 'বাংলা',
    stock: 12,
    featured: false,
    description: '১৯৭১ সালের মুক্তিযুদ্ধের কঠিন দিনগুলোতে একজন সাধারণ হিন্দু যুবক অনিল বাগচীর জীবনাবসান ও সাহসিকতার এক মরমী রূপায়ণ। বইটি সাধারণ মানুষের নিখাদ দেশপ্রেমকে চোখের জলে ফুটিয়ে তোলে।',
    reviews: [
      { id: 'r22', reviewerName: 'সজল চক্রবর্তী', rating: 5, date: '২৫ মার্চ ২০২৬', comment: 'এটি কেবল মুক্তিযুদ্ধের একটা খণ্ড গল্প নয়, এটি ত্যাগের তীব্রতম অনুভূতি প্রকাশ করে।' }
    ]
  },
  {
    id: 'b13',
    title: 'হলুদ বনি',
    author: 'রকিব হাসান',
    price: 240,
    originalPrice: 280,
    coverImage: 'https://images.unsplash.com/photo-1531988042231-d39a9cc12a9a?auto=format&fit=crop&q=80&w=400',
    category: 'thriller',
    categoryName: 'থ্রিলার ও রহস্য',
    rating: 4.6,
    reviewCount: 74,
    publisher: 'সেবা প্রকাশনী',
    publishedYear: '২০০৫',
    publishedDate: '০৫ মে ২০০৫',
    isbn: '978-984-118-205-0',
    pages: 210,
    language: 'বাংলা',
    stock: 9,
    featured: true,
    description: 'তিন গোয়েন্দার স্রষ্টা রকিব হাসানের এক দুর্দান্ত শ্বাসরুদ্ধকর রহস্য উপন্যাস। কুয়াশাচ্ছন্ন বনে সংঘটিত এক প্রাচীন খুন এবং অমীমাংসিত গুপ্তধনের নকশা উন্মোচন নিয়ে গড়ে উঠেছে রোমহর্ষক কাহিনী।',
    reviews: [
      { id: 'r23', reviewerName: 'জিশান রহমান', rating: 5, date: '১২ জানুয়ারি ২০২৬', comment: 'এক বসায় পড়ার মতো থ্রিলার। চমৎকার ক্লাইম্যাক্স আর রহস্যে ভরা!' }
    ]
  },
  {
    id: 'b14',
    title: 'জংলী ফুল',
    author: 'রকিব হাসান',
    price: 260,
    originalPrice: 300,
    coverImage: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=400',
    category: 'thriller',
    categoryName: 'থ্রিলার ও রহস্য',
    rating: 4.5,
    reviewCount: 61,
    publisher: 'সেবা প্রকাশনী',
    publishedYear: '২০১০',
    publishedDate: '১০ এপ্রিল ২০১০',
    isbn: '978-984-118-450-4',
    pages: 198,
    language: 'বাংলা',
    stock: 11,
    featured: false,
    description: 'পার্বত্য ট্র্যাকিং এ গিয়ে হঠাৎ হারিয়ে যাওয়া একদল পর্যটক এবং পাহাড়ের গহীনে লুকিয়ে থাকা এক ভয়ঙ্কর স্মাগলার চক্রের মুখোমুখি হওয়ার টানটান উত্তেজনাময় থ্রিলারকাহিনী।',
    reviews: []
  },
  {
    id: 'b15',
    title: 'ল্যাবেরিন্থ',
    author: 'আহমেদ মুসা',
    price: 280,
    originalPrice: 320,
    coverImage: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&q=80&w=400',
    category: 'thriller',
    categoryName: 'থ্রিলার ও রহস্য',
    rating: 4.9,
    reviewCount: 113,
    publisher: 'বাতিঘর প্রকাশনী',
    publishedYear: '২০২২',
    publishedDate: '১৫ অক্টোবর ২০২২',
    isbn: '978-984-960-032-9',
    pages: 280,
    language: 'বাংলা',
    stock: 6,
    featured: true,
    description: 'আধুনিক ঢাকায় ঘটে যাওয়া ধারাবাহিক নিখোঁজ রহস্য। সাইকো-অ্যানালিটিক্যাল ও বৈজ্ঞানিক তদন্তের মোড়কে সাজানো আহমেদ মুসার একটি অসাধারণ ক্রাইম সাইকোলজিকাল থ্রিলার বই।',
    reviews: [
      { id: 'r25', reviewerName: 'মেহরাব আলী', rating: 5, date: '০৯ মে ২০২৬', comment: 'দুর্দান্ত প্লট ডিজাইন। শেষের টুইস্টটি আসলেই অপ্রত্যাশিত ছিল!' }
    ]
  },
  {
    id: 'b5',
    title: 'মা',
    author: 'আনিসুল হক',
    price: 310,
    originalPrice: 380,
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400',
    category: 'novel',
    categoryName: 'উপন্যাস',
    rating: 5.0,
    reviewCount: 245,
    publisher: 'সময় প্রকাশনী',
    publishedYear: '২০০৩',
    publishedDate: '০৬ মার্চ ২০০৩',
    isbn: '978-984-458-310-2',
    pages: 280,
    language: 'বাংলা',
    stock: 12,
    featured: true,
    description: 'শহীদ বীর মুক্তিযোদ্ধা আজাদ এবং তাঁর গর্ভধারিণী মায়ের অবিশ্বাস্য আত্মত্যাগের সত্য ও চোখের জল উপচে পড়া এক মহাকাব্যিক গাথা, যা প্রতিটি বাঙালির হৃদয়ে দেশভক্তি ও আবেগের সঞ্চার করে।',
    reviews: [
      { id: 'r7', reviewerName: 'হৃদয় খান', rating: 5, date: '০৪ জুলাই ২০২৫', comment: 'বইটা যতবারই পড়ি, প্রতিবারই কেঁদে ফেলি। প্রতিটি বাঙালির এই বইটি পড়া উচিত।' }
    ]
  },
  {
    id: 'b6',
    title: 'মেঘ বলাকার ডাক',
    author: 'নির্মলেন্দু গুণ',
    price: 130,
    originalPrice: 150,
    coverImage: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=400',
    category: 'poetry',
    categoryName: 'কবিতা',
    rating: 4.5,
    reviewCount: 42,
    publisher: 'কাকলী প্রকাশনী',
    publishedYear: '২০১১',
    publishedDate: '১২ জানুয়ারি ২০১১',
    isbn: '978-984-700-130-9',
    pages: 96,
    language: 'বাংলা',
    stock: 5,
    featured: false,
    description: 'প্রখ্যাত কবি নির্মলেন্দু গুণের গভীর আবেগ, প্রেম, ও সামাজিক বিপ্লবের কথ্য ছন্দে মোড়ানো চমৎকার একটি কাব্যগ্রন্থ। বিরহ ও প্রকৃতির অপূর্ব প্রকাশ ঘটেছে প্রতিটি লাইনে।',
    reviews: []
  },
  {
    id: 'b7',
    title: 'লালসালু',
    author: 'সৈয়দ ওয়ালীউল্লাহ্',
    price: 150,
    originalPrice: 180,
    coverImage: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&q=80&w=400',
    category: 'novel',
    categoryName: 'উপন্যাস',
    rating: 4.9,
    reviewCount: 198,
    publisher: 'নওরোজ কিতাবিস্তান',
    publishedYear: '১৯৪৮',
    publishedDate: '০১ জুড় ১৯৪৮',
    isbn: '978-984-601-150-5',
    pages: 132,
    language: 'বাংলা',
    stock: 10,
    featured: false,
    description: 'বাঙালি মুসলিম সমাজের কুসংস্কার, ধর্মান্ধতা ও ধর্মীয় শোষণকে কেন্দ্র করে রচিত একটি যুগান্তকারী উপন্যাস। মজিদের ভণ্ডামি ও সমাজের অসহায় মানুষের মনস্তত্ত্বের সূক্ষ্ম বিশ্লেষণ করা হয়েছে।',
    reviews: [
      { id: 'r8', reviewerName: 'আতিফ আসলাম', rating: 5, date: '১৮ মে ২০২৬', comment: 'আমাদের সমাজবাস্তবতা আজও যে পরিবর্তিত হয়নি, লালসালু পড়লেই তার প্রমাণ পাওয়া যায়।' }
    ]
  },
  {
    id: 'b8',
    title: 'টেনিদা সমগ্র',
    author: 'নারায়ণ গঙ্গোপাধ্যায়',
    price: 350,
    originalPrice: 420,
    coverImage: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=400',
    category: 'kids',
    categoryName: 'শিশু-কিশোর সমগ্র',
    rating: 4.8,
    reviewCount: 129,
    publisher: 'আনন্দ পাবলিশার্স',
    publishedYear: '১৯৭৫',
    publishedDate: '০১ ডিসেম্বর ১৯৭৫',
    isbn: '978-817-215-350-1',
    pages: 350,
    language: 'বাংলা',
    stock: 14,
    featured: false,
    description: 'পটলডাঙার বিখ্যাত দলপতি টেনিদা এবং তার চামুণ্ডা বাহিনী — ক্যাবলা, হাবুল আর পেলাদের হাসির হুল্লোড়ে ভরা অবিশ্বাস্য ও রোমাঞ্চকর অ্যাডভেঞ্চারের এক অবিচ্ছেদ্য চিরসবুজ সংগ্রহ।',
    reviews: []
  },
  {
    id: 'b9',
    title: 'একাত্তরের দিনগুলি',
    author: 'জাহানারা ইমাম',
    price: 340,
    originalPrice: 400,
    coverImage: 'https://images.unsplash.com/photo-1495640388908-05fa85288e61?auto=format&fit=crop&q=80&w=400',
    category: 'history',
    categoryName: 'ইতিহাস ও ঐতিহ্য',
    rating: 4.9,
    reviewCount: 380,
    publisher: 'সন্ধানী প্রকাশনী',
    publishedYear: '১৯৮৬',
    publishedDate: '০১ জানুয়ারি ১৯৮৬',
    isbn: '978-984-486-340-5',
    pages: 320,
    language: 'বাংলা',
    stock: 18,
    featured: true,
    description: 'শহীদ জননী জাহানারা ইমামের ১৯৭১ সালের দিনলিপি, যা আমাদের মহান মুক্তিযুদ্ধের ভয়াবহ দিনগুলোর এক বিশ্বস্ত ও জীবন্ত চালচিত্র। দেশের স্বাধীনতা অর্জনের পেছনের গভীর ত্যাগের দলিল।',
    reviews: [
      { id: 'r9', reviewerName: 'রাশেদুল বারী', rating: 5, date: '২৬ মার্চ ২০২৬', comment: 'মুক্তিযুদ্ধের অন্যতম শ্রেষ্ঠ দলিল। জাহানারা ইমামের ত্যাগ সত্যি অবর্ণনীয়।' }
    ]
  },
  {
    id: 'b10',
    title: 'স্মার্ট পড়ার কৌশল',
    author: 'আবদুল্লাহ আল মামুন',
    price: 180,
    originalPrice: 220,
    coverImage: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=400',
    category: 'development',
    categoryName: 'আত্মউন্নয়ন',
    rating: 4.7,
    reviewCount: 165,
    publisher: 'আদর্শ প্রকাশনী',
    publishedYear: '২০২০',
    publishedDate: '০৮ সেপ্টেম্বর ২০২০',
    isbn: '978-984-954-180-2',
    pages: 144,
    language: 'বাংলা',
    stock: 22,
    featured: false,
    description: 'ছাত্রছাত্রী ও চাকরিপ্রত্যাশীদের জন্য পড়াশোনা কার্যকরভাবে মনে রাখার বৈজ্ঞানিক পদ্ধতিসমূহ। মনোযোগ বাড়ানোর কার্যকর অনুশীলন, মুখস্থ না করে গভীর অনুধাবনের বাস্তবসম্মত দিকনির্দেশনা।',
    reviews: [
      { id: 'r10', reviewerName: 'মিনহাজুল ইসলাম', rating: 4, date: '১৯ ফেব্রুয়ারি ২০২৬', comment: 'দারুণ কিছু বৈজ্ঞানিক কৌশল জানতে পেরেছি। ছাত্রছাত্রীদের অনেক উপকারে আসবে।' }
    ]
  }
];

// Aesthetic cover theme colors
export const BOOK_COVER_THEMES: Record<string, { gradient: string; accentColor: string; spineBg: string }> = {
  'b1': { gradient: 'from-amber-400 to-amber-600', accentColor: 'text-amber-150', spineBg: 'bg-amber-700' }, // Himu Yellow
  'b2': { gradient: 'from-rose-850 to-red-950', accentColor: 'text-rose-100', spineBg: 'bg-rose-900' }, // Rabindranath
  'b3': { gradient: 'from-indigo-900 to-slate-900', accentColor: 'text-cyan-100', spineBg: 'bg-indigo-950' }, // Sci Fi
  'b4': { gradient: 'from-teal-800 to-emerald-950', accentColor: 'text-teal-100', spineBg: 'bg-teal-900' }, // Paradoxical
  'b5': { gradient: 'from-blue-800 to-purple-900', accentColor: 'text-blue-100', spineBg: 'bg-blue-950' }, // Ma Anisul
  'b6': { gradient: 'from-emerald-600 to-teal-800', accentColor: 'text-sky-100', spineBg: 'bg-emerald-900' }, // Poetry
  'b7': { gradient: 'from-red-800 to-amber-950', accentColor: 'text-red-100', spineBg: 'bg-red-800' }, // Lalsalu
  'b8': { gradient: 'from-yellow-500 to-amber-750', accentColor: 'text-yellow-100', spineBg: 'bg-yellow-850' }, // Tenida
  'b9': { gradient: 'from-slate-850 to-zinc-950', accentColor: 'text-zinc-300', spineBg: 'bg-slate-950' }, // Jahanara Imam
  'b10': { gradient: 'from-purple-700 to-indigo-900', accentColor: 'text-purple-100', spineBg: 'bg-purple-950' }, // Smart
  'b11': { gradient: 'from-zinc-800 to-stone-950', accentColor: 'text-stone-100', spineBg: 'bg-stone-900' }, // Deyal Black
  'b12': { gradient: 'from-emerald-850 to-slate-950', accentColor: 'text-emerald-100', spineBg: 'bg-emerald-900' }, // Anil Bagchi Green
  'b13': { gradient: 'from-yellow-600 to-amber-950', accentColor: 'text-amber-100', spineBg: 'bg-amber-900' }, // Holud bony Rokib
  'b14': { gradient: 'from-rose-700 to-emerald-950', accentColor: 'text-rose-100', spineBg: 'bg-rose-900' }, // Jongli pul Rokib
  'b15': { gradient: 'from-purple-900 to-violet-950', accentColor: 'text-violet-100', spineBg: 'bg-purple-950' }, // Labyrinth Ahmed Musa
};
