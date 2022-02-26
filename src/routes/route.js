const express = require('express');
const router = express.Router();
//1
router.get('/movies', function(req, res) {
    
    res.send('["fukrey","kotafactory"]')
})
console.log()
//2
router.get('/movies/:movieId', function(req, res) {
    movie =["fukrey","nawabzade","boothnath"]
    let value = req.params.movieId.length
    if(value>movie.length-1){
        res.send("doesn't exist")
    }
    else{

        res.send(movie[value])
    }
});
//3
router.get('/films', function(req, res) { res.send
    [ {
        "i": 1,
        "name": "The Shining"
       }, {
        "id": 2,
        "name": "Incendies"
       }, {
        "id": 3,
        "name": "Rang de Basanti"
       }, {
        "id": 4,
        "name": "Finding Demo"
       }]
       

})




module.exports = router;
