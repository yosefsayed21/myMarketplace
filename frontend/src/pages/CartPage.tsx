import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../state/CartContext';
import { useAuth } from '../state/AuthContext';
import { ProductImage } from '../ui/ProductImage';

export const CartPage: React.FC = () => {
  const { state, updateQuantity, removeItem, subtotal, hasUser } = useCart();
  const { user } = useAuth();

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {!hasUser && (
        <div className="lg:col-span-3 border rounded p-4 bg-yellow-50 text-yellow-800">
          Please <a className="underline" href="/auth">login</a> to use the cart.
        </div>
      )}
      <div className="lg:col-span-2 space-y-4">
        {state.items.map(item => (
          <div key={item.productId} className="border rounded p-4 flex items-center justify-between bg-white">
            <div className="flex items-center gap-4">
              <ProductImage productId={item.productId} alt={item.name} className="w-16 h-16 object-cover rounded" />
              <div>
                <div className="font-medium">{item.name}</div>
                <div className="text-sm text-gray-600">${item.price.toFixed(2)}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <input type="number" min={1} value={item.quantity} onChange={e => updateQuantity(item.productId, Math.max(1, Number(e.target.value)))} className="w-20 border rounded px-2 py-2" />
              <button className="text-red-600" onClick={() => removeItem(item.productId)}>Remove</button>
            </div>
          </div>
        ))}
        {state.items.length === 0 && <div className="text-sm text-gray-500">Your cart is empty.</div>}
      </div>
      <aside className="border rounded p-4 h-fit bg-white">
        <div className="flex justify-between">
          <span className="font-medium">Subtotal</span>
          <span className="font-semibold">${subtotal.toFixed(2)}</span>
        </div>
        <Link to="/checkout" className={`mt-4 inline-block w-full text-center rounded px-4 py-2 ${state.items.length ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500 pointer-events-none'}`}>Proceed to Checkout</Link>
      </aside>
    </div>
  );
};


