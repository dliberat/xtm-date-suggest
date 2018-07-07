import { expect } from 'chai';
import TermList from '../src/TermList';

describe('TermList', () => {
  let format;
  beforeEach(() => {
    format = {
      replacer: () => { return 'bogus'; }
    };
  });

  it('Contains a list of terms', () => {
    const x = new TermList(format);
    expect(x.list).to.be.an('object');
  });
  it('Extracts date info from dom', () => {
    const span = document.createElement('span');
    span.innerText = '7月10日';
    span.id = 'sourceContent0';
    document.body.appendChild(span);

    const x = new TermList(format);
    x.addSegment(0);
    expect(x.list[0]).to.be.an('array').that.includes('bogus');

    // Should not throw error since it will short circuit
    x.addTerm = null;
    x.addSegment(0);
  });
  it('Do not add duplicate terms', () => {
    const x = new TermList(format);
    x.addTerm(20, 'dog');
    expect(x.list[20]).to.be.an('array').that.includes('dog');

    x.addTerm(20, 'dog');
    expect(x.list[20].length).to.equal(1);
  });
  it('Expose an API for the list contents', () => {
    const x = new TermList(format);
    const arr = x.getSegmentArray(2);
    expect(arr).to.be.an('array');
    expect(arr.length).to.equal(0);

    x.addTerm(2, 'bogus');
    const arr2 = x.getSegmentArray(2);
    expect(arr2).to.be.an('array').that.includes('bogus');
  });
});