import { getLocalOffers } from '../src';

const solrHost = 'http://vpcom1.valpak.com:8090';

describe('get local offers', () => {

  it('should execute a default query when no query params given', async () => {
    let offers = await getLocalOffers({solrHost});
    expect(offers.length).to.equal(20)
  });
  
  it('should return an array of offers given a franchiseId', async () => {
    var offers = await getLocalOffers({
      query: {franchiseId: 3361},
      solrHost
    });
    expect(offers.length).to.be.defined;
    expect(offers[0].franchiseId).to.equal(3361);
  });

  it('should return an array of offers given a superCat', async () => {
    var offers = await getLocalOffers({
      query: {superCat: 101},
      solrHost
    });
    expect(offers.length).to.be.defined;
    expect(offers[0].superCategoryId).to.equal(101);
  });

  it('should throw an error when no host is given', async () => {
    let thrown = null;
    try {
      let offers = await getLocalOffers();
    } catch (err) {
      thrown = err
    }
    expect(thrown).to.not.be.null
  });

  it('should throw an error when given bad url', async () => {
    let thrown = null;
    try {
      var offers = await getLocalOffers({
        query: {superfoo: 999999},
        solrHost: 'http://vpcom1.valpak.coz'
      });
    } catch (err) {
      thrown = err
    }
    expect(thrown).to.not.be.null
  });

  it('should throw an error when query field does not exist', async () => {
    let thrown = null;
    try {
      var offers = await getLocalOffers({
        query: {p: 1},
        solrHost
      });
    } catch (err) {
      thrown = err
    }
    expect(thrown).to.not.be.null
  });

});