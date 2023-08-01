import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import "./Generals/general.css";
import MoreMenu from './Generals/moreMenu';
import Delete from './Generals/delete';

function Planet(props) {
  // Delete option working
  const [deleteMenu1, setDeleteMenu1] = useState(false);
  const [deleteMenu2, setDeleteMenu2] = useState(false);

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

  const [planet, setPlanet] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    function handleClickOutside(event) {
      // console.log(event.target.className.baseVal);
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
        const response = await axios.get('https://swapi.dev/api/planets/');
        setPlanet(response.data.results);
        
        // console.log(planet);
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
            planet.map((dat, ind) =>
              <div class="main-container">
                <div className={"" + ind}>
                  <img src={"https://picsum.photos/400/400?random=" + (ind + 99) * 10} alt="Error" class="img-container"></img>
                </div>
                <div class="desc-container">
                  <div class="name-container">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" class="name-svg">
                      <path d="M31.0184 7.13505C30.0621 5.4863 27.5384 5.11505 23.7059 6.05255C21.9316 4.6806 19.808 3.83377 17.5765 3.60826C15.3451 3.38275 13.095 3.78759 11.0821 4.7768C9.06919 5.76602 7.37404 7.29994 6.18925 9.20432C5.00445 11.1087 4.3775 13.3072 4.37961 15.5501C4.37977 16.0645 4.41233 16.5784 4.47711 17.0888C1.01586 20.6751 1.06586 22.8001 1.74211 23.9651C2.37961 25.0701 3.70961 25.5501 5.45961 25.5501C6.67464 25.5249 7.8825 25.3571 9.05836 25.0501C10.8329 26.4207 12.9561 27.2663 15.1871 27.4909C17.418 27.7156 19.6672 27.3102 21.6793 26.3208C23.6915 25.3315 25.3859 23.7978 26.5703 21.8939C27.7546 19.9901 28.3815 17.7923 28.3796 15.5501C28.3799 15.0381 28.3477 14.5267 28.2834 14.0188C29.8459 12.3938 30.8859 10.8501 31.2396 9.5288C31.4834 8.6138 31.4096 7.8088 31.0184 7.13505ZM16.3796 5.55005C18.6445 5.55238 20.8418 6.32247 22.6126 7.73459C24.3834 9.14671 25.6232 11.1174 26.1296 13.3251C23.9971 15.3326 21.1109 17.3913 18.3709 18.9663C14.9271 20.9426 11.9396 22.1751 9.55711 22.8501C8.0897 21.4815 7.06832 19.7028 6.62594 17.7456C6.18356 15.7884 6.34067 13.7433 7.07681 11.8766C7.81296 10.01 9.09404 8.40817 10.7533 7.27977C12.4125 6.15137 14.373 5.54864 16.3796 5.55005ZM3.47211 22.9613C3.28961 22.6476 3.39086 22.0563 3.74961 21.3363C4.10437 20.6617 4.53599 20.0304 5.03586 19.4551C5.53136 20.8907 6.29488 22.2192 7.28586 23.3701C5.12961 23.7326 3.78461 23.5013 3.47211 22.9613ZM16.3796 25.5501C14.6935 25.5518 13.0348 25.1242 11.5596 24.3076C14.2672 23.35 16.8798 22.1422 19.3634 20.7001C22.0609 19.1513 24.4484 17.4726 26.3721 15.8151C26.3009 18.419 25.2172 20.8926 23.3514 22.7103C21.4855 24.5281 18.9845 25.5468 16.3796 25.5501ZM29.3071 9.0113C29.0946 9.80005 28.5334 10.7026 27.7284 11.6526C27.2342 10.2152 26.4705 8.88523 25.4784 7.7338C27.2546 7.44005 28.8996 7.46255 29.2909 8.1388C29.4034 8.33505 29.4096 8.6288 29.3071 9.0113Z" fill="white" />
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
                      <MoreMenu menuPosition={menuPosition} setDeleteMenu={setDeleteMenu1} onClick={handleContextMenu}></MoreMenu>
                    )}
                    {
                      deleteMenu1 && <Delete deleteMenu={setDeleteMenu1}></Delete>
                    }

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
              <th>Climate</th>
              <th>Gravity</th>
              <th id="th-last"> </th>
            </tr>
          </thead>
          <tbody>
            {
              planet.map((dat, ind) =>
                <tr class={ind === 0 ? "" : "data-tr"}>
                  <td class="data-td-svg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" class="table-svg">
                      <path d="M31.0184 7.13505C30.0621 5.4863 27.5384 5.11505 23.7059 6.05255C21.9316 4.6806 19.808 3.83377 17.5765 3.60826C15.3451 3.38275 13.095 3.78759 11.0821 4.7768C9.06919 5.76602 7.37404 7.29994 6.18925 9.20432C5.00445 11.1087 4.3775 13.3072 4.37961 15.5501C4.37977 16.0645 4.41233 16.5784 4.47711 17.0888C1.01586 20.6751 1.06586 22.8001 1.74211 23.9651C2.37961 25.0701 3.70961 25.5501 5.45961 25.5501C6.67464 25.5249 7.8825 25.3571 9.05836 25.0501C10.8329 26.4207 12.9561 27.2663 15.1871 27.4909C17.418 27.7156 19.6672 27.3102 21.6793 26.3208C23.6915 25.3315 25.3859 23.7978 26.5703 21.8939C27.7546 19.9901 28.3815 17.7923 28.3796 15.5501C28.3799 15.0381 28.3477 14.5267 28.2834 14.0188C29.8459 12.3938 30.8859 10.8501 31.2396 9.5288C31.4834 8.6138 31.4096 7.8088 31.0184 7.13505ZM16.3796 5.55005C18.6445 5.55238 20.8418 6.32247 22.6126 7.73459C24.3834 9.14671 25.6232 11.1174 26.1296 13.3251C23.9971 15.3326 21.1109 17.3913 18.3709 18.9663C14.9271 20.9426 11.9396 22.1751 9.55711 22.8501C8.0897 21.4815 7.06832 19.7028 6.62594 17.7456C6.18356 15.7884 6.34067 13.7433 7.07681 11.8766C7.81296 10.01 9.09404 8.40817 10.7533 7.27977C12.4125 6.15137 14.373 5.54864 16.3796 5.55005ZM3.47211 22.9613C3.28961 22.6476 3.39086 22.0563 3.74961 21.3363C4.10437 20.6617 4.53599 20.0304 5.03586 19.4551C5.53136 20.8907 6.29488 22.2192 7.28586 23.3701C5.12961 23.7326 3.78461 23.5013 3.47211 22.9613ZM16.3796 25.5501C14.6935 25.5518 13.0348 25.1242 11.5596 24.3076C14.2672 23.35 16.8798 22.1422 19.3634 20.7001C22.0609 19.1513 24.4484 17.4726 26.3721 15.8151C26.3009 18.419 25.2172 20.8926 23.3514 22.7103C21.4855 24.5281 18.9845 25.5468 16.3796 25.5501ZM29.3071 9.0113C29.0946 9.80005 28.5334 10.7026 27.7284 11.6526C27.2342 10.2152 26.4705 8.88523 25.4784 7.7338C27.2546 7.44005 28.8996 7.46255 29.2909 8.1388C29.4034 8.33505 29.4096 8.6288 29.3071 9.0113Z" fill="white" />
                    </svg>

                    <div>{dat.name}</div></td>
                  <td class="data-td">{dat.climate}</td>
                  <td class="data-td">{dat.gravity}</td>
                  <td class="data-td">
                    <div class="table-more" onClick={handleContextMenu}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="more-option-svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 17C10.8954 17 10 17.8954 10 19C10 20.1046 10.8954 21 12 21C13.1046 21 14 20.1046 14 19C14 17.8954 13.1046 17 12 17Z" fill="white" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10Z" fill="white" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3C10.8954 3 10 3.89543 10 5C10 6.10457 10.8954 7 12 7C13.1046 7 14 6.10457 14 5C14 3.89543 13.1046 3 12 3Z" fill="white" />
                      </svg>
                      {menuVisible && (
                        <MoreMenu menuPosition={menuPosition} setDeleteMenu={setDeleteMenu2}></MoreMenu>
                      )}
                      {
                        deleteMenu2 && <Delete deleteMenu={setDeleteMenu2}></Delete>
                      }
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

export default Planet;