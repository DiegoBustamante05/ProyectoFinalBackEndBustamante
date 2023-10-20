import express from "express";
import { usersController } from "../controllers/users.controller.js";
import { checkAdmin } from "../middlewares/auth.js";
export const routerUsers = express.Router();

routerUsers.use(express.json());
routerUsers.use(express.urlencoded({
    extended: true
}));

routerUsers.get("/", usersController.getAll);

routerUsers.delete("/delete", checkAdmin, usersController.delete);

routerUsers.delete("/:id", checkAdmin, usersController.deleteById);

routerUsers.put("/:id", checkAdmin, usersController.updateUserRole)