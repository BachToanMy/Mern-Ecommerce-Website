import express from "express";
import {
  addProduct,
  removeProduct,
  listProduct,
  detailProduct,
} from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.post("/add", addProduct);
productRouter.post("/remove", removeProduct);
productRouter.get("/list", listProduct);
productRouter.get("/detail", detailProduct);

export default productRouter;
