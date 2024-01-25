/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management
 */

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Successful operation
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       description: Product data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/ProductInput'
 *     responses:
 *       201:
 *         description: Product created successfully
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Updated product data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/ProductInput'
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal Server Error
 */

/**
/**
 * @swagger
 * definitions:
 *   ProductInput:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *         description: Product name
 *       description:
 *         type: string
 *         description: Product description
 *       price:
 *         type: number
 *         format: double
 *         description: Product price
 *     required:
 *       - name
 *       - description
 *       - price
 *
 *   ProductOutput:
 *     allOf:
 *       - $ref: '#/definitions/ProductInput'
 *       - type: object
 *         description: Output representation of a product
 *
 *   Product:
 *     allOf:
 *       - $ref: '#/definitions/ProductInput'
 *       - $ref: '#/definitions/ProductOutput'
 */

import express from "express";
import ProductController from "../controllers/product.controller";
import authenticationMiddleware from "../middleware/authentication.middleware";

const router = express.Router();
const productController = new ProductController();

router.get(
  "/api/products/:id",
  authenticationMiddleware,
  productController.getProductById
);
router.get(
  "/api/products",
  authenticationMiddleware,
  productController.getAllProducts
);
router.post(
  "/api/products",
  authenticationMiddleware,
  productController.createProduct
);
router.put(
  "/api/products/:id",
  authenticationMiddleware,
  productController.updateProduct
);
router.delete(
  "/api/products/:id",
  authenticationMiddleware,
  productController.deleteProduct
);

export default router;
