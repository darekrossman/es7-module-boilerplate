import { myMethod } from '../src';

describe('my method', () => {

  it('should return some text', async () => {
    expect(await myMethod()).to.equal(`I'm an async method!`)
  });

});