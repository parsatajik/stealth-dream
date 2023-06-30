import axios from "axios";

export default async function generateMockUp(req, res) {
  try {
    const { img, productId } = req.body;
    const taskRes = await axios.post(
      `https://api.printful.com/mockup-generator/create-task/${productId}`,
      {
        variant_ids: [4035, 4020, 4015],
        files: [
          {
            type: "front",
            image_url: img,
            position: {
              area_width: 1800,
              area_height: 2400,
              width: 1800,
              height: 1800,
              top: 300,
              left: 0,
            },
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.PRINTFUL_TOKEN}`,
        },
      }
    );

    console.log("taskRes: ");
    console.log(taskRes.data);

    const getMocksUps = async () => {
      const mockUps = await axios.get(
        `https://api.printful.com/mockup-generator/task?task_key=${taskRes.data.result.task_key}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.PRINTFUL_TOKEN}`,
          },
        }
      );

      console.log("mockUps: ");
      console.log(mockUps.data);

      if (mockUps?.data?.result?.status === "pending") {
        getMocksUps();
      } else {
        res.status(200).send(mockUps.data.result);
      }
    };

    getMocksUps();
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err });
  }
}
