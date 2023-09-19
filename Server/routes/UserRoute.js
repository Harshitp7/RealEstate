const express = require("express");
const {createUser, bookVisit, getAllBookings, cancelBooking, toFav, getAllFavourites} = require("../controllers/UserController.js");
const router = express.Router();

router.post("/register", createUser);
router.post("/bookVisit/:id", bookVisit);
router.post("/allBookings", getAllBookings);
router.post("/removeBooking/:id", cancelBooking);
router.post("/toFav/:rid", toFav);
router.post("/allFav", getAllFavourites);

module.exports = router;