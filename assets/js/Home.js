import React, { Component } from 'react'
import { XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries } from 'react-vis'
import moment from 'moment'
import { bindActionCreators } from 'redux'
import { isEmpty } from 'lodash'
import { connect } from 'react-redux'
import cx from 'classnames'
import Cookies from 'js-cookie'

import * as selectors from './selectors'
import * as actions from './actions'
import { TICKER } from './constants'
import Form from './Form'

const Card = ({ onAmountChange, editing, amount, selected, ticker, onClick, price }) => (
  <div className={cx('ticker-card', { selected })} onClick={onClick}>
    <img alt="" src={TICKER[ticker].iconSrc}/>
    {editing
      ? <input type="number" value={amount} onChange={onAmountChange}/>
      : <div className="ticker-card-title">{amount} {ticker}</div>
    }
    <div>${amount * price}</div>
  </div>
)

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: false,
    }
    this.toggleEdit = this.toggleEdit.bind(this)
    this.handleAmountChange = this.handleAmountChange.bind(this)
    this.handleSaveClick = this.handleSaveClick.bind(this)
  }


  componentWillMount() {
    this.props.actions.selectTicker('BTC')
    this.props.actions.fetchCurrentPrices()
    this.props.actions.fetchPortfolio()
  }

  handleAmountChange(ticker, event) {
    return event => {
      this.props.actions.setTickerAmount({ ticker, amount: event.target.value })
    }
  }

  toggleEdit() {
    this.setState({
      editing: !this.state.editing,
    })
  }

  handleSaveClick() {
    this.props.actions.updatePortfolio()
    this.setState({ editing: false })
  }

  render() {
    const { portfolio, currentPrices, selectedTicker, actions, history } = this.props
    if (!Cookies.get('coindash_token')) {
      return <Form/>
    }
    if (isEmpty(portfolio) || isEmpty(currentPrices)) return false
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
          {this.state.editing
            ? <button onClick={this.handleSaveClick}>Save Changes</button>
            : <button onClick={this.toggleEdit}>Toggle Editing</button>
          }
          <div className="ticker-grid">
            {Object.keys(currentPrices)
              .map(ticker => {
                return (
                  <div key={ticker} className="ticker-card-container">
                    <Card
                      editing={this.state.editing}
                      onAmountChange={this.handleAmountChange(ticker)}
                      ticker={ticker}
                      selected={selectedTicker === ticker}
                      onClick={() => actions.selectTicker(ticker)}
                      price={currentPrices[ticker]}
                      amount={portfolio[ticker]}
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
    setTickerAmount: actions.setTickerAmount,
    updatePortfolio: actions.updatePortfolio,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
