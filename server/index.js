const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const authRouter = require('./routes/auth.routes')
const testRouter = require('./routes/test.routes');
const app = express();
const PORT = config.get('serverPort');

app.use(express.json());
app.use('/api/auth', authRouter);

app.use('/', testRouter);

const start = async () => {
  try {
    await mongoose.connect(config.get("dbUrl"));

    app.listen(PORT, () => {
      console.log('Server started on port ', PORT);
    })
  } catch (e) {
    console.log(e.message);
  }
}

start();