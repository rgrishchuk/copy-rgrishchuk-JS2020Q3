export default class State {
  constructor(state) {
    this.copy(state);
  }

  copy(obj) {
    this.cells = [];
    obj.cells.forEach((cell) => {
      const newCell = {};
      if (cell.value != null) newCell.value = cell.value;
      if (cell.left != null) newCell.left = cell.left;
      if (cell.top != null) newCell.top = cell.top;
      this.cells.push(newCell);
    });
    this.empty = {
      left: obj.empty.left,
      top: obj.empty.top,
    };
  }

  setH() {
    let result = 0;
    const column = Math.sqrt(this.cells.length);
    this.cells.forEach((cell) => {
      if (cell.value === 0) {
        // const value = this.empty.top * column + this.empty.left;
        // if (value !== this.cells.length) {
        //   const left = column - 1;
        //   const top = column - 1;
        //   result += Math.abs(this.empty.top - top) + Math.abs(this.empty.left - left);
        // }
        // if (value !== this.cells.length) result += 1;
      } else {
        const value = cell.top * column + cell.left + 1;
        if (value !== cell.value) {
          const left = (cell.value - 1) % column;
          const top = (cell.value - 1 - left) / column;
          result += Math.abs(cell.top - top) + Math.abs(cell.left - left);
        }
        // if (value !== cell.value) result += 1;
      }
    });
    // console.log(result);
    this.h = result;
  }

  isFinish() {
    return this.cells.every((cell) => {
      if (cell.value === 0) {
        return true;
      }
      return cell.value === cell.top * Math.sqrt(this.cells.length) + cell.left + 1;
    });
  }

  findCell(left, top) {
    for (let i = 0; i < this.cells.length; i += 1) {
      if (this.cells[i].left === left && this.cells[i].top === top) return i;
    }
    return null;
  }

  newState(index) {
    const newNode = new State(this);
    const currLeft = newNode.cells[index].left;
    const currTop = newNode.cells[index].top;
    newNode.cells[index].left = newNode.empty.left;
    newNode.cells[index].top = newNode.empty.top;
    newNode.empty.left = currLeft;
    newNode.empty.top = currTop;
    return newNode;
  }

  neighbors() {
    let nearIndex = null;
    let nearNode = null;
    const columns = Math.sqrt(this.cells.length);
    const result = [];
    if (this.empty.top !== 0) {
      nearIndex = this.findCell(this.empty.left, this.empty.top - 1);
      nearNode = this.newState(nearIndex);
      nearNode.move = nearIndex;
      result.push(nearNode);
    }
    if (this.empty.left !== 0) {
      nearIndex = this.findCell(this.empty.left - 1, this.empty.top);
      nearNode = this.newState(nearIndex);
      nearNode.move = nearIndex;
      result.push(nearNode);
    }
    if (this.empty.top !== columns - 1) {
      nearIndex = this.findCell(this.empty.left, this.empty.top + 1);
      nearNode = this.newState(nearIndex);
      nearNode.move = nearIndex;
      result.push(nearNode);
    }
    if (this.empty.left !== columns - 1) {
      nearIndex = this.findCell(this.empty.left + 1, this.empty.top);
      nearNode = this.newState(nearIndex);
      nearNode.move = nearIndex;
      result.push(nearNode);
    }
    return result;
  }
}
