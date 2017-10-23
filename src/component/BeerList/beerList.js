import styles from './styles.scss';
import listItem from '../../view/ListItem/listItem';
import filterForm, { 
  onNameFilterChange,
  onAbvGtFilterChange,
  onAbvLtFilterChange,
  onHopsFilterChange
} from '../../view/FilterForm/filterForm';

const List = (channel, container = '#beer-list') => {
  const beerListMarkup = `
    <section id="beer-list" class="${styles['beer-list']}">

    </section>
  `;

  const lazyLoadImages = () => []
    .forEach.call(document.querySelectorAll('img[data-src]'), (img) => {
      img.setAttribute('src', img.getAttribute('data-src'));
      img.onload = function() {
        img.removeAttribute('data-src');
      };
    });
  
  const renderNewList = (beers) => {
    document.querySelector('#beer-list').innerHTML =
      beers.map(listItem).join('\n');
    lazyLoadImages();
    window.addEventListener('scroll', lazyLoadArticles);
  };
  
  const renderMoreBeers = (beers) => {
    document.querySelector('#beer-list').insertAdjacentHTML(
      'beforeend',
      beers.map(listItem).join('\n')
    );
    lazyLoadImages();
    window.addEventListener('scroll', lazyLoadArticles);
  };

  const subscribe = () => {
    channel.subscribe('newList', renderNewList);
    channel.subscribe('updateList', renderMoreBeers);
  };

  const lazyLoadArticles = () => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - window.outerHeight * 0.75
    ) {
      channel.publish('getMoreBeers');
      window.removeEventListener('scroll', lazyLoadArticles);
    }
  };

  const mount = () => {
    if (!document.querySelector(container)) {
      const main = document.createElement('main');
      main.setAttribute('id', 'beer-list-wrapper');
      main.innerHTML = beerListMarkup;
      container = '#beer-list-wrapper';
      document.querySelector('body').appendChild(main);
    }
    document.querySelector('#beer-list-wrapper')
      .insertAdjacentHTML('afterbegin', filterForm());
    document.querySelector('#nameInput')
      .addEventListener('keyup', onNameFilterChange);
    document.querySelector('#abvLtInput')
      .addEventListener('keyup', onAbvLtFilterChange);
    document.querySelector('#abvGtInput')
      .addEventListener('keyup', onAbvGtFilterChange);
    document.querySelector('#hopsInput')
      .addEventListener('keyup', onHopsFilterChange);
  };

  return {
    init: function() {
      mount();
      subscribe();
      channel.publish('getNewList');
    }
  };
};

export default List;