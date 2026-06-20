export interface BookReview {
  id: string;
  reviewerName: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  originalPrice?: number; // for showing discount
  coverImage: string; // url or solid visual styling code
  category: string;
  categoryName: string;
  rating: number;
  reviewCount: number;
  description: string;
  publisher: string;
  publishedYear: string;
  publishedDate?: string; // e.g. "১৫ মে ২০২১"
  isbn?: string; // e.g. "978-984-9876-54-3"
  pages: number;
  language: string;
  stock: number;
  featured?: boolean;
  reviews?: BookReview[];
}

export interface CartItem {
  book: Book;
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string; // lucide icon name
}

export interface OrderDetails {
  name: string;
  phone: string;
  deliveryAddress: string;
  paymentMethod: 'bkash' | 'nagad' | 'rocket' | 'cod';
  paymentNumber?: string;
  trxId?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  deliveryAddress: string;
  avatarSeed: string; // for dynamic avatar generation
}

export interface OrderHistoryItem {
  orderId: string;
  date: string;
  items: {
    bookId: string;
    title: string;
    author: string;
    price: number;
    quantity: number;
  }[];
  paymentMethod: 'bkash' | 'nagad' | 'rocket' | 'cod';
  totalAmount: number;
  shippingAddress: string;
  phone: string;
  status: 'processing' | 'shipped' | 'delivered';
}
