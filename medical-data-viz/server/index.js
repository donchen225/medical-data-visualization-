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
  // specify in query that measure_id must be "MORT_30_HF" which represents "Death rate for heart failure patients", state must not be AS, DC, GU, MP, PR, VI, and limit records to 50000
  axios.get(`https://data.medicare.gov/resource/ynj2-r877.json?measure_id='MORT_30_HF'&$LIMIT=50000&$where=state NOT IN ('AS', 'DC', 'GU', 'MP', 'PR', 'VI')`, {
    headers: {
      token: MEDICARE_APP_KEY
    }
  })
  .then(({data}) => {
    let stateRecords = {};
    // iterate over records in data and check if curr record's state does not exits then initialize to arr w record
    data.forEach((record) => {
      if (!stateRecords[record['state']]) {
        stateRecords[record['state']] = [ parseInt(record['score']) ]
        // else if, check if curr record's state alrdy exist and score is avaliable then push into state's arr
      } else if (stateRecords[record['state']] && record['score'] !== 'Not Available') {
        stateRecords[record['state']].push(parseInt(record['score']));
      }
    });
    console.log('stateRecords', stateRecords);

    // helper function to get average of an arr
    const arrAvg = arr => arr.reduce((a, b) => a+b, 0) / arr.length;

    let mortalityScores = {};
    // iterate over stateRecords obj and set to mortalityScores obj each state as a key w its' avg mortality score
    for (var key in stateRecords) {
      mortalityScores[key] = {'mortalityScore': arrAvg(stateRecords[key])};
    }
    console.log('mortalityScores', mortalityScores);
    res.status(200).send(JSON.stringify(mortalityScores));
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