// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
// const User = require("../Models/user");

// const users = [
//     { username: "MasterAdmin", password: "masteradmin123", role: "masterAdmin" },
//     { username: "SuperAdminEng", password: "superadmineng123", role: "superAdminEng" },
//     { username: "SuperAdminTech", password: "superadmintech123", role: "superAdminTech" },
//     { username: "CSEEngHod", password: "cseenghod123", role: "CSEEngHod" },
//     { username: "ITEngHod", password: "itenghod123", role: "ITEngHod" },
//     { username: "ADSEngHod", password: "adsenghod123", role: "ADSengHod" },
//     { username: "AIMLEngHod", password: "aimlenghod123", role: "AIMLEngHod" },
//     { username: "ECEEngHod", password: "eceenghod123", role: "ECEEngHod" },
//     { username: "EEEEngHod", password: "eeeenghod123", role: "EEEEngHod" },
//     { username: "BTEngHod", password: "btenghod123", role: "BioTechEngHod" },
//     { username: "ChemEngHod", password: "chemenghod123", role: "ChemicalEngHod" },
//     { username: "CseTechHod", password: "csetechhod123", role: "CSETechHod" },
//     { username: "CyberTechHod", password: "cybertechhod123", role: "CSECyberHod" },
//     { username: "ITTechHod", password: "ittechhod123", role: "ITTechHod" },
//     { username: "ADSTechHod", password: "adstechhod123", role: "ADSTechHod" },
//     { username: "ECETechHod", password: "ecetechhod123", role: "ECETechHod" },
//     { username: "EEETechHod", password: "eeetechhod123", role: "EEETechHod" },
//     { username: "admin", password: "admin123", role: "admin" },
//     { username: "user", password: "user123", role: "user" },
//     { username: "adminTech", password: "adminTech123", role: "adminTech" },
//     { username: "userTech", password: "userTech123", role: "userTech" }
// ];

// const hashedPassword = await bcrypt.hash("admin", 10);

// const seed = async () => {
//     try {
//         await mongoose.connect("mongodb://127.0.0.1:27017/eventtracker", {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         });

//         console.log("🔌 Connected to MongoDB...");

//         for (const user of users) {
//             const exists = await User.findOne({ username: user.username });
//             if (!exists) {
//                 const hashedPassword = await bcrypt.hash(user.password, 10);
//                 await User.create({
//                     username: user.username,
//                     password: hashedPassword,
//                     role: user.role
//                 });
//                 console.log(`✅ User ${user.username} seeded`);
//             } else {
//                 console.log(`⚠️  User ${user.username} already exists. Skipping.`);
//             }
//         }

//         console.log("🌱 Seeding complete");
//         mongoose.disconnect();
//     } catch (err) {
//         console.error("❌ Seeding failed:", err);
//         mongoose.disconnect();
//     }
// };

// seed();


const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../Models/user");

const MONGO_URI = "mongodb://127.0.0.1:27017/eventtracker";

const seedUsers = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("🔌 Connected to MongoDB...");

        const users = [
            { username: "MasterAdmin", password: "master123", role: "master-admin" },
            { username: "SuperAdminEng", password: "eng123", role: "super-admin-eng" },
            { username: "SuperAdminTech", password: "tech123", role: "super-admin-tech" },
            { username: "CSEEngHod", password: "cse123", role: "hod-eng-cse" },
            { username: "ITEngHod", password: "it123", role: "hod-eng-it" },
            { username: "ADSEngHod", password: "ads123", role: "hod-eng-ads" },
            { username: "AIMLEngHod", password: "aiml123", role: "hod-eng-aiml" },
            { username: "ECEEngHod", password: "ece123", role: "hod-eng-ece" },
            { username: "EEEEngHod", password: "eee123", role: "hod-eng-eee" },
            { username: "BTEngHod", password: "bt123", role: "hod-eng-bt" },
            { username: "ChemEngHod", password: "chem123", role: "hod-eng-chem" },
            { username: "CseTechHod", password: "tcse123", role: "hod-tech-cse" },
            { username: "CyberTechHod", password: "cyber123", role: "hod-tech-cyber" },
            { username: "ITTechHod", password: "tit123", role: "hod-tech-it" },
            { username: "ADSTechHod", password: "tads123", role: "hod-tech-ads" },
            { username: "ECETechHod", password: "tece123", role: "hod-tech-ece" },
            { username: "EEETechHod", password: "teee123", role: "hod-tech-eee" },
            { username: "admin", password: "admin123", role: "admin" },
            { username: "user", password: "user123", role: "user" },
            { username: "adminTech", password: "admintech123", role: "admin-tech" },
            { username: "userTech", password: "usertech123", role: "user-tech" },
        ];

        for (const u of users) {
            const existing = await User.findOne({ username: u.username });
            if (existing) {
                console.log(`⚠️  User ${u.username} already exists. Skipping.`);
                continue;
            }

            const hashedPassword = await bcrypt.hash(u.password, 10);

            const newUser = new User({
                username: u.username,
                password: hashedPassword,
                role: u.role,
            });

            await newUser.save();
            console.log(`✅ User ${u.username} created.`);
        }

        console.log("🌱 Seeding complete");
    } catch (err) {
        console.error("❌ Seeding failed:", err);
    } finally {
        await mongoose.disconnect();
    }
};

seedUsers();
