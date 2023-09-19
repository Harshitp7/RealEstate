const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})

//impoting routes
const userRoute = require("./routes/UserRoute.js");
const residencyRoute = require("./routes/ResidencyRoute.js");

//using routes
app.use("/api/user", userRoute);
app.use("/api/residency", residencyRoute);