import { createContext, useContext, useEffect, useState } from "react";
import { getCart } from "../utils/Cart";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(getCart());

  // update cart when localStorage changes (e.g. from another tab/component)
  useEffect(() => {
    const syncCart = () => setCart(getCart());
    window.addEventListener("storage", syncCart);
    return () => window.removeEventListener("storage", syncCart);
  }, []);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
