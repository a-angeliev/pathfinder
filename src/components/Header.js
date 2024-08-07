import { useEffect, useRef, useState } from "react";

import "./Header.css";

const Header = ({ algorithm, setAlgorithm, setStartAlgorithm, startAlgorithm, setResetWalls, speed, setSpeed }) => {
    const [isOpenAlgo, setIsOpenAlgo] = useState(false);
    const [isOpenTheme, setIsOpenTheme] = useState(false);
    // const [speed, setSpeed] = useState(50);

    const algoDropdownRef = useRef(null);
    const speedDropdownRef = useRef(null);

    const toggleAlgoDropdown = () => {
        setIsOpenAlgo(!isOpenAlgo);
    };

    const toggleThemeDropdown = () => {
        setIsOpenTheme(!isOpenTheme);
    };

    const handleAlgoOptionClick = (option) => {
        if (!startAlgorithm) {
            setAlgorithm(option);
            setIsOpenAlgo(false);
        }
    };

    const handleSpeedOptionClick = (option) => {
        if (!startAlgorithm) {
            setSpeed(option);
            setIsOpenTheme(false);
        }
    };

    const start = () => {
        if (algorithm !== "") setStartAlgorithm(true);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (algoDropdownRef.current && !algoDropdownRef.current.contains(event.target)) {
                setIsOpenAlgo(false);
            }
            if (speedDropdownRef.current && !speedDropdownRef.current.contains(event.target)) {
                setIsOpenTheme(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className='header-container'>
            <div>
                <h2 className='header-title'>Pathfinder</h2>
            </div>
            <div className='dropdown' ref={algoDropdownRef}>
                <div className={`dropdown-button ${isOpenAlgo ? "dropdown-button-onFocus" : null}`} onClick={toggleAlgoDropdown}>
                    Algorithms <img className={`button-arrow ${isOpenAlgo ? "dropdown-button-arrow-onFocus" : null}`} alt='arrow' src='../down-arrow-svgrepo-com.svg' />
                </div>
                {isOpenAlgo && (
                    <div className='dropdown-content'>
                        <div className={`dropdown-item ${algorithm === "A*" ? "selected" : null}`} onClick={() => handleAlgoOptionClick("A*")}>
                            A*
                        </div>
                        <div className={`dropdown-item ${algorithm === "Dijkstra" ? "selected" : null}`} onClick={() => handleAlgoOptionClick("Dijkstra")}>
                            Dijkstra
                        </div>
                        <div className={`dropdown-item ${algorithm === "BFS" ? "selected" : null}`} onClick={() => handleAlgoOptionClick("BFS")}>
                            BFS
                        </div>
                    </div>
                )}
            </div>
            <div className='dropdown' ref={speedDropdownRef}>
                <div className={`dropdown-button ${isOpenTheme ? "dropdown-button-onFocus" : null}`} onClick={toggleThemeDropdown}>
                    Speed: {speed}ms{" "}
                    <img className={`button-arrow ${isOpenTheme ? "dropdown-button-arrow-onFocus" : null}`} alt='arrow' src='../down-arrow-svgrepo-com.svg' />
                </div>
                {isOpenTheme && (
                    <div className='dropdown-content'>
                        <div className={`dropdown-item ${speed === 0 ? "selected" : null}`} onClick={() => handleSpeedOptionClick(0)}>
                            0ms
                        </div>
                        <div className={`dropdown-item ${speed === 10 ? "selected" : null}`} onClick={() => handleSpeedOptionClick(10)}>
                            10ms
                        </div>
                        <div className={`dropdown-item ${speed === 30 ? "selected" : null}`} onClick={() => handleSpeedOptionClick(30)}>
                            30ms
                        </div>
                        <div className={`dropdown-item ${speed === 50 ? "selected" : null}`} onClick={() => handleSpeedOptionClick(50)}>
                            50ms
                        </div>
                    </div>
                )}
            </div>
            <div>
                <button disabled={startAlgorithm === true || ""} className={`visualize-button ${startAlgorithm === true ? "in-progress" : "null"}`} onClick={start}>
                    {algorithm === "" ? "Pick up Algorithm!" : `Visualize ${algorithm}`}
                </button>
            </div>
            <div>
                <button disabled={startAlgorithm === true || ""} className='nav-button' onClick={() => setResetWalls((prev) => !prev)}>
                    Reset walls
                </button>
            </div>
        </div>
    );
};

export default Header;
