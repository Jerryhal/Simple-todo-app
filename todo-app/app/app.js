const path = require('path');
require('dotenv').config({path: path.join(__dirname, "../.env")});
const express = require('express');
const app = express();
const logger = require('./services/logger')
const todo = require('./controllers/todo');

app.use('/api/todo', todo);
app.set('port', 3000);

app.use(express.static(__dirname + '/todo-client-app'))
app.get('/*', (req, res) => {
  logger.logInformation('page loaded');
  res.sendFile(path.join(__dirname + '/todo-client-app/index.html'));
});

app.listen(app.get('port'), () => logger.logInformation('Listening on port ' + app.get('port')));