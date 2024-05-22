const axios = require('axios');
const fs = require('fs');

const url = "https://api.fablabs.io/0/labs.json";

axios.get(url)
  .then(response => {
    const data = response.data;

    // Write data to a file in a nicely formatted way
    fs.writeFile('fablabs.json', JSON.stringify(data, null, 2), (err) => {
      if (err) {
        console.error('Error writing to file', err);
      } else {
        console.log('Data successfully written to fablabs.json');
      }
    });
  })
  .catch(error => {
    console.error('Error fetching data', error);
  });

