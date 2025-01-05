import axios from "axios";
import admin from "firebase-admin";
import sharp from "sharp";
import { promises as fs } from "fs";
import { tmpdir } from "os";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";

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

    // Convert image to WebP format
    const webpBuffer = await sharp(imageRes.data).webp().toBuffer();

    // Write the image data to a temporary file.
    const tempFilePath = join(tmpdir(), `${Date.now()}.png`);
    await fs.writeFile(tempFilePath, imageRes.data);

    // Upload image to Firebase Storage
    const bucket = admin.storage().bucket();

    // Store the original image
    const originalFile = bucket.file(`${Date.now()}.png`);
    const originalToken = uuidv4();
    await bucket.upload(tempFilePath, {
      destination: originalFile,
      public: true,
      metadata: {
        contentType: "image/png",
        firebaseStorageDownloadTokens: originalToken,
      },
    });

    // Get public URL for the original file
    const config = {
      action: "read",
      expires: "03-01-2500", // far future
    };

    const originalUrl = await originalFile.getSignedUrl(config);

    // Write the WebP image data to a temporary file.
    const tempWebPFilePath = join(tmpdir(), `${Date.now()}.webp`);
    await fs.writeFile(tempWebPFilePath, webpBuffer);

    // Upload WebP image to Firebase Storage
    const webpFile = bucket.file(`${Date.now()}.webp`);
    const webpToken = uuidv4();
    await bucket.upload(tempWebPFilePath, {
      destination: webpFile,
      public: true,
      metadata: {
        contentType: "image/webp",
        firebaseStorageDownloadTokens: webpToken,
      },
    });

    // Get public URL for the WebP file
    const webpUrl = await webpFile.getSignedUrl(config);

    // Remove the temporary file.
    await fs.unlink(tempFilePath);
    await fs.unlink(tempWebPFilePath);

    res.send({ message: "Image uploaded successfully", originalUrl, webpUrl });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err });
  }
}
