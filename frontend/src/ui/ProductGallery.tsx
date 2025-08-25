import React, { useMemo, useState } from 'react';
import { ProductImage } from './ProductImage';

type Props = {
  productId: number;
  name: string;
};

export const ProductGallery: React.FC<Props> = ({ productId, name }) => {
  const images = useMemo(() => [0, 1, 2, 3].map(i => productId + i), [productId]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoom, setZoom] = useState(false);
  const activeId = images[activeIndex];

  return (
    <div>
      <div className="relative overflow-hidden rounded border">
        <div
          className={`relative ${zoom ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
          onClick={() => setZoom(z => !z)}
        >
          <ProductImage
            productId={activeId}
            alt={name}
            className={`w-full h-80 object-cover transition-transform ${zoom ? 'scale-150' : 'scale-100'}`}
          />
        </div>
      </div>
      <div className="mt-3 grid grid-cols-4 gap-2">
        {images.map((id, idx) => (
          <button key={id} onClick={() => setActiveIndex(idx)} className={`border rounded overflow-hidden ${activeIndex === idx ? 'ring-2 ring-blue-600' : ''}`}>
            <ProductImage productId={id} alt={`${name} ${idx + 1}`} className="w-full h-20 object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
};


