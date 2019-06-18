/**
 * Handle search video request. Using googleapis package to query youtube videos.
 */

const {google} = require('googleapis');

const config = require('../../config');

const youtube = google.youtube({
  version: config.youtube.version,
  auth: config.youtube.apiKey
});

module.exports = (req, res) => {

  youtube.search.list({
    part: config.youtube.part,
    q: config.youtube.q,
    type: config.youtube.type,
    maxResults: config.youtube.maxResults,
    location: `${req.query.latitude},${req.query.longitude}`,
    locationRadius: `${req.query.radius}${config.youtube.radiusUnit}`
  }, (error, data) => {
    if (error) {
      return res.send(error);
    }

    return res.send(data);
  })
};
