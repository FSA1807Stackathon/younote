import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout, me} from '../store'
import UserHome from './user-home'

class Navbar extends Component {
  componentDidMount() {
    this.props.getMe()
  }

  render() {
    const {isLoggedIn} = this.props
    return (
      <div className="navbar">
        <Link to="/courses" className="logo-link">
          <h2 className="logo-title">YouNote</h2>
        </Link>
        &nbsp;
        {isLoggedIn ? (
            <UserHome />
          ) : (
            <div className="nav-items">
              {/* The navbar will show these links before you log in */}
              <Link to="/login">Login</Link>
              &nbsp;
              <Link to="/signup">Sign Up</Link>
            </div>
        )}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: Boolean(state.user.user && state.user.user.id)
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    },
    getMe() {
      dispatch(me())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
