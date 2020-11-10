import State from './state';
import { removeGraphNode, findGraphNode } from './graph';

export default class Astar {
  constructor(startState) {
    console.log('Algoritm A*');
    const start = new State(startState);
    start.g = 0;
    start.setH();
    start.f = start.g + start.h;
    this.openList = [];
    this.closedList = [];
    this.openList.push(start);
  }

  debug() {
    console.log(`${this.openList.length} ${this.closedList.length}`);
    // console.log(this.openList);
    // console.log(this.closedList);
  }

  search() {
    let lowInd = 0;
    while (!(this.openList.length === 0)) {
      // this.debug();
      // Find the lowest f(x) to process next
      for (let i = 0; i < this.openList.length; i += 1) {
        if (this.openList[i].f < this.openList[lowInd].f) { lowInd = i; }
      }
      const currentNode = this.openList[lowInd];
      // console.log(currentNode.h)
      // End case -- result has been found, return the traced path
      // if (currentNode.isFinish()) {
      if (currentNode.h === 0) {
        console.log('FINISH');
        let curr = currentNode;
        const ret = [];
        while (curr.parent) {
          ret.push(curr.move);
          curr = curr.parent;
        }
        return ret.reverse();
      }

      // Normal case -- move currentNode from open to closed, process each of its neighbors
      removeGraphNode(this.openList, currentNode);
      this.closedList.push(currentNode);
      const neighbors = currentNode.neighbors();
      for (let ind = 0; ind < neighbors.length; ind += 1) {
        const neighbor = neighbors[ind];
        if (!(findGraphNode(this.closedList, neighbor))) {
          // not a valid node to process, skip to next neighbor

          // g score is the shortest distance from start to current node, we need to check if
          //   the path we have arrived at this neighbor is the shortest one we have seen yet
          const gScore = currentNode.g + 1; // 1 is the distance from a node to it's neighbor
          let gScoreIsBest = false;

          if (!(findGraphNode(this.openList, neighbor))) {
            // This the the first time we have arrived at this node, it must be the best
            // Also, we need to take the h (heuristic) score since we haven't done so yet
            gScoreIsBest = true;
            neighbor.setH();
            // console.log('---------------------');
            // console.log(neighbor);
            // console.log(neighbor.h);
            // console.log('---------------------');
            this.openList.push(neighbor);
          } else if (gScore < neighbor.g) {
            // We have already seen the node, but last time it had a worse g (distance from start)
            gScoreIsBest = true;
          }

          if (gScoreIsBest) {
            // Found an optimal (so far) path to this node.   Store info on how we got here and
            //  just how good it really is...
            neighbor.parent = currentNode;
            neighbor.g = gScore;
            neighbor.f = neighbor.g + neighbor.h;
          }
        }
      }

      // this.openList.length = 0;
    }
    // No result was found -- empty array signifies failure to find path
    return [];
  }
}
