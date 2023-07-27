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

export default async function checkAffiliate(req, res) {
  const { code } = req.body;

  try {
    // Query the coupons collection to find a coupon with the given code
    const affiliatesCollection = db.collection("affiliates");
    const query = affiliatesCollection.where("username", "==", code);
    const querySnapshot = await query.get();

    if (querySnapshot.empty) {
      return res
        .status(404)
        .json({ message: "Affiliate not found.", success: false });
    }

    return res.status(200).json({ message: "Affiliate found.", success: true });
  } catch (err) {
    console.error("Failed to check affiliate:", err);
    res.status(500).send("Internal server error.");
  }
}
