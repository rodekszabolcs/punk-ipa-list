var chai = require("chai");
var expect = chai.expect;
import { pubSub } from './communication';

describe('PubSub channel', () => {
  const myPubSub = pubSub();
  it("should exist a subscriber which noticed on publish", () => {
    const subscriber = () => {
      let value = 0;
      function increment() {
        value++;
      }
      return {
        subscibe: function() {
          myPubSub.subscribe('myEvent', increment, { value });
        },
        getValue: function() {
          return value;
        }
      }
      
    }
    const mySubscriber = subscriber();
    mySubscriber.subscibe();
    myPubSub.publish('myEvent');
    myPubSub.publish('myEvent');
    expect(mySubscriber.getValue()).to.be.eq(2);
  });

  it("should exist a subscriber which noticed on publish with additional data", () => {
    const subscriber = () => {
      let value = 0;
      function increment(amount) {
        value+=amount;
      }
      return {
        subscibe: function() {
          myPubSub.subscribe('myEvent', increment, { value });
        },
        getValue: function() {
          return value;
        }
      }
      
    }
    const mySubscriber = subscriber();
    mySubscriber.subscibe();
    myPubSub.publish('myEvent', 2);
    myPubSub.publish('myEvent', 3);
    expect(mySubscriber.getValue()).to.be.eq(5);
  });
});