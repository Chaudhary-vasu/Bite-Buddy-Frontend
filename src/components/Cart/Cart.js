import classes from "./Cart.module.css";
import Modal from "../../UI/Modal";
import { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import BASE_URL from "../../api/api";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../store/AuthContext";

const Cart = (props) => {
  document.title = "Bite-Buddy | Cart";
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setdidSubmit] = useState(false);

  const cartCtx = useContext(CartContext);
  const { setCartIsShown } = useContext(AuthContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;
  const [isCheckOut, setisCheckout] = useState(false);

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setisCheckout(true);
  };


  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;

  const didSubmitModalContent = (
    <>
      <p>Successfully sent the order.</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </>
  );
  const checkoutHandler = () => {
    setCartIsShown(false);
    navigate("/checkout");
  };
  const cartModalContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <button onClick={checkoutHandler}>Order</button>
    </>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};
export default Cart;
