const mongoose=require('mongoose')

const isValidMobile=function(mobile){
    return /^[6-9]\d{9}$/.test(mobile)
}

const isValidString=function(string){
    if (typeof value == 'string' && value.trim().length === 0) return false;
      return true;
}

const isValidSpace = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    if (Object.keys==0) return false
    return true;
}

const isValidEmail=function(email){
    return /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email)
}

const isValidPass = function (password) {
    return (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(password))
}

const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId) //24
}

const isvalidPincode = function (pincode) {
    return /^\d{6}$/.test(pincode)
}

const isvalidRequest = function (body) {
    return Object.keys(body).length > 0 //plz enter the data in the body
}


module.exports={isValidMobile,isValidString,isValidEmail,isValidPass,isValidObjectId,isvalidPincode,isValidSpace,isvalidRequest}