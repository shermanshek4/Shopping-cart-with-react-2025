import { useState } from "react";

export default function CheckoutForm({ cart, total, clearCart }) {
    const [form, setForm] = useState({ name: "", email: "", address: "" });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (cart.length === 0) return alert("Cart is empty.");
        setSubmitted(true);
        clearCart();
    };
    
    if (submitted) {
        return (
        <div className="confirmation">
            <h3>Order Confirmed</h3>
            <p>Thanks, {form.name}. Your order total is ${total.toFixed(2)}</p>
          </div>
          );
    }
    
    return (
        <form onSubmit={handleSubmit}>
          <h2>Checkout</h2>
          <input type="text" placeholder="Full Name" required onChange={e => setForm({ ...form, name: e.target.value })} />
          <input type="email" placeholder="Email" required onChange={e => setForm({ ...form, email: e.target.value })} />
          <textarea placeholder="Shopping Address" required onChange={e => setForm({ ...form, address: e.target.value })} />
          <button type="submit">Place Order</button>
        </form>
    );
}
  
