import { Order } from '../types';

export const mockOrders: Order[] = [
  {
    id: 'ord-001',
    orderNumber: 'FV2025001',
    date: '2025-01-15',
    time: '14:30',
    status: 'New',
    client: {
      companyName: 'Fresh Market Co.',
      email: 'orders@freshmarket.com',
      phone: '+44 20 7946 0958',
      address: '123 High Street, London, SW1A 1AA'
    },
    items: [
      {
        productName: 'Fresh Tomatoes',
        weight: 2500,
        pricePerKg: 2.50,
        total: 6.25
      },
      {
        productName: 'Green Lettuce',
        weight: 1000,
        pricePerKg: 1.80,
        total: 1.80
      },
      {
        productName: 'Fresh Carrots',
        weight: 3000,
        pricePerKg: 1.90,
        total: 5.70
      }
    ],
    totalAmount: 13.75
  },
  {
    id: 'ord-002',
    orderNumber: 'FV2025002',
    date: '2025-01-15',
    time: '16:45',
    status: 'Processing',
    client: {
      companyName: 'Green Grocer Ltd.',
      email: 'purchasing@greengrocer.co.uk',
      phone: '+44 161 496 0123',
      address: '456 Market Square, Manchester, M1 1AA'
    },
    items: [
      {
        productName: 'Fresh Apples',
        weight: 5000,
        pricePerKg: 3.50,
        total: 17.50
      },
      {
        productName: 'Ripe Bananas',
        weight: 4000,
        pricePerKg: 2.20,
        total: 8.80
      }
    ],
    totalAmount: 26.30
  },
  {
    id: 'ord-003',
    orderNumber: 'FV2025003',
    date: '2025-01-14',
    time: '10:15',
    status: 'Delivered',
    client: {
      companyName: 'Organic Supplies Inc.',
      email: 'orders@organicsupplies.com',
      phone: '+44 113 496 0789',
      address: '789 Organic Lane, Leeds, LS1 4AB'
    },
    items: [
      {
        productName: 'Fresh Broccoli',
        weight: 1500,
        pricePerKg: 2.80,
        total: 4.20
      },
      {
        productName: 'Fresh Spinach',
        weight: 800,
        pricePerKg: 3.40,
        total: 2.72
      },
      {
        productName: 'English Asparagus',
        weight: 500,
        pricePerKg: 8.90,
        total: 4.45
      }
    ],
    totalAmount: 11.37
  },
  {
    id: 'ord-004',
    orderNumber: 'FV2025004',
    date: '2025-01-15',
    time: '09:20',
    status: 'New',
    client: {
      companyName: 'Restaurant Supplies Co.',
      email: 'chef@restaurant-supplies.com',
      phone: '+44 121 496 0456',
      address: '321 Chef Street, Birmingham, B1 2CD'
    },
    items: [
      {
        productName: 'Fresh Mushrooms',
        weight: 2000,
        pricePerKg: 4.50,
        total: 9.00
      },
      {
        productName: 'Fresh Garlic',
        weight: 500,
        pricePerKg: 4.80,
        total: 2.40
      },
      {
        productName: 'Fresh Basil',
        weight: 250,
        pricePerKg: 6.90,
        total: 1.73
      }
    ],
    totalAmount: 13.13
  },
  {
    id: 'ord-005',
    orderNumber: 'FV2025005',
    date: '2025-01-14',
    time: '15:30',
    status: 'Processing',
    client: {
      companyName: 'Healthy Foods Ltd.',
      email: 'buyer@healthyfoods.co.uk',
      phone: '+44 131 496 0321',
      address: '654 Wellness Way, Edinburgh, EH1 3EF'
    },
    items: [
      {
        productName: 'Fresh Avocado',
        weight: 1200,
        pricePerKg: 5.40,
        total: 6.48
      },
      {
        productName: 'Fresh Kale',
        weight: 800,
        pricePerKg: 4.10,
        total: 3.28
      }
    ],
    totalAmount: 9.76
  },
  {
    id: 'ord-006',
    orderNumber: 'FV2025006',
    date: '2025-01-13',
    time: '11:45',
    status: 'Delivered',
    client: {
      companyName: 'Corner Shop Supplies',
      email: 'manager@cornershop.com',
      phone: '+44 151 496 0654',
      address: '987 Corner Road, Liverpool, L1 5GH'
    },
    items: [
      {
        productName: 'Fresh Strawberries',
        weight: 1000,
        pricePerKg: 5.90,
        total: 5.90
      },
      {
        productName: 'Fresh Blueberries',
        weight: 500,
        pricePerKg: 8.20,
        total: 4.10
      }
    ],
    totalAmount: 10.00
  }
];