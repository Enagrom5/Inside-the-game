const express = require("express");
const { hashPassword } = require("./services/auth");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import userController module for handling item-related operations
const userController = require("./controllers/userController");

// Route to get a list of items
router.get("/users", userController.browse);

// Route to get a specific item by ID
router.get("/users/:id", userController.read);

// Route to add a new users
router.post("/users", hashPassword, userController.add);

// Route to connect user
router.post("/login", userController.login);

// Route to verify token
router.get("/checktoken", userController.checktoken);

// Route to verify token
router.get("/takedata", userController.takeData);
router.get("/logout", userController.logout);

/* ************************************************************************* */

module.exports = router;
