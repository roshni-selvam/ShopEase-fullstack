import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminPanel.css";

export default function AdminPanel() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]); //  Added state for users list
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const [editProduct, setEditProduct] = useState(null);

  // Initially nothing open
  const [activeTab, setActiveTab] = useState("");

  const [form, setForm] = useState({
    name: "",
    category: "western",
    cloth: "",
    price: "",
    discount: "",
    image: "",
  });

  const token = localStorage.getItem("tv_token");
  const user = JSON.parse(localStorage.getItem("tv_user") || "{}");

  useEffect(() => {
    if (!token || user.role !== "ADMIN") {
      navigate("/");
      return;
    }

    fetchProducts();
    fetchOrders();
    fetchUsers(); // Initial load users fetch loop call
  }, []);

  //  PRODUCTS
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/api/products");
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  //  ORDERS 
  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/admin/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error(err);
    }
  };

  // USERS FETCH 
  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  //  FORM 
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  //  ADD PRODUCT
  const handleAdd = async () => {
    if (!form.name || !form.price) {
      setMsg("Name & Price required!");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/admin/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          price: parseFloat(form.price),
          discount: parseInt(form.discount) || 0,
        }),
      });

      if (res.ok) {
        setMsg(" Product Added!");
        setForm({
          name: "",
          category: "western",
          cloth: "",
          price: "",
          discount: "",
          image: "",
        });
        fetchProducts();
      } else {
        setMsg(" Failed to add product");
      }
    } catch (err) {
      console.error(err);
      setMsg("🔌 Server Error");
    }
    setTimeout(() => setMsg(""), 2500);
  };

  //  EDIT 
  const handleEditClick = (product) => {
    setEditProduct(product);
    setForm({
      name: product.name,
      category: product.category,
      cloth: product.cloth,
      price: product.price,
      discount: product.discount,
      image: product.image,
    });
  };

  //  UPDATE 
  const handleUpdate = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/admin/products/${editProduct.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          price: parseFloat(form.price),
          discount: parseInt(form.discount) || 0,
        }),
      });

      if (res.ok) {
        setMsg("Product Updated!");
        setEditProduct(null);
        setForm({
          name: "",
          category: "western",
          cloth: "",
          price: "",
          discount: "",
          image: "",
        });
        fetchProducts();
      }
    } catch (err) {
      console.error(err);
    }
    setTimeout(() => setMsg(""), 2500);
  };

  //  DELETE 
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      const res = await fetch(`http://localhost:8080/api/admin/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        setMsg(" Product Deleted!");
        fetchProducts();
      }
    } catch (err) {
      console.error(err);
    }
    setTimeout(() => setMsg(""), 2500);
  };

  //  ORDER STATUS 
  const handleStatusUpdate = async (id, status) => {
    try {
      await fetch(`http://localhost:8080/api/admin/orders/${id}/status?status=${status}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMsg(" Status Updated!");
      fetchOrders();
    } catch (err) {
      console.error(err);
    }
    setTimeout(() => setMsg(""), 2500);
  };

  return (
    <div className="admin-page">
      {/* HEADER */}
      <div className="admin-header">
        <h2> Admin Dashboard</h2>
        <p>Welcome back, {user.name} </p>
      </div>

      {/* MESSAGE */}
      {msg && <div className="admin-toast">{msg}</div>}

      {/* DASHBOARD BUTTONS */}
      <div className="admin-dashboard-buttons">
        <button
          className={activeTab === "products" ? "active-admin-btn" : ""}
          onClick={() => setActiveTab("products")}
        >
          Products
        </button>

        <button
          className={activeTab === "orders" ? "active-admin-btn" : ""}
          onClick={() => setActiveTab("orders")}
        >
           Orders ({orders.length})
        </button>

        <button
          className={activeTab === "users" ? "active-admin-btn" : ""}
          onClick={() => setActiveTab("users")}
        >
           Users ({users.length})
        </button>
      </div>

      {/* PRODUCTS TAB */}
      {activeTab === "products" && (
        <>
          {/* FORM */}
          <div className="admin-form-card">
            <h3>{editProduct ? "✏️ Edit Product" : "➕ Add Product"}</h3>
            <div className="admin-form-grid">
              <div className="admin-input-group">
                <label>Product Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Floral Midi Dress"
                />
              </div>

              <div className="admin-input-group">
                <label>Category</label>
                <select name="category" value={form.category} onChange={handleChange}>
                  <option value="western">Western</option>
                  <option value="party">Party</option>
                  <option value="traditional">Traditional</option>
                  <option value="saree">Saree</option>
                  <option value="casual">Casual</option>
                </select>
              </div>

              <div className="admin-input-group">
                <label>Cloth</label>
                <input
                  name="cloth"
                  value={form.cloth}
                  onChange={handleChange}
                  placeholder="Chiffon"
                />
              </div>

              <div className="admin-input-group">
                <label>Price</label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="1499"
                />
              </div>

              <div className="admin-input-group">
                <label>Discount</label>
                <input
                  type="number"
                  name="discount"
                  value={form.discount}
                  onChange={handleChange}
                  placeholder="20"
                />
              </div>

              <div className="admin-input-group full-width">
                <label>Image URL</label>
                <input
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  placeholder="https://..."
                />
              </div>
            </div>

            <div className="admin-form-actions">
              {editProduct ? (
                <>
                  <button className="admin-save-btn" onClick={handleUpdate}>💾 Update</button>
                  <button
                    className="admin-cancel-btn"
                    onClick={() => {
                      setEditProduct(null);
                      setForm({ name: "", category: "western", cloth: "", price: "", discount: "", image: "" });
                    }}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button className="admin-save-btn" onClick={handleAdd}>➕ Add Product</button>
              )}
            </div>
          </div>

          {/* PRODUCTS TABLE */}
          <div className="admin-table-card">
            <h3> All Products ({products.length})</h3>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Discount</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id}>
                      <td>
                        <img
                          src={p.image}
                          alt={p.name}
                          style={{ width: 50, height: 60, objectFit: "cover", borderRadius: 6 }}
                        />
                      </td>
                      <td>{p.name}</td>
                      <td>{p.category}</td>
                      <td>₹{p.price}</td>
                      <td>{p.discount}%</td>
                      <td>
                        <button className="edit-btn" onClick={() => handleEditClick(p)}>✏️ Edit</button>
                        <button className="delete-btn" onClick={() => handleDelete(p.id)}>🗑️ Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}

      {/* ORDERS TAB */}
      {activeTab === "orders" && (
        <div className="admin-table-card">
          <h3> All Orders</h3>
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer Name</th> 
                <th>Address</th>
                <th>Payment</th>
                <th>Total</th>
                <th>Status</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id}>
                  <td>#{o.id}</td>
                  {/* Added Name Render Dynamic Field. Fallback checks o.user.name or o.customerName based on your backend response */}
                  <td style={{ fontWeight: "600" }}>
                    {o.customerName || (o.user && o.user.name) || "Customer"}
                  </td>
                  <td>{o.address}</td>
                  <td>{o.paymentMethod}</td>
                  <td>₹{o.totalPrice}</td>
                  <td>{o.status}</td>
                  <td>
                    <select
                      value={o.status}
                      onChange={(e) => handleStatusUpdate(o.id, e.target.value)}
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="PROCESSING">PROCESSING</option>
                      <option value="SHIPPED">SHIPPED</option>
                      <option value="DELIVERED">DELIVERED</option>
                      <option value="CANCELLED">CANCELLED</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* USERS TAB */}
      {activeTab === "users" && (
        <div className="admin-table-card">
          <h3> Registered Users</h3>
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email ID</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>
                    No users registered yet.
                  </td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u.id}>
                    <td>#{u.id}</td>
                    <td style={{ fontWeight: "600" }}>{u.name}</td>
                    <td>{u.email}</td>
                    <td>
                      <span className={`role-badge ${u.role === "ADMIN" ? "admin-role" : "user-role"}`}>
                        {u.role || "USER"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}