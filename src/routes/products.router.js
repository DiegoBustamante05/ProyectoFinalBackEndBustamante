import express from "express";
import { productsController } from "../controllers/products.controller.js";
import { checkAdmin, checkAuthToDelete } from "../middlewares/auth.js";
export const routerProducts = express.Router();


routerProducts.use(express.json());
routerProducts.use(express.urlencoded({
    extended: true
}));





routerProducts.get("/", productsController.getAll);

routerProducts.get("/:pid", productsController.getById);

routerProducts.post("/", /*checkAdmin*/ productsController.add);

routerProducts.put("/:pid", checkAdmin, productsController.update);

routerProducts.delete("/:pid", /*checkAuthToDelete,*/ productsController.delete);
