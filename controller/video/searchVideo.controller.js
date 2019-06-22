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

  let searchData = {
    part: config.youtube.searchPart,
    type: config.youtube.type,
    maxResults: config.youtube.maxResults,
    location: `${req.query.latitude},${req.query.longitude}`,
    locationRadius: `${req.query.radius}${config.youtube.radiusUnit}`
  };

  if (req.query.pageToken) {
    searchData.pageToken = req.query.pageToken;
  }

  youtube.search.list(searchData, (error, searchResp) => {
    if (error) {
      return res.send(error);
    }

    let ids = [];
    if (searchResp && searchResp.data && searchResp.data.items && searchResp.data.items.length) {
      searchResp.data.items.forEach(item => {
        if (item.id && item.id.videoId) {
          ids.push(item.id.videoId);
        }
      });

      if (ids.length === 0) {
        return res.send(searchResp);
      }

      const listData = {
        part: config.youtube.listPart,
        id: ids.join(',')
      };

      youtube.videos.list(listData, (error, listResp) => {
        if (error) {
          return res.send(error);
        }

        let resp = {...searchResp};

        if (listResp && listResp.data && listResp.data.items) {
          resp.data.items = listResp.data.items;
        }

        return res.send(resp);
      });

    } else {
      return res.send(searchResp);
    }
  });
};
