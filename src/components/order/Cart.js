import Layout from "../Layout";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteCartItem, getCartItems, updateCartItems } from "../api/ApiOrder";
import { userInfo } from "../../utils/auth";
import CartItem from "./CartItem";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState(false);

  const loadCart = () => {
    getCartItems(userInfo().token)
      .then((response) => setCartItems(response.data))
      .catch((err) => {
        if (err.response) setError(err.response.data);
        else setError("Cart item loading failed");
      });
  };

  useEffect(() => {
    loadCart();
  }, []);

  const increaseItem = (item) => {
    if (item.count === 5) return;
    const cartItem = {
      ...item,
      count: item.count + 1,
    };

    updateCartItems(userInfo().token, cartItem)
      .then((response) => loadCart())
      .catch((err) => {
        if (err.response) setError(err.response.data);
        else setError("Cart item update failed");
      });
  };

  const decreaseItem = (item) => {
    if (item.count === 1) return;
    const cartItem = {
      ...item,
      count: item.count - 1,
    };
    updateCartItems(userInfo().token, cartItem)
      .then((response) => loadCart())
      .catch((err) => {
        if (err.response) setError(err.response.data);
        else setError("Cart item update failed");
      });
  };

  const removeItem = (item) => {

    if (!window.confirm("Delete Item?")) return;
    deleteCartItem(userInfo().token, item)
      .then((response) => {
        loadCart();
      })
      .catch((err) => {
        if (err.response) setError(err.response.data);
        else setError("Cart item delete failed");
      });
  };

  return (
    <Layout
      title="Your Cart"
      description="Hurry up! Place your order!"
      className="container"
    >
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="#">Order</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Cart
          </li>
        </ol>
      </nav>
      <div className="container my-5">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col" width="15%">
                #
              </th>
              <th scope="col">Image</th>
              <th scope="col">Product Name</th>
              <th scope="col">Quantity</th>
              <th scope="col" align="right">
                Price
              </th>
              <th scop="col">Remove</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, i) => (
              <CartItem
                item={item}
                serial={i + 1}
                key={item._id}
                increaseItem={() => increaseItem(item)}
                decreaseItem={() => decreaseItem(item)}
                removeItem={() => removeItem(item)}
              />
            ))}
            <tr>
              <th scope="row" />
              <td colSpan={2}>Total</td>
              <td align="right">৳ </td>
              <td />
            </tr>
            <tr>
              <th scope="row" />
              <td colSpan={4} className="text-right">
                <Link to="/">
                  <button className="btn btn-warning mr-4">
                    Continue Shoping
                  </button>
                </Link>
                <Link to="/shipping" className="btn btn-success mr-4">
                  Proceed To Checkout
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Cart;
