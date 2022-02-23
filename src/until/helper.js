// module2
//print current date

// printDate() : prints the current date
// - printMonth() : prints the current month
// - getBatchInfo() : prints batch name, week#, Day#, the topic being taught today is ….. For example - ‘Thorium, W3D1, the topic for today is Nodejs module system’
	
// 	Call all these functions in route.js inside the test-me route handler
// print current date
function printDate(){
    let today = new Date()
    let Date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear()
    console.log('current date is: ',Date)

}
// prints the current month
function printMonth(){
    let today = new Date()
    let month = today.getMonth()+1
    console.log('current month is: ',month)

}
//print information about batch\

function getBatchInfo(){
    console.log('Thorium, W3D1, the topic for today is Nodejs module system')
}
module.exports.printCurrentDate= printDate
module.exports.printCurrentMonth = printMonth
module.exports.printBatchInfo = getBatchInfo