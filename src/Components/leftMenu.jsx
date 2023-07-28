import React from 'react';
import "./leftMenu.css";
import { useState, useEffect, useRef } from 'react';

function LeftMenu(props) {

    //changeing values for props
    const [ChosenOption, setChosenOption] = useState("");
    function handleClick(clicked) {
        // console.log(clicked.target.textContent);
        const newvalue = clicked.target.textContent;
        handlestatechange(newvalue);
    };

    const handlestatechange = (newvalue) => {
        setChosenOption(newvalue);
        console.log(ChosenOption);
        props.setState(newvalue);
    };

    // handle seletion and color change of selected option
    const [selectedItem, setSelectedItem] = useState(null);
    const ulRef = useRef(null);
    const svgRef0 = useRef(null);
    const svgRef1 = useRef(null);
    const svgRef2 = useRef(null);
    const svgRef3 = useRef(null);
    const svgRef4 = useRef(null);
    const svgRef5 = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            // console.log(event.target.textContent);
            if (ulRef.current && !ulRef.current.contains(event.target) && event.target.textContent === "FilmsPeoplePlanetsSpeciesStarshipsVehicles") {
                setSelectedItem(null);
                setChosenOption("");
                props.setState("");
            }
            if (event.target.textContent === "Films") {
                svgRef0.current.style.transform = 'rotate(-90deg)';
            } else if (event.target.textContent === "FilmsPeoplePlanetsSpeciesStarshipsVehicles" || event.target.textContent === "People" || event.target.textContent === "Planets" || event.target.textContent === "Species" || event.target.textContent === "Starships" || event.target.textContent === "Vehicles") {
                svgRef0.current.style.transform = 'rotate(0deg)';
            }
            if (event.target.textContent === "People") {
                svgRef1.current.style.transform = 'rotate(-90deg)';
            } else if (event.target.textContent === "FilmsPeoplePlanetsSpeciesStarshipsVehicles" || event.target.textContent === "Films" || event.target.textContent === "Planets" || event.target.textContent === "Species" || event.target.textContent === "Starships" || event.target.textContent === "Vehicles") {
                svgRef1.current.style.transform = 'rotate(0deg)';
            }
            if (event.target.textContent === "Planets") {
                svgRef2.current.style.transform = 'rotate(-90deg)';
            } else if (event.target.textContent === "FilmsPeoplePlanetsSpeciesStarshipsVehicles" || event.target.textContent === "Films" || event.target.textContent === "People" || event.target.textContent === "Species" || event.target.textContent === "Starships" || event.target.textContent === "Vehicles") {
                svgRef2.current.style.transform = 'rotate(0deg)';
            }
            if (event.target.textContent === "Species") {
                svgRef3.current.style.transform = 'rotate(-90deg)';
            } else if (event.target.textContent === "FilmsPeoplePlanetsSpeciesStarshipsVehicles" || event.target.textContent === "Films" || event.target.textContent === "Planets" || event.target.textContent === "People" || event.target.textContent === "Starships" || event.target.textContent === "Vehicles") {
                svgRef3.current.style.transform = 'rotate(0deg)';
            }
            if (event.target.textContent === "Starships") {
                svgRef4.current.style.transform = 'rotate(-90deg)';
            } else if (event.target.textContent === "FilmsPeoplePlanetsSpeciesStarshipsVehicles" || event.target.textContent === "Films" || event.target.textContent === "Planets" || event.target.textContent === "Species" || event.target.textContent === "People" || event.target.textContent === "Vehicles") {
                svgRef4.current.style.transform = 'rotate(0deg)';
            }
            if (event.target.textContent === "Vehicles") {
                svgRef5.current.style.transform = 'rotate(-90deg)';
            } else if (event.target.textContent === "FilmsPeoplePlanetsSpeciesStarshipsVehicles" || event.target.textContent === "Films" || event.target.textContent === "Planets" || event.target.textContent === "Species" || event.target.textContent === "Starships" || event.target.textContent === "people") {
                svgRef5.current.style.transform = 'rotate(0deg)';
            }
        }

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [props]);

    const handleItemClick = (index) => {
        setSelectedItem(index);
    }


    // render starts here
    return (
        <div id="left-menu">
            <ul class="custom-list" onClick={handleClick} ref={ulRef}>
                <li className={selectedItem === 0 ? 'clicked' : ''} onClick={() => handleItemClick(0)}>
                    <div class="options">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" class="folder">
                            <path d="M15.1875 5.0625H9.18773L7.23656 3.6C7.04221 3.45424 6.8059 3.3753 6.56297 3.375H2.8125C2.51413 3.375 2.22798 3.49353 2.017 3.7045C1.80603 3.91548 1.6875 4.20163 1.6875 4.5V14.0625C1.6875 14.3609 1.80603 14.647 2.017 14.858C2.22798 15.069 2.51413 15.1875 2.8125 15.1875H15.2501C15.5317 15.1871 15.8018 15.0751 16.0009 14.8759C16.2001 14.6768 16.3121 14.4067 16.3125 14.1251V6.1875C16.3125 5.88913 16.194 5.60298 15.983 5.392C15.772 5.18103 15.4859 5.0625 15.1875 5.0625Z" fill="white" />
                        </svg>
                        <div id="txt">Films</div>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" ref={svgRef0}>
                        <path d="M12.773 9.39798L7.14798 15.023C7.09571 15.0752 7.03367 15.1167 6.96539 15.145C6.8971 15.1733 6.82392 15.1878 6.75001 15.1878C6.6761 15.1878 6.60291 15.1733 6.53463 15.145C6.46634 15.1167 6.4043 15.0752 6.35204 15.023C6.29978 14.9707 6.25832 14.9087 6.23004 14.8404C6.20175 14.7721 6.18719 14.6989 6.18719 14.625C6.18719 14.5511 6.20175 14.4779 6.23004 14.4096C6.25832 14.3413 6.29978 14.2793 6.35204 14.227L11.5798 9.00001L6.35204 3.77298C6.24649 3.66743 6.18719 3.52427 6.18719 3.37501C6.18719 3.22574 6.24649 3.08259 6.35204 2.97704C6.45759 2.87149 6.60074 2.81219 6.75001 2.81219C6.89927 2.81219 7.04243 2.87149 7.14798 2.97704L12.773 8.60204C12.8253 8.65428 12.8668 8.71632 12.8951 8.7846C12.9234 8.85289 12.9379 8.92609 12.9379 9.00001C12.9379 9.07393 12.9234 9.14713 12.8951 9.21541C12.8668 9.2837 12.8253 9.34574 12.773 9.39798Z" fill="white" />
                    </svg>
                </li>
                <li className={selectedItem === 1 ? 'clicked' : ''} onClick={() => handleItemClick(1)}>
                    <div class="options">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" class="folder">
                            <path d="M15.1875 5.0625H9.18773L7.23656 3.6C7.04221 3.45424 6.8059 3.3753 6.56297 3.375H2.8125C2.51413 3.375 2.22798 3.49353 2.017 3.7045C1.80603 3.91548 1.6875 4.20163 1.6875 4.5V14.0625C1.6875 14.3609 1.80603 14.647 2.017 14.858C2.22798 15.069 2.51413 15.1875 2.8125 15.1875H15.2501C15.5317 15.1871 15.8018 15.0751 16.0009 14.8759C16.2001 14.6768 16.3121 14.4067 16.3125 14.1251V6.1875C16.3125 5.88913 16.194 5.60298 15.983 5.392C15.772 5.18103 15.4859 5.0625 15.1875 5.0625Z" fill="white" />
                        </svg>
                        <div id="txt">People</div>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" ref={svgRef1}>
                        <path d="M12.773 9.39798L7.14798 15.023C7.09571 15.0752 7.03367 15.1167 6.96539 15.145C6.8971 15.1733 6.82392 15.1878 6.75001 15.1878C6.6761 15.1878 6.60291 15.1733 6.53463 15.145C6.46634 15.1167 6.4043 15.0752 6.35204 15.023C6.29978 14.9707 6.25832 14.9087 6.23004 14.8404C6.20175 14.7721 6.18719 14.6989 6.18719 14.625C6.18719 14.5511 6.20175 14.4779 6.23004 14.4096C6.25832 14.3413 6.29978 14.2793 6.35204 14.227L11.5798 9.00001L6.35204 3.77298C6.24649 3.66743 6.18719 3.52427 6.18719 3.37501C6.18719 3.22574 6.24649 3.08259 6.35204 2.97704C6.45759 2.87149 6.60074 2.81219 6.75001 2.81219C6.89927 2.81219 7.04243 2.87149 7.14798 2.97704L12.773 8.60204C12.8253 8.65428 12.8668 8.71632 12.8951 8.7846C12.9234 8.85289 12.9379 8.92609 12.9379 9.00001C12.9379 9.07393 12.9234 9.14713 12.8951 9.21541C12.8668 9.2837 12.8253 9.34574 12.773 9.39798Z" fill="white" />
                    </svg>
                </li>
                <li className={selectedItem === 2 ? 'clicked' : ''} onClick={() => handleItemClick(2)} >
                    <div class="options">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" class="folder">
                            <path d="M15.1875 5.0625H9.18773L7.23656 3.6C7.04221 3.45424 6.8059 3.3753 6.56297 3.375H2.8125C2.51413 3.375 2.22798 3.49353 2.017 3.7045C1.80603 3.91548 1.6875 4.20163 1.6875 4.5V14.0625C1.6875 14.3609 1.80603 14.647 2.017 14.858C2.22798 15.069 2.51413 15.1875 2.8125 15.1875H15.2501C15.5317 15.1871 15.8018 15.0751 16.0009 14.8759C16.2001 14.6768 16.3121 14.4067 16.3125 14.1251V6.1875C16.3125 5.88913 16.194 5.60298 15.983 5.392C15.772 5.18103 15.4859 5.0625 15.1875 5.0625Z" fill="white" />
                        </svg>
                        <div id="txt">Planets</div>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" ref={svgRef2}>
                        <path d="M12.773 9.39798L7.14798 15.023C7.09571 15.0752 7.03367 15.1167 6.96539 15.145C6.8971 15.1733 6.82392 15.1878 6.75001 15.1878C6.6761 15.1878 6.60291 15.1733 6.53463 15.145C6.46634 15.1167 6.4043 15.0752 6.35204 15.023C6.29978 14.9707 6.25832 14.9087 6.23004 14.8404C6.20175 14.7721 6.18719 14.6989 6.18719 14.625C6.18719 14.5511 6.20175 14.4779 6.23004 14.4096C6.25832 14.3413 6.29978 14.2793 6.35204 14.227L11.5798 9.00001L6.35204 3.77298C6.24649 3.66743 6.18719 3.52427 6.18719 3.37501C6.18719 3.22574 6.24649 3.08259 6.35204 2.97704C6.45759 2.87149 6.60074 2.81219 6.75001 2.81219C6.89927 2.81219 7.04243 2.87149 7.14798 2.97704L12.773 8.60204C12.8253 8.65428 12.8668 8.71632 12.8951 8.7846C12.9234 8.85289 12.9379 8.92609 12.9379 9.00001C12.9379 9.07393 12.9234 9.14713 12.8951 9.21541C12.8668 9.2837 12.8253 9.34574 12.773 9.39798Z" fill="white" />
                    </svg>
                </li>
                <li className={selectedItem === 3 ? 'clicked' : ''} onClick={() => handleItemClick(3)}>
                    <div class="options">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" class="folder">
                            <path d="M15.1875 5.0625H9.18773L7.23656 3.6C7.04221 3.45424 6.8059 3.3753 6.56297 3.375H2.8125C2.51413 3.375 2.22798 3.49353 2.017 3.7045C1.80603 3.91548 1.6875 4.20163 1.6875 4.5V14.0625C1.6875 14.3609 1.80603 14.647 2.017 14.858C2.22798 15.069 2.51413 15.1875 2.8125 15.1875H15.2501C15.5317 15.1871 15.8018 15.0751 16.0009 14.8759C16.2001 14.6768 16.3121 14.4067 16.3125 14.1251V6.1875C16.3125 5.88913 16.194 5.60298 15.983 5.392C15.772 5.18103 15.4859 5.0625 15.1875 5.0625Z" fill="white" />
                        </svg>
                        <div id="txt">Species</div>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" ref={svgRef3}>
                        <path d="M12.773 9.39798L7.14798 15.023C7.09571 15.0752 7.03367 15.1167 6.96539 15.145C6.8971 15.1733 6.82392 15.1878 6.75001 15.1878C6.6761 15.1878 6.60291 15.1733 6.53463 15.145C6.46634 15.1167 6.4043 15.0752 6.35204 15.023C6.29978 14.9707 6.25832 14.9087 6.23004 14.8404C6.20175 14.7721 6.18719 14.6989 6.18719 14.625C6.18719 14.5511 6.20175 14.4779 6.23004 14.4096C6.25832 14.3413 6.29978 14.2793 6.35204 14.227L11.5798 9.00001L6.35204 3.77298C6.24649 3.66743 6.18719 3.52427 6.18719 3.37501C6.18719 3.22574 6.24649 3.08259 6.35204 2.97704C6.45759 2.87149 6.60074 2.81219 6.75001 2.81219C6.89927 2.81219 7.04243 2.87149 7.14798 2.97704L12.773 8.60204C12.8253 8.65428 12.8668 8.71632 12.8951 8.7846C12.9234 8.85289 12.9379 8.92609 12.9379 9.00001C12.9379 9.07393 12.9234 9.14713 12.8951 9.21541C12.8668 9.2837 12.8253 9.34574 12.773 9.39798Z" fill="white" />
                    </svg>
                </li>
                <li className={selectedItem === 4 ? 'clicked' : ''} onClick={() => handleItemClick(4)}>
                    <div class="options">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" class="folder">
                            <path d="M15.1875 5.0625H9.18773L7.23656 3.6C7.04221 3.45424 6.8059 3.3753 6.56297 3.375H2.8125C2.51413 3.375 2.22798 3.49353 2.017 3.7045C1.80603 3.91548 1.6875 4.20163 1.6875 4.5V14.0625C1.6875 14.3609 1.80603 14.647 2.017 14.858C2.22798 15.069 2.51413 15.1875 2.8125 15.1875H15.2501C15.5317 15.1871 15.8018 15.0751 16.0009 14.8759C16.2001 14.6768 16.3121 14.4067 16.3125 14.1251V6.1875C16.3125 5.88913 16.194 5.60298 15.983 5.392C15.772 5.18103 15.4859 5.0625 15.1875 5.0625Z" fill="white" />
                        </svg>
                        <div id="txt">Starships</div>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" ref={svgRef4}>
                        <path d="M12.773 9.39798L7.14798 15.023C7.09571 15.0752 7.03367 15.1167 6.96539 15.145C6.8971 15.1733 6.82392 15.1878 6.75001 15.1878C6.6761 15.1878 6.60291 15.1733 6.53463 15.145C6.46634 15.1167 6.4043 15.0752 6.35204 15.023C6.29978 14.9707 6.25832 14.9087 6.23004 14.8404C6.20175 14.7721 6.18719 14.6989 6.18719 14.625C6.18719 14.5511 6.20175 14.4779 6.23004 14.4096C6.25832 14.3413 6.29978 14.2793 6.35204 14.227L11.5798 9.00001L6.35204 3.77298C6.24649 3.66743 6.18719 3.52427 6.18719 3.37501C6.18719 3.22574 6.24649 3.08259 6.35204 2.97704C6.45759 2.87149 6.60074 2.81219 6.75001 2.81219C6.89927 2.81219 7.04243 2.87149 7.14798 2.97704L12.773 8.60204C12.8253 8.65428 12.8668 8.71632 12.8951 8.7846C12.9234 8.85289 12.9379 8.92609 12.9379 9.00001C12.9379 9.07393 12.9234 9.14713 12.8951 9.21541C12.8668 9.2837 12.8253 9.34574 12.773 9.39798Z" fill="white" />
                    </svg>
                </li>
                <li className={selectedItem === 5 ? 'clicked' : ''} onClick={() => handleItemClick(5)}>
                    <div class="options">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" class="folder">
                            <path d="M15.1875 5.0625H9.18773L7.23656 3.6C7.04221 3.45424 6.8059 3.3753 6.56297 3.375H2.8125C2.51413 3.375 2.22798 3.49353 2.017 3.7045C1.80603 3.91548 1.6875 4.20163 1.6875 4.5V14.0625C1.6875 14.3609 1.80603 14.647 2.017 14.858C2.22798 15.069 2.51413 15.1875 2.8125 15.1875H15.2501C15.5317 15.1871 15.8018 15.0751 16.0009 14.8759C16.2001 14.6768 16.3121 14.4067 16.3125 14.1251V6.1875C16.3125 5.88913 16.194 5.60298 15.983 5.392C15.772 5.18103 15.4859 5.0625 15.1875 5.0625Z" fill="white" />
                        </svg>
                        <div id="txt">Vehicles</div>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" ref={svgRef5}>
                        <path d="M12.773 9.39798L7.14798 15.023C7.09571 15.0752 7.03367 15.1167 6.96539 15.145C6.8971 15.1733 6.82392 15.1878 6.75001 15.1878C6.6761 15.1878 6.60291 15.1733 6.53463 15.145C6.46634 15.1167 6.4043 15.0752 6.35204 15.023C6.29978 14.9707 6.25832 14.9087 6.23004 14.8404C6.20175 14.7721 6.18719 14.6989 6.18719 14.625C6.18719 14.5511 6.20175 14.4779 6.23004 14.4096C6.25832 14.3413 6.29978 14.2793 6.35204 14.227L11.5798 9.00001L6.35204 3.77298C6.24649 3.66743 6.18719 3.52427 6.18719 3.37501C6.18719 3.22574 6.24649 3.08259 6.35204 2.97704C6.45759 2.87149 6.60074 2.81219 6.75001 2.81219C6.89927 2.81219 7.04243 2.87149 7.14798 2.97704L12.773 8.60204C12.8253 8.65428 12.8668 8.71632 12.8951 8.7846C12.9234 8.85289 12.9379 8.92609 12.9379 9.00001C12.9379 9.07393 12.9234 9.14713 12.8951 9.21541C12.8668 9.2837 12.8253 9.34574 12.773 9.39798Z" fill="white" />
                    </svg>
                </li>
            </ul>
        </div>
    )
}

export default LeftMenu;