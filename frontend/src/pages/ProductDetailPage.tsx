import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProduct, ProductDTO } from '../api/client';
import { ProductGallery } from '../ui/ProductGallery';
import { useCart } from '../state/CartContext';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductDTO | null>(null);
  const [qty, setQty] = useState(1);
  const { addItem } = useCart();

  useEffect(() => {
    if (!id) return;
    fetchProduct(Number(id)).then(setProduct).catch(() => {});
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <ProductGallery productId={product.id} name={product.name} />
      <div>
        <h1 className="text-2xl font-semibold">{product.name}</h1>
        <div className="mt-2 text-gray-600">{product.description}</div>
        <div className="mt-4 text-2xl font-bold">${product.price.toFixed(2)}</div>
        <div className="mt-6 flex items-center gap-3">
          <input type="number" min={1} value={qty} onChange={e => setQty(Math.max(1, Number(e.target.value)))} className="w-20 border rounded px-2 py-2" />
          <button className="bg-blue-600 text-white rounded px-4 py-2" onClick={() => addItem({ productId: product.id, name: product.name, price: product.price, quantity: qty })}>Add to cart</button>
        </div>
      </div>
    </div>
  );
};


