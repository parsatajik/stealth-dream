import { config } from "dotenv";
config();

import admin from "firebase-admin";
import sharp from "sharp";
import axios from "axios";
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

const db = admin.firestore();
const storage = admin.storage();

async function generateWebP() {
  const purchasesSnapshot = await db.collection("purchases").get();
  const purchases = purchasesSnapshot.docs;

  for (const purchase of purchases) {
    const data = purchase.data();

    if (!data.webpUrl) {
      // Get image from url
      const imageRes = await axios.get(data.selectedImage, {
        responseType: "arraybuffer",
      });

      // Convert image to WebP format
      const webpBuffer = await sharp(imageRes.data).webp().toBuffer();

      // Upload WebP image to Firebase Storage
      const bucket = storage.bucket();

      // Write the WebP image data to a temporary file.
      const tempWebPFilePath = join(tmpdir(), `${Date.now()}.webp`);
      await fs.writeFile(tempWebPFilePath, webpBuffer);

      // Upload WebP image to Firebase Storage
      const webpFile = bucket.file(`${Date.now()}.webp`);
      await bucket.upload(tempWebPFilePath, {
        destination: webpFile,
        public: true,
        metadata: {
          contentType: "image/webp",
          firebaseStorageDownloadTokens: "initial-token",
        },
      });

      // Get public URL for the WebP file
      const config = {
        action: "read",
        expires: "03-01-2500", // far future
      };
      const webpUrl = await webpFile.getSignedUrl(config);

      // Update Firestore document with WebP URL
      await purchase.ref.update({
        webpUrl: webpUrl[0],
      });

      await fs.unlink(tempWebPFilePath);
    }
  }
}

generateWebP().catch(console.error);
