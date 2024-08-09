import { useState } from "react";
import EventInstance from "./EventInstance";

const Events = ({ admin, basket, setBasket }) => {
  const eventsArray = [
    {
      name: "name1",
      location: {
        street: "street",
        streetNumber: "street-number",
        city: "city",
        postcode: "postcode",
      },
      date: "dd-mm-yyyy",
      price: "£££££",
    },
    {
      name: "name2",
      location: {
        street: "street",
        streetNumber: "street-number",
        city: "city",
        postcode: "postcode",
      },
      date: "dd-mm-yyyy",
      price: "£££££",
    },
    {
      name: "name3",
      location: {
        street: "street",
        streetNumber: "street-number",
        city: "city",
        postcode: "postcode",
      },
      date: "dd-mm-yyyy",
      price: "£££££",
    },
    {
      name: "name4",
      location: {
        street: "street",
        streetNumber: "street-number",
        city: "city",
        postcode: "postcode",
      },
      date: "dd-mm-yyyy",
      price: "£££££",
    },
    {
      name: "name5",
      location: {
        street: "street",
        streetNumber: "street-number",
        city: "city",
        postcode: "postcode",
      },
      date: "dd-mm-yyyy",
      price: "£££££",
    },
    {
      name: "name6",
      location: {
        street: "street",
        streetNumber: "street-number",
        city: "city",
        postcode: "postcode",
      },
      date: "dd-mm-yyyy",
      price: "£££££",
    },
  ];

  const [events, setEvents] = useState(eventsArray);

  return (
    <div className="events">
      {events.map((event) => {
        return (
          <EventInstance
            key={event.name}
            event={event}
            admin={admin}
            basket={basket}
            setBasket={setBasket}
          />
        );
      })}
    </div>
  );
};

export default Events;
