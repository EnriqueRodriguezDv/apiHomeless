import serviceHomeless from "../../../services/homeless";

import customLog from "../../../utils/console/customLog";

const apiHomeless = async (req, res) => {
  try {
    switch (req.method) {
      case "GET":
        const allHomeless = await serviceHomeless.getAllHomeless();
        res.status(200).json(allHomeless);
        break;

      case "POST":
        const data = req.body;
        const newHomeless = await serviceHomeless.createNewHomeless(data);
        res.status(201).json({
          created: true,
          movieID: newHomeless.ops.map((item) => item._id),
        });
        break;

      default:
        res.status(404).json(`Nothing with the method ${req.method}`);
    }
  } catch (error) {
    customLog.error("[DB-error] - index api: " + error);
    res.status(500).json({
      error: "something went wrong",
    });
  }
};

export default apiHomeless;
