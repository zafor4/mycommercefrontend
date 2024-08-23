import React from 'react';

const CartItem = ({ item, serial, increaseItem, decreaseItem ,removeItem}) => {

    return (
        <tr>
            <th scope="row">{serial}</th>
            <td>
                <img
                    src={`https://mycommerce-iy3p.onrender.com/api/product/photo/${item.product._id}`}
                    alt={item.product.name || 'Product Image'}
                    width="100"
                />
            </td>
            <td>{item.product.name}</td>
            <td>
                <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={decreaseItem}
                    disabled={item.count <= 1}
                >
                    -
                </button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span>{item.count}</span>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={increaseItem}
                    disabled={item.count >= 5}
                >
                    +
                </button>
            </td>
            <td align="right">৳ {item.price * item.count}</td>
            <td>
                <button className="btn btn-danger btn-sm" onClick={removeItem}>Remove From Cart</button>
            </td>
        </tr>
    );
};

export default CartItem;
