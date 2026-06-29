import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("tv_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [cartItems, setCartItems] = useState([]);

  // Watch for dynamic login/logout notifications
  useEffect(() => {
    const handleLoginEvent = () => {
      const savedUser = localStorage.getItem("tv_user");
      setUser(savedUser ? JSON.parse(savedUser) : null);
    };
    window.addEventListener("local-login", handleLoginEvent);
    return () => window.removeEventListener("local-login", handleLoginEvent);
  }, []);

  // Load user specific cart on login
  useEffect(() => {
    if (user && user.email) {
      const userKey = `tv_cart_${user.email}`;
      const localCart = localStorage.getItem(userKey);
      setCartItems(localCart ? JSON.parse(localCart) : []);
    } else {
      setCartItems([]);
    }
  }, [user]);

  // Save changes to user specific key in localStorage
  useEffect(() => {
    if (user && user.email) {
      const userKey = `tv_cart_${user.email}`;
      localStorage.setItem(userKey, JSON.stringify(cartItems));
    }
  }, [cartItems, user]);

  //  FIXED: Single object parameter (productWithVariants)
  const addToCart = (productWithVariants) => {
    setCartItems((prevItems) => {
     
      const exist = prevItems.find(
        (item) =>
          item.id === productWithVariants.id &&
          item.size === productWithVariants.size &&
          item.color === productWithVariants.color
      );

      if (exist) {
        return prevItems.map((item) =>
          item.id === productWithVariants.id &&
          item.size === productWithVariants.size &&
          item.color === productWithVariants.color
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }
      
      
      return [...prevItems, { ...productWithVariants, quantity: 1 }];
    });
  };
  const removeFromCart = (id, size, color) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => !(item.id === id && item.size === size && item.color === color))
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };
  const totalPrice = cartItems.reduce((acc, item) => {
    const finalPrice = Math.round(
      (item.price || 0) - ((item.price || 0) * (item.discount || 0)) / 100
    );
    return acc + finalPrice * (item.quantity || 1);
  }, 0);

  const totalItems = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        clearCart,
        totalPrice,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}