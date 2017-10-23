import { stateActions } from '../state/state';
import { composeUrl } from '../utils/urlHelpers';

const API_BASE_URL = 'https://api.punkapi.com/v2/beers';

export const getList = () => {
  const { filterBy, pageNumber, perPage} = stateActions.getState();
  const url = composeUrl(
    API_BASE_URL, 
    filterBy,
    pageNumber, 
    perPage
  );
  return fetch(url)
    .then(res => res.json())
    .catch(err => {
      // eslint-disable-next-line no-console
      console.error(err);
    });
};