import React from 'react'
import logo from "./Resources/logo.png";
import "./header.css";

function Header(props) {
    var isvissible = false;
    if(props.State==="")
    {
        isvissible = false;
        return (
            <div id="Header">
                <img src={logo} alt="header" id="logo" />
                {isvissible && <div id="search-box">
                    <i class="fas fa-search" id="mag"></i>
                    <input type="text" placeholder="Search" id="search"></input>
                </div>}
            </div>
        )
    }
    else {
        isvissible = true;
        console.log(props.State);
        return (
            <div id="Header">
                <img src={logo} alt="header" id="logo" />
                {isvissible && <div id="search-box">
                    <i class="fas fa-search" id="mag"></i>
                    <input type="text" placeholder="Search" id="search"></input>
                </div>}
            </div>
        )
    }
}

export default Header;