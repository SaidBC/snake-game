require("dotenv").config();
const express = require("express");
const cors = require("cors");
const upload = require("multer")();
const cookieParser = require("cookie-parser");
const app = express();
const router = require("./routes/router");

const PORT = Number(process.env.PORT);

app.use(cookieParser());
app.use(upload.none());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/snakegame/api/v1", router);

app.listen(PORT, () => {
  console.log("The application is running at PORT :", PORT);
});
