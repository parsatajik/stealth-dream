import axios from "axios";

export default async (req, res) => {
  const { toAddress, weight } = req.body;

  try {
    const response = await axios({
      method: "post",
      url: "https://ssapi.shipstation.com/shipments/getrates",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(
            process.env.SHIPSTATION_API_KEY +
              ":" +
              process.env.SHIPSTATION_API_SECRET
          ).toString("base64"),
        "Content-Type": "application/json",
      },
      data: {
        carrierCode: "fedex",
        fromCity: "toronto",
        fromPostalCode: "M5V 3R5",
        toCountry: toAddress.country,
        toPostalCode: toAddress.postalCode,
        toCity: toAddress.city,
        weight: weight,
        confirmation: "delivery",
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.log(error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error(error.response.data);
      console.error(error.response.status);
      console.error(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error", error.message);
    }
    console.error(error.config);

    res.status(500).json({ error: error.toString() });
  }
};
