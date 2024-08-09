import { useEffect, useState } from "react";

const BasketItem = ({ event, basket, setBasket }) => {
  const [changingBasket, setChangingBasket] = useState(false);

  useEffect(() => {
    setChangingBasket(false);
  }, [basket]);

  return (
    <div className="basket-item" key={event.name}>
      <h4 className="event-name">{event.name}</h4>
      <h4 className="event-price">{event.price}</h4>
      <h4 className="event-date">{event.date}</h4>
      <div className="quantity-div">
        <label htmlFor="quantity">Quantity</label>
        <input type="number" id="quantity" name="quantity" min="0" />
      </div>
    </div>
  );
};

export default BasketItem;
