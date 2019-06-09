import React from 'react'
import Button from '../Button/Button'
import './Table.css'

export default class Table extends React.Component {

  render() {
    const number = this.props.number
    const buttonList = []
    for (let i = 0; i < number; i++) {
      const tdList = []
      for (let j = 0; j < number; j++) {
        const index = i * number + j
        let tdItem
        if (this.props.lineArray && this.props.lineArray.indexOf(index) !== -1) {
          tdItem = <Button key={j} className="oneline" value={this.props.squares[index]} number={this.props.number} onClick={() => {
            this.props.onClick(index)
          }} />
        }
        else {
          tdItem = <Button key={j} value={this.props.squares[index]} number={this.props.number} onClick={() => {
            this.props.onClick(index)
          }} />
        }
        tdList.push(tdItem)
      }
      const tr = <tr key={i}>{tdList}</tr>
      buttonList.push(tr)
    }

    return (
      <table className="table">
        <tbody>
          {buttonList}
        </tbody>
      </table>
    )
  }
}