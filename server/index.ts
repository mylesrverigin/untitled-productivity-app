// @ts-ignore
const init = require('./init.js');
init();
import express from 'express';
const app = express()

// middleware
import cors from 'cors';
import jwtAuth from './middleware/jwtAuth';

app.use(cors());
app.use(express.json());
app.use(jwtAuth);

// test routes
app.get('/test', (req, res) => {
  res.status(200).json('/get api running');
})
app.post('/test', (req, res) => {
    res.status(200).json(req.body);
})
//

//user routes
import userRoutes from './routes/userRoutes';
app.use('/user',userRoutes);

const port= process.env.PORT || '5000';
app.listen(port, () => console.log(`Running on port ${port}`))