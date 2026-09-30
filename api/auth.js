import express from "express";
import { findByUsername } from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const router = express.Router();

router.post("/login", async (req, res) => {
    const { password, username } = req.body;

if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required"});
}

const user = await findByUsername(username);

if (!user) {
    return res.status(401).json({message: "Invalid credentials"});
}

const match = await bcrypt.compare(password, user.passwordHash);

if (!match) {
    return res.status(401).json({message: "Invalid credentials" });

}

const token = jwt.sign({id : user.id, username: user.username, role: user.role}, process.env.JWT_SECRET, { expiresIn: "1h" });

res.status(200).json({message: "Login successful", token})

});

export default router;
