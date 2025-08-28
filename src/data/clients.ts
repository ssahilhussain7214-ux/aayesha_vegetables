import { Client } from '../types';
import { mockOrders } from './orders';

export const mockClients: Client[] = [
  {
    id: 'cli-001',
    companyName: 'Fresh Market Co.',
    email: 'orders@freshmarket.com',
    phone: '+44 20 7946 0958',
    address: '123 High Street, London, SW1A 1AA',
    registrationDate: '2024-03-15',
    totalOrders: 15,
    orderHistory: mockOrders.filter(order => order.client.companyName === 'Fresh Market Co.')
  },
  {
    id: 'cli-002',
    companyName: 'Green Grocer Ltd.',
    email: 'purchasing@greengrocer.co.uk',
    phone: '+44 161 496 0123',
    address: '456 Market Square, Manchester, M1 1AA',
    registrationDate: '2024-05-20',
    totalOrders: 23,
    orderHistory: mockOrders.filter(order => order.client.companyName === 'Green Grocer Ltd.')
  },
  {
    id: 'cli-003',
    companyName: 'Organic Supplies Inc.',
    email: 'orders@organicsupplies.com',
    phone: '+44 113 496 0789',
    address: '789 Organic Lane, Leeds, LS1 4AB',
    registrationDate: '2024-01-10',
    totalOrders: 31,
    orderHistory: mockOrders.filter(order => order.client.companyName === 'Organic Supplies Inc.')
  },
  {
    id: 'cli-004',
    companyName: 'Restaurant Supplies Co.',
    email: 'chef@restaurant-supplies.com',
    phone: '+44 121 496 0456',
    address: '321 Chef Street, Birmingham, B1 2CD',
    registrationDate: '2024-07-03',
    totalOrders: 8,
    orderHistory: mockOrders.filter(order => order.client.companyName === 'Restaurant Supplies Co.')
  },
  {
    id: 'cli-005',
    companyName: 'Healthy Foods Ltd.',
    email: 'buyer@healthyfoods.co.uk',
    phone: '+44 131 496 0321',
    address: '654 Wellness Way, Edinburgh, EH1 3EF',
    registrationDate: '2024-09-12',
    totalOrders: 12,
    orderHistory: mockOrders.filter(order => order.client.companyName === 'Healthy Foods Ltd.')
  }
];