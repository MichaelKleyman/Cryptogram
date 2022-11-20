import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './index.css';
import { useEffect } from 'react';
import { homeStore } from '../zustandState/homeStore';
import CoinItem from './CoinItem';

const Home = ({ back }) => {
  const store = homeStore();

  useEffect(() => {
    if (!store.trendingCoins.length) store.fetchCoins();
  }, []);

  return (
    <div>
      <header>
        <h1 className='title'>Coins</h1>
      </header>
      <Form className='navbar-nav mr-auto ml-auto' style={{ width: '50%' }}>
        <Form.Control
          type='search'
          placeholder='Search for a coin...'
          className='me-2'
          name='name'
          value={store.query}
          aria-label='Search'
          onChange={store.handleChange}
          style={{ fontWeight: '600', color: 'black' }}
        />
        {/* <Button
          as='input'
          type='submit'
          value='Search'
          onClick={store.handleSubmit}
        /> */}
      </Form>
      <h3 className='title' loading='eager'>
        {store.searching ? 'Search Results' : 'Trending Coins'}
      </h3>
      <div className='mainpage-coins'>
        <h2>Trending Coins</h2>
        {store.coins.map((coin) => (
          <CoinItem coin={coin} key={coin.id} />
        ))}
      </div>
    </div>
  );
};

export default Home;

// const [coin, setCoin] = useState({ name: '' });

// const handleChange = (e) => {
//   setCoin({
//     [e.target.name]: e.target.value,
//   });
// };

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   // setMovie({ name: '' });
// };
