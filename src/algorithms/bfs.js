export default function bfs(grid, startNode, endNode, setTotalTime) {
    const startTime = performance.now(); // Record start time

    const visitedNodesInOrder = [];
    const queue = [startNode];
    startNode.isVisited = true;

    while (queue.length > 0) {
        const currentNode = queue.shift();
        if (currentNode.isWall) continue;
        visitedNodesInOrder.push(currentNode);

        if (currentNode === endNode) {
            const endTime = performance.now(); // Record end time
            const totalTime = endTime - startTime; // Calculate total time in milliseconds
            setTotalTime(totalTime); // Set the total time
            return visitedNodesInOrder;
        }

        const neighbors = getUnvisitedNeighbors(currentNode, grid);
        for (const neighbor of neighbors) {
            neighbor.isVisited = true;
            neighbor.previousNode = currentNode;
            queue.push(neighbor);
        }
    }

    const endTime = performance.now(); // Record end time if loop ends naturally
    const totalTime = endTime - startTime; // Calculate total time in milliseconds
    setTotalTime(totalTime); // Set the total time
    return visitedNodesInOrder; // Return all visited nodes if no path is found
}

function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const { row, col } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter((neighbor) => !neighbor.isVisited);
}
