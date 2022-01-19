const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
  createUser,
  getUsername,
  login,
  getProfile,
} = require("../controllers/users.js");

router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);
router.route("/name/:username").get(getUsername);
router.route("/login/:username").post(login);
router.route("/profile/:id").get(getProfile);
module.exports = router;
