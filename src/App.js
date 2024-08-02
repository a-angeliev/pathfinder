import React, { useState } from "react";

import Grid from "./components/Grid";
import Header from "./components/Header";

import "./App.css";

function App() {
    const [algorithm, setAlgorithm] = useState("");
    const [startAlgorithm, setStartAlgorithm] = useState(false);
    const [resetWalls, setResetWalls] = useState(false);
    return (
        <div className='App'>
            <Header
                algorithm={algorithm}
                setAlgorithm={setAlgorithm}
                setStartAlgorithm={setStartAlgorithm}
                startAlgorithm={startAlgorithm}
                setResetWalls={setResetWalls}
            />
            <Grid algorithm={algorithm} setAlgorithm={setAlgorithm} setStartAlgorithm={setStartAlgorithm} startAlgorithm={startAlgorithm} resetWalls={resetWalls} />
        </div>
    );
}

export default App;
