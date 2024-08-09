import basketImg from "../assets/basket.png";
import BasketItem from "./BasketItem";

const Basket = ({ setBasketOpened, basket, setBasket }) => {
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

      {basket.map((event) => {
        return (
          <BasketItem
            key={event}
            event={event}
            basket={basket}
            setBasket={setBasket}
          />
        );
      })}
      <form className="basket-form">
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
