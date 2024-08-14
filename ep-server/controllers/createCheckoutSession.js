const eventsdb = require("../model/eventsSchema");
const nonGoogleUserdb = require("../model/nonGoogleUserSchema");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async (req, res) => {
  try {
    let eventToSendAsResponse;
    const allEvents = await eventsdb.find();
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map((item) => {
        let eventToSend;
        allEvents.forEach((event) => {
          if (event.name === item[1].name) {
            eventToSendAsResponse = event;
            eventToSend = event;
          }
        });
        return {
          price_data: {
            currency: "GBP",
            product_data: {
              name: eventToSend.name,
            },
            unit_amount: eventToSend.priceInPennies,
          },
          quantity: 1,
        };
      }),
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/failure",
    });
    await nonGoogleUserdb.findOneAndUpdate({ user: req.body.user });
    res.json({ url: session.url, event: eventToSendAsResponse });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

module.exports = createCheckoutSession;
