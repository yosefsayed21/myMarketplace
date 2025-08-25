import React, { useEffect, useMemo, useState } from 'react';
import { CategoryDTO, fetchCategories, fetchProducts, ProductDTO } from '../api/client';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { TagIcon } from '../ui/Icons';
import { ProductImage } from '../ui/ProductImage';

export const ShopPage: React.FC = () => {
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [categories, setCategories] = useState<CategoryDTO[]>([]);
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const initialCategory = params.get('category');
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | 'all'>(initialCategory ? Number(initialCategory) : 'all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetchProducts().then(setProducts).catch(() => {});
    fetchCategories().then(setCategories).catch(() => {});
  }, []);

  const filtered = useMemo(() => {
    return products.filter(p => {
      const categoryMatch = selectedCategoryId === 'all' || p.categoryId === selectedCategoryId;
      const textMatch = p.name.toLowerCase().includes(query.toLowerCase());
      return categoryMatch && textMatch;
    });
  }, [products, selectedCategoryId, query]);

  useEffect(() => {
    const qp = new URLSearchParams();
    if (selectedCategoryId !== 'all') qp.set('category', String(selectedCategoryId));
    navigate({ pathname: '/shop', search: qp.toString() }, { replace: true });
  }, [selectedCategoryId]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <aside className="md:col-span-1 space-y-4">
        <div>
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search products" className="w-full border rounded-md px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <select value={selectedCategoryId} onChange={e => setSelectedCategoryId(e.target.value === 'all' ? 'all' : Number(e.target.value))} className="w-full border rounded-md px-3 py-2">
            <option value="all">All</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </aside>
      <section className="md:col-span-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
        {filtered.map(p => (
          <Link key={p.id} to={`/product/${p.id}`} className="border rounded-md p-4 bg-white hover:shadow">
            <ProductImage productId={p.id} alt={p.name} className="h-32 w-full object-cover rounded mb-3" />
            <div className="font-medium">{p.name}</div>
            <div className="mt-2 font-semibold">${p.price.toFixed(2)}</div>
          </Link>
        ))}
        {filtered.length === 0 && <div className="text-sm text-gray-500">No products found.</div>}
      </section>
      <div className="md:col-span-4">
        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map(c => (
            <button key={c.id} onClick={() => setSelectedCategoryId(c.id)} className={`inline-flex items-center gap-2 border rounded-full px-3 py-1 ${selectedCategoryId === c.id ? 'bg-lime-100 border-lime-300 text-lime-700' : 'bg-white'}`}>
              <TagIcon className="text-lime-600" />
              <span className="text-sm">{c.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};


