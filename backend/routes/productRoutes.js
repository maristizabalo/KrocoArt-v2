import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
} from "../controllers/productController.js";

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(authenticate, authorizeAdmin, createProduct) // Solo administradores pueden crear productos
  .get(getAllProducts); // Todos pueden ver los productos

// Rutas para operaciones específicas en productos por ID
router
  .route("/:id")
  .get(getProductById) // Obtener detalles de un producto por ID
  .put(authenticate, authorizeAdmin, updateProductById) // Solo administradores pueden actualizar productos
  .delete(authenticate, authorizeAdmin, deleteProductById); // Solo administradores pueden eliminar productos

export default router;