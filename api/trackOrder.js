import axios from 'axios';

export default async (req, res) => {
  const { orderNumber } = req.query;

  try {
    const response = await axios({
      method: 'get',
      url: `https://ssapi.shipstation.com/shipments?orderNumber=${orderNumber}`,
      headers: {
        'Authorization': 'Basic ' + Buffer.from(process.env.SHIPSTATION_API_KEY + ':' + process.env.SHIPSTATION_API_SECRET).toString('base64'),
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};