import { useEffect } from "react";

const BasketItem = ({ event, basket, setBasket }) => {
  // const [changingBasket, setChangingBasket] = useState(false);

  useEffect(() => {
    // setChangingBasket(false);
  }, [basket]);

  const handleRemoveItem = () => {
    setBasket((prevBasket) => {
      const replicateBasket = [];
      
      prevBasket.forEach((eventObj) => {
        if (eventObj.name !== event.name) {
          replicateBasket.push(eventObj);
        }
      });
      return replicateBasket;
    });
  };

  return (
    <div className="basket-item">
      <h4 className="event-name">{event.name}</h4>
      <h4 className="event-price">{event.price}</h4>
      <h4 className="event-date">{event.date}</h4>
      {/* <div className="quantity-div">
        <label htmlFor="quantity">Quantity</label>
        <input type="number" id="quantity" name="quantity" min="0" />
      </div> */}
      <button onClick={handleRemoveItem}>Remove</button>
    </div>
  );
};

export default BasketItem;
