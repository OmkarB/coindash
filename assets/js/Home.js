import React, { Component } from 'react'
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

class Home extends Component {
  componentWillMount() {
    this.props.actions.selectTicker('BTC')
  }

  render() {
    const { selectedTicker, actions, history } = this.props
    return (
      <div>
        <XYPlot
          className="price-graph"
          width={1000}
          height={400}>
          <LineSeries
            data={history.map(each => ({ x: each.time , y: each.close }))}
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
  }
}

const mapStateToProps = state => ({
  selectedTicker: selectors.getSelectedTicker(state),
  history: selectors.getHistory(state),
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    selectTicker: actions.selectTicker,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
