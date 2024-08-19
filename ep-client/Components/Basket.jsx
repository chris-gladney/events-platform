import basketImg from "../assets/basket.png";
import useAuth from "../hooks/useAuth";
import BasketItem from "./BasketItem";
import { useState } from "react";

const Basket = ({ setBasketOpened, basket, setBasket, setUserEvents }) => {
  const { auth } = useAuth();
  const [addToGoogle, setAddToGoogle] = useState(false);

  const handlePayments = (e) => {
    e.preventDefault();
    const itemsToSend = [];
    let idItem = 1;
    basket.forEach((event) => {
      itemsToSend.push([idItem, event]);
      idItem++;
    });
    fetch("http://localhost:5000/create-checkout-session", {
      method: "POST",
      headers: {
        Origin: "http://localhost:5000",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: itemsToSend,
        user: auth.user,
        addToGoogle,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then((json) => Promise.reject(json));
      })
      .then((resData) => {
        // console.log(resData.events[0], "<<< data");
        // Event gets through to here. Something wrong
        // with the way the state is set
        if (resData.events.length !== 0) {
          setUserEvents(resData.events);
        }
        return resData.url;
      })
      .then((url) => {
        window.location = url;
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="basket-popup">
      <button
        onClick={() => {
          setBasketOpened(false);
        }}
        className="close-popup"
      >
        X
      </button>
      <img src={basketImg} className="basket-img" />
      <h2 className="basket">Basket</h2>

      {basket.map((event, i) => {
        return (
          <BasketItem
            key={i}
            event={event}
            basket={basket}
            setBasket={setBasket}
          />
        );
      })}
      <form className="basket-form" onSubmit={handlePayments}>
        <div className="google-calendar-add">
          <label htmlFor="add-to-calendar">Add to google calendar</label>
          <input
            type="checkbox"
            id="add-to-calendar"
            name="add-to-calendar"
            onChange={() => {
              setAddToGoogle(!addToGoogle);
            }}
          />
        </div>
        <input type="submit" value="checkout" />
      </form>
    </div>
  );
};

export default Basket;
