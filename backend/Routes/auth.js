// const express = require("express");
// const router = express.Router();
// const User = require("../Models/user");

// // POST /api/auth/login
// router.post("/login", async (req, res) => {
//     const { username, password } = req.body;

//     try {
//         const user = await User.findOne({ username, password });

//         if (!user) {
//             return res.status(401).json({ message: "Invalid credentials" });
//         }

//         res.json({
//             message: "Login successful",
//             user: {
//                 username: user.username,
//                 role: user.role,
//             },
//         });
//     } catch (error) {
//         res.status(500).json({ message: "Server error", error });
//     }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../Models/user");

// POST /api/login
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Compare hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        res.json({
            message: "Login successful",
            user: {
                username: user.username,
                role: user.role,
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

module.exports = router;
