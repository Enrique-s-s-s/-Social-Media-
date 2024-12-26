const express = require('express');
const cors = require('cors');
const path = require("path");

require('dotenv').config();

const AuthRouter = require('./routes/auth.route');
const userRouter = require('./routes/user.route');
const ExplorRouter = require('./routes/explore.route');

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
};

app.use(cors(corsOptions));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth',AuthRouter);
app.use('/api/user',userRouter);
app.use('/api/explore',ExplorRouter);

app.use(express.static(path.join(__dirname, "../../client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/build", "index.html"));
});

module.exports = app;