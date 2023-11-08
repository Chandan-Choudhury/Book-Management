require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const HttpError = require("./utils/http-error");
const connectDB = require("./db/index.js");

const bookRoutes = require("./routes/book.route");

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS"
    );

    next();
});

app.use("/api/books", bookRoutes);

app.use((req, res, next) => {
    const error = new HttpError("Could not find this route.", 404);
    throw error;
});

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || "An unknown error occurred!" });
});

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 5003);
        console.log("Server is running on port 5003");
    })
    .catch((error) => {
        console.log(error);
    });
