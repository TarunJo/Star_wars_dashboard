import React from 'react'
import "./defaultComp.css";
import dashBoardImg from "../Resources/dashboard.png";

function DefaultComp() { 
  return (
    <div id="default-comp">
      <div class="frame">
        <div class="container">
          <img src={dashBoardImg} alt="dashboard" id="dash-board-image"></img>
          <h1 id="main-heading">
            Welcome to Star Wars <br></br>
            Dashboard
          </h1>
          <h2 id="sub-heading">
            Star Wars is an American epic space opera multimedia franchise created by George Lucas, which<br></br> began with the eponymous 1977 film and quickly became a worldwide pop culture phenomenon.
          </h2>
        </div>
      </div>
    </div>
  )
}

export default DefaultComp;