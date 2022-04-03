const express = require('express');
const bodyParser = require('body-parser');
const multer = require("multer")


const routes = require('./src/Routes/route.js');
const { default: mongoose } = require('mongoose');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer().any())

mongoose.connect("mongodb+srv://taabish:lkmgsyjhwbQYgkvX@cluster0.cp3ka.mongodb.net/group7Database?authSource=admin&replicaSet=atlas-12xyw4-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )



app.use('/', routes);


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
