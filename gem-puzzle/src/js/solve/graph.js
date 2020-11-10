function removeGraphNode(list, node) {
  const index = list.indexOf(node);
  list.splice(index, 1);
}

function findGraphNode(list, node) {
  const result = list.indexOf(node);
  if (result === -1) return false;
  return true;
}

export { removeGraphNode, findGraphNode };
