import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { useAuth } from './AuthContext';

export type CartItem = {
  productId: number;
  name: string;
  price: number;
  quantity: number;
};

type CartState = {
  items: CartItem[];
};

type CartAction =
  | { type: 'ADD_ITEM'; item: CartItem }
  | { type: 'REMOVE_ITEM'; productId: number }
  | { type: 'UPDATE_QTY'; productId: number; quantity: number }
  | { type: 'CLEAR' }
  | { type: 'REPLACE'; state: CartState };

const initialState: CartState = { items: [] };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(i => i.productId === action.item.productId);
      if (existing) {
        return {
          items: state.items.map(i => i.productId === action.item.productId ? { ...i, quantity: i.quantity + action.item.quantity } : i)
        };
      }
      return { items: [...state.items, action.item] };
    }
    case 'REMOVE_ITEM':
      return { items: state.items.filter(i => i.productId !== action.productId) };
    case 'UPDATE_QTY':
      return { items: state.items.map(i => i.productId === action.productId ? { ...i, quantity: action.quantity } : i) };
    case 'CLEAR':
      return { items: [] };
    case 'REPLACE':
      return action.state;
    default:
      return state;
  }
}

type CartContextValue = {
  state: CartState;
  addItem: (item: CartItem) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clear: () => void;
  subtotal: number;
  hasUser: boolean;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();

  function getStorageKey(): string | null {
    return user ? `cart_state_user_${user.id}` : null;
  }

  const [state, dispatch] = useReducer(cartReducer, undefined, () => {
    const key = getStorageKey();
    const persisted = key ? localStorage.getItem(key) : null;
    return persisted ? JSON.parse(persisted) as CartState : initialState;
  });

  // Persist whenever cart or identity changes
  useEffect(() => {
    const key = getStorageKey();
    if (key) {
      localStorage.setItem(key, JSON.stringify(state));
    }
  }, [state, user]);

  // When identity changes, load that identity's cart
  useEffect(() => {
    const key = getStorageKey();
    if (key) {
      const persisted = localStorage.getItem(key);
      const nextState = persisted ? (JSON.parse(persisted) as CartState) : initialState;
      dispatch({ type: 'REPLACE', state: nextState });
    } else {
      dispatch({ type: 'REPLACE', state: initialState });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const value = useMemo<CartContextValue>(() => ({
    state,
    addItem: (item) => { if (!user) return; dispatch({ type: 'ADD_ITEM', item }); },
    removeItem: (productId) => { if (!user) return; dispatch({ type: 'REMOVE_ITEM', productId }); },
    updateQuantity: (productId, quantity) => { if (!user) return; dispatch({ type: 'UPDATE_QTY', productId, quantity }); },
    clear: () => { if (!user) return; dispatch({ type: 'CLEAR' }); },
    subtotal: state.items.reduce((s, i) => s + i.price * i.quantity, 0),
    hasUser: !!user,
  }), [state, user]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}


