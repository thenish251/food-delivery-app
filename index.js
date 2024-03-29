const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const PORT = process.env.PORT || 3000;
const app = express();

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Use routes defined in routes.js
app.use(routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
