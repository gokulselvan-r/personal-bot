
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


async function OpenArtificialIntelligence(prompt) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: prompt,
                temperature: 0,
                max_tokens: 64,
                top_p: 1.0,
                frequency_penalty: 0.0,
                presence_penalty: 0.0,
            });
            resolve(response.data.choices[0]['text']);
        } catch (error) {
            reject(error);
        }
    })
}


module.exports = {
    OpenArtificialIntelligence
}