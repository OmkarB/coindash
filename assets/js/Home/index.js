import React from 'react'

import { TICKER } from '../constants'

const PORTFOLIO = {
  BTC: 1,
  ETH: 3,
  LTC: 2,
  XRP: 0,
  BCH: 0,
  ETC: 0,
}

const PRICE = {
  BTC: 8000,
  ETH: 500,
  LTC: 200,
  XRP: 120,
  BCH: 1000,
  ETC: 200,
}

const Card = ({ ticker }) => (
  <div className="ticker-card">
    <img alt="" src={TICKER[ticker].iconSrc}/>
    <div className="ticker-card-title">{PORTFOLIO[ticker]} {ticker}</div>
    <div>${PORTFOLIO[ticker] * PRICE[ticker]}</div>
  </div>
)

const Home = () => (
  <div className="home">
    <div className="total-portfolio-value">$45,431</div>
    <div className="ticker-grid">
      {Object.keys(PORTFOLIO)
        .map(ticker => {
          return (
            <div className="ticker-card-container">
              <Card ticker={ticker}/>
            </div>
          )
        })
      }
    </div>
  </div>
)

export default Home
