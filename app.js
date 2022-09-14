const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/UserRoutes');
const app = express();
app.use(express.json());

app.use("/users", router);



mongoose.connect(
    "mongodb+srv://admin:admin123@cluster0.7gil5kg.mongodb.net/?retryWrites=true&w=majority")
    .then(() => app.listen(5000, () => console.log("Connected and Listening to port: 5000")))
    .catch((err) => console.log(err))