import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_TOKEN });

export default async function generateImage(req, res) {
  try {
    const { dream, dalleVersion } = req.body;

    const image = await openai.images.generate({
      model: dalleVersion,
      prompt: dream,
      size: dalleVersion === "dall-e-2" ? "1024x1024" : "1024x1792",
      n: dalleVersion === "dall-e-2" ? 3 : 1,
    });

    res.status(200).send(image.data);
  } catch (err) {
    console.log(err);
    res.status(500).send([]);
  }
}
