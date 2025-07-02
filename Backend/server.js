require('dotenv').config();

const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const taskRoutes = require('./routes/taskRoutes')
const errorHandler = require('./middleware/errorHandler');
const app = express();

connectDB();

app.use(cors());
app.use(express.json())
app.use('/api/tasks', taskRoutes)
app.get('/', (req,res)=>{
    res.send('API is running')
})
app.use(errorHandler)
const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Server is running on PORT ${PORT}`)
})
