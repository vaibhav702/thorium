const express = require('express');
const router = express.Router();
const CowinController= require("../controllers/cowinController")
const weatherController = require("../controllers/weatherController")
const memeController =require("../controllers/memeCreation")


router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


router.get("/cowin/states", CowinController.getStates)
router.get("/cowin/districtsInState/:stateId", CowinController.getDistricts)
router.get("/cowin/getByPin", CowinController.getByPin)

router.post("/cowin/getOtp", CowinController.getOtp)
router.get("/cowin/getBydistrict",CowinController.districtSession)


//for wether
router.get("/getSortedCities",weatherController.getSortedCity)

//create meemes
router.post("/memeCreate", memeController.memeCreated)
module.exports = router;