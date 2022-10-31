const express = require('express'); // imports framework
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');  
const helmet = require('helmet'); 
const bodyParser = require('body-parser');

const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

helmet({
    crossOriginResourcePolicy: false,
  })

// setting headers 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

module.exports = app;