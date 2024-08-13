import { useEffect, useState } from "react";
import EventInstance from "./EventInstance";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

const Events = ({ admin, basket, setBasket }) => {
  const [events, setEvents] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getEvents = async () => {
      try {
        const response = await axiosPrivate.get("/events", {
          signal: controller.signal,
        });
        isMounted && setEvents(response.data);
      } catch (err) {
        console.log(err);
        navigate("/", { state: { from: location }, replace: true });
      }
    };

    getEvents();

    return () => {
      isMounted = false;
      controller.abort();
    };
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
