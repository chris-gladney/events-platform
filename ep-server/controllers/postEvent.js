const eventsdb = require("../model/eventsSchema")

const postEvent = async (req, res) => {
    try {
        await eventsdb.insert
    } catch (err) {
        console.log(err)
    }
}