import { useState } from "react";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export default function Checkout() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  
  const [placedOrder, setPlacedOrder] = useState(null); 

  const [address, setAddress] = useState({
    name: "", phone: "", pincode: "", city: "", state: "", street: "",
  });
  const [payment, setPayment] = useState("cod");
  const [upi, setUpi] = useState("");
  const [card, setCard] = useState({ number: "", name: "", expiry: "", cvv: "" });

  const delivery = 49;
  const grand = totalPrice + delivery;

  const handleAddressNext = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("tv_token");

    if (!token) {
      alert("Please login first!");
      navigate("/login");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: JSON.stringify(cartItems),
          totalPrice: grand,
          address: `${address.street}, ${address.city}, ${address.state} - ${address.pincode}`,
          paymentMethod: payment.toUpperCase(),
           phoneNumber: address.phone 
        }),
      });

      if (res.ok) {
        const orderData = await res.json(); 
        setPlacedOrder(orderData);        
        clearCart();
        setStep(3); // Proceeds to success step
      } else {
        const errorText = await res.text();
        console.error("Backend Error Details:", errorText);
        alert(`Order failed! Server says: ${errorText || res.statusText}`);
      }
    } catch (err) {
      console.error("Order error:", err);
      alert("Server connection failed!");
    }
  };

  return (
    <div className="checkout-page">
      <h2 className="checkout-title">Checkout</h2>

      <div className="steps">
        <div className={`step ${step >= 1 ? "active" : ""}`}>1. Delivery Address</div>
        <div className="step-line" />
        <div className={`step ${step >= 2 ? "active" : ""}`}>2. Payment</div>
        <div className="step-line" />
        <div className={`step ${step === 3 ? "active" : ""}`}>3. Success</div>
      </div>

      <div className="checkout-layout">
        <div className="checkout-form-wrap">

          {step === 1 && (
            <form className="checkout-form" onSubmit={handleAddressNext}>
              <h3>Delivery Address</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name</label>
                  <input required placeholder="" value={address.name}
                    onChange={(e) => setAddress({ ...address, name: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input required placeholder="" value={address.phone}
                    onChange={(e) => setAddress({ ...address, phone: e.target.value })} />
                </div>
              </div>
              <div className="form-group">
                <label>Street / Area</label>
                <input required placeholder="" value={address.street}
                  onChange={(e) => setAddress({ ...address, street: e.target.value })} />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>City</label>
                  <input required placeholder="" value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>State</label>
                  <input required placeholder="" value={address.state}
                    onChange={(e) => setAddress({ ...address, state: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Pincode</label>
                  <input required placeholder="" value={address.pincode}
                    onChange={(e) => setAddress({ ...address, pincode: e.target.value })} />
                </div>
              </div>
              <button type="submit" className="checkout-btn">Continue to Payment →</button>
            </form>
          )}

          {step === 2 && (
            <form className="checkout-form" onSubmit={handlePlaceOrder}>
              <h3>Payment Method</h3>
              <div className="payment-options">
                <label className={`payment-card ${payment === "cod" ? "selected" : ""}`}>
                  <input type="radio" value="cod" checked={payment === "cod"} onChange={() => setPayment("cod")} />
                  <span>💵 Cash on Delivery</span>
                </label>
                <label className={`payment-card ${payment === "upi" ? "selected" : ""}`}>
                  <input type="radio" value="upi" checked={payment === "upi"} onChange={() => setPayment("upi")} />
                  <span>📱 UPI</span>
                </label>
                <label className={`payment-card ${payment === "card" ? "selected" : ""}`}>
                  <input type="radio" value="card" checked={payment === "card"} onChange={() => setPayment("card")} />
                  <span>💳 Credit / Debit Card</span>
                </label>
              </div>

              {payment === "upi" && (
                <div className="form-group">
                  <label>UPI ID</label>
                  <input required placeholder="rose@upi" value={upi} onChange={(e) => setUpi(e.target.value)} />
                </div>
              )}

              {payment === "card" && (
                <div className="card-fields">
                  <div className="form-group">
                    <label>Card Number</label>
                    <input required maxLength={16} placeholder="1234 5678 9012 3456"
                      value={card.number} onChange={(e) => setCard({ ...card, number: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label>Name on Card</label>
                    <input required placeholder="Rose P"
                      value={card.name} onChange={(e) => setCard({ ...card, name: e.target.value })} />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Expiry</label>
                      <input required placeholder="MM/YY"
                        value={card.expiry} onChange={(e) => setCard({ ...card, expiry: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label>CVV</label>
                      <input required maxLength={3} placeholder="123"
                        value={card.cvv} onChange={(e) => setCard({ ...card, cvv: e.target.value })} />
                    </div>
                  </div>
                </div>
              )}

              <div className="checkout-actions">
                <button type="button" className="back-btn" onClick={() => setStep(1)}>← Back</button>
                <button type="submit" className="checkout-btn">Place Order ✓</button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className="order-success-msg" style={{ textAlign: "center", padding: "40px 20px" }}>
              <h2 style={{ color: "#2ecc71", fontSize: "2rem" }}> Order Placed Successfully!</h2>
              {placedOrder && (
                <div style={{ background: "#fdf4f5", padding: "12px", borderRadius: "8px", margin: "15px auto", maxWidth: "350px", border: "1px dashed #b76e79" }}>
                  <p style={{ margin: 0, color: "#333", fontWeight: "600", fontSize: "15px" }}>
                    Order Number: <span style={{ color: "#b76e79", fontFamily: "monospace", fontSize: "16px" }}>{placedOrder.orderNumber || placedOrder.id}</span>
                  </p>
                </div>
              )}
              
              <p style={{ margin: "15px 0", color: "#555" }}>Thank you for shopping with TrendyVibe.</p>
              <button onClick={() => navigate("/my-orders")} className="checkout-btn" style={{ width: "auto", padding: "10px 20px" }}>
                View My Orders 
              </button>
            </div>
          )}
        </div>
        {step !== 3 && (
          <div className="checkout-summary">
            <h3>Order Summary</h3>
            <div className="summary-items">
              {cartItems.map((item) => {
                const fp = Math.round((item.price || 0) - ((item.price || 0) * (item.discount || 0)) / 100);
                const currentQty = item.quantity || 1; 

                return (
                  <div className="summary-item" key={`${item.id}-${item.size}`}>
                    <img src={item.image} alt={item.name} />
                    <div>
                      <p className="s-name">{item.name}</p>
                      <p className="s-meta">Size: {item.size || "M"} · Qty: {currentQty}</p>
                      <p className="s-price">₹{fp * currentQty}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="summary-divider" />
            <div className="summary-row"><span>Items Total</span><span>₹{totalPrice}</span></div>
            <div className="summary-row"><span>Delivery</span><span>₹{delivery}</span></div>
            <div className="summary-divider" />
            <div className="summary-row total"><span>Grand Total</span><span>₹{grand}</span></div>
          </div>
        )}
      </div>
    </div>
  );
}

