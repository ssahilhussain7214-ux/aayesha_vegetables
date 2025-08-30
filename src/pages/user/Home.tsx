import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../../components/user/ProductCard';
import ProductFilters from '../../components/user/ProductFilters';
import { products } from '../../data/products';
import { useUser } from '../../context/UserContext';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useUser();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(products.map(p => p.category)));
    return uniqueCategories.sort();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl text-white p-8 mb-8">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold mb-4">
            Fresh Produce Delivered
          </h1>
          <p className="text-xl mb-6 opacity-90">
            Discover our premium selection of 172 fresh fruits and vegetables. 
            Quality guaranteed, delivered directly to your business.
          </p>
          <div className="flex items-center space-x-6 text-lg">
            <div className="flex items-center">
              <span className="font-semibold text-2xl mr-2">{products.length}</span>
              <span>Products Available</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-2xl mr-2">{categories.length}</span>
              <span>Categories</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <ProductFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
      />

      {/* Results Summary */}
      <div className="mb-6">
        <p className="text-gray-600">
          Showing <span className="font-semibold text-gray-900">{filteredProducts.length}</span> products
          {selectedCategory && (
            <span> in <span className="font-semibold text-green-600">{selectedCategory}</span></span>
          )}
          {searchQuery && (
            <span> for "<span className="font-semibold text-blue-600">{searchQuery}</span>"</span>
          )}
        </p>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg mb-4">
            No products found matching your criteria.
          </div>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('');
            }}
            className="text-green-600 hover:text-green-700 font-medium"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;