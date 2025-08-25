import React from 'react';
import { FacebookIcon, InstagramIcon, TwitterIcon } from './Icons';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t mt-8 bg-gradient-to-r from-lime-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-600">© {new Date().getFullYear()} Marketplace. All rights reserved.</div>
        <div className="flex items-center gap-3">
          <a href="#" className="text-blue-600 hover:opacity-80" aria-label="Facebook"><FacebookIcon /></a>
          <a href="#" className="text-blue-600 hover:opacity-80" aria-label="Twitter"><TwitterIcon /></a>
          <a href="#" className="text-blue-600 hover:opacity-80" aria-label="Instagram"><InstagramIcon /></a>
        </div>
      </div>
    </footer>
  );
};


