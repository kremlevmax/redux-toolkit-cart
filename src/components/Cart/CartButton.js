import classes from "./CartButton.module.css";
import { useSelector, useDispatch } from "react-redux";
import { toggleSliceActions } from "../../store/toggle";

const CartButton = (props) => {
  const dispatch = useDispatch();

  const cartToggleHandler = () => {
    dispatch(toggleSliceActions.toggleShowStatus());
  };
  const numberOfCartItems = useSelector((state) => state.cart.totalQuantity);
  return (
    <button className={classes.button} onClick={cartToggleHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default CartButton;
