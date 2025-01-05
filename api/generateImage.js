import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_TOKEN });

export const config = {
  maxDuration: 120,
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
    responseLimit: false,
  },
};

export default async function generateImage(req, res) {
  try {
    const { dream, dalleVersion } = req.body;

    if (!dream || !dalleVersion) {
      return res.status(400).json({
        error: "Missing required parameters",
      });
    }

    const image = await openai.images.generate({
      model: dalleVersion,
      prompt: dream,
      size: dalleVersion === "dall-e-2" ? "1024x1024" : "1024x1792",
      n: dalleVersion === "dall-e-2" ? 3 : 1,
      timeout: 120000,
    });

    if (!image?.data) {
      throw new Error("No image data received from OpenAI");
    }

    return res.status(200).json(image.data);
  } catch (err) {
    console.error("Image generation error:", err);

    if (err.response) {
      return res.status(err.response.status).json({
        error: err.response.data.error.message || "OpenAI API error",
      });
    }

    return res.status(500).json({
      error: "Failed to generate image",
      details: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
}
