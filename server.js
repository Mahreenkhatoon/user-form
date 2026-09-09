const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

console.log("MONGO_URI:", process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((error) => console.log("MongoDB Error:", error));

// User Schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    phone: String
});

const User = mongoose.model("User", userSchema);

// POST API
app.post("/api/users", async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();

        res.status(201).json({
            message: "User saved successfully",
            user: user
        });
    } catch (error) {
        res.status(500).json({
            message: "Error saving user"
        });
    }
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});