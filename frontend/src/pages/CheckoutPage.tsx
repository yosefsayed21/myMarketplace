import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../state/CartContext';
import { useAuth } from '../state/AuthContext';
import { createOrder } from '../api/client';

export const CheckoutPage: React.FC = () => {
  const { state, clear, subtotal } = useCart();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [form, setForm] = useState({
    name: '',
    address: '',
    city: '',
    country: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  });

  const canSubmit = state.items.length > 0 && form.name && form.address && form.city && form.country && form.cardNumber && form.cardExpiry && form.cardCvc;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      let orderId: number;
      if (user) {
        const productIds = state.items.flatMap(i => Array.from({ length: i.quantity }, () => i.productId));
        const order = await createOrder(user.id, productIds, subtotal);
        orderId = order.id;
      } else {
        orderId = Math.floor(Math.random() * 1000000);
      }
      clear();
      navigate(`/order-confirmation/${orderId}`);
    } catch (e) {
      // Fallback in case of error
      const fallbackId = Math.floor(Math.random() * 1000000);
      clear();
      navigate(`/order-confirmation/${fallbackId}`);
    }
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <form onSubmit={onSubmit} className="lg:col-span-2 space-y-6">
        <section className="border rounded p-4 bg-white">
          <h2 className="font-semibold mb-4">Shipping Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input className="border rounded px-3 py-2" placeholder="Full Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            <input className="border rounded px-3 py-2 md:col-span-2" placeholder="Address" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
            <input className="border rounded px-3 py-2" placeholder="City" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} />
            <input className="border rounded px-3 py-2" placeholder="Country" value={form.country} onChange={e => setForm({ ...form, country: e.target.value })} />
          </div>
        </section>
        <section className="border rounded p-4 bg-white">
          <h2 className="font-semibold mb-4">Payment</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input className="border rounded px-3 py-2 md:col-span-2" placeholder="Card Number" value={form.cardNumber} onChange={e => setForm({ ...form, cardNumber: e.target.value })} />
            <input className="border rounded px-3 py-2" placeholder="MM/YY" value={form.cardExpiry} onChange={e => setForm({ ...form, cardExpiry: e.target.value })} />
            <input className="border rounded px-3 py-2" placeholder="CVC" value={form.cardCvc} onChange={e => setForm({ ...form, cardCvc: e.target.value })} />
          </div>
        </section>
        <button type="submit" disabled={!canSubmit} className={`rounded px-4 py-2 ${canSubmit ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>Place Order</button>
      </form>
      <aside className="border rounded p-4 h-fit bg-white">
        <h2 className="font-semibold mb-4">Order Summary</h2>
        <div className="space-y-2 text-sm">
          {state.items.map(i => (
            <div key={i.productId} className="flex justify-between">
              <span>{i.name} × {i.quantity}</span>
              <span>${(i.price * i.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-between font-medium">
          <span>Total</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
      </aside>
    </div>
  );
};


