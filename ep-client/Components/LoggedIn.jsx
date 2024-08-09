import { useState, useContext, useEffect } from "react";
import Events from "./Events";
import Header from "./Header";
import Model from "react-modal";
import Basket from "./Basket";
import { UserContext } from "../src/App";
import axios from "axios";
const APIPORT = 5000;

const LoggedIn = () => {
  const [basketOpened, setBasketOpened] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const [basket, setBasket] = useState([]);

  const getUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:${APIPORT}/login/success`,
        { withCredentials: true }
      );
      console.log("response", response);
      setUser(response.data.user);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <Header setBasketOpened={setBasketOpened} />
      <Model isOpen={basketOpened} appElement={document.getElementById("root")}>
        <Basket setBasketOpened={setBasketOpened} basket={basket} setBasket={setBasket} />
      </Model>
      <Events admin={false} basket={basket} setBasket={setBasket} />
    </>
  );
};

export default LoggedIn;
