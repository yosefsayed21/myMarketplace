import React, { useEffect, useState } from 'react';
import { CategoryDTO, fetchCategories, fetchProducts, ProductDTO } from '../api/client';
import { Link, useNavigate } from 'react-router-dom';
import { TagIcon } from '../ui/Icons';
import { ProductImage } from '../ui/ProductImage';

export const HomePage: React.FC = () => {
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [categories, setCategories] = useState<CategoryDTO[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts().then(setProducts).catch(() => {});
    fetchCategories().then(setCategories).catch(() => {});
  }, []);

  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl p-10">
        <div className="relative z-10">
          <h1 className="text-3xl font-semibold">Welcome to Marketplace</h1>
          <p className="mt-2 text-white/90">Discover great products and deals</p>
          <Link to="/shop" className="inline-block mt-6 bg-white text-blue-700 font-medium px-4 py-2 rounded-md">Shop now</Link>
        </div>
        <img
          src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/shopping-bag.svg"
          alt="shopping"
          className="absolute -right-6 -bottom-6 w-48 h-48 opacity-20"
        />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {categories.map(c => (
            <button key={c.id} onClick={() => navigate(`/shop?category=${c.id}`)} className="border rounded-md p-3 text-center bg-white hover:shadow flex items-center justify-center gap-2">
              <TagIcon className="text-lime-600" />
              <span>{c.name}</span>
            </button>
          ))}
          {categories.length === 0 && <div className="text-sm text-gray-500">No categories yet.</div>}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Featured Products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {products.slice(0, 8).map(p => (
            <Link key={p.id} to={`/product/${p.id}`} className="border rounded-md p-4 bg-white hover:shadow">
              <ProductImage productId={p.id} alt={p.name} className="h-32 w-full object-cover rounded mb-3" />
              <div className="font-medium">{p.name}</div>
              <div className="text-sm text-gray-600 line-clamp-2">{p.description}</div>
              <div className="mt-2 font-semibold">${p.price.toFixed(2)}</div>
            </Link>
          ))}
          {products.length === 0 && <div className="text-sm text-gray-500">No products yet.</div>}
        </div>
      </section>
    </div>
  );
};


