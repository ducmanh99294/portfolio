import React, { createContext, useContext, useReducer, ReactNode, useEffect, useState } from 'react';
import { CartItem, SavedItem, CartState } from '../types/cart';
import { getCart, addToCartApi, clearCartApi, deleteItems, updateCart } from '../api/cartApi';

interface CartContextType {
  state: CartState;
  addToCart: (productId: string) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  addToSaved: (item: SavedItem) => void;
  removeFromSaved: (id: string) => void;
  moveToCart: (item: SavedItem) => void;
  applyDiscount: (code: string) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
  getTotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

type CartAction =
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'ADD_TO_SAVED'; payload: SavedItem }
  | { type: 'REMOVE_FROM_SAVED'; payload: string }
  | { type: 'MOVE_TO_CART'; payload: SavedItem }
  | { type: 'APPLY_DISCOUNT'; payload: string }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartState };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.items.find((item:any) => item.id === action.payload.id);
      
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item:any) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    }
    
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter((item:any) => item.id !== action.payload)
      };
    
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map((item:any) =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(1, action.payload.quantity) }
            : item
        )
      };
    
    case 'ADD_TO_SAVED':
      return {
        ...state,
        savedItems: [...state.savedItems, action.payload]
      };
    
    case 'REMOVE_FROM_SAVED':
      return {
        ...state,
        savedItems: state.savedItems.filter((item:any) => item.id !== action.payload)
      };
    
    case 'MOVE_TO_CART': {
      const cartItem: CartItem = {
        id: action.payload.id,
        productId: action.payload.productId,
        name: action.payload.name,
        category: action.payload.category,
        description: '',
        images: action.payload.images,
        price: action.payload.price,
        quantity: 1,
        type: 'physical'
      };
      
      return {
        ...state,
        items: [...state.items, cartItem],
        savedItems: state.savedItems.filter((item:any) => item.id !== action.payload.id)
      };
    }
    
    case 'APPLY_DISCOUNT':
      const discountAmount = action.payload === 'SAVE10' ? 0.1 : // 10% discount
                            action.payload === 'SAVE20' ? 0.2 : // 20% discount
                            0;
      
      return {
        ...state,
        discountCode: action.payload,
        discountAmount
      };
    
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        discountCode: '',
        discountAmount: 0
      };
    
    case 'LOAD_CART':
      return action.payload;
    
    default:
      return state;
  }
};

const initialState: CartState = {
  items: [],
  savedItems: [],
  discountCode: '',
  discountAmount: 0,
  shippingCost: 9.99,
  taxRate: 0.1 // 10%
};

const mapBackendCartToState = (data: any): CartState => {
  return {
    items: data.items.map((item: any) => ({
      id: item._id,
      productId: item.product._id,
      name: item.product.name,
      category: item.product.category,
      description: item.product.description || '',
      images: item.product.images || [],
      price: item.product.price,
      quantity: item.quantity,
      type: 'physical'
    })),
    savedItems: [],
    discountCode: '',
    discountAmount: 0,
    shippingCost: 9.99,
    taxRate: 0.1
  };
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await getCart(); // backend trả cart
        const mappedCart = mapBackendCartToState(data);
        dispatch({ type: 'LOAD_CART', payload: mappedCart });
      } catch (e) {
        console.error('Fetch cart failed', e);
      }
    };

    fetchCart();
  }, []);

  // Save cart to localStorage on update
  const addToCart = async (productId: string) => {
    await addToCartApi(productId);
    const data = await getCart();
    dispatch({ type: 'LOAD_CART', payload: mapBackendCartToState(data) });
  };

  const removeFromCart = async (id: string) => {
    await deleteItems(id);
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    await updateCart(itemId, quantity);
    const data = await getCart();
    dispatch({ type: 'LOAD_CART', payload: mapBackendCartToState(data) });
  };

  const addToSaved = (item: SavedItem) => {
    dispatch({ type: 'ADD_TO_SAVED', payload: item });
  };

  const removeFromSaved = (id: string) => {
    dispatch({ type: 'REMOVE_FROM_SAVED', payload: id });
  };

  const moveToCart = (item: SavedItem) => {
    dispatch({ type: 'MOVE_TO_CART', payload: item });
  };

  const applyDiscount = (code: string) => {
    dispatch({ type: 'APPLY_DISCOUNT', payload: code });
  };

  const clearCart = async () => {
    await clearCartApi();
    const data = await getCart();
    dispatch({ type: 'LOAD_CART', payload: mapBackendCartToState(data) });
  };

  const getTotalItems = () => {
    return state.items.reduce((total:any, item:any) => total + item.quantity, 0);
  };

  const getSubtotal = () => {
    return state.items.reduce((total:any, item:any) => total + (item.price * item.quantity), 0);
  };

  const getTotal = () => {
    const subtotal = getSubtotal();
    const discount = subtotal * state.discountAmount;
    const tax = (subtotal - discount) * state.taxRate;
    const shipping = subtotal > 100 ? 0 : state.shippingCost; // Free shipping over $100
    
    return subtotal - discount + tax + shipping;
  };

  return (
    <CartContext.Provider value={{
      state,
      addToCart,
      removeFromCart,
      updateQuantity,
      addToSaved,
      removeFromSaved,
      moveToCart,
      applyDiscount,
      clearCart,
      getTotalItems,
      getSubtotal,
      getTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};