import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

function SecondAPICall(props) {
    const [additional, setAdditional] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            console.log((props.data));
            if(props.data!==null && props.data.length!==0)
            {
                const response = await axios.get(props.data);
                setAdditional(response.data);
            }
            // console.log(additional);
        };
        fetchData();
    }, [props]);
    return (
        <div>
            {
                additional.length===0?<div>unknown</div>:<div>{additional.name}</div>
            }
        </div>
    )
}

export default SecondAPICall;