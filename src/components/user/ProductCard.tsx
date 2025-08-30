import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
        />
      </Link>
      <div className="p-4">
        <div className="mb-2">
          <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
            {product.category}
          </span>
        </div>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-lg text-gray-900 mb-2 hover:text-green-600 transition-colors duration-200">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex justify-end">
          <Link
            to={`/product/${product.id}`}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Add to Cart</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;