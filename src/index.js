const express = require('express');
const bodyParser = require('body-parser');
const requestIp = require("request-ip");
const moment = require('moment')
const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');
const app = express();

app.use(requestIp.mw({attributeName:'customIp'}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req,res,next) =>{
    let date = moment().format('MM Do YYYY','h:mm:ss a')

    let ip =  req.CustomIp;
    let url = req.url;
    console.log(date,ip,url)
    next()
    
})


mongoose.connect("mongodb+srv://functionup-cohort:G0Loxqc9wFEGyEeJ@cluster0.rzotr.mongodb.net/Pritesh8769811-DB?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use('/', route);


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
