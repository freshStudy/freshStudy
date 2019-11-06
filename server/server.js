const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;
const bodyParser = require('body-parser');
const authController = require('./controllers/authController');
const databaseController = require('./controllers/databaseController');

app.use(bodyParser.json());

// get questions request 
app.get('/questions', databaseController.getQuestions, (req, res) => {
  res.json(res.locals.qsAndAs);
});

// post answers request
// app.post('/results', databaseController.insertResults, (req, res) => {

// });

app.post('/register', authController.createUser, (req, res) => {
    // sending back username, email
    res.json(res.locals.newUser);
});

app.post('/login', (req, res) => {

})

app.get('/', (req, res) => {
  return res.sendFile(path.resolve(__dirname, '../client/index.html'));
});

app.use('*', (req, res, next) => {
    res.status(404).send('File is not found, Route is wrong')
});

app.use((error, req, res, next) => {
    const defaultErr = {
        log: 'Express error handler caught unknown middleware error',
        message: 'Error in server occurred'
    }
    const errorObj = Object.assign(defaultErr, error);
    console.error(defaultErr.log);
    res.status(500).send(errorObj.message)
});

app.listen(PORT, () => {
    console.log(`Listening port ${PORT} ^0^`);
});