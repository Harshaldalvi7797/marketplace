const express = require("express")
const app = express()

const mongoose = require("mongoose")
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

//databse connection
mongoose.connect("mongodb://localhost/marketPlace", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(() => {
        console.log("Database conneced successfully")

    })
    .catch((err) => {
        console.log(err)

    })

const authRoutes = require("./routes/auth");


//Middlewares
app.use(bodyParser.json());
app.use(cookieParser()); // add and remove some values in cookies
//My Routes
app.use("/api", authRoutes);
//port
const PORT = process.env.PORT || 5000
//starting server
app.listen(PORT, () => {
    console.log(`App is  running on ${PORT}`)
})