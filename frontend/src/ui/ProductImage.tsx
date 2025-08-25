import React, { useMemo, useState } from 'react';

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
  productId: number;
};

// Stable and reliable placeholders using picsum seed; fallback to placehold.co
function buildSources(productId: number, size: { w: number; h: number }) {
  const seed = productId || Math.floor(Math.random() * 1000000);
  const sources = [
    `https://picsum.photos/seed/${seed}/$${size.w}/$${size.h}`.replace('$', ''),
    `https://picsum.photos/seed/${seed + 1}/$${size.w}/$${size.h}`.replace('$', ''),
    `https://placehold.co/${size.w}x${size.h}/e5f7d0/1e40af?font=montserrat&text=Product`,
  ];
  return sources;
}

export const ProductImage: React.FC<Props> = ({ productId, alt, width, height, ...imgProps }) => {
  const size = useMemo(() => {
    const w = typeof width === 'number' ? width : 600;
    const h = typeof height === 'number' ? height : 400;
    return { w, h };
  }, [width, height]);
  const sources = useMemo(() => buildSources(productId, size), [productId, size]);
  const [index, setIndex] = useState(0);

  return (
    <img
      {...imgProps}
      alt={alt}
      src={sources[index]}
      onError={() => setIndex(i => Math.min(i + 1, sources.length - 1))}
    />
  );
};


