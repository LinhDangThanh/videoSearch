/**
 * Handle search video request. Using googleapis package to query youtube videos.
 */

const {google} = require('googleapis');

const config = require('../../config');

const youtube = google.youtube({
  version: config.youtube.version,
  auth: config.youtube.apiKey
});

let cacheData = null;

module.exports = (req, res) => {

  let searchData = {
    part: config.youtube.part,
    type: config.youtube.type,
    maxResults: config.youtube.maxResults,
    location: `${req.query.latitude},${req.query.longitude}`,
    locationRadius: `${req.query.radius}${config.youtube.radiusUnit}`
  };

  if (req.query.pageToken) {
    searchData.pageToken = req.query.pageToken;
  }

  if (cacheData) {
    console.log('from cache data');
    return res.send(cacheData);
  }

  youtube.search.list(searchData, (error, data) => {
    if (error) {
      return res.send(error);
    }

    cacheData = data;

    return res.send(data);
  })
};
