const express = require('express');
const studentRoutes = require('./src/student/routes');


const app = express();


const {PORT} = require('./config')

// express.json() middleware is going to allow us to post and to get json from our endpoints
app.use(express.json());
        
app.get('/', (req,res) => {
    res.send('Hello Lads!')
})

app.use('/api/v1/students', studentRoutes);

//I am using /api/v1/students and once I go to that path 

app.listen(PORT, () => {
    console.log(`Server is litening on port ${PORT}`)
});