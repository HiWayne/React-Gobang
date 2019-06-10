import React from 'react';
import Table from '../Table/Table'
import Command from '../Command/Command'
import calculateWinner from '../../util/calculateWinner'
import './Game.css';

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      history: [{
        squares: Array(this.props.number * this.props.number).fill(null),
        xIsNext: true,
        winner: null,
        index: null,
        checked: null
      }],
      stepNumber: 0
    }
  }

  handelClick = (index) => {
    const history = this.state.history.slice(0, this.state.stepNumber + 1)
    const lastItem = history.length - 1
    //每次下棋都消除记录选中边框
    history[lastItem].checked = null
    const squares = history[lastItem].squares.slice()
    if ( squares[index] || history[lastItem].winner) {
      return
    }
    squares[index] = history[lastItem].xIsNext ? 'X' : 'O'
    this.setState(state => {
      return {
        history: history.concat([{
          squares,
          xIsNext: !state.history[lastItem].xIsNext,
          winner: this.calculateWinner(squares, index, this.props.number, this.props.winCondition),
          index,
          checked: null
        }]),
        stepNumber: history.length
      }
    })
  }

  returnHistory = (index) => {
    this.setState(state => {
      const newHistory = state.history.map(object => {
        return Object.assign({}, object, {checked: null})
      })
      newHistory[index] = Object.assign({}, state.history[index], {checked: true})
      return {
        stepNumber: index,
        history: newHistory
      }
    })
  }

  calculateWinner(...arg) {
    return calculateWinner(...arg)
  }

  render() {
    const history = this.state.history
    const currentHistory = history[this.state.stepNumber]
    const squares = currentHistory.squares
    const status = currentHistory.winner ? '赢方: ' + currentHistory.winner.value + ' !' : '下一个棋子: ' + (currentHistory.xIsNext ? 'X' : 'O')

    const commandProps = {
      history: this.state.history,
      onClick: this.returnHistory,
      number: this.props.number,
      winCondition: this.props.winCondition,
      changeNumber: this.props.changeNumber,
      changeWinCondition: this.props.changeWinCondition
    }

    return (
      <div className="game">
        <div className="left">
          <div className={`status ${currentHistory.winner ? 'has-color' : ''}`}>{status}</div>
          <Table number={this.props.number} onClick={this.handelClick} squares={squares} lineArray={currentHistory.winner&&currentHistory.winner.lineArray} />
        </div>
        <Command commandProps={commandProps} />
      </div>
    )
  }
}

export default Game;
