import { getSyndicatedOffers } from '../src';

const solrHost = 'http://vpcom1.valpak.com:8090';

describe('get syndicated offers', () => {

  it('should execute a default query when no query param given', async () => {
    let offers = await getSyndicatedOffers({solrHost});
    expect(offers.length).to.equal(20)
  });
  
  it('should return an array of offers given partnerMerchantId', async () => {
    let offers = await getSyndicatedOffers({
      query: {partnerMerchantId: 206230},
      solrHost
    });
    expect(offers.length).to.be.defined;
    expect(offers[0].merchantID).to.equal(206230);
  });

  it('should return an array of offers given partnerCpnId', async () => {
    let offers = await getSyndicatedOffers({
      query: {partnerCpnId: 17278},
      solrHost
    });
    expect(offers.length).to.be.defined;
    expect(offers[0].partnerCpnId).to.equal(17278);
  });

  it('should throw an error when no host is given', async () => {
    let thrown = null;
    try {
      let offers = await getSyndicatedOffers();
    } catch (err) {
      thrown = err
    }
    expect(thrown).to.not.be.null
  });

  it('should throw an error when given bad url', async () => {
    let thrown = null;
    try {
      let offers = await getSyndicatedOffers({
        query: {partnerCpnId: 17278},
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
      let offers = await getSyndicatedOffers({
        query: {foobar: 1},
        solrHost
      });
    } catch (err) {
      thrown = err
    }
    expect(thrown).to.not.be.null
  });

});