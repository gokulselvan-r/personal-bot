const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');
let projectId = 'gands-saoi'

async function sendMessage(text) {
    // return new Promise(async (resolve, reject) => {
        const sessionId = uuid.v4();
        const sessionClient = new dialogflow.SessionsClient();
        const sessionPath = sessionClient.projectAgentSessionPath(
            projectId,
            sessionId
        );

        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text,
                    languageCode: 'en-US',
                },
            },
        };
        const responses = await sessionClient.detectIntent(request);
        
    // })
}


module.exports = {
    sendMessage,
}