function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
        for (const node of row) {
            nodes.push(node);
        }
    }
    return nodes;
}

function getNeighbors(node, grid) {
    const neighbors = [];
    const { col, row } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors;
}

function updateUnvisitedNeighbors(node, grid, endNode) {
    const unvisitedNeighbors = getNeighbors(node, grid).filter((neighbor) => !neighbor.isVisited);
    for (const neighbor of unvisitedNeighbors) {
        neighbor.distance = node.distance + 1;
        neighbor.heuristic = manhattanDistance(neighbor, endNode);
        neighbor.totalDistance = neighbor.distance + neighbor.heuristic;
        neighbor.previousNode = node;
    }
}

function manhattanDistance(node, endNode) {
    const dx = Math.abs(node.col - endNode.col);
    const dy = Math.abs(node.row - endNode.row);
    return dx + dy;
}

function sortNodesByDistance(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.totalDistance - nodeB.totalDistance);
}

function astar(grid, startNode, endNode) {
    const visitedNodesInOrder = [];
    startNode.distance = 0;
    startNode.heuristic = manhattanDistance(startNode, endNode);
    startNode.totalDistance = startNode.heuristic;
    const unvisitedNodes = getAllNodes(grid);

    while (unvisitedNodes.length) {
        sortNodesByDistance(unvisitedNodes);
        const closestNode = unvisitedNodes.shift();

        if (closestNode.isWall) continue;
        if (closestNode.totalDistance === Infinity) return visitedNodesInOrder;

        closestNode.isVisited = true;
        visitedNodesInOrder.push(closestNode);

        if (closestNode === endNode) return visitedNodesInOrder;

        updateUnvisitedNeighbors(closestNode, grid, endNode);
    }
}

export default astar;
