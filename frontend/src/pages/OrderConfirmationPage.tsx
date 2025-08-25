import React from 'react';
import { useParams, Link } from 'react-router-dom';

export const OrderConfirmationPage: React.FC = () => {
  const { id } = useParams();
  return (
    <div className="max-w-lg mx-auto text-center">
      <div className="border rounded p-8 bg-white">
        <h1 className="text-2xl font-semibold">Thank you for your purchase!</h1>
        <p className="mt-2 text-gray-600">Your order has been placed successfully.</p>
        <div className="mt-4 text-sm text-gray-700">Order ID: <span className="font-mono">{id}</span></div>
        <Link to="/shop" className="inline-block mt-6 bg-blue-600 text-white rounded px-4 py-2">Continue Shopping</Link>
      </div>
    </div>
  );
};


