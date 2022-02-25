
const express = require('express');

const router = express.Router();

// localhost:3000/get-query-1?votingage=18
let people= [
    {
    name: "PK",
    age: 10,
    votingStatus: false
 },
 {
    name: "SK",
    age: 20,
    votingStatus: false
 },
 {
    name: "AA",
    age: 70,
    votingStatus: false
 },
 {
    name: "SC",
    age: 5,
    votingStatus: false
 },
 {
    name: "HO",
    age: 40,
    votingStatus: false
 }
 ]
 
let eligiblePeople =[]
router.post('query', function (req, res) {
    let input =req.query.votingAge
    for (let i = 0; i < people.length; i++) {
      if(people[i].age>input){
          people[i].votingStatus=true
          eligiblePeople.push(people[i])
      }
        
    }
    console.log(eligiblePeople)
    res.send({result:eligiblePeople,status:true})
    
})  

module.exports = router;
// adding this comment for no reason