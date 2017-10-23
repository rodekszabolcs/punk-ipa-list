import { getList } from '../api/beerListApi';
import { pubsub } from '../communication/communication';

const state = () => ({
  filterBy: {},
  pageNumber: 1,
  perPage: 20,
});

const appState = state();

const reducers = {
  updateFilters: (filters = {}) => {
    appState.filterBy = Object.assign({}, appState.filterBy, filters);
  },
  updatePaging: () => {
    appState.pageNumber++;
  },
  reset: () => {
    appState.pageNumber = 1;
  },
};

export const stateActions = {
  getState: () => Object.assign({}, appState),
  fetchNewBeers: (filters) => {
    reducers.reset();
    reducers.updateFilters(filters);
    getList().then(beers => {
      pubsub.publish('newList', beers);
    });
  },
  fetchMoreBeers: () => {
    reducers.updatePaging();
    getList().then(beers => {
      pubsub.publish('updateList', beers);
    });
  }
};
