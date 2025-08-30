import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Mail, Phone, MapPin, Eye, Calendar, ShoppingBag } from 'lucide-react';
import { mockClients } from '../../data/clients';

const Clients: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredClients = mockClients.filter(client => {
    const matchesSearch = 
      client.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.phone.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Client Management</h1>
          <p className="text-gray-600 mt-1">
            Manage your {mockClients.length} registered clients
          </p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Total Clients</h3>
              <p className="text-2xl font-bold text-blue-600 mt-1">{mockClients.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <ShoppingBag className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Total Orders</h3>
              <p className="text-2xl font-bold text-green-600 mt-1">
                {mockClients.reduce((sum, client) => sum + client.totalOrders, 0)}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <ShoppingBag className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Avg. Orders/Client</h3>
              <p className="text-2xl font-bold text-purple-600 mt-1">
                {(mockClients.reduce((sum, client) => sum + client.totalOrders, 0) / mockClients.length).toFixed(1)}
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search clients by company name, email, or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-600">
            Showing {filteredClients.length} of {mockClients.length} clients
          </p>
        </div>
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredClients.map((client) => (
          <div key={client.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {client.companyName}
                </h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2" />
                    <a href={`mailto:${client.email}`} className="hover:text-green-600">
                      {client.email}
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2" />
                    <a href={`tel:${client.phone}`} className="hover:text-green-600">
                      {client.phone}
                    </a>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{client.address}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="text-lg font-bold text-blue-600">{client.totalOrders}</div>
                <div className="text-sm text-gray-600">Total Orders</div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="text-sm font-medium text-green-600">
                  Since {new Date(client.registrationDate).toLocaleDateString('en-GB')}
                </div>
                <div className="text-xs text-gray-600">Member since</div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                Last order: {client.orderHistory.length > 0 ? client.orderHistory[0].date : 'No orders'}
              </div>
              <Link
                to={`/admin/clients/${client.id}`}
                className="text-green-600 hover:text-green-700 flex items-center text-sm font-medium"
              >
                <Eye className="h-4 w-4 mr-1" />
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredClients.length === 0 && (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <div className="text-gray-500 text-lg mb-4">No clients found matching your criteria</div>
          <button
            onClick={() => setSearchQuery('')}
            className="text-green-600 hover:text-green-700 font-medium"
          >
            Clear search
          </button>
        </div>
      )}
    </div>
  );
};

export default Clients;