export default function ProductCard({ product, addToCart }) {
    return (
        <div className="product">
            <h2>{product.name}</h2>
            <p>${product.price}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
    );
}