import basketImg from "../assets/basket.png";
import useAuth from "../hooks/useAuth";
import BasketItem from "./BasketItem";

const Basket = ({ setBasketOpened, basket, setBasket, setUserEvents }) => {
  const { auth } = useAuth();
  const handlePayments = (e) => {
    e.preventDefault();
    console.log(auth);
    const itemsToSend = [];
    let idItem = 1;
    basket.forEach((event) => {
      itemsToSend.push([
        idItem,
        { priceInPennies: event.priceInPennies, name: event.name },
      ]);
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
      }),
    })
      .then((res) => {
        console.log(res, "<<< response");
        if (res.ok) {
          return res.json();
        }
        return res.json().then((json) => Promise.reject(json));
      })
      .then(({ url, event }) => {
        setUserEvents((prevUserEvents) => {
          return [...prevUserEvents, event]
        })
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
          <input type="checkbox" id="add-to-calendar" name="add-to-calendar" />
        </div>
        <input type="submit" value="checkout" />
      </form>
    </div>
  );
};

export default Basket;
