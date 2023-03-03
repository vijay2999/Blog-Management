const express = require('express');
const route = require('./routes/route.js');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

mongoose.connect("mongodb+srv://Project_1:Project1@cluster1.ofojapx.mongodb.net/test",{ UseNewUrlParser: true })
    .then(() => console.log("MongoDb is Connected"))
    .catch(err => console.log(err))

app.use('/', route);

app.listen(3000, function () {
    console.log('Express app running on port' + (3000))
});


