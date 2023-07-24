import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.update(
      req.body.paymentIntentId,
      req.body.params
    );

    res.status(200).send(paymentIntent);
  } catch (err) {
    console.log(err);
    res.status(500).send("An error occurred when updating the payment intent.");
  }
};
