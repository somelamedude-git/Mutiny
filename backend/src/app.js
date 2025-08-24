const express = require('express');
const earlySignUpRoutes = require('./routes/earlyAccess.routes.js');
const app = express();

app.use(express.json({
	limit: "10kb",
}));

app.use(express.urlencoded({extended:true, limit:"16kb"}));
app.use(express.static("public"));

app.use('/register', earlySignUpRoutes);

module.exports = { app };
