import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MyOrder.css";

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";


export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("tv_token");

  useEffect(() => {
    if (!token) { 
      navigate("/login"); 
      return; 
    }
    
   fetch(`${API_URL}/api/orders`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch orders");
        return res.json();
      })
      .then(data => { 
        console.log("Raw Orders Data from Backend:", data); // Check your browser console
        setOrders(data); 
        setLoading(false); 
      })
      .catch(err => {
        console.error("Fetch orders error:", err);
        setLoading(false);
      });
  }, [token, navigate]);

  if (loading) return <p style={{ textAlign: "center", padding: 80, color: "#b76e79" }}>Loading orders...</p>;

  if (!orders || orders.length === 0) return (
    <div style={{ textAlign: "center", padding: 80 }}>
      <h2 style={{ color: "#555" }}>No orders yet! </h2>
      <button onClick={() => navigate("/collections")}
        style={{ marginTop: 20, background: "#b76e79", color: "#fff", border: "none", padding: "12px 28px", borderRadius: 8, cursor: "pointer", fontSize: 15 }}>
        Shop Now
      </button>
    </div>
  );

  return (
    <div className="orders-page">
      <h2 className="orders-title">My Orders </h2>
      {orders.map((o) => {
        // Safe Parsing Layer
        let parsedItems = [];
        try {
          if (o.items) {
            if (typeof o.items === "string") {
              parsedItems = JSON.parse(o.items);
            } else if (Array.isArray(o.items)) {
              parsedItems = o.items;
            }
          }
        } catch (e) {
          console.error("Error parsing items for order id " + o.id, e);
        }

        return (
          <div key={o.id} className="order-card" style={{ border: "1px solid #ddd", padding: "20px", marginBottom: "15px", borderRadius: "8px" }}>
            <div className="order-card-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              
              <h3 className="order-id">Order #{o.orderNumber || o.id}</h3>
              
              <span className={`order-status ${o.status ? o.status.toLowerCase() : "pending"}`} style={{ fontWeight: "bold" }}>
                {o.status || "PENDING"}
              </span>
            </div>
            <p className="order-address" style={{ margin: "5px 0" }}>📍 {o.address}</p>
            <p className="order-payment" style={{ margin: "5px 0" }}>💳 {o.paymentMethod}</p>
            
            {/* Displaying items map */}
            <div className="order-items-summary" style={{ background: "#f9f9f9", padding: "10px", margin: "10px 0", borderRadius: "5px" }}>
              {Array.isArray(parsedItems) && parsedItems.length > 0 ? (
                parsedItems.map((item, index) => (
                  <div key={index} style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", padding: "4px 0" }}>
                    <span>{item.name || "Product"} ({item.size || "N/A"})</span>
                    <span><strong>Qty: {item.qty || 1}</strong></span>
                  </div>
                ))
              ) : (
                <span style={{ fontSize: "13px", color: "#888" }}>View details in summary total</span>
              )}
            </div>

            <p className="order-total" style={{ fontWeight: "bold", fontSize: "16px", marginTop: "10px" }}>Total: ₹{o.totalPrice}</p>
          </div>
        );
      })}
    </div>
  );
}