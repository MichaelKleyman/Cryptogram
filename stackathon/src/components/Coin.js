/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { useEffect } from 'react';
import { showStore } from '../zustandState/showCoin';
import { useParams } from 'react-router-dom';
import { ChartComp } from './Chart';
import { Link } from 'react-router-dom';

const Coin = () => {
  const store = showStore();
  const params = useParams();

  useEffect(() => {
    store.fetchCoin(params.id);
  }, []);

  return (
    <div>
      <Link to='/home'>
        <svg xmlns='http://www.w3.org/2000/svg' width='54' viewBox='0 0 48 48'>
          <path
            fill='white'
            d='M24 40 8 24 24 8l2.1 2.1-12.4 12.4H40v3H13.7l12.4 12.4Z'
          />
        </svg>
      </Link>
      <header>
        <img src={store.coinImage} className='coin-img' width='160' height='160' alt='coin'/>
        <h2 style={{ color: 'white' }} className='title'>
          {store.dataRes.name} ({store.dataRes.symbol})
        </h2>
      </header>
      <div className='width'>
        <div className='graph'>
          <ChartComp />
        </div>
      </div>
      <div className='coin-info'>
        <div className='width'>
          <h1 style={{ color: 'white', margin: '1rem', textAlign: 'center' }}>
            Coin Information
          </h1>
          <div style={{ color: 'white' }} className='coin-row'>
            <h3>Market Cap Rank</h3>
            <span>#{store.dataRes.market_cap_rank}</span>
          </div>
          <div style={{ color: 'white' }} className='coin-row'>
            <h3>24 Hour High</h3>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              height='48'
              width='48'
              style={{ marginLeft: 'auto' }}
            >
              <path d='m14 28 10-10.05L34 28Z' />
            </svg>
            <span>${store['24hHigh']} USD</span>
          </div>
          <div style={{ color: 'white' }} className='coin-row'>
            <h3>24 Hour Low</h3>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              height='48'
              width='48'
              style={{ marginLeft: 'auto' }}
            >
              <path d='m24 30-10-9.95h20Z' />
            </svg>
            <span>${store['24hLow']} USD</span>
          </div>
          <div style={{ color: 'white' }} className='coin-row'>
            <h3>Circulating Supply</h3>
            <span>{store.circulatingSupply} Coins/Tokens</span>
          </div>
          <div style={{ color: 'white' }} className='coin-row'>
            <h3>Current Price</h3>
            <span>${store.currentPrice} USD</span>
          </div>
          <div style={{ color: 'white' }} className='coin-row'>
            <h3>1 Year Change</h3>
            <span>{store.oneYearChange}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coin;
