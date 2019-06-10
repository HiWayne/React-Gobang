import React from 'react'
import classNames from 'classnames'
import './Command.css'

export default class Command extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      reversal: false
    }
  }

  handelChangeNumber = (e) => {
    this.props.commandProps.changeNumber(e.target.value)
  }

  handelChangeWinCondition = (e) => {
    this.props.commandProps.changeWinCondition(e.target.value)
  }

  _parseIntState(number, state) {
    if (parseInt(number) !== number) {
      return state = `虽然你写的是小数，但是会被当做 ${Math.ceil(number)}处理`
    }
    return state
  }

  reverseHistory = () => {
    this.setState(state => {
      return {
        reversal: !state.reversal
      }
    })
  }

  render() {
    let numberTooSmall = '', winConditionToSmall = '', number = this.props.commandProps.number, winCondition = this.props.commandProps.winCondition
    let history = this.props.commandProps.history
    let logList = []
    for (let i = 0, length = history.length; i < length; i++) {
      if (i) {
        const checked = history[i].checked
        const index = history[i].index + 1
        const tempRow = Math.ceil(index / number)
        const row = tempRow === 0 ? 1 : tempRow
        const tempColumn = index - Math.floor(index / number) * number
        const column = tempColumn === 0 ? number : tempColumn
        const chess = !history[i].xIsNext ? 'X' : 'O'
        const className = classNames({
          log: true,
          "has-border": checked
        })
        const logItem = <button className={className} key={history[i].squares.join("")} onClick={() => {
          this.props.commandProps.onClick(i)
        }}>点击撤回到第{i}步：{chess}在{row}行{column}列</button>
        logList.push(logItem)
      }
      else {
        const logItem = <button className="log" key={i} onClick={() => {
          this.props.commandProps.onClick(i)
        }}>重新开始游戏</button>
        logList.push(logItem)
      }
    }
    // 升/降序排列
    if (this.state.reversal) {
      const tempLogListLeft = logList.slice(0, 1)
      const tempLogListRight = logList.slice(1)
      tempLogListRight.reverse()
      logList = tempLogListLeft.concat(tempLogListRight)
    }

    if (2 < number && number < 5) {
      numberTooSmall = '原来你适合小一号的'
    }
    if (0 < number && number <= 2) {
      numberTooSmall = '你确定这样能玩吗？？？'
    }
    else if (number === 0) {
      numberTooSmall = '这是你的显微镜，拿去！'
    }
    else if (number < 0) {
      numberTooSmall = '我懂了，你是来故意找茬的'
    }
    else if (number > 5 && number < 10) {
      numberTooSmall = '嗯，越来越像盘真正的五子棋了！'
    }
    else if (number === 10) {
      numberTooSmall = '再往上加你会发现……'
    }
    else if (number < 20 && number > 10) {
      numberTooSmall = '是不是发现格子变小了？'
    }
    else if (number >= 20) {
      numberTooSmall = '看来你喜欢文明、全面战争、欧陆风云！可惜我都不是'
    }

    if (1 < winCondition && winCondition <= 2) {
      winConditionToSmall = '你开心就好……'
    }
    else if (winCondition === 1) {
      winConditionToSmall = '卑鄙的你'
    }
    else if (winCondition < 1) {
      winConditionToSmall = '搞测试的平时工作不够饱和吗？'
    }
    else if (winCondition < 10 && winCondition > 5) {
      winConditionToSmall = '原来阁下觉得“5”子棋是屑'
    }
    else if (winCondition < 20 && winCondition >= 10) {
      winConditionToSmall = '恭喜你步入“两位数”子棋俱乐部！'
    }
    else if (winCondition < 30 && winCondition >= 20) {
      winConditionToSmall = '这……祝你好运吧，打完这局就睡觉'
    }
    else if (winCondition >= 30) {
      winConditionToSmall = '这大概就是大佬吧'
    }

    numberTooSmall = this._parseIntState(number, numberTooSmall)
    winConditionToSmall = this._parseIntState(winCondition, winConditionToSmall)

    return (
      <div className="command">
        <div>
          <label htmlFor="number">棋盘大小（边长）</label><br /><input type="number" id="number" value={this.props.commandProps.number} onChange={this.handelChangeNumber}></input><p className="warnning">{numberTooSmall}</p>
        </div>
        <div>
          <label htmlFor="winCondition">胜利条件（几子连成一线）</label><br /><input type="number" id="winCondition" value={this.props.commandProps.winCondition} onChange={this.handelChangeWinCondition}></input><p className="warnning">{winConditionToSmall}</p>
        </div>
        <div>
          <button onClick={this.reverseHistory}>{this.state.reversal ? '升序排列' : '降序排列'}</button>
        </div>
        {logList}
      </div>
    )
  }
}