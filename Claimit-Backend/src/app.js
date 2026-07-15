const express = require("express");
const indexRoutes = require("./routes/index.routes");
const app =express();

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to the API" 
    });
});

app.use("/api/v1", indexRoutes);

module.exports = app;