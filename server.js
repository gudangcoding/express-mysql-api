const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const routes = require('./routes');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
