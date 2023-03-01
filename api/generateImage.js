import axios from "axios";

export default async function generateImage(req, res) {
  try {
    const { dream } = req.body;
    const imgRes = await axios.post(
      "https://api.openai.com/v1/images/generations",
      {
        prompt: dream,
        n: 1,
        size: "256x256",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_TOKEN}`,
        },
        timeout: 10000,
      }
    );

    res.status(200).send(imgRes.data);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err });
  }
}
