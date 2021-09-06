const request = require('request')

const forecast = (latitude,longitude,callback) => {
    const url = `http://api.weatherstack.com/current?access_key=b3de3562a5d76cbeadd4c39adb4a5929&query=${latitude},${longitude}`
    
    request({url,json:true},(error,{body}) => {
        if(error){
            callback('Unable to connect to weather service',undefined)
        }else if(body.error){
            callback('Unable to find Location',undefined)
        }else{
            callback(undefined,body.current)
        }
    })
}

module.exports = forecast