import { useState } from "react";

import "./Header.css";

const Header = ({ algorithm, setAlgorithm, setStartAlgorithm, setResetWalls }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        setAlgorithm(option);
        setIsOpen(false);
    };

    const startAlgorithm = () => {
        if (algorithm !== "") setStartAlgorithm(true);
    };

    return (
        <div className='header-container'>
            <div>
                <h2 className='header-title'>Pathfinder</h2>
            </div>
            <div className='dropdown'>
                <div className={`dropdown-button ${isOpen ? "dropdown-button-onFocus" : null}`} onClick={toggleDropdown}>
                    Algorithms <img className={`button-arrow ${isOpen ? "dropdown-button-arrow-onFocus" : null}`} alt='arrow' src='../down-arrow-svgrepo-com.svg' />
                </div>
                {isOpen && (
                    <div className='dropdown-content'>
                        <div className='dropdown-item' onClick={() => handleOptionClick("A*")}>
                            A*
                        </div>
                        <div className='dropdown-item' onClick={() => handleOptionClick("Dijkstra")}>
                            Dijkstra
                        </div>
                        <div className='dropdown-item' onClick={() => handleOptionClick("BFS")}>
                            BFS
                        </div>
                    </div>
                )}
            </div>
            <div>
                <button className='visualize-button' onClick={startAlgorithm}>
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
