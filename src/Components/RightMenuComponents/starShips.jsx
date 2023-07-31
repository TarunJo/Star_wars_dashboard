import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import "./Generals/general.css";
import MoreMenu from './Generals/moreMenu';


function StarShips(props) {
  // more menu options
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const handleContextMenu = (event) => {
    event.preventDefault();
    // console.log("CLicked");
    setMenuVisible(true);
    // console.log(menuVisible);
    if (props.toggler1 === 0)
      setMenuPosition({ x: event.clientX + 20, y: event.clientY - 230 });
    else
      setMenuPosition({ x: event.clientX - 200, y: event.clientY - 200 })
  };

  const [starShips, setStarShips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    function handleClickOutside(event) {
      console.log(event.target.className.baseVal);
      if (event.target.className.baseVal !== "more-option-svg") {
        setMenuVisible(false);
      }
    }

    function handleScroll(event) {
      setMenuVisible(false);
    }
    
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('https://swapi.dev/api/starships/');
        setStarShips(response.data.results);
        // console.log(starShips);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
      setMenuVisible(false);
    };

    fetchData();
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  if (isLoading === true) {
    // Loading view
    return (
      <div className="loader-container">
        <div className="spinner"></div>
      </div>

    );

  }
  else if (props.toggler1 === 0) {
    // Grid view
    return (
      <div id="gid-view">
        <div id="base-container">
          {
            starShips.map((dat, ind) =>
              <div class="main-container">
                <img src={"https://picsum.photos/400/400?random=" + (ind + 415) * 10} alt="Error" class="img-container"></img>
                <div class="desc-container">
                  <div class="name-container">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" class="name-svg">
                      <path d="M13.3509 22.7925C13.3021 22.9863 12.0834 27.55 5.37963 27.55C5.11441 27.55 4.86006 27.4447 4.67252 27.2571C4.48498 27.0696 4.37963 26.8153 4.37963 26.55C4.37963 19.8463 8.94338 18.6275 9.13713 18.5788C9.39455 18.5145 9.66698 18.5551 9.89449 18.6916C10.122 18.8282 10.2859 19.0495 10.3503 19.3069C10.4146 19.5643 10.374 19.8368 10.2374 20.0643C10.1009 20.2918 9.87955 20.4557 9.62213 20.52C9.50963 20.5513 6.81963 21.3375 6.42713 25.5025C10.5921 25.11 11.3796 22.425 11.4121 22.3C11.4784 22.0429 11.6441 21.8227 11.8728 21.6878C12.1015 21.5529 12.3744 21.5144 12.6315 21.5807C12.8886 21.647 13.1088 21.8127 13.2437 22.0414C13.3786 22.27 13.4172 22.5429 13.3509 22.8V22.7925ZM24.9759 14.3675L24.3796 14.9638V22.255C24.3811 22.5187 24.3302 22.78 24.2297 23.0238C24.1293 23.2676 23.9814 23.4889 23.7946 23.675L19.5046 27.9625C19.3196 28.1489 19.0996 28.2967 18.8571 28.3975C18.6147 28.4984 18.3547 28.5502 18.0921 28.55C17.8754 28.55 17.6602 28.5149 17.4546 28.4463C17.1017 28.3296 16.7885 28.1165 16.5504 27.8311C16.3123 27.5457 16.1587 27.1994 16.1071 26.8313L15.4359 22.02L9.90963 16.4938L5.10088 15.8225C4.7323 15.7708 4.38547 15.6173 4.09938 15.3793C3.8133 15.1412 3.59932 14.828 3.48151 14.475C3.36369 14.122 3.34673 13.7431 3.43252 13.3809C3.51831 13.0187 3.70346 12.6877 3.96713 12.425L8.25463 8.13504C8.44072 7.94827 8.6621 7.80036 8.90588 7.69993C9.14966 7.5995 9.41097 7.54855 9.67463 7.55004H16.9659L17.5621 6.95379C20.8971 3.62004 24.9159 3.47629 26.4884 3.57004C26.976 3.59967 27.4359 3.80672 27.7813 4.15214C28.1267 4.49756 28.3337 4.95744 28.3634 5.44504C28.4546 7.01379 28.3109 11.0325 24.9771 14.3675H24.9759ZM5.37963 13.8425L10.0234 14.49L14.9659 9.55004H9.67463L5.37963 13.8425ZM11.7946 15.55L16.3796 20.135L23.5609 12.9538C24.5287 11.9925 25.2795 10.8353 25.7629 9.55974C26.2462 8.28422 26.451 6.92001 26.3634 5.55879C25.0029 5.47442 23.64 5.68132 22.3658 6.16568C21.0917 6.65004 19.9355 7.40071 18.9746 8.36754L11.7946 15.55ZM22.3796 16.9638L17.4384 21.905L18.0884 26.55L22.3796 22.255V16.9638Z" fill="white" />
                    </svg>
                    <div class="data-td">{dat.name}</div>
                  </div>
                  <div class="about-more" onClick={handleContextMenu}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none" className="more-option-svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M12.3333 17C11.2287 17 10.3333 17.8954 10.3333 19C10.3333 20.1046 11.2287 21 12.3333 21C13.4378 21 14.3333 20.1046 14.3333 19C14.3333 17.8954 13.4378 17 12.3333 17Z" fill="white" />
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M12.3333 10C11.2287 10 10.3333 10.8954 10.3333 12C10.3333 13.1046 11.2287 14 12.3333 14C13.4378 14 14.3333 13.1046 14.3333 12C14.3333 10.8954 13.4378 10 12.3333 10Z" fill="white" />
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M12.3333 3C11.2287 3 10.3333 3.89543 10.3333 5C10.3333 6.10457 11.2287 7 12.3333 7C13.4378 7 14.3333 6.10457 14.3333 5C14.3333 3.89543 13.4378 3 12.3333 3Z" fill="white" />
                    </svg>
                    {menuVisible && (
                      <MoreMenu menuPosition={menuPosition}></MoreMenu>
                    )}

                  </div>
                </div>
              </div>
            )
          }
        </div>
      </div>
    )
  }
  else {
    // List view
    return (
      <div>
        <table id="my-table">
          <thead>
            <tr id="heading-tr">
              <th>Name</th>
              <th>Model</th>
              <th>Hyperdirve Rating</th>
              <th id="th-last"> </th>
            </tr>
          </thead>
          <tbody>
            {
              starShips.map((dat, ind) =>
                <tr class={ind === 0 ? "" : "data-tr"}>
                  <td class="data-td-svg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" class="table-svg">
                      <path d="M13.3509 22.7925C13.3021 22.9863 12.0834 27.55 5.37963 27.55C5.11441 27.55 4.86006 27.4447 4.67252 27.2571C4.48498 27.0696 4.37963 26.8153 4.37963 26.55C4.37963 19.8463 8.94338 18.6275 9.13713 18.5788C9.39455 18.5145 9.66698 18.5551 9.89449 18.6916C10.122 18.8282 10.2859 19.0495 10.3503 19.3069C10.4146 19.5643 10.374 19.8368 10.2374 20.0643C10.1009 20.2918 9.87955 20.4557 9.62213 20.52C9.50963 20.5513 6.81963 21.3375 6.42713 25.5025C10.5921 25.11 11.3796 22.425 11.4121 22.3C11.4784 22.0429 11.6441 21.8227 11.8728 21.6878C12.1015 21.5529 12.3744 21.5144 12.6315 21.5807C12.8886 21.647 13.1088 21.8127 13.2437 22.0414C13.3786 22.27 13.4172 22.5429 13.3509 22.8V22.7925ZM24.9759 14.3675L24.3796 14.9638V22.255C24.3811 22.5187 24.3302 22.78 24.2297 23.0238C24.1293 23.2676 23.9814 23.4889 23.7946 23.675L19.5046 27.9625C19.3196 28.1489 19.0996 28.2967 18.8571 28.3975C18.6147 28.4984 18.3547 28.5502 18.0921 28.55C17.8754 28.55 17.6602 28.5149 17.4546 28.4463C17.1017 28.3296 16.7885 28.1165 16.5504 27.8311C16.3123 27.5457 16.1587 27.1994 16.1071 26.8313L15.4359 22.02L9.90963 16.4938L5.10088 15.8225C4.7323 15.7708 4.38547 15.6173 4.09938 15.3793C3.8133 15.1412 3.59932 14.828 3.48151 14.475C3.36369 14.122 3.34673 13.7431 3.43252 13.3809C3.51831 13.0187 3.70346 12.6877 3.96713 12.425L8.25463 8.13504C8.44072 7.94827 8.6621 7.80036 8.90588 7.69993C9.14966 7.5995 9.41097 7.54855 9.67463 7.55004H16.9659L17.5621 6.95379C20.8971 3.62004 24.9159 3.47629 26.4884 3.57004C26.976 3.59967 27.4359 3.80672 27.7813 4.15214C28.1267 4.49756 28.3337 4.95744 28.3634 5.44504C28.4546 7.01379 28.3109 11.0325 24.9771 14.3675H24.9759ZM5.37963 13.8425L10.0234 14.49L14.9659 9.55004H9.67463L5.37963 13.8425ZM11.7946 15.55L16.3796 20.135L23.5609 12.9538C24.5287 11.9925 25.2795 10.8353 25.7629 9.55974C26.2462 8.28422 26.451 6.92001 26.3634 5.55879C25.0029 5.47442 23.64 5.68132 22.3658 6.16568C21.0917 6.65004 19.9355 7.40071 18.9746 8.36754L11.7946 15.55ZM22.3796 16.9638L17.4384 21.905L18.0884 26.55L22.3796 22.255V16.9638Z" fill="white" />
                    </svg>


                    <div>{dat.name}</div></td>
                  <td class="data-td">{dat.model}</td>
                  <td class="data-td">{dat.hyperdrive_rating}</td>
                  <td class="data-td">
                    <div class="table-more" onClick={handleContextMenu}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="more-option-svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 17C10.8954 17 10 17.8954 10 19C10 20.1046 10.8954 21 12 21C13.1046 21 14 20.1046 14 19C14 17.8954 13.1046 17 12 17Z" fill="white" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10Z" fill="white" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3C10.8954 3 10 3.89543 10 5C10 6.10457 10.8954 7 12 7C13.1046 7 14 6.10457 14 5C14 3.89543 13.1046 3 12 3Z" fill="white" />
                      </svg>
                      {menuVisible && (
                        <MoreMenu menuPosition={menuPosition}></MoreMenu>
                      )}
                    </div>
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    )
  }
}

export default StarShips;