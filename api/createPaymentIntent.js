import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body?.totalOrderCost * 100,
      currency: "cad",
      payment_method_types: ["card", "link"],
    });

    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
      id: paymentIntent.id,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send("An error occurred when generating the payment intent.");
  }
};
