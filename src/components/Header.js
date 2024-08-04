import { useEffect, useRef, useState } from "react";

import "./Header.css";

const Header = ({ algorithm, setAlgorithm, setStartAlgorithm, startAlgorithm, setResetWalls }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        setAlgorithm(option);
        setIsOpen(false);
    };

    const start = () => {
        if (algorithm !== "") setStartAlgorithm(true);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
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
            <div className='dropdown' ref={dropdownRef}>
                <div className={`dropdown-button ${isOpen ? "dropdown-button-onFocus" : null}`} onClick={toggleDropdown}>
                    Algorithms <img className={`button-arrow ${isOpen ? "dropdown-button-arrow-onFocus" : null}`} alt='arrow' src='../down-arrow-svgrepo-com.svg' />
                </div>
                {isOpen && (
                    <div className='dropdown-content'>
                        <div className={`dropdown-item ${algorithm === "A*" ? "selected" : null}`} onClick={() => handleOptionClick("A*")}>
                            A*
                        </div>
                        <div className={`dropdown-item ${algorithm === "Dijkstra" ? "selected" : null}`} onClick={() => handleOptionClick("Dijkstra")}>
                            Dijkstra
                        </div>
                        <div className={`dropdown-item ${algorithm === "BFS" ? "selected" : null}`} onClick={() => handleOptionClick("BFS")}>
                            BFS
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
                <button className='nav-button' onClick={() => setResetWalls((prev) => !prev)}>
                    Reset walls
                </button>
            </div>
        </div>
    );
};

export default Header;
