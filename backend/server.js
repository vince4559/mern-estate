require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
 const cookieParser = require('cookie-parser');
 const credentials = require('./middlewares/credentials');
 const PORT = process.env.PORT;
 const mongoose = require('mongoose');
 const connectDB = require('./config/dbConn');
const errorHandler = require('./middlewares/errorHandler');
const router = require('./routes/auth-route')

//  connect to mongoDB
connectDB()

//  handle option credentials check and fetch cookies
app.use(credentials);

// handle cors error
app.use(cors(corsOptions));

// middleware to handle urlencoded form data
app.use(express.urlencoded({extended: false}));

// middleware to handle json
app.use(express.json());

// middleware for cookies
app.use(cookieParser());

// routes
app.get('/', (req, res) => {
    res.send("hello mern estate")
});

app.use(router)


// catch all error route
app.all("*", (req, res) => {
    res.status(404)
});


app.use(errorHandler);

// configure connection to database
mongoose.connection.once('open', () => {
    console.log('connected to mongoDB');
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
})


