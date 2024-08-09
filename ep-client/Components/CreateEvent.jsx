const CreateEvent = ({ setMakingEvent }) => {
  return (
    <>
      <form>
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
        <input type="text" id="event-name" name="event-name" />
        <br />
        <label htmlFor="date">Date</label>
        <br />
        <input type="date" id="date" name="date" />
        <br />
        <label htmlFor="price">Price</label>
        <br />
        <input type="number" id="price" name="price" min="0" max="500" />
        <br />
        <fieldset>
          <legend>Location</legend>
          <label htmlFor="street">Street</label>
          <br />
          <input type="text" id="street" name="street" />
          <br />
          <label htmlFor="street-number">Street Number</label>
          <br />
          <input
            type="number"
            id="street-number"
            name="street-number"
            min="1"
            max="3000"
          />
          <br />
          <label htmlFor="city">City</label>
          <br />
          <input type="text" name="city" id="city" />
          <br />
          <label htmlFor="postcode">Postcode</label>
          <br />
          <input type="text" name="postcode" id="postcode" />
        </fieldset>
        <br />
        <input type="submit" value="Submit" />
      </form>
    </>
  );
};

export default CreateEvent;
