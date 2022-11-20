import create from 'zustand';
import axios from 'axios';

export const showStore = create((set) => ({
  coinData: [],
  dataRes: {},
  coinImage: '',
  '24hHigh': 0,
  '24hLow': 0,
  circulatingSupply: 0,
  currentPrice: 0,
  oneYearChange: 0,
  fetchCoin: async (id) => {
    //multiple requests means multiple promises so we need to do Promise.all();
    const [graphRes, dataRes] = await Promise.all([
      axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`
      ),
      axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}?localization=false&market_data=true`
      ),
    ]);

    const coinData = graphRes.data.prices.map((price) => {
      const [timestamp, coinPrice] = price;
      const date = new Date(timestamp).toLocaleDateString('en-us');
      return {
        date: date,
        price: coinPrice,
      };
    });
    console.log(dataRes);
    set({ dataRes: dataRes.data });
    set({ coinImage: dataRes.data.image.large });
    set({ '24hHigh': dataRes.data.market_data.high_24h.usd });
    set({ '24hLow': dataRes.data.market_data.low_24h.usd });
    set({circulatingSupply: dataRes.data.market_data.circulating_supply.toLocaleString()});
    set({currentPrice: dataRes.data.market_data.current_price.usd})
    set({oneYearChange: dataRes.data.market_data.price_change_percentage_1y.toFixed(2)})
    set({ coinData });
  },
}));
