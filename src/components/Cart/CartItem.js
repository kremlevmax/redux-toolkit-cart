import classes from "./CartItem.module.css";
import { useDispatch } from "react-redux";
import { cartSliceActions } from "../../store/index";

const CartItem = (props) => {
  const dispatch = useDispatch();

  const plusHandler = () => {
    dispatch(cartSliceActions.add(props.item));
  };

  const minusHandler = () => {
    dispatch(cartSliceActions.remove(props.item));
  };

  const { title, quantity, total, price } = props.item;

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total} <span className={classes.itemprice}>(${price}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={minusHandler}>-</button>
          <button onClick={plusHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
