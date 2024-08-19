const eventsdb = require("../model/eventsSchema");

const handlePostEvents = async (req, res) => {
  try {
    const { street, streetNum, city, postcode, eventDate, eventName, price } =
      req.body;

    const eventToAdd = {
      name: eventName,
      date: Date.parse(eventDate),
      price: Number(price),
      locationStreet: street,
      locationStreetNumber: streetNum,
      locationCity: city,
      locationPostcode: postcode,
    };

    await eventsdb.create(eventToAdd);
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
  }
};

module.exports = handlePostEvents;
