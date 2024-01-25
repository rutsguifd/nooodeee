/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       description: User data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/UserInput'
 *     responses:
 *       201:
 *         description: User created successfully
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: Updated user data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/UserInput'
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Soft delete user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User soft-deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * definitions:
 *   UserInput:
 *     type: object
 *     properties:
 *       username:
 *         type: string
 *         description: User's username
 *       email:
 *         type: string
 *         format: email
 *         description: User's email address
 *     required:
 *       - username
 *       - email
 *
 *   UserOutput:
 *     allOf:
 *       - $ref: '#/definitions/UserInput'
 *       - type: object
 *         properties:
 *           cartId:
 *             type: string
 *             nullable: true
 *             description: ID of the user's cart, can be null
 *           isDeleted:
 *             type: boolean
 *             default: false
 *             description: Indicates whether the user is deleted
 *
 *   User:
 *     allOf:
 *       - $ref: '#/definitions/UserInput'
 *       - $ref: '#/definitions/UserOutput'
 */

import express from "express";
import UserController from "../controllers/user.controller";
import authenticationMiddleware from "../middleware/authentication.middleware";

const router = express.Router();
const userController = new UserController();

router.get(
  "/api/users/:id",
  authenticationMiddleware,
  userController.getUserById
);
router.post("/api/users", userController.createUser);
router.put(
  "/api/users/:id",
  authenticationMiddleware,
  userController.updateUser
);
router.delete(
  "/api/users/:id",
  authenticationMiddleware,
  userController.softDeleteUser
);

export default router;
