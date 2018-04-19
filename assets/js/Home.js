import React from 'react'
import { XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries } from 'react-vis'
import moment from 'moment'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import cx from 'classnames'

import * as selectors from './selectors'
import * as actions from './actions'
import { TICKER } from './constants'

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

const Card = ({ selected, ticker, onClick }) => (
  <div className={cx('ticker-card', { selected })} onClick={onClick}>
    <img alt="" src={TICKER[ticker].iconSrc}/>
    <div className="ticker-card-title">{PORTFOLIO[ticker]} {ticker}</div>
    <div>${PORTFOLIO[ticker] * PRICE[ticker]}</div>
  </div>
)

const DATA = [{"volumeto":46076802.56,"volumefrom":5650.98,"time":1524067200,"open":8019.98,"low":8019.54,"high":8157.1,"close":8135.82},{"volumeto":27798344.08,"volumefrom":3408.61,"time":1524070800,"open":8137.01,"low":8110.85,"high":8147.93,"close":8119.35},{"volumeto":12179216.24,"volumefrom":1490.08,"time":1524074400,"open":8119.17,"low":8119.08,"high":8139.7,"close":8125.88},{"volumeto":12342989.16,"volumefrom":1512.74,"time":1524078000,"open":8125.99,"low":8115.55,"high":8145.35,"close":8136.2},{"volumeto":60552958.73,"volumefrom":7370.21,"time":1524081600,"open":8136.63,"low":8124.01,"high":8246.57,"close":8204.65},{"volumeto":13753611.37,"volumefrom":1661.11,"time":1524085200,"open":8204.74,"low":8196.08,"high":8216.94,"close":8216.61},{"volumeto":33684900.88,"volumefrom":4096.62,"time":1524088800,"open":8216.67,"low":8149.03,"high":8231.89,"close":8182.15},{"volumeto":17957941.1,"volumefrom":2187.17,"time":1524092400,"open":8182.15,"low":8171.84,"high":8201.85,"close":8189.96},{"volumeto":21736007.75,"volumefrom":2650.47,"time":1524096000,"open":8189.92,"low":8136.42,"high":8194.76,"close":8172.29},{"volumeto":36310996.4,"volumefrom":4430.8,"time":1524099600,"open":8171.87,"low":8150.93,"high":8225.37,"close":8209.81},{"volumeto":14078018.89,"volumefrom":1711.35,"time":1524103200,"open":8209.81,"low":8177.46,"high":8210.14,"close":8205.5}]

const Home = ({ selectedTicker, actions }) => (
  <div>
    <XYPlot
      className="price-graph"
      width={1000}
      height={400}>
      <LineSeries
        data={DATA.map(each => ({ x: each.time , y: each.close }))}
        strokeWidth={4}
        curve="curveMonotoneX"
      />
      <XAxis
        tickTotal={7}
        tickFormat={time => moment.unix(time).format('l LT')}
        style={{
          fontFamily: 'inherit',
        }}
      />
      <YAxis
        tickTotal={5}
        tickFormat={price => `$${price}`}
        style={{
          fontFamily: 'inherit',
        }}
      />
    </XYPlot>
    <div className="rest-page">
      <div className="total-portfolio-value">$45,431</div>
      <div className="ticker-grid">
        {Object.keys(PORTFOLIO)
          .map(ticker => {
            return (
              <div key={ticker} className="ticker-card-container">
                <Card
                  ticker={ticker}
                  selected={selectedTicker === ticker}
                  onClick={() => actions.selectTicker(ticker)}
                />
              </div>
            )
          })
        }
      </div>
    </div>
  </div>
)

const mapStateToProps = state => ({
  selectedTicker: selectors.getSelectedTicker(state),
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    selectTicker: actions.selectTicker,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
