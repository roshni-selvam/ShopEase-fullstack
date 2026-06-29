import { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("tv_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const [wishlistItems, setWishlistItems] = useState([]);

  // Login event- update 
  useEffect(() => {
    const handleLoginEvent = () => {
      const savedUser = localStorage.getItem("tv_user");
      setUser(savedUser ? JSON.parse(savedUser) : null);
    };
    window.addEventListener("local-login", handleLoginEvent);
    return () => window.removeEventListener("local-login", handleLoginEvent);
  }, []);

  // User maarumpodhu unique email-a vachu data-va load panrom
  useEffect(() => {
    if (user && user.email) {
      const userKey = `tv_wishlist_${user.email}`;
      const localData = localStorage.getItem(userKey);
      setWishlistItems(localData ? JSON.parse(localData) : []);
    } else {
      setWishlistItems([]);
    }
  }, [user]);

  // Sync back to local storage when wishlist change
  useEffect(() => {
    if (user && user.email) {
      const userKey = `tv_wishlist_${user.email}`;
      localStorage.setItem(userKey, JSON.stringify(wishlistItems));
    }
  }, [wishlistItems, user]);

  //  FIXED: Backend custom keys (productId) & local values (id) rendaiyume dynamic-ah dynamic fallback handle !
  const toggleWishlist = (product) => {
    const targetId = product.productId || product.id;

    setWishlistItems((prev) => {
      const exists = prev.some((p) => (p.productId || p.id) === targetId);
      if (exists) {
        return prev.filter((p) => (p.productId || p.id) !== targetId);
      } else {
        return [...prev, product];
      }
    });
  };

  //  FIXED: Dynamic comparison path
  const isWishlisted = (id) => {
    return wishlistItems.some((p) => (p.productId || p.id) === id);
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, toggleWishlist, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}


