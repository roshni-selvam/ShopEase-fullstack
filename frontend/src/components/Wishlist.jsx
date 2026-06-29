import "./Wishlist.css";
import { useWishlist } from "./WishlistContext";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";

export default function Wishlist() {
  const { wishlistItems, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Safe check: null array checking handles smoothly
  if (!wishlistItems || wishlistItems.length === 0) {
    return (
      <div className="wishlist-empty">
        <h2>Your Wishlist is empty ❤️</h2>
        <p>Save your favorite items here!</p>
        <button onClick={() => navigate("/collections")}>Shop Now</button>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <h2 className="wishlist-title">My Wishlist ❤️</h2>
      <div className="wishlist-grid">
        {wishlistItems.map((p) => {
          // Fallback check to avoid NaN error if database key is slightly different
          const itemPrice = p.price || 0;
          const itemDiscount = p.discount || 0;
          const finalPrice = Math.round(itemPrice - (itemPrice * itemDiscount) / 100);
          
          // Using unique product identifiers safely 
          const itemUniqueId = p.productId || p.id;

          return (
            <div className="wishlist-card" key={itemUniqueId}>
              <img src={p.image} alt={p.name} />
              <button className="remove-btn" onClick={() => toggleWishlist(p)}>✕</button>
              <div className="wishlist-info">
                <h4>{p.name}</h4>
                <p className="w-cloth"> {p.cloth || "Premium Fabric"}</p>
                <div className="w-price-row">
                  <span className="w-final">₹{finalPrice}</span>
                  <span className="w-original">₹{itemPrice}</span>
                  <span className="w-discount">{itemDiscount}% OFF</span>
                </div>
                <button className="move-cart-btn" onClick={() => { addToCart(p, "M"); toggleWishlist(p); }}>
                  Move to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}