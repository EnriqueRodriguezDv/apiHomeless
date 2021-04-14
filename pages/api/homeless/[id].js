import serviceHomeless from "../../../services/homeless";

import customLog from "../../../utils/console/customLog";

async function apiHomelessWithID(req, res) {
  try {
    switch (req.method) {
      case "GET":
        const oneHomeless = await serviceHomeless.getOneHomeless(req.query.id);
        res.status(200).json(oneHomeless);
        break;

      case "PUT":
        const updatedHomeless = await serviceHomeless.updatedHomeless(
          req.body,
          req.query.id
        );
        res.status(201).json({
          updated: true,
          homeless: updatedHomeless,
        });
        break;

      case "DELETE":
        await serviceHomeless.deleteHomeless(req.query.id);
        res
          .status(404)
          .json(`The Homeless with id: ${req.query.id} was been delete`);
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

export default apiHomelessWithID;
