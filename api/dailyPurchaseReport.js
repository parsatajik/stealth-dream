import admin from "firebase-admin";
import nodemailer from "nodemailer";

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n");
const storageBucket = process.env.FIREBASE_STORAGE_BUCKET;

const emailUser = process.env.EMAIL_USER;
const emailPassword = process.env.EMAIL_PASSWORD;

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId,
      clientEmail,
      privateKey,
    }),
    storageBucket: storageBucket,
  });
}

const db = admin.firestore();

export default async function dailyReport(req, res) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  try {
    const snapshot = await db
      .collection("purchases")
      .where("date", ">=", today.toISOString())
      .where("date", "<", tomorrow.toISOString())
      .get();

    if (snapshot.empty) {
      console.log("No purchases found for today.");
      return res.status(200).send("No purchases for today.");
    }

    let report = "Today's Purchases:\n\n";
    snapshot.forEach((doc) => {
      const purchase = doc.data();
      report += `Name: ${purchase.customerInfo.name}\n`;
      report += `Prompt: ${purchase.prompt}\n`;
      report += `Color: ${purchase.selectedColor}\n`;
      report += `Image: ${purchase.selectedImage}\n`;
      report += `Quantity: ${purchase.selectedQuantity}\n`;
      report += `Size: ${purchase.selectedSize}\n`;
      report += "----------------------\n";
    });

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: emailUser,
        pass: emailPassword,
      },
    });

    const mailOptions = {
      from: emailUser,
      to: "arteficeai@gmail.com",
      subject: "Daily Purchase Report",
      text: report,
    };

    await transporter.sendMail(mailOptions);

    res.send({ message: "Report sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error generating report.");
  }
}
