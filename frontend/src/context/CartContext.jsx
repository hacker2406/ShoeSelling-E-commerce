import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./Authcontext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { getToken } = useAuth();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch cart from backend on mount
  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      try {
        const token = getToken();
        if (!token) return;
        const { data } = await axios.get("http://localhost:5000/api/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCart(data.items || []);
      } catch {
        setCart([]);
      }
      setLoading(false);
    };
    fetchCart();
    // eslint-disable-next-line
  }, [getToken]);

  // Add to cart
  const addToCart = async (product, quantity, size) => {
    const token = getToken();
    const { data } = await axios.post(
      "http://localhost:5000/api/cart",
      { product, quantity, size },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setCart(data.items || []);
  };

  // Remove from cart
  const removeFromCart = async (itemId) => {
    const token = getToken();
    const { data } = await axios.delete(
      `http://localhost:5000/api/cart/${itemId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setCart(data.items || []);
  };

  // Clear cart
  const clearCart = async () => {
    const token = getToken();
    await axios.delete("http://localhost:5000/api/cart", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, loading, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);