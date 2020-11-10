import State from './state';

export default function idastar(startState) {
  function search(node, g, bound) {
    node.setH();
    const f = g + node.h;
    // console.log(f);
    if (f > bound) {
      return f;
    }
    if (node.h === 0) {
      return 'FOUND';
    }
    let min = Infinity;
    const successors = node.neighbors();
    const q = g + 1;
    for (let i = 0; i < successors.length; i += 1) {
      // checked++;
      // console.log(checked);
      const t = search(successors[i], q, bound);
      if (t === 'FOUND') {
        result.push(successors[i].move);
        return 'FOUND';
      }
      if (t < min) {
        min = t;
      }
    }
    return min;
  }

  console.log('Algoritm IDA*');

  const start = new State(startState);
  start.setH();
  let bound = start.h;
  let result = [];
  while (true) {
    const t = search(start, 0, bound);
    if (t === 'FOUND') {
      return result.reverse();
    }
    if (t === Infinity) {
      return [];
    }
    bound = t;
  }
}
