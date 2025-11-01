import React from "react";
import { Link } from "react-router-dom";
import { API } from "../../utils/config";

const Card = ({ product, handleAddToCart }) => {
  const categoryLabel = product.category
    ? product.category.name || product.category
    : "";

  return (
    <article className="product-card">
      <img
        src={`${API}/product/photo/${product._id}`}
        alt={product.name}
        className="product-img"
      />

      <div className="product-body">
        <h3 className="product-title" title={product.name}>
          {product.name}
        </h3>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div>
            <div className="product-price">&#2547; {product.price}</div>
            <div className="text-muted" style={{ fontSize: 12 }}>
              {categoryLabel}
            </div>
          </div>

          <div style={{ textAlign: "right" }}>
            {product.quantity ? (
              <div className="badge-pill">In Stock</div>
            ) : (
              <div className="badge-pill">Out of Stock</div>
            )}
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          <Link
            to={`/product/${product._id}`}
            className="btn-ghost"
            style={{
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            View
          </Link>

          {product.quantity ? (
            <button onClick={handleAddToCart} className="btn-brand">
              Add to Cart
            </button>
          ) : null}
        </div>
      </div>
    </article>
  );
};

export default Card;
