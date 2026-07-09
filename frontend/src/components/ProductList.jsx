import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./ProductList.css";
import { useCart } from "./CartContext";
import { useWishlist } from "./WishlistContext";

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";


const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

export default function ProductList({ search }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { category } = useParams();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState({});
  const [cartMsg, setCartMsg] = useState(null);

  // products fetch
  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/api/products/category/${category}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setLoading(false);
      });
  }, [category]);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  //  DEFINE IF THE CURRENT CATEGORY REQUIRES SIZES
  const currentCategory = category?.trim().toLowerCase();
  const showSizes = 
    currentCategory !== "saree" && 
    currentCategory !== "sarees" && 
    currentCategory !== "traditional";

  const handleCart = (item) => {
    // 1. Validation check for regular clothes
    if (showSizes && !selectedSize[item.id]) {
      setCartMsg(` Select the Size — "${item.name}"`);
      setTimeout(() => setCartMsg(null), 2500);
      return;
    }

    // 2. Automate Free Size fallback safely for sarees
    const finalSize = showSizes ? selectedSize[item.id] : "Free Size";
    
    addToCart(item, finalSize);
    setCartMsg(`"${item.name}" · ${finalSize} added to cart!`);
    setTimeout(() => setCartMsg(null), 2500);
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "80px" }}>
        <p style={{ fontSize: "18px", color: "#b76e79" }}>Loading products...</p>
      </div>
    );
  }

  return (
    <div className="shop">
      <div className="shop-header">
        <p className="shop-sub">✦ TrendyVibe Collection</p>
        <h2 className="shop-title" style={{ textTransform: "capitalize" }}>
          {category} Wear
        </h2>
      </div>

      {cartMsg && <div className="pl-toast">{cartMsg}</div>}

      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px" }}>
          <p style={{ color: "#888", fontSize: "16px" }}>No products found!</p>
        </div>
      )}
      
      <button
        onClick={() => navigate(-1)}
        style={{
          background: "none", border: "none",
          color: "#b76e79", fontSize: 14,
          cursor: "pointer", fontWeight: 600,
          marginBottom: 16, display: "block"
        }}
      >
        ← Back
      </button>

      <div className="grid">
        {filtered.map((p) => {
          const finalPrice = Math.round(p.price - (p.price * p.discount) / 100);
          return (
            <div
              className="card"
              key={p.id}
              onClick={() => navigate(`/product/${p.id}`)}
              style={{ cursor: "pointer" }}
            >
              <div className="card-img-wrap">
                <img src={p.image} alt={p.name} loading="lazy" />
                <span className="card-badge">{p.discount}% OFF</span>
                <button
                  className={`card-heart ${isWishlisted(p.id) ? "loved" : ""}`}
                  onClick={(e) => { e.stopPropagation(); toggleWishlist(p); }}
                >
                  {isWishlisted(p.id) ? "♥" : "♡"}
                </button>
              </div>

              <div className="info">
                <h4 className="card-name">{p.name}</h4>
                <p className="card-cloth"> {p.cloth}</p>
                <div className="card-price-row">
                  <span className="card-final">₹{finalPrice}</span>
                  <span className="card-original">₹{p.price}</span>
                </div>

                {/*  CONDITIONALLY SHOW OR RENDER A BLANK STRUCTURAL SPACER */}
                {showSizes ? (
  <div className="size-wrap">
    <p className="size-label">
      Size: <span className="size-chosen">{selectedSize[p.id] || " —"}</span>
    </p>
    <div className="sizes">
      {SIZES.map((s) => (
        <button
          key={s}
          className={`size-btn ${selectedSize[p.id] === s ? "active" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedSize((prev) => ({ ...prev, [p.id]: s }));
          }}
        >
          {s}
        </button>
      ))}
    </div>
  </div>
) : null}  
                <button
                  className="cart-btn"
                  onClick={(e) => { e.stopPropagation(); handleCart(p); }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}