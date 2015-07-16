valpak-solr-node
===================

A javascript library for querying the Valpak.com SOLR index. 

----------

###Installation
```
npm install valpak-solr-node
```

###Usage
```javascript
var VPSolr = require('valpak-solr-node');
var host = 'http://vpcom1.valpak.com:8090';

VPSolr.getLocalOffers({
  query: {superCat: 101}
  solrHost: host
}).then(function(offers) {
  // returns an array of couponVOs
});

VPSolr.getSyndicatedOffers({
  query: {partnerMerchantId: 206230}
  solrHost: host
}).then(function(offers) {
  // returns an array of syndicationVOs
});
```