let axios =require("axios")
let getSortedCity = async function(req,res){
    try {
        let cities = ["Bengaluru","Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"];
        let arrayCityObj = [] ; //we have to make it array so we are storing it in array
        for (i =0;i<cities.length;i++){
            
        //iterating the array in given list
    
    
        let obj ={city:cities[i]}
        let result = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=London&appid=ebb01b989e11501b2c677be1fa2a78ce`)
        console.log(result.data.main.temp)
        obj.temp=result.data.main.temp
        arrayCityObj.push(obj)
    }

        let sorted = arrayCityObj.sort((a , b) =>{
            return a.temp - b.temp
        })
        console.log(sorted)
        res.status(200).send({status:true,data:sorted})



    } catch (err) {
        
            console.log(err)
            res.status(500).send({ msg: err.message })
    }
    
     
}



module.exports.getSortedCity=getSortedCity






// GOTO  http://api.openweathermap.org => “subscribe” current weather data ==> get api key for Free version ==> create new account and Verify your emailId( Must verify to avoid issues) => go to My APi keys under your account name(top right corner) or https://home.openweathermap.org/api_keys => save the key/appid somewhere. Now proceed further
// Create API's to do each of the following:
//                     - get weather of London from http://api.openweathermap.org/data/2.5/weather?q=London&appid=<useYourOwnAppId>  (NOTE: must use HTTP infront of the url else axios will attempt to hit localhost and give error  ..also use HTTP only and not HTTPS)
//                     - then change the above to get the temperature only( of London)
//                     - Sort the cities  ["Bengaluru","Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"] in order of their increasing temperature
//                     result should look something like this
//                     [
//                     {city:"London", temp: 280},
//                     {city:"Moscow", temp: 290},
//                     {city:"Bangalore", temp: 301.2},
//                     .......
//                     ]