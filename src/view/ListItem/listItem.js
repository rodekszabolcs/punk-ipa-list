import styles from './styles.scss';

export default (beer) => `
  <article 
    id="beer-${beer.id}"
    class=${styles['beer-wrapper']}
  >
    <header>
      <img class=${styles['lazy-image']} data-src=${beer.image_url} />
      <div class=${styles.title}>
        <h2>${beer.name}</h2>
        <span class=${styles['tagLine']}>${beer.tagline}</span>
      </div>
    </header>
    <section class=${styles['detailsSection'  ]}>
      <section class=${styles.description}>
        <h3>Description</h3>
        ${beer.description}
      </section>
      <section class=${styles.tips}>
        <h3>Tips</h3>
        ${beer.brewers_tips}
      </section>
      <section>
        <h3>ABV</h3>
        ${beer.abv}
      </section>
      <section>
        <h3>Ingredients</h3>
        <h4>Malt</h4>
        <ul>
          ${beer.ingredients.malt.map(malt => `
            <li>${malt.name}: ${malt.amount.value}${malt.amount.unit}</li>
          `).join('\n')}
        </ul>
        <h4>Hops</h4>
        <ul>
        ${beer.ingredients.hops.map(hop => `
          <li>
            ${hop.name}: ${hop.amount.value}${hop.amount.unit}
            added at the ${hop.add}, ${hop.attribute} attribute
          </li>
        `).join('\n')}
        </ul>
      </section>
      <section class=${styles['food-pairing']}>
        <h3>Suggested food pairings</h3>
        <ul>
        ${beer.food_pairing.map(food => `<li>${food}</li>`).join('\n')}
        </ul>
      </section>
    </section>
  </article>
`;