import React from 'react'
import PropTypes from 'prop-types'

const errorStyle = {
  color: 'red',
  background: 'lightgrey',
  fontSize: 20,
  borderStyle: 'solid',
  borderRadius: 5,
  padding: 10,
  marginBottom: 10,
}

const notificationStyle = {
  color: 'green',
  background: 'lightgrey',
  fontSize: 20,
  borderStyle: 'solid',
  borderRadius: 5,
  padding: 10,
  marginBottom: 10,
}



const Notification = ({ message, error }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error" style={error ? errorStyle : notificationStyle}>
      {message}
    </div>
  )
}


Notification.propTypes = {
  message: PropTypes.string,
  error: PropTypes.bool.isRequired
}

export default Notification