import React, { useState } from "react";

import Grid from "./components/Grid";
import Header from "./components/Header";

import "./App.css";

function App() {
    const [algorithm, setAlgorithm] = useState("");
    const [startAlgorithm, setStartAlgorithm] = useState(false);
    const [resetWalls, setResetWalls] = useState(false);
    console.log(resetWalls);
    return (
        <div className='App'>
            <Header algorithm={algorithm} setAlgorithm={setAlgorithm} setStartAlgorithm={setStartAlgorithm} setResetWalls={setResetWalls} />
            <Grid algorithm={algorithm} setAlgorithm={setAlgorithm} startAlgorithm={startAlgorithm} resetWalls={resetWalls} />
        </div>
    );
}

export default App;
