import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "./store/cart";
import { useEffect } from "react";

function App() {
  const cartIsShown = useSelector((state) => state.toggle.cartIsShown);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(cartItems);
    dispatch(fetchData(cartItems));
  }, [cartItems, dispatch]);

  return (
    <Layout>
      {cartIsShown && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
