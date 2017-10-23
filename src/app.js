import BeerList from './component/BeerList/beerList';
import { pubsub } from './communication/communication';

document.querySelector('body').style.margin = 0;
const beerList = BeerList(pubsub);
beerList.init();
