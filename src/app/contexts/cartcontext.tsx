// File: src/app/contexts/cartcontext.tsx

import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
  } from 'react';
  
  export interface CartItem {
    id: string; // Unique identifier for the product (using slug in our case)
    name: string;
    price: number;
    discountedPrice?: number | null;
    imageUrl: string;
    slug: string;
    quantity: number;
  }
  
  interface CartContextType {
    cartItems: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, action: 'increase' | 'decrease') => void;
    clearCart: () => void;
    getTotalPrice: () => number;
  }
  
  const CartContext = createContext<CartContextType | undefined>(undefined);
  
  export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
    // Load cart items from localStorage when the component mounts
    useEffect(() => {
      const storedCart = localStorage.getItem('cartItems');
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    }, []);
  
    // Save cart items to localStorage whenever they change
    useEffect(() => {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);
  
    const addToCart = (item: CartItem) => {
      setCartItems((prevItems) => {
        // Check if the item is already in the cart using its unique id
        const existingItem = prevItems.find((cartItem) => cartItem.id === item.id);
        if (existingItem) {
          // Increase the quantity if it already exists
          return prevItems.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          );
        }
        // Otherwise, add it as a new item
        return [...prevItems, item];
      });
    };
  
    const removeFromCart = (id: string) => {
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };
  
    const updateQuantity = (id: string, action: 'increase' | 'decrease') => {
      setCartItems((prevItems) =>
        prevItems.map((item) => {
          if (item.id === id) {
            if (action === 'increase') {
              return { ...item, quantity: item.quantity + 1 };
            } else {
              return { ...item, quantity: Math.max(1, item.quantity - 1) };
            }
          }
          return item;
        })
      );
    };
  
    const clearCart = () => {
      setCartItems([]);
    };
  
    const getTotalPrice = () => {
      return cartItems.reduce((total, item) => {
        // Use discountedPrice if it exists and is lower than price
        const effectivePrice =
          item.discountedPrice && item.discountedPrice < item.price
            ? item.discountedPrice
            : item.price;
        return total + effectivePrice * item.quantity;
      }, 0);
    };
  
    return (
      <CartContext.Provider
        value={{
          cartItems,
          addToCart,
          removeFromCart,
          updateQuantity,
          clearCart,
          getTotalPrice,
        }}
      >
        {children}
      </CartContext.Provider>
    );
  };
  
  // Custom hook for accessing the cart context
  export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
      throw new Error('useCart must be used within a CartProvider');
    }
    return context;
  };
  