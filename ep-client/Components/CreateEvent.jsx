import { useState } from "react";
import axios from "../api/axios";

const CreateEvent = ({ setMakingEvent }) => {
  const [streetNum, setStreetNum] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventName, setEventName] = useState("");
  const [price, setPrice] = useState("");

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "/events",
      JSON.stringify({
        streetNum,
        street,
        city,
        postcode,
        eventDate,
        eventName,
        price,
      }),
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        withCredentials: true,
      }
    );
    alert("Event Created!");
  };

  return (
    <>
      <form onSubmit={handleCreateEvent}>
        <button
          className="close-popup"
          onClick={() => {
            setMakingEvent(false);
          }}
        >
          X
        </button>
        <label htmlFor="event-name">Event Name</label>
        <br />
        <input
          type="text"
          id="event-name"
          name="event-name"
          onChange={(e) => {
            setEventName(e.target.value);
          }}
        />
        <br />
        <label htmlFor="date">Date</label>
        <br />
        <input
          type="date"
          id="date"
          name="date"
          onChange={(e) => {
            setEventDate(e.target.value);
          }}
        />
        <br />
        <label htmlFor="price">Price</label>
        <br />
        <input
          type="number"
          id="price"
          name="price"
          min="0"
          max="500"
          step="any"
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
        <br />
        <fieldset>
          <legend>Location</legend>
          <label htmlFor="street">Street</label>
          <br />
          <input
            type="text"
            id="street"
            name="street"
            onChange={(e) => {
              setStreet(e.target.value);
            }}
          />
          <br />
          <label htmlFor="street-number">Street Number</label>
          <br />
          <input
            type="number"
            id="street-number"
            name="street-number"
            min="1"
            max="3000"
            onChange={(e) => {
              setStreetNum(e.target.value);
            }}
          />
          <br />
          <label htmlFor="city">City</label>
          <br />
          <input
            type="text"
            name="city"
            id="city"
            onChange={(e) => {
              setCity(e.target.value);
            }}
          />
          <br />
          <label htmlFor="postcode">Postcode</label>
          <br />
          <input
            type="text"
            name="postcode"
            id="postcode"
            onChange={(e) => {
              setPostcode(e.target.value);
            }}
          />
        </fieldset>
        <br />
        <input type="submit" value="Submit" />
      </form>
    </>
  );
};

export default CreateEvent;
