const express = require("express");
const authRoutes = require("./routes/auth.routes");
const app =express();

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to the API" 
    });
});

app.use("/auth", authRoutes);

module.exports = app;