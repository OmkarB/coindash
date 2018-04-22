import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from './actions'
import * as selectors from './selectors'

const Form = ({ name, actions, password, onCreateClick }) => {
  return (
    <div>
      <input type="text" value={name} onChange={event => actions.setName(event.target.value)}/>
      <input type="text" value={password} onChange={event => actions.setPassword(event.target.value)}/>
      <button onClick={() => {
        actions.createUser()
        onCreateClick()
      }}>
        Sign up!
      </button>
    </div>
  )
}

const mapStateToProps = state => ({
  password: selectors.getPassword(state),
  name: selectors.getName(state),
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    setPassword: actions.setPassword,
    setName: actions.setName,
    createUser: actions.createUser,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Form)
