import { Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { products as productData } from './data/products';
import ProductList from './components/Productlist';
import Cart from './components/Cart';
import CheckoutForm from './components/CheckoutForm';

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
      return existing
        ? prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item)
        : [...prev, { ...product, qty: 1 }];
    });
  };

  const updateQty = (id, delta) => {
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

  <nav>
    <Link to="/">Home</Link> | <Link to="/cart">Cart</Link> | <Link to="/checkout">Checkout</Link>
    </nav>

  return (
    <div className="container">
      <nav>
        <Link to="/">| Home</Link> | <Link to="/cart">Cart ({cart.length})</Link> | <Link to="/checkout">Checkout</Link> |
      </nav>

      <Routes>
        <Route path="/" element={
          <>
            <h1>Products</h1>
            <input
              placeholder="Search..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <select value={category} onChange={e => setCategory(e.target.value)}>
              <option value="all">All</option>
              <option value="clothing">Clothing</option>
              <option value="footwear">Footwear</option>
            </select>
            <ProductList products={filteredProducts} addToCart={addToCart} />
          </>
        } />

        <Route path="/cart" element={
          <Cart cart={cart} updateQty={updateQty} removeItem={removeItem} />
        } />

        <Route path="/checkout" element={
          <CheckoutForm cart={cart} total={cart.reduce((t, i) => t + i.price * i.qty, 0)} clearCart={clearCart} />
        } />
      </Routes>
    </div>
  );
}



