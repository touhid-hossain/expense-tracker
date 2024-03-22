const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controllers");
const { verifyToken } = require("../middlewares/authMiddleware");

// Routes for getting all users
router.get("/", verifyToken, userController.getAllUsers);

// Route for getting a single user by id
router.get("/:id", userController.getUserById);

const userController = require("../controllers/user.controllers");
const { verifyToken } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

// Route for creating a new user
router.post("/", userController.createUser);

// Route for getting a single user by id
router.get("/", verifyToken, userController.getUser);

// Route for authentication a user
router.post("/authenticate", userController.authenticate);

// Route for updating a user
router.put("/:id", userController.updateUser);

// Route for deleting a user
router.delete("/:id", userController.deleteUser);

// Route for updating a user // Upload Image Route
router.put("/", verifyToken, upload.single("image"), userController.updateUser);

// Routes for getting all users
router.get("/all", verifyToken, userController.getAllUsers);

// Route for deleting a user
router.delete("/", verifyToken, userController.deleteUser);

module.exports = router;
