import serviceBusiness from "../../../services/business";

import customLog from "../../../utils/console/customLog";

async function apiBusinessWithID(req, res) {
  try {
    switch (req.method) {
      case "GET":
        const oneBusiness = await serviceBusiness.getOneBusiness(req.query.id);
        res.status(200).json(oneBusiness);
        break;

      case "PUT":
        const updatedBusiness = await serviceBusiness.updatedBusiness(
          req.body,
          req.query.id
        );
        res.status(201).json({
          updated: true,
          homeless: updatedBusiness,
        });
        break;

      case "DELETE":
        await serviceBusiness.deleteBusiness(req.query.id);
        res
          .status(404)
          .json(`The Business with id: ${req.query.id} was been delete`);
        break;

      default:
        res.status(404).json(`Nothing with the method ${req.method}`);
    }
  } catch (error) {
    customLog.error(`[DB-error] index-id api: ${error}`);
    res.status(500).json({
      error: "something went wrong",
    });
  }
}

export default apiBusinessWithID;
