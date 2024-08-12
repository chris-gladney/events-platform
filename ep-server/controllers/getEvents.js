const eventsdb = require("../model/eventsSchema");

const getEvents = async (req, res) => {
  const events = await eventsdb.find();
  res.json(events);
};

module.exports = getEvents;
