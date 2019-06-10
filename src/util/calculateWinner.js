/**
 * 判断五子棋输赢，每次落子时触发
 * @param {*} squares 表示所有棋子的数组
 * @param {*} index 落子在数组中的索引值
 * @param {*} number 棋盘的边长（棋格数）
 * @param {*} winCondition 获胜条件（几颗子连线可获胜）
 * 
 * return 返回null则没有输赢，返回X或O即为获胜的一方
 */
export default function calculateWinner(squares, index, number, winCondition) {
  //和落子连成一排且相同的棋子数量，初始值是0
  const count = 0
  function hasWinner(fn1, fn2) {
    const judgeEqualityOfFn1 = judgeEquality(fn1, squares, index, number, count)
    const judgeEqualityOfFn2 = judgeEquality(fn2, squares, index, number, count)
    if (judgeEqualityOfFn1.count + judgeEqualityOfFn2.count + 1 >= winCondition) {
      const lineArray = judgeEqualityOfFn1.lineArray.concat(judgeEqualityOfFn2.lineArray)
      return Array.from(new Set(lineArray))
    }
  }

  //储存了满足胜利条件的连成一排的棋子索引的数组
  let lineArray
  //连成一排的四种可能性
  if (lineArray = hasWinner(index => index - number - 1, index => index + number + 1)) {
    return {value: squares[index], lineArray}
  }
  else if (lineArray = hasWinner(index => index - number, index => index + number)) {
    return {value: squares[index], lineArray}
  }
  else if (lineArray = hasWinner(index => index - number + 1, index => index + number - 1)) {
    return {value: squares[index], lineArray}
  }
  else if (lineArray = hasWinner(index => index - 1, index => index + 1)) {
    return {value: squares[index], lineArray}
  }
  else {
    return null
  }
}

/**
 * 判断输赢的核心函数：对比落子单一固定方向上所有相邻的棋子，返回相同棋子的个数（不包括落子）
 * @param {*} fn 一个计算固定方向上相邻棋子所在索引的函数，以当前被比较的棋子索引作为参数
 * @param {*} squares 表示所有棋子的数组
 * @param {*} index 落子在数组中的索引值
 * @param {*} number 棋盘的边长（棋格数）
 * @param {*} count 和落子连成一排且相同的棋子数量，初始值是0
 * 
 * return Object{和落子连成一排的相同棋子的个数（不包括落子）, 用于高亮显示连成一线的棋子的数组}
 */
function judgeEquality(fn, squares, index, number, count) {
  judgeEquality.lineArray.push(index)
  let otherIndex = fn(index)
  if (otherIndex >= 0 && otherIndex < squares.length) {
    if (squares[index] && squares[index] === squares[otherIndex]) {
      count++
      return judgeEquality(fn, squares, otherIndex, number, count)
    }
    else {
      return {count, lineArray: copyClearProperty(judgeEquality, "lineArray")}
    }
  }
  else {
    return {count, lineArray: copyClearProperty(judgeEquality, "lineArray")}
  }

  function copyClearProperty(judgeEquality, lineArray) {
    const newLineArray = judgeEquality[lineArray].slice()
    judgeEquality[lineArray] = []
    return newLineArray
  }
}
//用于高亮显示连成一线的棋子的数组
judgeEquality.lineArray = []