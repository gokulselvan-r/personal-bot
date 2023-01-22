const express = require('express');
const {
    WebhookClient
} = require("dialogflow-fulfillment");

const intent = require('./../functions/dialogflowIntents');

const route = express.Router();


route.post('/webhook', async (request, response) => {
    const agent = new WebhookClient({
        request,
        response
    })
    const intentMap = new Map();
    intentMap.set("Welcome", intent.Welcome);
    intentMap.set("Fallback", intent.Fallback);
    intentMap.set("Others", intent.Others);
    intentMap.set("Quotes", intent.Quotes);
    intentMap.set("Weather", intent.Weather);
    intentMap.set("Air Quality", intent.AirQuality);
    intentMap.set("Location", intent.Location);
    intentMap.set("Talk With Me", intent.TalkWithMe);


    agent.add("Hi")
    agent.handleRequest(intentMap)

    // console.log(request.body);
})


module.exports = route;