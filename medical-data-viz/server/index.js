const express = require('express');
const app = express();
const PORT = 3000;
const MEDICARE_API_KEY = require('../client/src/medicare.config.js');

app.use(express.static(__dirname + '/../client/dist'));

// ----------------------------------------------------
// TODO: Fill in the request handler for this endpoint!
// ----------------------------------------------------
app.get('/api/heartFailures', (req, res) => {
  var endpoint = ''

  // ----------------------------------------------------
  // TODO: Fill in the request handler for this endpoint!
  // ----------------------------------------------------
    // -----------------------------------------------------
    // TODO: Send a request to the HospitalCompare API here!
    // -----------------------------------------------------

    // -----------------------------------------------------
    // TODO: Do all data processing/wrangling/munging here!
    // -----------------------------------------------------

});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});