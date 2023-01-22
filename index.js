const express = require('express');
const cors = require('cors');

require('dotenv').config();
const app = express();


app.use(cors());
app.use(express.json());
app.use('/whatsapp', require('./routes/whatsapp'));
app.use('/dialogflow', require('./routes/dialogflow'));
const PORT = process.env.NODE_ENV === 'developing' ? 8080 : process.env.PORT


app.get('/', async (request, response) => {
  response.send("Server Working");
})


app.listen(PORT, () => console.log(`Server Running at ${PORT}`))