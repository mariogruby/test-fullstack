const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGODB_URI 

mongoose
.connect(MONGO_URI)
.then((x) => {
    const dbName = x.connextions[0].name;
    console.log(`Connecting to Mongo! db name: "${dbName}"`);
})
.catch((err) => {
    console.error("Error connecting to Mongo", err);
});