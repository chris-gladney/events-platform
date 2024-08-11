const eventsdb = require("../model/eventsSchema");

const handlePostEvents = async (req, res) => {
  try {
    const eventToAdd = req.body;
    await eventsdb.create(eventToAdd);
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
  }
};

module.exports = handlePostEvents;
