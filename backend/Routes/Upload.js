const express = require('express');
const multer = require('multer');
const XLSX = require('xlsx');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

const uri = process.env.MONGO_CONN; // Use the connection string from the .env file
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet);

    await client.connect();
    const database = client.db('event-tracker1'); // Ensure the database name matches the existing one
    const collection = database.collection('participants'); // Replace with your actual collection name
    await collection.insertMany(data);

    res.status(200).json({ message: 'File uploaded and data inserted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to upload file and insert data' });
  } finally {
    await client.close();
  }
});

module.exports = router;