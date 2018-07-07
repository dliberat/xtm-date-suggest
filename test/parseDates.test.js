import { expect } from 'chai';
import parseDates from '../src/parseDates';

describe('parseDates', () => {
  it('7月10日', () => {
    const [date] = parseDates('7月10日');
    expect(date).to.equal('{2018-7-10}');
  });
  it('7月10日10時23分', () => {
    const [date] = parseDates('7月10日10時23分');
    expect(date).to.equal('{2018-7-10 10:23}');
  });
  it('7月10日16時', () => {
    const [date] = parseDates('x 7月10日16時 adf');
    expect(date).to.equal('{2018-7-10 16:00}');
  });
  it('7月10日', () => {
    const [date] = parseDates(' 6日連続, 7月２日');
    expect(date).to.equal('{2018-7-2}');
  });
});