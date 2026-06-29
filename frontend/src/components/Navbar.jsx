import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";
import { useWishlist } from "./WishlistContext";
import { useState, useEffect } from "react";

const allProducts = [
  { id: 1,  category: "western",     name: "Floral Midi Dress" },
  { id: 2,  category: "western",     name: "Black Maxi Dress" },
  { id: 3,  category: "western",     name: "Yellow Sundress" },
  { id: 4,  category: "western",     name: "Denim Shirt Dress" },
  { id: 5,  category: "western",     name: "Red Bodycon Dress" },
  { id: 6,  category: "western",     name: "White Wrap Dress" },
  { id: 7,  category: "western",     name: "Lavender Tier Dress" },
  { id: 8,  category: "western",     name: "Green Printed Dress" },
  { id: 9,  category: "western",     name: "Polka Dot Dress" },
  { id: 10, category: "western",     name: "Off-Shoulder Dress" },
  { id: 11, category: "western",     name: "Satin Slip Dress" },
  { id: 12, category: "western",     name: "Blazer Dress" },
  { id: 13, category: "party",       name: "Sequin Gown" },
  { id: 14, category: "party",       name: "Velvet Bodycon" },
  { id: 15, category: "party",       name: "Shimmer Co-ord Set" },
  { id: 16, category: "party",       name: "Glitter Blazer" },
  { id: 17, category: "party",       name: "Satin Slip Gown" },
  { id: 18, category: "party",       name: "Feather Trim Top" },
  { id: 19, category: "party",       name: "Ruched Party Dress" },
  { id: 20, category: "party",       name: "Lace Bodysuit + Skirt" },
  { id: 21, category: "party",       name: "Cut-Out Midi Dress" },
  { id: 22, category: "party",       name: "Halter Neck Gown" },
  { id: 23, category: "party",       name: "Asymmetric Hem Dress" },
  { id: 24, category: "party",       name: "Plisse Pleated Gown" },
  { id: 25, category: "traditional", name: "Kanjivaram Silk Saree" },
  { id: 26, category: "traditional", name: "Anarkali Suit" },
  { id: 27, category: "traditional", name: "Lehenga Choli" },
  { id: 28, category: "traditional", name: "Cotton Salwar Kameez" },
  { id: 29, category: "traditional", name: "Langa Voni" },
  { id: 30, category: "traditional", name: "Lucknowi Chikankari" },
  { id: 31, category: "traditional", name: "Embroidered Dupatta Set" },
  { id: 32, category: "traditional", name: "Bandhani Saree" },
  { id: 33, category: "traditional", name: "Mirror Work Kurti" },
  { id: 34, category: "traditional", name: "Gharara Set" },
  { id: 35, category: "traditional", name: "Mundum Neriyathum" },
  { id: 36, category: "traditional", name: "Chaniya Choli" },
];

function Navbar({ search, setSearch }) {
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const { wishlistItems } = useWishlist();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("tv_user");
    if (saved) setUser(JSON.parse(saved));

    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem("tv_user");
      setUser(updatedUser ? JSON.parse(updatedUser) : null);
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("local-login", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("local-login", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("tv_token");
    localStorage.removeItem("tv_user");
    setUser(null);
    window.dispatchEvent(new Event("local-login"));
    navigate("/");
  };

  const results = search.trim()
    ? allProducts.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  const handleSelect = (product) => {
    setSearch(product.name);
    navigate(`/shop/${product.category}`);
  };

  return (
    <nav className="nav">
      <div className="logo" onClick={() => navigate("/")}>
        Trendy<span>Vibe</span>
      </div>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/collections">Collections</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        {user?.role === "ADMIN" && (
          <li><Link to="/admin" style={{ color: "#b76e79" }}>Admin Panel</Link></li>
        )}
        
        {/* FIXED 1: Show the "Your Purchases" link only for logged-in normal users. Route changed to '/my-orders'. */}
        {user && user.role !== "ADMIN" && (
          <li><Link to="/my-orders" className="navbar-dropdown-link">Your Purchases</Link></li>
        )}
      </ul>

      <div className="nav-icons">
        <div style={{ position: "relative" }}>
          <input
            type="text"
            placeholder="Search dresses..."
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && search.trim()) {
                navigate(`/search?q=${search}`);
              }
            }}
          />
          {results.length > 0 && (
            <ul className="search-dropdown">
              {results.map((p) => (
                <li key={p.id} className="search-item" onClick={() => handleSelect(p)}>
                  <span className="search-name">{p.name}</span>
                  <span className="search-cat">{p.category}</span>
                </li>
              ))}
            </ul>
          )}
          {search.trim() && results.length === 0 && (
            <ul className="search-dropdown">
              <li className="search-empty">No results found</li>
            </ul>
          )}
        </div>

        <button className="icon-btn" onClick={() => navigate("/wishlist")}>
          ❤️ {wishlistItems.length > 0 && <span className="cart-count">{wishlistItems.length}</span>}
        </button>

        <button className="icon-btn" onClick={() => navigate("/cart")}>
          🛒 {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
        </button>

        {user ? (
          <>
            {/* FIXED 2: Clicking the username navigates to the '/my-orders' page. */}
            <span className="nav-username" 
                  onClick={() => navigate(user.role === "ADMIN" ? "/admin" : "/my-orders")} 
                  style={{ cursor: "pointer" }}>
              Hi, {user.name}! {user.role === "ADMIN" ? "" : ""}
            </span>
            <button className="login-btn" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <button className="login-btn" onClick={() => navigate("/login")}>Login</button>
            <button className="register-btn" onClick={() => navigate("/register")}>Register</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
