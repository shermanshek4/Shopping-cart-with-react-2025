import { useState } from "react";

export default function Cart({ cart, updateQty, removeItem }) {
    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

    return (
        <div>
            <h2>Cart</h2>
            {cart.map(item => (
                <div key={item.id} className="cart-item">
                    <span>{item.name}</span>
                    <div className="qty-controls">
                        <button onClick={() => updateQty(item.id, -1)}>-</button>
                        <span>{item.qty}</span>
                        <button onClick={() => updateQty(item.id, 1)}>+</button>
                    </div>
                    <span>${(item.price * item.qty).toFixed(2)}</span>
                    <button onClick={() => removeItem(item.id)}>X</button>
                </div>
            ))}
            <p><strong>Total: </strong>${total.toFixed(2)}</p>
        </div>
    );
}