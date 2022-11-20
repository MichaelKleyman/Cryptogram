/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { Link } from 'react-router-dom';

const CoinItem = ({ coin }) => {
  return (
    <div className='coin'>
      <Link to={`/${coin.id}`} className='link'>
        <span className='coin-image'>
          <img src={coin.image} width='160' height='160' alt='coin'/>
        </span>
        <span className='coin-name'> {coin.name}</span>
        <span className='coin-price'>
          <span className='usd'>${coin.priceBTC} USD</span>
          <span className='btc'>
            <img
              src='/bitcoin.webp'
              className='bitcoin-img'
              width='30'
              height='60'
              alt='bitcoin'
            />
            {coin.priceUSD} BTC
          </span>
        </span>
      </Link>
    </div>
  );
};

export default CoinItem;
