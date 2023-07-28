import React from 'react'
import Header from "./header.jsx";
import LeftMenu from './leftMenu.jsx';
import RightMenu from './rightMenu.jsx';
import "./dashboard.css";
import { useState } from 'react';

function Dashboard() {
  const [State,setState]=useState("");
  return (
    <div>
      <Header State={State}/>
      <div id="menues">
        <LeftMenu setState={setState}/>
        {/* {State} */}
        <RightMenu State={State}/>
      </div>
    </div>
  )
}

export default Dashboard;