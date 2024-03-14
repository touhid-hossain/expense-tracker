const express = require("express");
const { getUsers, postUsers } = require("../controllers/userController");
const router = express.Router();

router.get("/users", getUsers);

router.post("/users", postUsers);

module.exports = router;
