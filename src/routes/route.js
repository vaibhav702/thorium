const express = require('express');
const {route} = require('./route')

const router = express.Router();
const logger =require('../logger/logger')
const helper =require('../until/helper')
const formatter =require('../validator/formatter')
const lodash = require('lodash')

router.get('/test-me', function(req, res) {
 res.send('my first ever Api')

});
router.get('/test-me-1', function(req, res) {
 let name = ['Hariom','Akash','Akash','Arpit','sabhia']
 //module 1 member
 logger.printMessage('thorium')
 console.log(logger.url)
 logger.printWelcomeMessage()
 
 });
//  2
helper.printCurrentDate()
helper.printCurrentMonth()
helper.printCurrentMonth()

//3
formatter.trim()
formatter.changeToUpperCase()
formatter.changetoLowerCase()


// //lodash function
// Using the package ‘lodash’ solve below problems(Write all this in route.js in /hello route handler)
// - Create an array of strings containing the names all the months of a year and split the array into 4 equally sized sub-arrays using the chunk function. Print these sub-arrays
// - Create an array containing the first 10 odd numbers. Using the tail function, return the last 9 elements of it and print them on console.
// - Create 5 arrays of numbers containing a few duplicate values. Using the function union create a merged array with only unique values and print them
let months = ['Jan','Feb','Mar','Apr','May','Jun','July','Aug','Sep','Oct','Nov','Dec']
let subArray = lodash.chunk(months,3)
console.log('chunks of months :- ',subArray)

let oddNumbers = [1,3,5,6,9,78,55,52,42,256,2,745,33,67,23,12,11,54]
let lastNumbers = lodash.tail(oddNumbers)
console.log('last 10 odd number:-',lastNumbers)

let arr1 = [1,2,3]
let arr2 = [2,3,4,4]
let arr3 = [4,5]
let arr4 = [4,6,4]
let arr5 = [5,8]
console.log('merged array with unique value:- ',loadash.union(arr1,arr2,arr3,arr4,arr5))