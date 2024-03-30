require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth.js");
const listingRoutes = require("./routes/listing.js");
const bookingRoutes = require("./routes/booking.js");
const userRoutes = require("./routes/user.js");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

/* ROUTES */

app.use("/auth", authRoutes);
app.use("/properties", listingRoutes);
app.use("/bookings", bookingRoutes);
app.use("/users", userRoutes);

app.get("/api/health", (req, res) => {
  //console.log("Client has made a api request");
  res.json({
    service: "Rental House Backend API Server",
    active: true,
    time: new Date(),
  });
});

/* MONGOOSE SETUP  */
mongoose
  .connect(process.env.MONGODB_URL, {
    dbName: "Dream_Nest",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection is successful"))
  .catch((err) => console.log("DB connection is unsuccessful", err));

app.get("/", (req, res) => {
  res.send("Hello there!!");
});

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 4003;

app.listen(PORT, () => {
  console.log(`Backend server started at http://${HOST}:${PORT} `);
});
