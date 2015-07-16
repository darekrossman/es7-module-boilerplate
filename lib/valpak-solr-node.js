'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.getSyndicatedOffers = getSyndicatedOffers;
exports.getLocalOffers = getLocalOffers;
exports.query = query;

require('isomorphic-fetch');

var _URIjs = require('URIjs');

var _URIjs2 = _interopRequireDefault(_URIjs);

function getSyndicatedOffers() {
  var _opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  return _regeneratorRuntime.async(function getSyndicatedOffers$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        return context$1$0.abrupt('return', query(_Object$assign({
          shard: 'syndicateddata_shard1_replica5',
          field: 'syndicationVO'
        }, _opts)));

      case 1:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function getLocalOffers() {
  var _opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  return _regeneratorRuntime.async(function getLocalOffers$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        return context$1$0.abrupt('return', query(_Object$assign({
          shard: 'localcoupons_shard1_replica3',
          field: 'couponVO'
        }, _opts)));

      case 1:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function query() {
  var _opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var opts, qKey, url;
  return _regeneratorRuntime.async(function query$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (_opts.solrHost) {
          context$1$0.next = 2;
          break;
        }

        throw new Error('Required property `solrHost` not given');

      case 2:
        opts = _Object$assign({
          page: 0,
          limit: 20,
          query: { '*': '*' }
        }, _opts);
        qKey = _Object$keys(opts.query)[0];
        url = (0, _URIjs2['default'])(opts.solrHost).directory('solr/' + opts.shard + '/select').query({
          q: qKey + ':' + opts.query[qKey],
          wt: 'json',
          start: opts.page * opts.limit,
          rows: opts.limit,
          f1: opts.field
        });
        return context$1$0.abrupt('return', fetch(url.toString()).then(handleResponse).then(getVOParser(opts.field))['catch'](function (err) {
          throw err;
        }));

      case 6:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function handleResponse(response) {
  return _regeneratorRuntime.async(function handleResponse$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!(response.status === 404)) {
          context$1$0.next = 4;
          break;
        }

        throw new Error('request to ' + response.url + ' failed, reason: 404: ' + response.statusText);

      case 4:
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(response.json());

      case 6:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 7:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function getVOParser(voField) {
  return function getParsedVOs(data) {
    var response;
    return _regeneratorRuntime.async(function getParsedVOs$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          response = data.response;

          if (!(!response && data.error)) {
            context$2$0.next = 5;
            break;
          }

          throw new Error(data.error.msg);

        case 5:
          if (response.docs.length) {
            context$2$0.next = 9;
            break;
          }

          return context$2$0.abrupt('return', []);

        case 9:
          return context$2$0.abrupt('return', response.docs.map(function (doc) {
            return JSON.parse(doc[voField]);
          }));

        case 10:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  };
}

exports['default'] = {
  getSyndicatedOffers: getSyndicatedOffers,
  getLocalOffers: getLocalOffers,
  query: query
};