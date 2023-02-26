require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
// const userRouter = require('./routes/userRoute')

app.use(cors({
  origin: ['http://localhost:3000', 'https://www.festvssut.in', '*', 'https://www.festvssut.fun']
}));
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

// app.use(userRouter)
const eventRoutes = require("./routes/events/events.routes");
app.use("/api/events", eventRoutes);
const authRoutes = require("./routes/Auth/auth.routes");
app.use("/api/auth", authRoutes);
const paymentRoutes = require('./routes/payment/payment.routes')
app.use("/api/payment", paymentRoutes)
const contactRoutes = require("./routes/contact/contact.routes")
app.use("/api/contact", contactRoutes);
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(8000, () => {
      console.log("connected to db");
    });
  })
  .catch((err) => {
    console.log(err);
  });
