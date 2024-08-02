import React, { useState, useEffect } from "react";
import astar from "../algorithms/astar";
import dijkstra from "../algorithms/dijkstra";
import bfs from "../algorithms/bfs";
import "./Grid.css";

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const END_NODE_ROW = 10;
const END_NODE_COL = 35;

const Grid = ({ algorithm, setAlgorithm, startAlgorithm, resetWalls }) => {
    const [grid, setGrid] = useState([]);
    const [mouseIsPressed, setMouseIsPressed] = useState(false);
    //   const [algorithm, setAlgorithm] = useState('A*');
    const [isStopped, setIsStopped] = useState(false);

    useEffect(() => {
        const updateGridSize = () => {
            const maxRows = Math.floor((window.innerHeight - 70) / 25); // Adjust 25 to control node size
            const maxCols = Math.floor((window.innerWidth - 30) / 25);
            setGrid(createInitialGrid(maxRows, maxCols));
        };
        console.log(resetWalls);

        updateGridSize();
        window.addEventListener("resize", updateGridSize);
        return () => window.removeEventListener("resize", updateGridSize);
    }, [resetWalls]);

    const handleMouseDown = (row, col) => {
        const newGrid = getNewGridWithWallToggled(grid, row, col);
        setGrid(newGrid);
        setMouseIsPressed(true);
    };

    const handleMouseEnter = (row, col) => {
        if (!mouseIsPressed) return;
        const newGrid = getNewGridWithWallToggled(grid, row, col);
        setGrid(newGrid);
    };

    const handleMouseUp = () => {
        setMouseIsPressed(false);
    };

    const visualizeAlgorithm = () => {
        setIsStopped(false);
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const endNode = grid[END_NODE_ROW][END_NODE_COL];
        let visitedNodesInOrder;
        if (algorithm === "A*") {
            visitedNodesInOrder = astar(grid, startNode, endNode);
        } else if (algorithm === "Dijkstra") {
            visitedNodesInOrder = dijkstra(grid, startNode, endNode);
        } else if (algorithm === "BFS") {
            visitedNodesInOrder = bfs(grid, startNode, endNode);
        }
        animateAlgorithm(visitedNodesInOrder, endNode);
    };

    const resetWallsFunction = () => {
        const newGrid = grid.slice();
        for (let row = 0; row < newGrid.length; row++) {
            for (let col = 0; col < newGrid[row].length; col++) {
                const node = newGrid[row][col];
                const newNode = {
                    ...node,
                    isWall: false,
                };
                newGrid[row][col] = newNode;
                document.getElementById(`node-${node.row}-${node.col}`).className = "grid-node";
            }
        }
        setGrid(newGrid);
    };
    // useEffect(() => {
    //     if (resetWalls) resetWallsFunction();
    // }, [resetWalls]);
    useEffect(() => {
        if (startAlgorithm) visualizeAlgorithm();
    }, [startAlgorithm]);

    const animateAlgorithm = (visitedNodesInOrder, endNode) => {
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
            if (isStopped) return;
            if (i === visitedNodesInOrder.length) {
                setTimeout(() => {
                    if (!isStopped) animateShortestPath(endNode);
                }, 50 * i);
                return;
            }
            setTimeout(() => {
                if (isStopped) return;
                const node = visitedNodesInOrder[i];
                if (!node.isStart && !node.isEnd) {
                    document.getElementById(`node-${node.row}-${node.col}`).className = "grid-node node-visited";
                }
                if (i > 0) {
                    const prevNode = visitedNodesInOrder[i - 1];
                    if (!prevNode.isStart && !prevNode.isEnd) {
                        document.getElementById(`node-${prevNode.row}-${prevNode.col}`).classList.remove("node-current");
                    }
                }
                if (!node.isStart && !node.isEnd) {
                    document.getElementById(`node-${node.row}-${node.col}`).classList.add("node-current");
                }
            }, 50 * i);
        }
    };

    const animateShortestPath = (endNode) => {
        let currentNode = endNode;
        const shortestPathNodes = [];
        while (currentNode !== null) {
            shortestPathNodes.unshift(currentNode);
            currentNode = currentNode.previousNode;
        }
        for (let i = 0; i < shortestPathNodes.length; i++) {
            setTimeout(() => {
                if (isStopped) return;
                const node = shortestPathNodes[i];
                if (!node.isStart && !node.isEnd) {
                    document.getElementById(`node-${node.row}-${node.col}`).className = "grid-node node-shortest-path";
                }
            }, 50 * i);
        }
    };

    return (
        <>
            <div className='grid'>
                {grid.map((row, rowIdx) => (
                    <div key={rowIdx} className='grid-row'>
                        {row.map((node, nodeIdx) => (
                            <div
                                key={nodeIdx}
                                id={`node-${node.row}-${node.col}`}
                                className={`grid-node 
                  ${node.isStart ? "node-start" : ""} 
                  ${node.isEnd ? "node-end" : ""} 
                  ${node.isWall ? "node-wall" : ""}`}
                                onMouseDown={() => handleMouseDown(rowIdx, nodeIdx)}
                                onMouseEnter={() => handleMouseEnter(rowIdx, nodeIdx)}
                                onMouseUp={() => handleMouseUp()}></div>
                        ))}
                    </div>
                ))}
            </div>
        </>
    );
};

const createInitialGrid = (rows, cols) => {
    const grid = [];
    for (let row = 0; row < rows; row++) {
        const currentRow = [];
        for (let col = 0; col < cols; col++) {
            currentRow.push(createNode(col, row));
        }
        grid.push(currentRow);
    }
    return grid;
};

const createNode = (col, row) => {
    return {
        col,
        row,
        isStart: row === START_NODE_ROW && col === START_NODE_COL,
        isEnd: row === END_NODE_ROW && col === END_NODE_COL,
        isWall: false,
        isVisited: false,
        distance: Infinity,
        heuristic: Infinity,
        totalDistance: Infinity,
        previousNode: null,
    };
};

const getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
        ...node,
        isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
};

const resetGridPreservingWalls = (grid) => {
    const newGrid = grid.slice();
    for (let row = 0; row < newGrid.length; row++) {
        for (let col = 0; col < newGrid[row].length; col++) {
            const node = newGrid[row][col];
            const newNode = {
                ...node,
                isVisited: false,
                distance: Infinity,
                heuristic: Infinity,
                totalDistance: Infinity,
                previousNode: null,
                isWall: node.isWall,
            };
            newGrid[row][col] = newNode;
            document.getElementById(`node-${node.row}-${node.col}`).className = `grid-node ${node.isWall ? "node-wall" : ""}`;
        }
    }
    return newGrid;
};

export default Grid;
