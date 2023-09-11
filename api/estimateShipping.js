import axios from 'axios';

export default async (req, res) => {
  const { toAddress, weight, dimensions } = req.body;

  try {
    const response = await axios({
      method: 'post',
      url: 'https://ssapi.shipstation.com/shipments/getrates',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(process.env.SHIPSTATION_API_KEY + ':' + process.env.SHIPSTATION_API_SECRET).toString('base64'),
        'Content-Type': 'application/json'
      },
      data: {
        "carrierCode": "ups",
        "serviceCode": null,
        "packageCode": null,
        "fromPostalCode": "M5V3R5",
        "toState": toAddress.state,
        "toCountry": toAddress.country,
        "toPostalCode": toAddress.postalCode,
        "toCity": toAddress.city,
        "weight": weight,
        "dimensions": dimensions,
        "confirmation": "delivery",
        "residential": toAddress.residential
      }
    });

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};