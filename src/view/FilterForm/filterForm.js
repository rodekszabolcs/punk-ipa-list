import { pubsub } from '../../communication/communication';
import styles from './styles.scss';
import { delay } from '../../utils/utils';


const nameDelay = delay();
const abvGtDelay = delay();
const abvLtDelay = delay();
const hopsDelay = delay();

export function onNameFilterChange (e) {
  nameDelay(function() {
    pubsub.publish('getNewList', { beer_name: e.target.value });
  }, 600);
}

export function onAbvGtFilterChange (e) {
  abvGtDelay(function() {
    pubsub.publish('getNewList', { abv_gt: Math.round(e.target.value) });
  }, 600);
}

export function onAbvLtFilterChange (e) {
  abvLtDelay(function() {
    pubsub.publish('getNewList', { abv_lt: Math.round(e.target.value) });
  }, 600);
}

export function onHopsFilterChange (e) {
  hopsDelay(function() {
    pubsub.publish(
      'getNewList',
      { hops: e.target.value.split(' ').join('_') }
    );
  }, 600);
}

const filterForm = () => `
  <form id=${styles['filter-form']}>
    <label for="nameInput">Filter for name</label>
    <input
      type="text"
      id="nameInput"
      name="nameInput"
    >
    <label for="abvGtInput">Filter for abv (greater than)</label>
    <input
      type="number"
      id="abvGtInput"
      name="abvGtInput"
    >
    <label for="abvLtInput">Filter for abv (less than)</label>
    <input
      type="number"
      id="abvLtInput"
      name="abvLtInput"
    >
    <label for="hopsInput">Filter for hops matching</label>
    <input
      type="text"
      id="hopsInput"
      name="hopsInput"
    >
  </form>
`;

export default filterForm;