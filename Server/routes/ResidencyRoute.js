const express = require("express");
const {createResidency, getAllResidencies, getResidency} = require("../controllers/ResidencyController.js");
const router = express.Router();

router.post("/create", createResidency);
router.get("/allresd", getAllResidencies);
router.get("/:id", getResidency);

module.exports = router;