import db from "../lib/mongo";

const TABLE = "business";

async function getAllBusiness() {
  const allBusiness = await db.getAll(TABLE);
  return allBusiness;
}

async function getOneBusiness(id) {
  const oneBusiness = await db.getOne(TABLE, id);
  return oneBusiness;
}

async function createNewBusiness(data) {
  const newBusiness = await db.createOne(TABLE, data);
  return newBusiness;
}

async function updatedBusiness(data, id) {
  await db.updateOne(TABLE, data, id);
  return await getOneBusiness(id);
}

async function deleteBusiness(id) {
  await db.deleteOne(TABLE, id);
  return true;
}

export default {
  getAllBusiness,
  getOneBusiness,
  createNewBusiness,
  updatedBusiness,
  deleteBusiness,
};
