import axios from 'axios';

export default async (req, res) => {
  const { order } = req.body;

  try {
    const response = await axios({
      method: 'post',
      url: 'https://ssapi.shipstation.com/orders/createorder',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(process.env.SHIPSTATION_API_KEY + ':' + process.env.SHIPSTATION_API_SECRET).toString('base64'),
        'Content-Type': 'application/json'
      },
      data: order
    });

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};