import 'isomorphic-fetch';
import URI from 'URIjs';

export async function getSyndicatedOffers(_opts = {}) {
  return query(Object.assign({
    shard: 'syndicateddata_shard1_replica5',
    field: 'syndicationVO'
  }, _opts))
}

export async function getLocalOffers(_opts = {}) {
  return query(Object.assign({
    shard: 'localcoupons_shard1_replica3',
    field: 'couponVO'
  }, _opts))
}

export async function query(_opts = {}) {
  if (!_opts.solrHost)
    throw new Error('Required property `solrHost` not given')

  let opts = Object.assign({
    page: 0,
    limit: 20,
    query: {'*':'*'}
  }, _opts);

  let qKey = Object.keys(opts.query)[0];

  let url = URI(opts.solrHost)
    .directory(`solr/${opts.shard}/select`)
    .query({
      q: `${qKey}:${opts.query[qKey]}`,
      wt: 'json',
      start: opts.page * opts.limit,
      rows: opts.limit,
      f1: opts.field
    });

  return fetch(url.toString())
    .then(handleResponse)
    .then(getVOParser(opts.field))
    .catch(err => {
      throw err;
    });
}

async function handleResponse(response) {
  if (response.status === 404)
    throw new Error(`request to ${response.url} failed, reason: 404: ${response.statusText}`);
  else
    return await response.json();
}

function getVOParser(voField) {
  return async function getParsedVOs(data) {
    let response = data.response;
    if (!response && data.error)
      throw new Error(data.error.msg)
    else if (!response.docs.length)  
      return [];
    else
      return response.docs.map(doc => JSON.parse(doc[voField]));
  }
}

export default {
  getSyndicatedOffers,
  getLocalOffers,
  query
}