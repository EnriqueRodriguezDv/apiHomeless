import db from "../lib/mongo";

const TABLE = "homeless";

async function getAllHomeless() {
  const allHomeless = await db.getAll(TABLE);
  return allHomeless;
}

async function getOneHomeless(id) {
  const oneHomeless = await db.getOne(TABLE, id);
  return oneHomeless;
}

async function createNewHomeless(data) {
  const newHomeless = await db.createOne(TABLE, data);
  return newHomeless;
}

async function updatedHomeless(data, id) {
  await db.updateOne(TABLE, data, id);
  return await getOneHomeless(id);
}

async function deleteHomeless(id) {
  await db.deleteOne(TABLE, id);
  return true;
}

export default {
  getAllHomeless,
  getOneHomeless,
  createNewHomeless,
  updatedHomeless,
  deleteHomeless,
};
