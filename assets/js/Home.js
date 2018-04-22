import React, { Component } from 'react'
import { XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries } from 'react-vis'
import moment from 'moment'
import { bindActionCreators } from 'redux'
import { isEmpty } from 'lodash'
import { connect } from 'react-redux'
import cx from 'classnames'

import * as selectors from './selectors'
import * as actions from './actions'
import { TICKER } from './constants'

const Card = ({ portfolio, selected, ticker, onClick, price }) => (
  <div className={cx('ticker-card', { selected })} onClick={onClick}>
    <img alt="" src={TICKER[ticker].iconSrc}/>
    <div className="ticker-card-title">{portfolio[ticker]} {ticker}</div>
    <div>${portfolio[ticker] * price}</div>
  </div>
)

class Home extends Component {
  componentWillMount() {
    this.props.actions.selectTicker('BTC')
    this.props.actions.fetchCurrentPrices()
    this.props.actions.fetchPortfolio()
  }

  render() {
    const { portfolio, currentPrices, selectedTicker, actions, history } = this.props
    if (isEmpty(portfolio) || isEmpty(currentPrices)) return false
    console.log(portfolio, currentPrices)
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
            {Object.keys(currentPrices)
              .map(ticker => {
                return (
                  <div key={ticker} className="ticker-card-container">
                    <Card
                      ticker={ticker}
                      selected={selectedTicker === ticker}
                      onClick={() => actions.selectTicker(ticker)}
                      price={currentPrices[ticker]}
                      portfolio={portfolio}
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
  currentPrices: selectors.getCurrentPrices(state),
  portfolio: selectors.getPortfolio(state),
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    selectTicker: actions.selectTicker,
    fetchCurrentPrices: actions.fetchCurrentPrices,
    fetchPortfolio: actions.fetchPortfolio,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
