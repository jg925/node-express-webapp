const axios = require('axios');

function speakerService() {
  function getSpeakerById(id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`http://localhost:3000/speakers/${id}`)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  return { getSpeakerById };
}

module.exports = speakerService;
