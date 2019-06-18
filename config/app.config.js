/**
 * Application config
 * @type {{server: {port: number}, db: {connection: string}}}
 */

module.exports = {
  server: {
    port: 8086
  },
  db: {
    host: '127.0.0.1:27017',
    database: 'videoSearch'
  },

  secret: '@videosearch#'
};
