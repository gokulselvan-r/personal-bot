const express = require("express");
const { OpenArtificialIntelligence } = require("../functions/OpenAI");
const { sendTextMessage } = require("../utils/whatsappMessages");
const dialogflow = require("./../utils/dialogflow");

const route = express.Router();

let WEBHOOK = "dialogflow";

route.get("/webhook", async (request, response) => {
    let mode = request.query["hub.mode"];
    let token = request.query["hub.verify_token"];
    let challenge = request.query["hub.challenge"];
    if (mode && token) {
        if (mode === "subscribe" && token === process.env.verifyToken) {
            console.log("WEBHOOK_VERIFIED");
            response.status(200).send(challenge);
        } else {
            response.sendStatus(403);
        }
    }
})



route.post("/webhook", async (request, response) => {
    if (request.body.entry.length && request.body.entry[0]["changes"]) {
        let changes = request.body.entry[0]["changes"];
        let message = changes[0]["value"]["messages"] ? changes[0]["value"]["messages"][0] : false;
        // console.log(message)
        if (message) {
            switch (message["type"]) {
                case "interactive":
                    let reply = message["interactive"]["list_reply"]["title"]
                    console.log(reply)
                    if(reply === "Talk With Me") {
                        WEBHOOK = "whatsapp"
                    }
                    dialogflow.sendMessage(reply);
                    break;
                case "text":
                    if (WEBHOOK === "dialogflow") {
                        dialogflow.sendMessage(message.text.body);
                    } else if(WEBHOOK === "whatsapp") {
                        OpenArtificialIntelligence(message.text.body).then(message => {
                            sendTextMessage(message).then(res => {
                                console.log(res);
                            }).catch(err => {
                                console.log(err)
                            })
                        }).then(res => {
                            console.log(res);
                        }).catch(err => {
                            console.log(err)
                        })
                    }
                    break;
                case "location":
                    let { latitude, longitude } = message.location
                    if (WEBHOOK === "dialogflow") {
                        dialogflow.sendMessage(`Here"s the coordinates : ${latitude}, ${longitude}`);
                    }
                    break;
                case "document":
                    break;
                case "image":
                    break;
                case "contacts":
                    break;
                default:
                    break;
            }
        } else {

        }
    }
    response.status(200).send("EVENT_RECEIVED");
})


module.exports = route;