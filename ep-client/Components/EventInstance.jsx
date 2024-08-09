const EventInstance = ({ event, admin, basket, setBasket }) => {
  return (
    <section className="event">
      <h2 className="name">{event.name}</h2>
      <div className="event-info">
        <ul className="location-list">
          <li>
            <h3>Location</h3>
          </li>
          <li>{event.location.streetNumber}</li>
          <li>{event.location.street}</li>
          <li>{event.location.city}</li>
          <li>{event.location.postcode}</li>
        </ul>
        <div className="date">
          <h3>Date</h3>
          <p>{event.date}</p>
        </div>
        <div className="price">
          <h3>Price</h3>
          <p>{event.price}</p>
        </div>

        {!admin ? (
          <button
            className="purchase-btn"
            onClick={() => {
              const eventToAddToBasket = JSON.parse(JSON.stringify(event));
              eventToAddToBasket.numInBasket = 1;

              setBasket((prevBasket) => {
                basket.forEach((eventInBasket) => {
                  if (eventInBasket.name === event.name) {
                    eventToAddToBasket.numInBasket = eventInBasket.numInBasket + 1;
                  }
                });
                const newBasket = prevBasket.filter(
                  (prevEvent) => prevEvent.name !== eventToAddToBasket.name
                );
                return [...newBasket, eventToAddToBasket];
              });
            }}
          >
            Add to cart
          </button>
        ) : (
          ""
        )}
      </div>
    </section>
  );
};

export default EventInstance;
