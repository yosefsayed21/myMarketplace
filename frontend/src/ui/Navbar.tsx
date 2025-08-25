import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../state/CartContext';
import { useAuth } from '../state/AuthContext';
import { CartIcon, LogoIcon, SearchIcon, UserIcon } from './Icons';

export const Navbar: React.FC = () => {
  const { state } = useCart();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const itemsCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <header className="border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2 text-xl font-semibold text-blue-700">
          <LogoIcon size={24} className="text-lime-500" />
          <span>Marketplace</span>
        </Link>
        <div className="hidden md:flex items-center flex-1 max-w-xl">
          <div className="w-full flex items-center border rounded-full px-3 py-2 bg-white">
            <SearchIcon className="text-gray-500" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products (coming soon)" className="ml-2 w-full outline-none" />
          </div>
        </div>
        <nav className="ml-auto flex items-center gap-4">
          <NavLink to="/shop" className={({isActive}) => isActive ? 'text-blue-700 font-medium' : 'text-gray-700'}>Shop</NavLink>
          {user && (
            <NavLink to="/cart" className={({isActive}) => isActive ? 'text-blue-700 font-medium flex items-center gap-1' : 'text-gray-700 flex items-center gap-1'}>
              <CartIcon className="text-lime-600" />
              <span>Cart</span>
              {itemsCount > 0 && <span className="ml-1 inline-flex items-center justify-center rounded-full bg-blue-600 text-white text-xs w-5 h-5">{itemsCount}</span>}
            </NavLink>
          )}
          {user ? (
            <div className="relative">
              <button onMouseEnter={() => setMenuOpen(true)} onMouseLeave={() => setMenuOpen(false)} className="flex items-center gap-2 text-gray-700">
                <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.username || user.email)}&backgroundType=gradientLinear&scale=110`} alt={user.username} className="w-8 h-8 rounded-full border" />
                <span className="hidden sm:inline max-w-[140px] truncate">{user.username}</span>
              </button>
              {menuOpen && (
                <div onMouseEnter={() => setMenuOpen(true)} onMouseLeave={() => setMenuOpen(false)} className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-50">
                  <button onClick={logout} className="block w-full text-left px-3 py-2 hover:bg-gray-50">Logout</button>
                </div>
              )}
            </div>
          ) : (
            <NavLink to="/auth" className={({isActive}) => isActive ? 'text-blue-700 font-medium flex items-center gap-1' : 'text-gray-700 flex items-center gap-1'}>
              <UserIcon />
              <span>Login</span>
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
};


