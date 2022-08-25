import { client } from "./index.js";
import { ObjectId } from "mongodb";

async function getAllEmp() {
  return await client.db("mern").collection("metadiac").find().toArray();
}

async function getOneEmp(id) {
  return await client
    .db("mern")
    .collection("metadiac")
    .findOne({ _id: ObjectId(id) });
}

async function addEmp(data) {
  return await client.db("mern").collection("metadiac").insertOne(data);
}

async function editEmp(id, data) {
  return await client
    .db("mern")
    .collection("metadiac")
    .updateOne({ _id: ObjectId(id) }, { $set: data });
}

async function deleteEmp(id) {
  return await client
    .db("mern")
    .collection("metadiac")
    .deleteOne({ _id: ObjectId(id) });
}
export { getAllEmp, getOneEmp, addEmp, editEmp, deleteEmp };
