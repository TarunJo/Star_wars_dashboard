import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import "./Generals/general.css";
import MoreMenu from './Generals/moreMenu';
import Delete from './Generals/delete';
import SecondAPICall from './Generals/secondAPICall';

function Species(props) {
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

  const [species, setSpecies] = useState([]);
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
        const response = await axios.get('https://swapi.dev/api/species/');
        setSpecies(response.data.results);
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
            species.map((dat, ind) =>
              <div class="main-container">
                <div className={"" + ind}>
                  <img src={"https://picsum.photos/400/400?random=" + (ind + 175) * 10} alt="Error" class="img-container"></img>
                </div>
                <div class="desc-container">
                  <div class="name-container">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" class="name-svg">
                      <path d="M16.3796 1.55005C13.1982 1.55369 10.148 2.81914 7.89838 5.06879C5.64873 7.31844 4.38328 10.3686 4.37964 13.55C4.37964 16.55 5.94964 20.4325 8.58089 23.925C11.2284 27.4438 14.1434 29.55 16.3796 29.55C18.6159 29.55 21.5309 27.4488 24.1784 23.925C26.8096 20.425 28.3796 16.55 28.3796 13.55C28.376 10.3686 27.1105 7.31844 24.8609 5.06879C22.6113 2.81914 19.5611 1.55369 16.3796 1.55005ZM22.5809 22.7275C20.4096 25.6113 17.9184 27.55 16.3796 27.55C14.8409 27.55 12.3496 25.6113 10.1784 22.7275C7.83589 19.6125 6.37964 16.0963 6.37964 13.55C6.37964 10.8979 7.43321 8.35434 9.30857 6.47898C11.1839 4.60362 13.7275 3.55005 16.3796 3.55005C19.0318 3.55005 21.5753 4.60362 23.4507 6.47898C25.3261 8.35434 26.3796 10.8979 26.3796 13.55C26.3796 16.0963 24.9234 19.6125 22.5809 22.7275ZM15.3796 16.55C15.3796 15.224 14.8529 13.9522 13.9152 13.0145C12.9775 12.0768 11.7057 11.55 10.3796 11.55C9.84921 11.55 9.3405 11.7608 8.96543 12.1358C8.59035 12.5109 8.37964 13.0196 8.37964 13.55C8.37964 14.8761 8.90642 16.1479 9.8441 17.0856C10.7818 18.0233 12.0536 18.55 13.3796 18.55C13.9101 18.55 14.4188 18.3393 14.7939 17.9643C15.1689 17.5892 15.3796 17.0805 15.3796 16.55ZM10.3796 13.55C11.1753 13.55 11.9384 13.8661 12.501 14.4287C13.0636 14.9913 13.3796 15.7544 13.3796 16.55C12.584 16.55 11.8209 16.234 11.2583 15.6714C10.6957 15.1088 10.3796 14.3457 10.3796 13.55ZM22.3796 11.55C21.0536 11.55 19.7818 12.0768 18.8441 13.0145C17.9064 13.9522 17.3796 15.224 17.3796 16.55C17.3796 17.0805 17.5904 17.5892 17.9654 17.9643C18.3405 18.3393 18.8492 18.55 19.3796 18.55C20.0362 18.55 20.6864 18.4207 21.2931 18.1694C21.8997 17.9182 22.4509 17.5499 22.9152 17.0856C23.3795 16.6213 23.7478 16.0701 23.999 15.4635C24.2503 14.8568 24.3796 14.2067 24.3796 13.55C24.3796 13.0196 24.1689 12.5109 23.7939 12.1358C23.4188 11.7608 22.9101 11.55 22.3796 11.55ZM19.3796 16.55C19.3796 15.7544 19.6957 14.9913 20.2583 14.4287C20.8209 13.8661 21.584 13.55 22.3796 13.55C22.3796 14.3457 22.0636 15.1088 21.501 15.6714C20.9384 16.234 20.1753 16.55 19.3796 16.55ZM19.3796 22.55C19.3796 22.8153 19.2743 23.0696 19.0867 23.2572C18.8992 23.4447 18.6449 23.55 18.3796 23.55H14.3796C14.1144 23.55 13.8601 23.4447 13.6725 23.2572C13.485 23.0696 13.3796 22.8153 13.3796 22.55C13.3796 22.2848 13.485 22.0305 13.6725 21.8429C13.8601 21.6554 14.1144 21.55 14.3796 21.55H18.3796C18.6449 21.55 18.8992 21.6554 19.0867 21.8429C19.2743 22.0305 19.3796 22.2848 19.3796 22.55Z" fill="white" />
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
              <th>Home World</th>
              <th>Life Span</th>
              <th id="th-last"> </th>
            </tr>
          </thead>
          <tbody>
            {
              species.map((dat, ind) =>
                <tr class={ind === 0 ? "" : "data-tr"}>
                  <td class="data-td-svg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" class="table-svg">
                      <path d="M16.3796 1.55005C13.1982 1.55369 10.148 2.81914 7.89838 5.06879C5.64873 7.31844 4.38328 10.3686 4.37964 13.55C4.37964 16.55 5.94964 20.4325 8.58089 23.925C11.2284 27.4438 14.1434 29.55 16.3796 29.55C18.6159 29.55 21.5309 27.4488 24.1784 23.925C26.8096 20.425 28.3796 16.55 28.3796 13.55C28.376 10.3686 27.1105 7.31844 24.8609 5.06879C22.6113 2.81914 19.5611 1.55369 16.3796 1.55005ZM22.5809 22.7275C20.4096 25.6113 17.9184 27.55 16.3796 27.55C14.8409 27.55 12.3496 25.6113 10.1784 22.7275C7.83589 19.6125 6.37964 16.0963 6.37964 13.55C6.37964 10.8979 7.43321 8.35434 9.30857 6.47898C11.1839 4.60362 13.7275 3.55005 16.3796 3.55005C19.0318 3.55005 21.5753 4.60362 23.4507 6.47898C25.3261 8.35434 26.3796 10.8979 26.3796 13.55C26.3796 16.0963 24.9234 19.6125 22.5809 22.7275ZM15.3796 16.55C15.3796 15.224 14.8529 13.9522 13.9152 13.0145C12.9775 12.0768 11.7057 11.55 10.3796 11.55C9.84921 11.55 9.3405 11.7608 8.96543 12.1358C8.59035 12.5109 8.37964 13.0196 8.37964 13.55C8.37964 14.8761 8.90642 16.1479 9.8441 17.0856C10.7818 18.0233 12.0536 18.55 13.3796 18.55C13.9101 18.55 14.4188 18.3393 14.7939 17.9643C15.1689 17.5892 15.3796 17.0805 15.3796 16.55ZM10.3796 13.55C11.1753 13.55 11.9384 13.8661 12.501 14.4287C13.0636 14.9913 13.3796 15.7544 13.3796 16.55C12.584 16.55 11.8209 16.234 11.2583 15.6714C10.6957 15.1088 10.3796 14.3457 10.3796 13.55ZM22.3796 11.55C21.0536 11.55 19.7818 12.0768 18.8441 13.0145C17.9064 13.9522 17.3796 15.224 17.3796 16.55C17.3796 17.0805 17.5904 17.5892 17.9654 17.9643C18.3405 18.3393 18.8492 18.55 19.3796 18.55C20.0362 18.55 20.6864 18.4207 21.2931 18.1694C21.8997 17.9182 22.4509 17.5499 22.9152 17.0856C23.3795 16.6213 23.7478 16.0701 23.999 15.4635C24.2503 14.8568 24.3796 14.2067 24.3796 13.55C24.3796 13.0196 24.1689 12.5109 23.7939 12.1358C23.4188 11.7608 22.9101 11.55 22.3796 11.55ZM19.3796 16.55C19.3796 15.7544 19.6957 14.9913 20.2583 14.4287C20.8209 13.8661 21.584 13.55 22.3796 13.55C22.3796 14.3457 22.0636 15.1088 21.501 15.6714C20.9384 16.234 20.1753 16.55 19.3796 16.55ZM19.3796 22.55C19.3796 22.8153 19.2743 23.0696 19.0867 23.2572C18.8992 23.4447 18.6449 23.55 18.3796 23.55H14.3796C14.1144 23.55 13.8601 23.4447 13.6725 23.2572C13.485 23.0696 13.3796 22.8153 13.3796 22.55C13.3796 22.2848 13.485 22.0305 13.6725 21.8429C13.8601 21.6554 14.1144 21.55 14.3796 21.55H18.3796C18.6449 21.55 18.8992 21.6554 19.0867 21.8429C19.2743 22.0305 19.3796 22.2848 19.3796 22.55Z" fill="white" />
                    </svg>


                    <div>{dat.name}</div></td>
                  <td class="data-td"><SecondAPICall data={dat.homeworld}></SecondAPICall></td>
                  <td class="data-td">{dat.average_lifespan}</td>
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

export default Species;