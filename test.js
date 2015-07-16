var VPSolr = require('./lib');
var host = 'http://vpcom1.valpak.com:8090';

VPSolr.getLocalOffers({
  query: {superCat: 101},
  solrHost: host
}).then(function(offers) {
  console.log(offers)
});