import Astar from './astar';
import idastar from './idastar';

export default function solvePuzzle(puzzle, algorithm) {
  console.log(puzzle);
  let solve = null;
  if (algorithm === 'A*') {
    solve = new Astar().search();
  } else if (algorithm === 'IDA*') {
    solve = idastar(puzzle);
  }
  // const astar = new Astar(puzzle);
  // const solve = astar.search();
  // const solve = idastar(puzzle);
  console.log(puzzle);
  console.log(solve);
  console.log('solve end');
}

console.log('hello');