import React from "react";
import ProductCard from "./productCard";

export default function ProductList({ products, addToCart }) {
    return (
        <div className="products">
            {products.map(product => (
                <ProductCard key={product.id} product={product} addToCart={addToCart} />
            ))}
        </div>
    );
}