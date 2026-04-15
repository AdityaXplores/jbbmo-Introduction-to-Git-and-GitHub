import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateQuantity, removeItem } from "../redux/CartSlice";
import { Link } from "react-router-dom";

function CartItem() {
  const dispatch = useDispatch();
  const { items, totalQuantity, totalPrice } = useSelector(state => state.cart);

  return (
    <div>
      {/* Header */}
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/products">Plants</Link> |{" "}
        <Link to="/cart">Cart 🛒 ({totalQuantity})</Link>
      </nav>

      <h2>🛒 Shopping Cart</h2>

      <p>Total Items: {totalQuantity}</p>
      <p>Total Cost: ${totalPrice}</p>

      {items.map(item => (
        <div key={item.id} style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
          <img src={item.image} alt={item.name} />
          <h4>{item.name}</h4>
          <p>Price: ${item.price}</p>
          <p>Quantity: {item.quantity}</p>

          <button onClick={() => dispatch(updateQuantity({ id: item.id, type: "increase" }))}>
            +
          </button>

          <button onClick={() => dispatch(updateQuantity({ id: item.id, type: "decrease" }))}>
            -
          </button>

          <button onClick={() => dispatch(removeItem(item.id))}>
            Delete
          </button>
        </div>
      ))}

      <button onClick={() => alert("Coming Soon")}>
        Checkout
      </button>

      <br /><br />

      <Link to="/products">
        <button>Continue Shopping</button>
      </Link>
    </div>
  );
}

export default CartItem;
