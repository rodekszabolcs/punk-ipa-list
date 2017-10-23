import { stateActions } from '../state/state';

export const pubSub = () => {
  let handlers = [];
  return {
    subscribe: (event, handler, context) => {
      if (typeof context === 'undefined') {
        context = handler;
      }
      handlers.push({event: event, handler: handler.bind(context)});
    },
    publish: (event, details) => {
      handlers.forEach(curr => {
        if (curr.event === event) {
          details ? curr.handler(details) : curr.handler();
        }
      });
    }
  };
};

export const pubsub = pubSub();

pubsub.subscribe(
  'getNewList',
  (filters) => {
    stateActions.fetchNewBeers(filters);
  },
  { stateActions }
);

pubsub.subscribe(
  'getMoreBeers',
  () => stateActions.fetchMoreBeers(),
  { stateActions }
);