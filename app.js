const express = require('express');
const app = express();

const {PORT} = require('./config')

app.get('/', (req,res,next) => {
    res.send('Hello Lads!')
})

app.listen(PORT, () => {
    console.log(`Server is litening on port ${PORT}`)
});