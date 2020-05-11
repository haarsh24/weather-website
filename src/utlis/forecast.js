const request = require("postman-request")

const forecast= (latitude,longitude,callback)=>
{
    const url="http://api.weatherstack.com/current?access_key=2de36ee46e7d5f78f484e9a4ee953875&query="+ longitude +","+ latitude

    
request({url,json:true},(error,{body}={})=>
{ if(error)
    {
      callback("Unable to connect to the weather service !",undefined)
    }
    else if(body.error)
    {
        callback("Unable to find the location !,Please try another search",undefined)
    }
    else
    {
     callback(undefined, body.current.weather_descriptions+ "  , Currently it is  "+
     body.current.temperature+" Degree outside and it feels like  "+body.current.feelslike+" degree outside and the humidity is  " + body.current.humidity  )
    }
})
}

module.exports = forecast