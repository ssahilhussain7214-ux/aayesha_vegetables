import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Plus, Minus, Check } from 'lucide-react';
import { products } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { useUser } from '../../context/UserContext';

const ProductDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useUser();
  const [weight, setWeight] = useState(500);
  const [showAddedToCart, setShowAddedToCart] = useState(false);

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h1>
          <button
            onClick={() => navigate('/')}
            className="text-green-600 hover:text-green-700 font-medium"
          >
            Back to products
          </button>
        </div>
      </div>
    );
  }

  const totalPrice = (product.pricePerKg * (weight / 1000));
  const minWeight = 250;

  const handleWeightChange = (newWeight: number) => {
    if (newWeight >= minWeight) {
      setWeight(newWeight);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, weight);
    setShowAddedToCart(true);
    setTimeout(() => setShowAddedToCart(false), 2000);
  };

  const handleIncrement = () => {
    handleWeightChange(weight + 250);
  };

  const handleDecrement = () => {
    const newWeight = weight - 250;
    if (newWeight >= minWeight) {
      handleWeightChange(newWeight);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors duration-200"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Products
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Product Image */}
          <div className="md:w-1/2">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-96 md:h-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="md:w-1/2 p-8">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                {product.category}
              </span>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>

            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              {product.description}
            </p>

            {/* Weight Selector */}
            <div className="mb-8">
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                Select Weight (minimum {minWeight}g)
              </label>
              
              <div className="flex items-center space-x-4 mb-4">
                <button
                  onClick={handleDecrement}
                  disabled={weight <= minWeight}
                  className="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  <Minus className="h-5 w-5" />
                </button>
                
                <div className="text-center bg-gray-50 px-6 py-3 rounded-lg min-w-[120px]">
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => handleWeightChange(parseInt(e.target.value) || minWeight)}
                    min={minWeight}
                    step="250"
                    className="text-2xl font-semibold bg-transparent text-center w-full focus:outline-none"
                  />
                  <div className="text-sm text-gray-500 mt-1">grams</div>
                </div>
                
                <button
                  onClick={handleIncrement}
                  className="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>

            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={weight < minWeight}
              className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200 flex items-center justify-center space-x-2 ${
                showAddedToCart
                  ? 'bg-green-600 text-white'
                  : 'bg-green-600 hover:bg-green-700 text-white hover:shadow-lg transform hover:-translate-y-0.5'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {showAddedToCart ? (
                <>
                  <Check className="h-6 w-6" />
                  <span>Added to Cart!</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="h-6 w-6" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>

            {weight < minWeight && (
              <p className="text-red-600 text-sm mt-2">
                Minimum order weight is {minWeight}g
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-semibold text-lg text-gray-900 mb-2">Fresh Guarantee</h3>
          <p className="text-gray-600">
            All our produce is sourced daily from trusted local suppliers to ensure maximum freshness.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-semibold text-lg text-gray-900 mb-2">Fast Delivery</h3>
          <p className="text-gray-600">
            Orders placed before 2 PM are delivered the next business day to maintain quality.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-semibold text-lg text-gray-900 mb-2">Quality Assured</h3>
          <p className="text-gray-600">
            Every item is carefully inspected before packaging to meet our high-quality standards.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;