const moment = require('moment-timezone');
const { getResponse } = require("../utils/APINinja");
const { sendImageTextMessage, sendTextMessage } = require("../utils/whatsappMessages");

async function sendAQI(LOCATION_QUERY) {
    getResponse(`https://api.api-ninjas.com/v1/airquality?${LOCATION_QUERY}`).then(res => {
        if (res.overall_aqi <= 50) sendImageTextMessage(`Your Air Quality is ${res.overall_aqi}, which is Good.`, "https://i.ibb.co/YyqZJv3/green.jpg");
        else if (res.overall_aqi > 50 && res.overall_aqi <= 100) sendImageTextMessage(`Your Air Quality is ${res.overall_aqi}, which is Moderate.`, "https://i.ibb.co/M5Kv0BK/yellow.jpg");
        else if (res.overall_aqi > 100 && res.overall_aqi <= 150) sendImageTextMessage(`Your Air Quality is ${res.overall_aqi}, which is Unhealthy for Sensitive Groups.`, "https://i.ibb.co/0jLk9R9/orange.jpg");
        else if (res.overall_aqi > 150 && res.overall_aqi <= 200) sendImageTextMessage(`Your Air Quality is ${res.overall_aqi}, which is Unhealthy.`, "https://i.ibb.co/HpZ6Wcv/red.jpg");
        else if (res.overall_aqi > 200 && res.overall_aqi <= 300) sendImageTextMessage(`Your Air Quality is ${res.overall_aqi}, which is Very Unhealthy.`, "https://i.ibb.co/QHBN0vh/purple.jpg");
        else sendImageTextMessage(`Your Air Quality is ${res.overall_aqi}, which is Hazardous.`, "https://i.ibb.co/jRg4Qq0/maroon.jpg");
    }).catch(err => {
        console.log(err);
    })
}
async function sendWeather(LOCATION_QUERY) {
    getResponse(`https://api.api-ninjas.com/v1/weather?${LOCATION_QUERY}`).then(res => {
        sendTextMessage(
            `*Your Weather Report*\nMin. Temperature - ${res.min_temp} °C\nMax. Temperature - ${res.max_temp} °C\nTemperature - ${res.temp} °C, But feels like ${res.feels_like} °C\nHumidity - ${res.humidity}°C\nWind Speed - ${res.wind_speed} kmph\nSun Rise - ${moment(res.sunrise * 1000).format('hh:mm A')}\nSun Set - ${moment(res.sunset * 1000).format('hh:mm A')}\n`
        )
    }).catch(err => {
        console.log(err)
    })
}

module.exports ={
    sendWeather,
    sendAQI
}