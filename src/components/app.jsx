import React, { Component } from 'react'
import io from 'socket.io-client'

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
      games: []
    }
  }

  componentWillMount () {
    this.socket = io.connect('http://localhost:3000/')
    this.socket.emit('new game')
    this.socket.on('new game', (data) => {
      console.log('new game data', data)
      this.setState({
        games: [ { id: data[0].id, moves: data[0].moves }, ...this.state.games ]
      })
    })
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
      games: [
        { id: thisGame.id, moves: [ ...thisGame.moves, square ] },
        ...oldGames
      ]
    }, () => {
      let updated = head(this.state.games)

      this.socket.emit('move', { id: updated.id, moves: updated.moves })
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
    const moves = this.state.games[0] ? this.state.games[0].moves : []

    return <div className='app'>
      <Header/>
      <Board
        moves={moves}
        clickCb={this.makeMove.bind(this)}
      />
      <ResetButton clickCb={this.newGame.bind(this)}/>
    </div>
  }
}

export default App
