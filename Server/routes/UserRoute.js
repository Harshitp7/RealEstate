const express = require("express");
const {createUser, bookVisit, getAllBookings, cancelBooking, toFav, getAllFavourites} = require("../controllers/UserController.js");
const jwtCheck = require("../config/auth0Config.js");
const router = express.Router();

router.post("/register", jwtCheck, createUser);
router.post("/bookVisit/:id", jwtCheck, bookVisit);
router.post("/allBookings", jwtCheck, getAllBookings);
router.post("/removeBooking/:id", jwtCheck, cancelBooking);
router.post("/toFav/:rid", jwtCheck, toFav);
router.post("/allFav", jwtCheck, getAllFavourites);

module.exports = router;