const axios = require('axios');


const getResponse = (url) => {
    return new Promise(async (resolve, reject) => {
        axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'X-Api-Key': `${process.env.NINJA_API}`
            }
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.response.data)
        })
    })
}

module.exports = {
    getResponse
}