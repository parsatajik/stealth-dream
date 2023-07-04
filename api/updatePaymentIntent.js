import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.update(
      req.body.paymentIntentId,
      { receipt_email: req.body.email }
    );

    res.status(200).send("Payment intent updated.");
  } catch (err) {
    console.log(err);
    res.status(500).send("An error occurred when updating the payment intent.");
  }
};
