import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {logout} from '../store/user'
import {Button} from '@material-ui/core'


/**
 * COMPONENT
 */
class UserHome extends Component {
  render(){
    return (
      <div className="logged-in-nav">
        <h3>Welcome, {this.props.email}</h3>
        &nbsp;
        <Button variant="outlined" color="primary" size="small" onClick={this.props.handleClick}>Logout</Button>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.user.email
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick: () => dispatch(logout())
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
