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
      },
      {
        productName: 'Green Lettuce',
        weight: 1000,
      },
      {
        productName: 'Fresh Carrots',
        weight: 3000,
      }
    ],
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
      },
      {
        productName: 'Ripe Bananas',
        weight: 4000,
      }
    ],
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
      },
      {
        productName: 'Fresh Spinach',
        weight: 800,
      },
      {
        productName: 'English Asparagus',
        weight: 500,
      }
    ],
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
      },
      {
        productName: 'Fresh Garlic',
        weight: 500,
      },
      {
        productName: 'Fresh Basil',
        weight: 250,
      }
    ],
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
      },
      {
        productName: 'Fresh Kale',
        weight: 800,
      }
    ],
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
      },
      {
        productName: 'Fresh Blueberries',
        weight: 500,
      }
    ],
  }
];