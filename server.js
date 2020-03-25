const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
const uri = process.env.ATLAS_URI;
// router
app.use('/api', require('./routes/userRoute'));

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });


mongoose.connection.once('open', () => {
  console.log('mongodb connection establish succesfully');
});
app.listen(port, () => { console.log(`The app is running on port ${port}`); });
