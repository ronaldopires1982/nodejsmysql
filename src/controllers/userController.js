import { Router } from "express";
import {
  getUsers,
  getUserById,
  addUser,
  login,
} from "../services/userService.js";

const routes = Router();

routes.get("/", (req, res) => {
  res.send("Servidor rodando.");
});
routes.get("/user", getUsers);
routes.get("/user/:searchId", getUserById);
routes.post("/signup", addUser);
routes.post("/signin", login);
// routes.put("/:id", updateUser);
// routes.delete("/:id", deleteUser);

export default routes;
