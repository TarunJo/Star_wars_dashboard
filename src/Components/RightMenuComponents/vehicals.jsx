import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import "./Generals/general.css";
import MoreMenu from './Generals/moreMenu';
import Delete from './Generals/delete';

function Vehicles(props) {
  // Delete option working
  const [deleteMenu1, setDeleteMenu1] = useState(false);
  const [deleteMenu2, setDeleteMenu2] = useState(false);
  const [whichDelete, setWhichDelete] = useState(0);

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

  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    function handleClickOutside(event) {
      // console.log(event.target.className.baseVal);
      if(!isNaN(parseInt(event.target.id))) {
        setWhichDelete(parseInt(event.target.id));
      }
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
        const response = await axios.get('https://swapi.dev/api/vehicles/');
        setVehicles(response.data.results);
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
            vehicles.map((dat, ind) =>
              <div class="main-container">
                <div className={"" + ind}>
                  <img src={"https://picsum.photos/400/400?random=" + (ind + 207) * 10} alt="Error" class="img-container"></img>
                </div>
                <div class="desc-container">
                  <div class="name-container">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" class="name-svg">
                      <g clip-path="url(#clip0_14_1647)">
                        <path d="M30.3796 13.5501H26.7934L21.3796 8.13631C21.1946 7.94978 20.9743 7.8019 20.7316 7.70126C20.4889 7.60062 20.2286 7.54922 19.9659 7.55006H5.91464C5.58613 7.55067 5.26283 7.63219 4.97331 7.78741C4.68379 7.94264 4.43696 8.16679 4.25464 8.44006L0.547139 13.9951C0.438204 14.1597 0.379965 14.3527 0.379639 14.5501L0.379639 20.5501C0.379639 21.0805 0.590352 21.5892 0.965425 21.9643C1.3405 22.3393 1.84921 22.5501 2.37964 22.5501H4.50464C4.72494 23.4105 5.22534 24.1731 5.92695 24.7177C6.62856 25.2623 7.49147 25.5579 8.37964 25.5579C9.26781 25.5579 10.1307 25.2623 10.8323 24.7177C11.5339 24.1731 12.0343 23.4105 12.2546 22.5501H20.5046C20.7249 23.4105 21.2253 24.1731 21.9269 24.7177C22.6286 25.2623 23.4915 25.5579 24.3796 25.5579C25.2678 25.5579 26.1307 25.2623 26.8323 24.7177C27.5339 24.1731 28.0343 23.4105 28.2546 22.5501H30.3796C30.9101 22.5501 31.4188 22.3393 31.7939 21.9643C32.1689 21.5892 32.3796 21.0805 32.3796 20.5501V15.5501C32.3796 15.0196 32.1689 14.5109 31.7939 14.1358C31.4188 13.7608 30.9101 13.5501 30.3796 13.5501ZM5.91464 9.55006H19.9659L23.9659 13.5501H3.25464L5.91464 9.55006ZM8.37964 23.5501C7.98408 23.5501 7.5974 23.4328 7.2685 23.213C6.9396 22.9932 6.68325 22.6809 6.53188 22.3154C6.3805 21.95 6.3409 21.5478 6.41807 21.1599C6.49524 20.7719 6.68572 20.4156 6.96543 20.1358C7.24513 19.8561 7.6015 19.6657 7.98946 19.5885C8.37742 19.5113 8.77955 19.5509 9.14501 19.7023C9.51046 19.8537 9.82281 20.11 10.0426 20.4389C10.2623 20.7678 10.3796 21.1545 10.3796 21.5501C10.3796 22.0805 10.1689 22.5892 9.79385 22.9643C9.41878 23.3393 8.91007 23.5501 8.37964 23.5501ZM24.3796 23.5501C23.9841 23.5501 23.5974 23.4328 23.2685 23.213C22.9396 22.9932 22.6833 22.6809 22.5319 22.3154C22.3805 21.95 22.3409 21.5478 22.4181 21.1599C22.4952 20.7719 22.6857 20.4156 22.9654 20.1358C23.2451 19.8561 23.6015 19.6657 23.9895 19.5885C24.3774 19.5113 24.7796 19.5509 25.145 19.7023C25.5105 19.8537 25.8228 20.11 26.0426 20.4389C26.2623 20.7678 26.3796 21.1545 26.3796 21.5501C26.3796 22.0805 26.1689 22.5892 25.7939 22.9643C25.4188 23.3393 24.9101 23.5501 24.3796 23.5501ZM30.3796 20.5501H28.2546C28.0343 19.6896 27.5339 18.927 26.8323 18.3824C26.1307 17.8378 25.2678 17.5422 24.3796 17.5422C23.4915 17.5422 22.6286 17.8378 21.9269 18.3824C21.2253 18.927 20.7249 19.6896 20.5046 20.5501H12.2546C12.0343 19.6896 11.5339 18.927 10.8323 18.3824C10.1307 17.8378 9.26781 17.5422 8.37964 17.5422C7.49147 17.5422 6.62856 17.8378 5.92695 18.3824C5.22534 18.927 4.72494 19.6896 4.50464 20.5501H2.37964V15.5501H30.3796V20.5501Z" fill="white" />
                      </g>
                      <defs>
                        <clipPath id="clip0_14_1647">
                          <rect width="32" height="32" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <div class="data-td">{dat.name}</div>
                  </div>
                  <div class="about-more" onClick={handleContextMenu}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none" className="more-option-svg" id={ind}>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M12.3333 17C11.2287 17 10.3333 17.8954 10.3333 19C10.3333 20.1046 11.2287 21 12.3333 21C13.4378 21 14.3333 20.1046 14.3333 19C14.3333 17.8954 13.4378 17 12.3333 17Z" fill="white" />
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M12.3333 10C11.2287 10 10.3333 10.8954 10.3333 12C10.3333 13.1046 11.2287 14 12.3333 14C13.4378 14 14.3333 13.1046 14.3333 12C14.3333 10.8954 13.4378 10 12.3333 10Z" fill="white" />
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M12.3333 3C11.2287 3 10.3333 3.89543 10.3333 5C10.3333 6.10457 11.2287 7 12.3333 7C13.4378 7 14.3333 6.10457 14.3333 5C14.3333 3.89543 13.4378 3 12.3333 3Z" fill="white" />
                    </svg>
                    {menuVisible && (
                      <MoreMenu menuPosition={menuPosition} setDeleteMenu={setDeleteMenu1} onClick={handleContextMenu}></MoreMenu>
                    )}
                    {
                      deleteMenu1 && <Delete deleteMenu={setDeleteMenu1} data={vehicles} index={whichDelete}></Delete>
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
              <th>Model</th>
              <th>Top Speed</th>
              <th id="th-last"> </th>
            </tr>
          </thead>
          <tbody>
            {
              vehicles.map((dat, ind) =>
                <tr class={ind === 0 ? "" : "data-tr"}>
                  <td class="data-td-svg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" class="table-svg">
                      <g clip-path="url(#clip0_14_1647)">
                        <path d="M30.3796 13.5501H26.7934L21.3796 8.13631C21.1946 7.94978 20.9743 7.8019 20.7316 7.70126C20.4889 7.60062 20.2286 7.54922 19.9659 7.55006H5.91464C5.58613 7.55067 5.26283 7.63219 4.97331 7.78741C4.68379 7.94264 4.43696 8.16679 4.25464 8.44006L0.547139 13.9951C0.438204 14.1597 0.379965 14.3527 0.379639 14.5501L0.379639 20.5501C0.379639 21.0805 0.590352 21.5892 0.965425 21.9643C1.3405 22.3393 1.84921 22.5501 2.37964 22.5501H4.50464C4.72494 23.4105 5.22534 24.1731 5.92695 24.7177C6.62856 25.2623 7.49147 25.5579 8.37964 25.5579C9.26781 25.5579 10.1307 25.2623 10.8323 24.7177C11.5339 24.1731 12.0343 23.4105 12.2546 22.5501H20.5046C20.7249 23.4105 21.2253 24.1731 21.9269 24.7177C22.6286 25.2623 23.4915 25.5579 24.3796 25.5579C25.2678 25.5579 26.1307 25.2623 26.8323 24.7177C27.5339 24.1731 28.0343 23.4105 28.2546 22.5501H30.3796C30.9101 22.5501 31.4188 22.3393 31.7939 21.9643C32.1689 21.5892 32.3796 21.0805 32.3796 20.5501V15.5501C32.3796 15.0196 32.1689 14.5109 31.7939 14.1358C31.4188 13.7608 30.9101 13.5501 30.3796 13.5501ZM5.91464 9.55006H19.9659L23.9659 13.5501H3.25464L5.91464 9.55006ZM8.37964 23.5501C7.98408 23.5501 7.5974 23.4328 7.2685 23.213C6.9396 22.9932 6.68325 22.6809 6.53188 22.3154C6.3805 21.95 6.3409 21.5478 6.41807 21.1599C6.49524 20.7719 6.68572 20.4156 6.96543 20.1358C7.24513 19.8561 7.6015 19.6657 7.98946 19.5885C8.37742 19.5113 8.77955 19.5509 9.14501 19.7023C9.51046 19.8537 9.82281 20.11 10.0426 20.4389C10.2623 20.7678 10.3796 21.1545 10.3796 21.5501C10.3796 22.0805 10.1689 22.5892 9.79385 22.9643C9.41878 23.3393 8.91007 23.5501 8.37964 23.5501ZM24.3796 23.5501C23.9841 23.5501 23.5974 23.4328 23.2685 23.213C22.9396 22.9932 22.6833 22.6809 22.5319 22.3154C22.3805 21.95 22.3409 21.5478 22.4181 21.1599C22.4952 20.7719 22.6857 20.4156 22.9654 20.1358C23.2451 19.8561 23.6015 19.6657 23.9895 19.5885C24.3774 19.5113 24.7796 19.5509 25.145 19.7023C25.5105 19.8537 25.8228 20.11 26.0426 20.4389C26.2623 20.7678 26.3796 21.1545 26.3796 21.5501C26.3796 22.0805 26.1689 22.5892 25.7939 22.9643C25.4188 23.3393 24.9101 23.5501 24.3796 23.5501ZM30.3796 20.5501H28.2546C28.0343 19.6896 27.5339 18.927 26.8323 18.3824C26.1307 17.8378 25.2678 17.5422 24.3796 17.5422C23.4915 17.5422 22.6286 17.8378 21.9269 18.3824C21.2253 18.927 20.7249 19.6896 20.5046 20.5501H12.2546C12.0343 19.6896 11.5339 18.927 10.8323 18.3824C10.1307 17.8378 9.26781 17.5422 8.37964 17.5422C7.49147 17.5422 6.62856 17.8378 5.92695 18.3824C5.22534 18.927 4.72494 19.6896 4.50464 20.5501H2.37964V15.5501H30.3796V20.5501Z" fill="white" />
                      </g>
                      <defs>
                        <clipPath id="clip0_14_1647">
                          <rect width="32" height="32" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>


                    <div>{dat.name}</div></td>
                  <td class="data-td">{dat.model}</td>
                  <td class="data-td">{dat.max_atmosphering_speed}</td>
                  <td class="data-td">
                    <div class="table-more" onClick={handleContextMenu}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="more-option-svg" id={ind}>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 17C10.8954 17 10 17.8954 10 19C10 20.1046 10.8954 21 12 21C13.1046 21 14 20.1046 14 19C14 17.8954 13.1046 17 12 17Z" fill="white" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10Z" fill="white" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3C10.8954 3 10 3.89543 10 5C10 6.10457 10.8954 7 12 7C13.1046 7 14 6.10457 14 5C14 3.89543 13.1046 3 12 3Z" fill="white" />
                      </svg>
                      {menuVisible && (
                        <MoreMenu menuPosition={menuPosition} setDeleteMenu={setDeleteMenu2}></MoreMenu>
                      )}
                      {
                        deleteMenu2 && <Delete deleteMenu={setDeleteMenu2} data={vehicles} index={whichDelete}></Delete>
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

export default Vehicles;