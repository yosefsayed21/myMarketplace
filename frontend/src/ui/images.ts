const productImages = [
  'https://images.unsplash.com/photo-1512446733611-9099a758e63e?w=600&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1526178610437-8a43f1d2d86f?w=600&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&auto=format&fit=crop&q=60',
];

export function getProductImageById(id: number): string {
  const idx = id % productImages.length;
  return productImages[idx];
}

export function getRandomProductImage(seed?: number): string {
  if (typeof seed === 'number') return productImages[seed % productImages.length];
  const idx = Math.floor(Math.random() * productImages.length);
  return productImages[idx];
}


