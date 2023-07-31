import React from 'react';
import "./general.css";
import { useState } from 'react';

function Delete(props) {
    const [clickedYesNo, setClickedYesNo] = useState(true);
    function handleYesNo() {
        setClickedYesNo(false);
        console.log(clickedYesNo);
        props.deleteMenu(false);
    }
    return (
        <div id="popup-delete">
            <div id="main-delete">
                <div id="detail-delete">
                    <div id="symbol-container">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#FC5A5A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>

                    <div id="delete-caution">
                        Caution!
                    </div>
                    <div id="delete-caution-detail">
                        Are you sure you want to Delete <span id="delete-caution-detail-name">props.name</span>
                    </div>
                </div>
                <div id="delete-option-buttons">
                    <button id="delete-cancel-button" onClick={handleYesNo}><span id="delete-cancel-button-span">Cancel</span></button>
                    <button id="delete-yes-button" onClick={handleYesNo}><span id="delete-yes-button-span">Yes</span></button>
                </div>
            </div>
        </div>
    )
}

export default Delete;