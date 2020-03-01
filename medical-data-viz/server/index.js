const express = require('express');
const app = express();
const PORT = 3000;
const MEDICARE_APP_KEY = require('../client/src/medicare.config.js');
const axios = require('axios');

app.use(express.static(__dirname + '/../client/dist'));

// ----------------------------------------------------
// TODO: Fill in the request handler for this endpoint!
// ----------------------------------------------------
app.get('/api/heartFailures', (req, res) => {
  axios.get('https://data.medicare.gov/resource/ynj2-r877.json', {
    headers: {
      token: MEDICARE_APP_KEY
    }
  })
  .then((response) => {
    res.status(200).send(response.data);
  })
  .catch((err) => {
    res.status(500).send(err);
  })
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