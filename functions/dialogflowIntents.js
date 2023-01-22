const { getResponse } = require("../utils/APINinja");
const { sendInteractiveMessage, sendTextMessage, sendImageTextMessage } = require("../utils/whatsappMessages");
const utilFunctions = require('./index');


let LAST_COMMAND = '';
let LOCATION_QUERY = '';

async function Welcome(agent) {
    sendInteractiveMessage("Hello *GandS*,\nWhat can I help you?\n\n ", ["Quote", "Air Quality", "Weather", "Talk With Me"]).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err)
    })
}

async function Fallback(agent) {
    sendInteractiveMessage("Hello *GandS*,\nI can't understand what you are saying. Please select any options from below or ask any other thing.\n\n ", ["Quote", "Air Quality", "Weather", "Talk With Me"]).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err)
    })
}


async function Others(agent) {
    sendInteractiveMessage("Hello *GandS*,\nHere's a list of command that I can understand\n\n ", ["Quote", "Air Quality", "Weather", "Talk With Me"]).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err)
    })
}

async function Quotes(agent) {
    getResponse(`https://api.api-ninjas.com/v1/quotes`).then(async res => {
        let { quote, author, category } = res[0];
        await sendTextMessage(`${quote}\n\n\t\t\t By *_${author}_*`);
        await sendInteractiveMessage("Hello *GandS*,\nIs there anything that I can help you with?\n\n ", ["Quote", "Air Quality", "Weather", "Talk With Me"]).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err)
        })
    }).catch(err => {
        console.log(err)
    })
}


async function Weather(agent) {
    if (LOCATION_QUERY) {
        utilFunctions.sendWeather(LOCATION_QUERY);
        LOCATION_QUERY = '';
    } else if (agent.parameters['geo-city']) {
        LOCATION_QUERY = `city=${agent.parameters['geo-city']}`;
        utilFunctions.sendWeather(LOCATION_QUERY);
        LOCATION_QUERY = '';
    } else if (agent.parameters['geo-state']) {
        LOCATION_QUERY = `state=${agent.parameters['geo-state']}`;
        utilFunctions.sendWeather(LOCATION_QUERY);
        LOCATION_QUERY = '';
    } else {
        LAST_COMMAND = "Weather";
        sendTextMessage(`Sure, Tell me or share your location, GandS.`);
    }
}

async function AirQuality(agent) {
    if (LOCATION_QUERY) {
        utilFunctions.sendAQI(LOCATION_QUERY);
        LOCATION_QUERY = '';
    } else if (agent.parameters['geo-city']) {
        LOCATION_QUERY = `city=${agent.parameters['geo-city']}`;
        utilFunctions.sendAQI(LOCATION_QUERY);
        LOCATION_QUERY = '';
    } else if (agent.parameters['geo-state']) {
        LOCATION_QUERY = `state=${agent.parameters['geo-state']}`;
        utilFunctions.sendAQI(LOCATION_QUERY);
        LOCATION_QUERY = '';
    } else {
        LAST_COMMAND = "AirQuality";
        sendTextMessage(`Sure, Tell me or share your location, GandS.`);
    }
}

async function Location(agent) {
    if (agent.parameters['geo-city']) {
        LOCATION_QUERY = `city=${agent.parameters['geo-city']}`
    } else if (agent.parameters['geo-state']) {
        LOCATION_QUERY = `state=${agent.parameters['geo-state']}`
    } else if (agent.parameters.number.length) {
        let [latitude, longitude] = agent.parameters.number;
        LOCATION_QUERY = `lat=${latitude}&lon=${longitude}`
    }
    switch (LAST_COMMAND) {
        case "AirQuality":
            utilFunctions.sendAQI(LOCATION_QUERY);
            LOCATION_QUERY = '';
            break;
        case "Weather":
            utilFunctions.sendWeather(LOCATION_QUERY);
            LOCATION_QUERY = '';
            break;

        default:
            sendInteractiveMessage("What can I do with this location?", ["Air Quality", "Weather"]).then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err)
            })
            break;
    }
}


async function TalkWithMe(agent) {
    sendTextMessage(`Sure, Talk with me whatever you want.`);
}

module.exports = {
    Welcome,
    Quotes,
    Fallback,
    Others,
    Weather,
    AirQuality,
    Location,
    TalkWithMe,
    
}