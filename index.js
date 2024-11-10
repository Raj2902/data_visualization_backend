const express = require("express");
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

const uri = process.env.DATABASE_CONNECTING_URL;

app.use(cors());
app.use(express.json());

app.get("/api/data", async (req, res) => {
  try {
    try {
      var client = await MongoClient.connect(uri);
      console.log("Connected successfully to mongodb");
    } catch (error) {
      console.log("Error in connecting mongodb");
    }
    const db = client.db("BlackCoffer");
    const collection = db.collection("sample_datas");

    const data = await collection.find().toArray();

    client.close();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching data" });
  }
});

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
