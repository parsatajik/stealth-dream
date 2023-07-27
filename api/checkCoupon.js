import admin from "firebase-admin";

if (!admin.apps.length) {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n");

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  });
}

const db = admin.firestore();

export default async function checkCoupon(req, res) {
  const { code } = req.body;

  try {
    // Query the coupons collection to find a coupon with the given code
    const couponsCollection = db.collection("coupons");
    const query = couponsCollection.where("code", "==", code);
    const querySnapshot = await query.get();

    if (querySnapshot.empty) {
      return res
        .status(404)
        .json({ success: false, message: "Coupon not found." });
    }

    // Assuming only one document will match the code
    const couponDoc = querySnapshot.docs[0];
    const couponData = couponDoc.data();

    const currentDate = new Date().getTime();
    const expirationDate = new Date(couponData.expiration).getTime();

    if (currentDate > expirationDate) {
      return res
        .status(400)
        .json({ success: false, message: "Coupon has expired." });
    }

    if (
      couponData.maxUsage !== -1 &&
      couponData.timesUsed >= couponData.maxUsage
    ) {
      return res.status(400).json({
        success: false,
        message: "Coupon has reached its maximum usage limit.",
      });
    }

    // If all checks pass, increment timesUsed
    await couponDoc.ref.update({
      timesUsed: admin.firestore.FieldValue.increment(1),
    });

    return res
      .status(200)
      .json({ success: true, percentage: couponData.percentage });
  } catch (err) {
    console.error("Failed to check coupon:", err);
    res.status(500).send("Internal server error.");
  }
}
