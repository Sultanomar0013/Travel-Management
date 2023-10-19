const app = require('express')();
const http = require('http').Server(app);

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL)
.then(() => {
    console.log(`Connection successful`);
}).catch((e) => {
    console.log(`Connection error: ${e}`);
});
const User = require('../models/signup')
