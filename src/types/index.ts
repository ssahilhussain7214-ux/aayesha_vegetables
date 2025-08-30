export interface Product {
  id: string;
  name: string;
  category: 'Vegetables' | 'Fruits' | 'English Vegetables';
  image: string;
  description: string;
  pricePerKg: number;
}

export interface CartItem {
  product: Product;
  weight: number; // in grams
}

export interface User {
  id: string;
  companyName: string;
  email: string;
  phone: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  time: string;
  status: 'New' | 'Processing' | 'Delivered';
  client: {
    companyName: string;
    email: string;
    phone: string;
    address: string;
  };
  items: {
    productName: string;
    weight: number;
    pricePerKg: number;
    total: number;
  }[];
  totalAmount: number;
}

export interface Client {
  id: string;
  companyName: string;
  email: string;
  phone: string;
  address: string;
  registrationDate: string;
  totalOrders: number;
  orderHistory: Order[];
}