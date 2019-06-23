/**
 * Application config
 * @type {{server: {port: number}, db: {connection: string}}}
 */

module.exports = {
  server: {
    port: 8090
  },
  db: {
    host: '127.0.0.1:27017',
    database: 'videoSearch',
    cloudDb: 'mongodb+srv://videoSearch:videoSearch@cluster0-p7ryl.mongodb.net/test?retryWrites=true&w=majority'
  },

  secret: '@videosearch#'
};
