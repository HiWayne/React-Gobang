import React from 'react';
import Game from './components/Game/Game'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.changeNumber = this.changeNumber.bind(this)
    this.changeWinCondition = this.changeWinCondition.bind(this)
    this.state = {
      number: 5,
      winCondition: 3
    }
  }

  changeNumber(number) {
    const transformNumber = Number(number)
    if (isNaN(transformNumber)) {
      alert(`请输入数字`)
      return
    }
    if (transformNumber > 300) {
      alert('就你那破机器还想渲染这么多？')
      return
    }
    else if (transformNumber <= 300 && transformNumber >= 100) {
      alert('这种级别的数字可能会有些卡，不过没关系我做过优化了，你可以随便往上加')
    }
    this.setState({
      number: transformNumber
    })
  }

  changeWinCondition(winCondition) {
    const transformNumber = Number(winCondition)
    if (isNaN(transformNumber)) {
      alert(`请输入数字`)
      return
    }
    this.setState({
      winCondition: transformNumber
    })
  }

  render() {
    return (
      <Game number={this.state.number} winCondition={this.state.winCondition} changeNumber={this.changeNumber} changeWinCondition={this.changeWinCondition} />
    )
  }
}

export default App;
