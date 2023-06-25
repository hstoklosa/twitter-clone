require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const MongoClient = require("mongodb").MongoClient;

const app = express();
const client = new MongoClient(process.env.MONGO_URI);

// Test connection
(async () => {
    const database = client.db("test");
    const table = database.collection("users");
    const users = table.find({});

    for await (const doc of users) {
        console.dir(doc);
    }
})();

// Middleware
const corsSettings = {
    // put = replace resource entirely, patch = replace part of a resource
    origin: true,
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(express.json());
app.use(cors(corsSettings));
app.use(morgan("dev"));

// Routes
// ...

// Error handling
// ...

// Starting point
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
