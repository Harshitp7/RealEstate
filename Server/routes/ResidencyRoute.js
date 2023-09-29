const express = require("express");
const {createResidency, getAllResidencies, getResidency} = require("../controllers/ResidencyController.js");
const jwtCheck = require("../config/auth0Config.js");
const router = express.Router();

router.post("/create", jwtCheck, createResidency);
router.get("/allresd", getAllResidencies);
router.get("/:id", getResidency);

module.exports = router;