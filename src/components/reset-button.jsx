import React, { PropTypes } from 'react'

const ResetButton = ({ clickCb, label }) => {
  return <div className='new-game-btn'>
    <button onClick={clickCb}>{label}</button>
  </div>
}

ResetButton.propTypes = {
  clickCb: PropTypes.func.isRequired,
  label: PropTypes.string
}

ResetButton.defaultProps = {
  label: 'New Game'
}

export default ResetButton
