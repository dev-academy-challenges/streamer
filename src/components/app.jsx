import React, { Component } from 'react'

import { head, tail } from 'ramda'

import Header from './header.jsx'
import Board from './board.jsx'
import ResetButton from './reset-button.jsx'

// We're keeping state here, so let's use a full React Component type
class App extends Component {

  constructor (props) {
    super(props)

    // Set our initial state.
    // Currently, each game includes only a moves array, but we could
    // easily extend this to include player names, etc.
    // The current game is at the head of the games list!
    this.state = {
      games: [
        { moves: [] }
      ]
    }
  }

  makeMove (square) {
    let thisGame = head(this.state.games) // Current game is the head!
    let oldGames = tail(this.state.games) // Previous games are in the tail

    // We'll use the new JavaScript 2015 "spread" operator (...) to
    // create a *new* array (immutability-like), updating the current game.
    // Here we *append* the new square to the moves array:
    //    [ ...thisGame.moves, square ]
    // by spreading the old moves out to form the first items in the array,
    // then including the new square as the last item.
    // We use the same trick with the games array by replacing the first
    // game with our new, updated version, and then spreading the old games
    // out as the remaining items in the games array.
    this.setState({
      games: [ { moves: [ ...thisGame.moves, square ] }, ...oldGames ]
    })
  }

  newGame () {
    // We create a new game by prepending an empty moves array onto our
    // games array and returning that as our new state.
    this.setState({
      games: [ { moves: [] }, ...this.state.games ]
    })
  }

  // Our current game is always at the 0 index in our games array! Clever, no?
  render () {
    return <div className='app'>
      <Header/>
      <Board
        moves={this.state.games[0].moves}
        clickCb={this.makeMove.bind(this)}
      />
      <ResetButton clickCb={this.newGame.bind(this)}/>
    </div>
  }
}

export default App
