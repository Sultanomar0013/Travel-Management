const app = require('express')();
const http = require('http').Server(app);

const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://sultanomar:1234@travel.j6o0tig.mongodb.net/TravelManagement?retryWrites=true&w=majority")
.then(() => {
    console.log(`Connection successful`);
}).catch((e) => {
    console.log(`Connection error: ${e}`);
});
const User = require('../models/signup')
