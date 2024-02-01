const express = require("express");
const { hashPassword } = require("./services/auth");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import userController module for handling item-related operations
const userController = require("./controllers/userController");
const saveController = require("./controllers/saveController");

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
router.get("/logout", userController.logout);

// Route to get a save data by id user
router.get("/saves", saveController.read);

// Route to post a save data by id user
router.post("/saves", saveController.add);

// Route to update a save data by id user
router.put("/saves", saveController.edit);

/* ************************************************************************* */

module.exports = router;
