import React, { useState, useEffect } from "react";
import { product as productData } from "./data/products";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import CheckoutForm from "./components/CheckoutForm";
import SearchFilter from "./components/SearchFilter";
import "./styles/styles.css";

export default function App() {
    const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
            }
            return [...prev, { ...product, qty: 1 }];
        });
    };

    const updateQtv = (id, delta) => {
        setCart(prev =>
            prev
            .map(item => item.id === id ? { ...item, qty: item.qty + delta } : item)
            .filter(item => item.qty > 0)
        );
    };

    const removeItem = (id) => setCart(prev => prev.filter(item => item.id !== id));

    const clearCart = () => setCart([]);

    const filteredProducts = productData.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) &&
        (category === "all" || p.category === category)
    );

    return (
        <div className="container">
            <h1>React Shopping Cart</h1>
            <SearchFilter search={search} setSearch={setSearch} category={category} setCategory={setCategory} />
            <ProductList products={filteredProducts} addToCart={addToCart} />
            <Cart cart={cart} updateQtv={updateQtv} removeItem={removeItem} />
            <CheckoutForm cart={cart} total={cart.reduce((t, i) => t + i.price * i.qty, 0)} clearCart={clearCart} />
            </div>
    );
}