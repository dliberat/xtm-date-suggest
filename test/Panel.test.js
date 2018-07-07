import { expect } from 'chai';
import Panel from '../src/Panel';

describe('Panel', () => {

  before(() => {
    const sel = () =>  { return { }; };

    window.getSelection = sel;
  });

  it('Adds an element to the DOM', () => {
    const x = new Panel();
    const elem = document.getElementById('dates-autocomplete-popup');
    expect(x).to.not.be.undefined;
    expect(elem).to.not.be.undefined;
  });
  it('Hides the panel', () => {
    const x = new Panel();
    x.hide();
    expect(x.panel.style.display).to.equal('none');
  });
  it('Report visibility', () => {
    const x = new Panel();
    x.hide();
    expect(x.isVisible()).to.be.false;

    const stub = document.createElement('div');
    x.foundTerm(stub, 'dog', 'doggy');
    expect(x.isVisible()).to.be.true;
  });
  it('Record and return the suffix of a partly-entered term', () => {
    const x = new Panel();
    const ret = x.setSuffix('dog', 'doggy');
    expect(ret).to.equal('gy');

    expect(x.getSuffix()).to.equal('gy');
  });
  it('Set panel position', () => {
    const x = new Panel();
    x.setPanelPosition('');
    expect(x.panel.style.top).to.equal('-35px');
    expect(x.panel.style.left).to.equal('0px');
  });

});