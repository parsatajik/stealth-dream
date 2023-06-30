import axios from "axios";
import admin from "firebase-admin";
import { promises as fs } from "fs";
import { tmpdir } from "os";
import { join } from "path";

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n");
const storageBucket = process.env.FIREBASE_STORAGE_BUCKET;

admin.initializeApp({
  credential: admin.credential.cert({
    projectId,
    clientEmail,
    privateKey,
  }),
  storageBucket: storageBucket,
});

export default async function storeImage(req, res) {
  const { imageUrl } = req.body;

  try {
    // Get image from url
    const imageRes = await axios.get(imageUrl, {
      responseType: "arraybuffer",
    });

    // Write the image data to a temporary file.
    const tempFilePath = join(tmpdir(), `${Date.now()}.png`);
    await fs.writeFile(tempFilePath, imageRes.data);

    // Upload image to Firebase Storage
    const bucket = admin.storage().bucket();
    const file = bucket.file(`${Date.now()}.png`);

    await bucket.upload(tempFilePath, {
      destination: file,
      public: true,
      metadata: {
        contentType: "image/png",
        firebaseStorageDownloadTokens: "initial-token",
      },
    });

    // Remove the temporary file.
    await fs.unlink(tempFilePath);

    // Get public URL for the file
    const config = {
      action: "read",
      expires: "03-01-2500", // far future
    };
    const url = await file.getSignedUrl(config);

    res.send({ message: "Image uploaded successfully", url: url[0] });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err });
  }
}
