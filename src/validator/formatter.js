// Module 3: src/validator/formatter.js
// - trim() : calls the trim function on a hardcoded string for example ‘ functionUp  ’
// - changetoLowerCase() : changes the case of the string to lower. [Call toLowerCase() on a hardcoded string]
// - changeToUpperCase() : changes the case of the string to upper case [Call toUpperCase() on a hardcoded string]
// 1
function trim(){
    let name = '   vaibhav    Bansode  '
    console.log('trimmed name is:- ',name.trim())

}
// 2
function changetoLowerCase(){
    let name = 'VaIbHav BanSOde'
    console.log('change name to lower case:-',name.toLocaleLowerCase())
}
// 3
function changeToUpperCase(){
    let name = 'vaibhav bansode'
    console.log('change to upper case:- ',name.toLocaleUpperCase())
}

module.exports.trim = trim
module.exports.changetoLowerCase = changetoLowerCase
module.exports.changeToUpperCase = changeToUpperCase
