import React from 'react'
import './Button.css'

const classNames = require('classnames')

export default class Button extends React.Component {

  render() {
    const className = classNames({
      button: this.props.number <= 10,
      'small-button': this.props.number > 10,
      oneline: this.props.className
    })
    return (
      <td className={className} onClick={this.props.onClick}>
        {this.props.value}
      </td>
    )
  }
}