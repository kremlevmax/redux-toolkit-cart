import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { useSelector, useDispatch } from "react-redux";
import { getCartData, sendCartData } from "./store/cart";
import { useEffect } from "react";

let firstLoad = true;

function App() {
  const cartIsShown = useSelector((state) => state.toggle.cartIsShown);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dataFetchInformation = useSelector(
    (state) => state.toggle.dataFetchInformation
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (firstLoad) {
      firstLoad = false;
      dispatch(getCartData());
      return;
    }
    dispatch(sendCartData(cartItems));
  }, [cartItems, dispatch]);

  return (
    <Layout>
      {dataFetchInformation && (
        <Notification
          status={dataFetchInformation.status}
          title={dataFetchInformation.title}
          message={dataFetchInformation.message}
        />
      )}
      {cartIsShown && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
