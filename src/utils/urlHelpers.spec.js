var chai = require("chai");
var expect = chai.expect;
import { composeUrl } from './urlHelpers';

describe('Url helper functions', () => {
  it("should create an expected url ", () => {
    expect(composeUrl('www.example.com')).to.equal('www.example.com');
  });
  it("should create an expected url with filters", () => {
    expect(composeUrl('www.example.com', { filter1: 1, filter2: 2 })).to.equal('www.example.com?filter1=1&filter2=2');
  });
  it("should create an expected url with filters and paging details", () => {
    expect(composeUrl('www.example.com', { filter1: 1, filter2: 2 }, 3, 20)).to.equal('www.example.com?filter1=1&filter2=2&page=3&per-page=20');
  });
});