import create from 'zustand';
import axios from 'axios';

function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

export const homeStore = create((set) => ({
  coins: [],
  trendingCoins: [],
  query: '',
  searching: false,
  handleChange: (e) => {
    set({ query: e.target.value });
    homeStore.getState().handleSubmit();
  },
  //need to get it to search when the user stops typing, so waiting for a pause: use JS debounce function
  handleSubmit: debounce(async () => {
    const { query, trendingCoins } = homeStore.getState();
    if (query.length > 2) {
      const { data } = await axios.get(
        `https://api.coingecko.com/api/v3/search?query=${query}`
      );
      const coins = data.coins.map((coin) => {
        return {
          name: coin.name,
          id: coin.id,
          image: coin.large,
        };
      });
      set({ coins, searching: true });
    } else {
      set({ coins: trendingCoins, searching: false });
    }
  }, 600),
  fetchCoins: async () => {
    const [allCoins, btcPrice] = await Promise.all([
      axios.get('https://api.coingecko.com/api/v3/search/trending'),
      axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd`
      ),
    ]);

    const btc = btcPrice.data.bitcoin.usd;

    const coins = allCoins.data.coins.map((coin) => {
      return {
        name: coin.item.name,
        image: coin.item.large,
        id: coin.item.id,
        priceBTC: (coin.item.price_btc).toFixed(10),
        priceUSD: (coin.item.price_btc * btc).toFixed(6),
      };
    });
    console.log(coins); 
    set({ coins, trendingCoins: coins });
  },
}));
