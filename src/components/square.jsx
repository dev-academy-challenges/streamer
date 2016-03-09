import React, { PropTypes } from 'react'

// Our Square is a simple function that returns JSX.
// The first argument to our function is the props object.
// We can use destructuring assignment to pull our individual props out of it.
const Square = ({ clickCb, player, win }) => {
  // If this is a winning square, mark it
  const css = win ? `${player} win` : player

  // If the cell has been played, set the CSS and mark it with the player,
  // else set the click callback to allow play.
  return player
    ? <div className={css}>{player}</div>
    : <div onClick={clickCb}/>
}

// We can still set our prop types and defaults here.
Square.propTypes = {
  clickCb: PropTypes.func,
  player: PropTypes.string,
  win: PropTypes.bool
}

Square.defaultProps = {
  win: false
}

export default Square
