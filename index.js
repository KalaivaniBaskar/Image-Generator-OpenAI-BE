const express = require('express');
const cors = require('cors')
const port = process.env.PORT || 5000;

const app = express();

//enable body parser 
app.use(express.json()); 

app.use(cors());
//cors error handle 


app.use('/openai', require('./Routes/openai'))
app.listen(port, () => console.log("Server is running on port ",port))