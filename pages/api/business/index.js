import serviceBusiness from "../../../services/business";

import customLog from "../../../utils/console/customLog";

const apiBusiness = async (req, res) => {
  try {
    switch (req.method) {
      case "GET":
        const allBusiness = await serviceBusiness.getAllBusiness();
        res.status(200).json(allBusiness);
        break;

      case "POST":
        const data = req.body;
        const newBusiness = await serviceBusiness.createNewBusiness(data);
        res.status(201).json({
          created: true,
          movieID: newBusiness.ops.map((item) => item._id),
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

export default apiBusiness;
