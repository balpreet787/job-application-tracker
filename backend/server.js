const express = require('express');
const app = express();
const session = require('express-session');
const cors = require('cors');

require('dotenv').config();

const port = process.env.PORT || 5000;


const corsOptions = {
    origin: 'http://localhost:5173', 
    credentials: true 
  };

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { 
        httpOnly: true,
        secure: false } 
  }));
  

const authRoutes = require('./routes/auth');
const crudRoutes = require('./routes/crud');
app.use('/', authRoutes);
app.use('/', crudRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
