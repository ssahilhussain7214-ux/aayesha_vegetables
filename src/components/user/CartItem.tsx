import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '../../types';
import { useCart } from '../../context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateCartItem, removeFromCart } = useCart();
  const total = (item.product.pricePerKg * (item.weight / 1000));

  const handleWeightChange = (newWeight: number) => {
    if (newWeight < 250) {
      newWeight = 250; // Minimum weight is 250g
    }
    updateCartItem(item.product.id, newWeight);
  };

  const handleIncrement = () => {
    handleWeightChange(item.weight + 250);
  };

  const handleDecrement = () => {
    const newWeight = item.weight - 250;
    if (newWeight >= 250) {
      handleWeightChange(newWeight);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-center space-x-4">
        <img
          src={item.product.image}
          alt={item.product.name}
          className="w-16 h-16 object-cover rounded-lg"
        />
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">
            {item.product.name}
          </h3>
          <p className="text-sm text-gray-600">
            £{item.product.pricePerKg.toFixed(2)}/kg
          </p>
          <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
            {item.product.category}
          </span>
        </div>

        <div className="flex items-center space-x-3">
          {/* Weight Controls */}
          <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-2">
            <button
              onClick={handleDecrement}
              disabled={item.weight <= 250}
              className="p-1 hover:bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Minus className="h-4 w-4" />
            </button>
            
            <div className="text-center">
              <input
                type="number"
                value={item.weight}
                onChange={(e) => handleWeightChange(parseInt(e.target.value) || 250)}
                min="250"
                step="250"
                className="w-20 text-center border-0 bg-transparent font-medium focus:outline-none"
              />
              <div className="text-xs text-gray-500">grams</div>
            </div>
            
            <button
              onClick={handleIncrement}
              className="p-1 hover:bg-gray-200 rounded"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          {/* Total Price */}
          <div className="text-right min-w-[80px]">
            <div className="font-bold text-green-600">
              £{total.toFixed(2)}
            </div>
          </div>

          {/* Remove Button */}
          <button
            onClick={() => removeFromCart(item.product.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
            title="Remove from cart"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;