const { Builder } = require('xml2js');

const builder = new Builder({
  rootName: 'articles',
  xmldec: { version: '1.0', encoding: 'UTF-8' }
});

module.exports = { builder };