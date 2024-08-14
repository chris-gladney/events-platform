import { useState } from "react";
import Events from "./Events";
import Header from "./Header";
import Model from "react-modal";
import Basket from "./Basket";

const LoggedIn = ({ setUserEvents }) => {
  const [basketOpened, setBasketOpened] = useState(false);
  // const { user, setUser } = useContext(UserContext);
  const [basket, setBasket] = useState([]);

  // const getUser = async () => {
  //   try {
  //     // const response = await axios.get(
  //     //   `http://localhost:${APIPORT}/login/success`,
  //     //   { withCredentials: true }
  //     // );
  //     // console.log("response", response);
  //     // setUser(response.data.user);
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };

  // useEffect(() => {
  //   getUser();
  // }, []);

  return (
    <>
      <Header setBasketOpened={setBasketOpened} />
      <Model isOpen={basketOpened} appElement={document.getElementById("root")}>
        <Basket
          setBasketOpened={setBasketOpened}
          basket={basket}
          setBasket={setBasket}
          setUserEvents={setUserEvents} 
        />
      </Model>
      <Events admin={false} basket={basket} setBasket={setBasket} />
    </>
  );
};

export default LoggedIn;
