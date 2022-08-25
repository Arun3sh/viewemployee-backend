import express, { response } from "express";
import {
  getAllEmp,
  getOneEmp,
  addEmp,
  deleteEmp,
  editEmp,
} from "../../helper.js";
import fileUpload from "express-fileupload";
const router = express.Router();

router.use(fileUpload());

router.get("/", async (request, response) => {
  const empData = await getAllEmp();

  response.send(empData);
});

router.get("/:id", async (request, response) => {
  const { id } = request.params;
  const getOne = await getOneEmp(id);

  response.send(getOne);
});

router.post("/add-employee", async (request, response) => {
  const img = request.files;
  const { title, name, email, age, gender, preferredLocation } = request.body;
  let target_file = request.files.file;

  var file_name = new Date().getTime() + "_" + target_file.name;
  console.log(file_name);

  target_file.mv(
    `F:/GUVI MERN BOOTCAMP/Interview Task/viewemployee-backend/uploads/${file_name}`,
    (err) => {
      if (err) {
        return response.status(500).send(err);
      }
    }
  );
  const empData = {
    title: title,
    name: name,
    email: email,
    age: age,
    gender: gender,
    preferredLocation: preferredLocation,
    profilepicname: file_name,
    profilepicpath: `../../uploads/${file_name}`,
  };
  const adduser = await addEmp(empData);
  response.status(200).send(adduser);
});

router.put("/edit-employee/:id", async (request, response) => {
  const { id } = request.params;
  const img = request.files;
  const { title, name, email, age, gender, preferredLocation } = request.body;
  let target_file = request.files.file;

  var file_name = new Date().getTime() + "_" + target_file.name;
  console.log(file_name);

  target_file.mv(
    `F:/GUVI MERN BOOTCAMP/Interview Task/viewemployee-backend/uploads/${file_name}`,
    (err) => {
      if (err) {
        return response.status(500).send(err);
      }
    }
  );
  const empData = {
    title: title,
    name: name,
    email: email,
    age: age,
    gender: gender,
    preferredLocation: preferredLocation,
    profilepicname: file_name,
    profilepicpath: `../../uploads/${file_name}`,
  };

  const result = await editEmp(id, empData);

  response.send(result);
});

router.delete("/delete-employee/:id", async (request, response) => {
  const { id } = request.params;

  const result = await deleteEmp(id);

  response.send(result);
});

export const employeeRouter = router;
