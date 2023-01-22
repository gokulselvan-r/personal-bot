const axios = require('axios');


const sendTextMessage = (message) => {
    return new Promise((resolve, reject) => {
        data = {
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to": "916379267623",
            "type": "text",
            "text": {
                "body": message
            }
        }
        axios.post(`https://graph.facebook.com/v15.0/103136212562162/messages`, data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.FACEBOOK_API}`
            }
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            sendTextMessage(`Sorry, I can't able to find your query. Please try later.`)
            reject(err.response.data)
        })
    })
}

const sendImageTextMessage = (message, imageURL) => {
    return new Promise((resolve, reject) => {
        data = {
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to": "916379267623",
            "type": "image",
            "image": {
                "link": imageURL,
                "caption": message
            }
        }
        axios.post(`https://graph.facebook.com/v15.0/103136212562162/messages`, data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.FACEBOOK_API}`
            }
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            sendTextMessage(`Sorry, I can't able to find your query. Please try later.`)
            reject(err.response.data)
        })
    })
}


const sendInteractiveMessage = (message, options
    ) => {
    return new Promise((resolve, reject) => {
        let data = {
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to": "916379267623",
            "type": "interactive",
            "interactive": {
                "type": "list",
                "body": {
                    "text": message
                },
                "action": {
                    "button": "Options",
                    "sections": [
                        {
                            "title": "General",
                            "rows": options.map(option => {return {id: option.replace(/ /g,''), title: option}})
                        }
                    ]
                }
            }
        }
        axios.post(`https://graph.facebook.com/v15.0/103136212562162/messages`, data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.FACEBOOK_API}`
            }
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            sendTextMessage(`Sorry, I can't able to find your query. Please try later.`)
            reject(err.response.data)
        })
    })
}


module.exports = {
    sendTextMessage,
    sendImageTextMessage,
    sendInteractiveMessage
}