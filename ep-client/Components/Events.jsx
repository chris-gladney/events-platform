import { useContext, useEffect, useState } from "react";
import EventInstance from "./EventInstance";
import axios from "../api/axios";
import AuthContext from "../context/AuthProvider";

const Events = ({ admin, basket, setBasket }) => {
  // const config = {
  //   headers: { Authorization: `Bearer ${token}` }
  //   };
  const { auth } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  useEffect(() => {
    console.log(auth, "<<< auth");
    const config = {
      headers: { authorization: `Bearer ${auth.accessToken}` },
    };
    console.log(auth.token);
    axios.get("/events", config).then(({ data }) => setEvents(data));
  }, []);

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
