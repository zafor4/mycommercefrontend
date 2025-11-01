import { useState, useEffect } from "react";
import Layout from "../Layout";
import { showSuccess, showError } from "../../utils/messages";
import { getProductDetails } from "../api/ApiProduct";
import { Link, useParams } from "react-router-dom";
import { addToCart } from "../api/ApiOrder";
import { isAuthenticated, userInfo } from "../../utils/auth";
import { API } from "../../utils/config";

export const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { id } = useParams(); // Use useParams to get route parameters

  useEffect(() => {
    getProductDetails(id)
      .then((response) => setProduct(response.data))
      .catch((err) => setError("Failed to load product"));
  }, [id]); // Include id in the dependency array

  const handleAddToCart = (product) => () => {
    if (isAuthenticated()) {
      setError(false);
      setSuccess(false);
      const user = userInfo();
      const cartItem = {
        user: user._id,
        product: product._id,
        price: product.price,
      };
      addToCart(user.token, cartItem)
        .then((response) => setSuccess(true))
        .catch((err) => {
          if (err.response) setError(err.response.data);
          else setError("adding to cart failed");
        });
    } else {
      setSuccess(false);
      setError("Please Log in first");
    }
  };
  return (
    <Layout title="Product Page">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <a href="#">Product</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {product.category ? product.category.name : ""}
          </li>
        </ol>
      </nav>
      <div>
        {showSuccess(success, "Item Added to Cart!")}
        {showError(error, error)}
      </div>

      <div
        style={{ display: "flex", gap: 24, flexWrap: "wrap", marginTop: 18 }}
      >
        <div style={{ flex: "1 1 320px", maxWidth: 520 }}>
          <img
            src={`${API}/product/photo/${product._id}`}
            alt={product.name}
            style={{ width: "100%", borderRadius: 8 }}
          />
        </div>
        <div style={{ flex: "1 1 320px", minWidth: 260 }}>
          <h3 style={{ marginTop: 0 }}>{product.name}</h3>
          <div className="product-price">&#2547; {product.price}</div>
          <p>
            {product.quantity ? (
              <span className="badge-pill">In Stock</span>
            ) : (
              <span className="badge-pill">Out of Stock</span>
            )}
          </p>
          <p className="text-muted">{product.description}</p>
          {product.quantity ? (
            <button className="btn-brand" onClick={handleAddToCart(product)}>
              Add to Cart
            </button>
          ) : null}
        </div>
      </div>
    </Layout>
  );
};
