import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import "./Generals/general.css";
import MoreMenu from './Generals/moreMenu';
import Delete from './Generals/delete';
import SecondAPICall from './Generals/secondAPICall';

function People(props) {
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

  const [people, setPeople] = useState([]);
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
        const response = await axios.get('https://swapi.dev/api/people/');
        setPeople(response.data.results);
        // console.log(people);
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
    // grid view
    return (
      <div id="gid-view">
        <div id="base-container">
          {
            people.map((dat, ind) =>
              <div class="main-container">
                <div className={"" + ind}>
                  <img src={"https://picsum.photos/400/400?random=" + (ind + 81) * 10} alt="Error" class="img-container"></img>
                </div>
                <div class="desc-container">
                  <div class="name-container">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="21" viewBox="0 0 32 21" fill="none" class="name-svg">
                      <path d="M15.0358 14.29C16.3761 13.3978 17.3936 12.0979 17.938 10.5826C18.4823 9.06732 18.5246 7.41708 18.0585 5.87592C17.5924 4.33476 16.6427 2.9845 15.3499 2.02483C14.057 1.06515 12.4897 0.546997 10.8796 0.546997C9.26948 0.546997 7.70213 1.06515 6.40929 2.02483C5.11646 2.9845 4.16678 4.33476 3.70069 5.87592C3.23461 7.41708 3.27686 9.06732 3.8212 10.5826C4.36554 12.0979 5.38308 13.3978 6.72333 14.29C4.29894 15.1836 2.22846 16.8371 0.820829 19.0038C0.746848 19.1137 0.695462 19.2373 0.669655 19.3673C0.643849 19.4973 0.644138 19.6311 0.670505 19.761C0.696873 19.8909 0.748792 20.0142 0.823247 20.1238C0.897701 20.2335 0.993205 20.3272 1.10421 20.3996C1.21521 20.472 1.33949 20.5216 1.46984 20.5456C1.60018 20.5695 1.73399 20.5673 1.86347 20.5391C1.99296 20.5109 2.11554 20.4572 2.2241 20.3812C2.33266 20.3052 2.42502 20.2083 2.49583 20.0963C3.40382 18.6998 4.64627 17.5522 6.11037 16.7578C7.57448 15.9633 9.21383 15.5472 10.8796 15.5472C12.5453 15.5472 14.1847 15.9633 15.6488 16.7578C17.1129 17.5522 18.3553 18.6998 19.2633 20.0963C19.41 20.3143 19.6366 20.4658 19.8941 20.5181C20.1515 20.5703 20.4193 20.5192 20.6393 20.3756C20.8594 20.2321 21.0141 20.0077 21.0701 19.751C21.126 19.4943 21.0787 19.2259 20.9383 19.0038C19.5307 16.8371 17.4602 15.1836 15.0358 14.29ZM5.37958 8.05004C5.37958 6.96224 5.70215 5.89887 6.3065 4.9944C6.91084 4.08993 7.76983 3.38499 8.77482 2.9687C9.77981 2.55242 10.8857 2.4435 11.9526 2.65572C13.0195 2.86794 13.9995 3.39176 14.7687 4.16095C15.5379 4.93014 16.0617 5.91015 16.2739 6.97704C16.4861 8.04394 16.3772 9.14981 15.9609 10.1548C15.5446 11.1598 14.8397 12.0188 13.9352 12.6231C13.0307 13.2275 11.9674 13.55 10.8796 13.55C9.4214 13.5484 8.02341 12.9684 6.99232 11.9373C5.96123 10.9062 5.38123 9.50822 5.37958 8.05004ZM31.6471 20.3875C31.425 20.5324 31.1544 20.5831 30.8949 20.5285C30.6354 20.4738 30.4082 20.3184 30.2633 20.0963C29.3564 18.6989 28.1141 17.5509 26.6497 16.7568C25.1853 15.9627 23.5454 15.5478 21.8796 15.55C21.6144 15.55 21.36 15.4447 21.1725 15.2571C20.9849 15.0696 20.8796 14.8153 20.8796 14.55C20.8796 14.2848 20.9849 14.0305 21.1725 13.8429C21.36 13.6554 21.6144 13.55 21.8796 13.55C22.6895 13.5493 23.4893 13.3696 24.2218 13.0239C24.9543 12.6782 25.6014 12.175 26.1169 11.5503C26.6323 10.9255 27.0034 10.1946 27.2037 9.40976C27.4039 8.62494 27.4283 7.80558 27.2752 7.01023C27.1221 6.21487 26.7952 5.46315 26.3178 4.80879C25.8405 4.15442 25.2246 3.61355 24.514 3.22483C23.8034 2.83611 23.0157 2.60914 22.2072 2.56012C21.3987 2.51111 20.5894 2.64126 19.8371 2.94129C19.7144 2.99432 19.5824 3.02222 19.4487 3.02335C19.3151 3.02448 19.1826 2.99881 19.059 2.94787C18.9355 2.89692 18.8234 2.82172 18.7294 2.72673C18.6354 2.63173 18.5614 2.51886 18.5118 2.39478C18.4622 2.2707 18.4379 2.13793 18.4405 2.00431C18.443 1.8707 18.4723 1.73895 18.5266 1.61686C18.581 1.49476 18.6592 1.38479 18.7568 1.29345C18.8543 1.2021 18.9692 1.13124 19.0946 1.08504C20.8164 0.398354 22.7315 0.373643 24.4705 1.01567C26.2095 1.6577 27.6491 2.92099 28.5116 4.56181C29.3741 6.20264 29.5984 8.10474 29.1412 9.90119C28.684 11.6976 27.5778 13.2611 26.0358 14.29C28.4602 15.1836 30.5307 16.8371 31.9383 19.0038C32.0832 19.2259 32.1339 19.4965 32.0792 19.756C32.0246 20.0155 31.8692 20.2426 31.6471 20.3875Z" fill="white" />
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
                      deleteMenu1 && <Delete name={dat.name} deleteMenu={setDeleteMenu1} data={people} index={whichDelete}></Delete>
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
              <th>BirthDate</th>
              <th>Species</th>
              <th id="th-last"> </th>
            </tr>
          </thead>
          <tbody>
            {
              people.map((dat, ind) =>
                <tr class={ind === 0 ? "" : "data-tr"}>
                  <td class="data-td-svg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="21" viewBox="0 0 32 21" fill="none" class="table-svg">
                      <path d="M15.0358 14.29C16.3761 13.3978 17.3936 12.0979 17.938 10.5826C18.4823 9.06732 18.5246 7.41708 18.0585 5.87592C17.5924 4.33476 16.6427 2.9845 15.3499 2.02483C14.057 1.06515 12.4897 0.546997 10.8796 0.546997C9.26948 0.546997 7.70213 1.06515 6.40929 2.02483C5.11646 2.9845 4.16678 4.33476 3.70069 5.87592C3.23461 7.41708 3.27686 9.06732 3.8212 10.5826C4.36554 12.0979 5.38308 13.3978 6.72333 14.29C4.29894 15.1836 2.22846 16.8371 0.820829 19.0038C0.746848 19.1137 0.695462 19.2373 0.669655 19.3673C0.643849 19.4973 0.644138 19.6311 0.670505 19.761C0.696873 19.8909 0.748792 20.0142 0.823247 20.1238C0.897701 20.2335 0.993205 20.3272 1.10421 20.3996C1.21521 20.472 1.33949 20.5216 1.46984 20.5456C1.60018 20.5695 1.73399 20.5673 1.86347 20.5391C1.99296 20.5109 2.11554 20.4572 2.2241 20.3812C2.33266 20.3052 2.42502 20.2083 2.49583 20.0963C3.40382 18.6998 4.64627 17.5522 6.11037 16.7578C7.57448 15.9633 9.21383 15.5472 10.8796 15.5472C12.5453 15.5472 14.1847 15.9633 15.6488 16.7578C17.1129 17.5522 18.3553 18.6998 19.2633 20.0963C19.41 20.3143 19.6366 20.4658 19.8941 20.5181C20.1515 20.5703 20.4193 20.5192 20.6393 20.3756C20.8594 20.2321 21.0141 20.0077 21.0701 19.751C21.126 19.4943 21.0787 19.2259 20.9383 19.0038C19.5307 16.8371 17.4602 15.1836 15.0358 14.29ZM5.37958 8.05004C5.37958 6.96224 5.70215 5.89887 6.3065 4.9944C6.91084 4.08993 7.76983 3.38499 8.77482 2.9687C9.77981 2.55242 10.8857 2.4435 11.9526 2.65572C13.0195 2.86794 13.9995 3.39176 14.7687 4.16095C15.5379 4.93014 16.0617 5.91015 16.2739 6.97704C16.4861 8.04394 16.3772 9.14981 15.9609 10.1548C15.5446 11.1598 14.8397 12.0188 13.9352 12.6231C13.0307 13.2275 11.9674 13.55 10.8796 13.55C9.4214 13.5484 8.02341 12.9684 6.99232 11.9373C5.96123 10.9062 5.38123 9.50822 5.37958 8.05004ZM31.6471 20.3875C31.425 20.5324 31.1544 20.5831 30.8949 20.5285C30.6354 20.4738 30.4082 20.3184 30.2633 20.0963C29.3564 18.6989 28.1141 17.5509 26.6497 16.7568C25.1853 15.9627 23.5454 15.5478 21.8796 15.55C21.6144 15.55 21.36 15.4447 21.1725 15.2571C20.9849 15.0696 20.8796 14.8153 20.8796 14.55C20.8796 14.2848 20.9849 14.0305 21.1725 13.8429C21.36 13.6554 21.6144 13.55 21.8796 13.55C22.6895 13.5493 23.4893 13.3696 24.2218 13.0239C24.9543 12.6782 25.6014 12.175 26.1169 11.5503C26.6323 10.9255 27.0034 10.1946 27.2037 9.40976C27.4039 8.62494 27.4283 7.80558 27.2752 7.01023C27.1221 6.21487 26.7952 5.46315 26.3178 4.80879C25.8405 4.15442 25.2246 3.61355 24.514 3.22483C23.8034 2.83611 23.0157 2.60914 22.2072 2.56012C21.3987 2.51111 20.5894 2.64126 19.8371 2.94129C19.7144 2.99432 19.5824 3.02222 19.4487 3.02335C19.3151 3.02448 19.1826 2.99881 19.059 2.94787C18.9355 2.89692 18.8234 2.82172 18.7294 2.72673C18.6354 2.63173 18.5614 2.51886 18.5118 2.39478C18.4622 2.2707 18.4379 2.13793 18.4405 2.00431C18.443 1.8707 18.4723 1.73895 18.5266 1.61686C18.581 1.49476 18.6592 1.38479 18.7568 1.29345C18.8543 1.2021 18.9692 1.13124 19.0946 1.08504C20.8164 0.398354 22.7315 0.373643 24.4705 1.01567C26.2095 1.6577 27.6491 2.92099 28.5116 4.56181C29.3741 6.20264 29.5984 8.10474 29.1412 9.90119C28.684 11.6976 27.5778 13.2611 26.0358 14.29C28.4602 15.1836 30.5307 16.8371 31.9383 19.0038C32.0832 19.2259 32.1339 19.4965 32.0792 19.756C32.0246 20.0155 31.8692 20.2426 31.6471 20.3875Z" fill="white" />
                    </svg>

                    <div>{dat.name}</div></td>
                  <td class="data-td">{dat.birth_year}</td>
                  <td class="data-td"><SecondAPICall data={dat.species}></SecondAPICall></td>
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
                        deleteMenu2 && <Delete deleteMenu={setDeleteMenu2} data={people} index={whichDelete}></Delete>
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

export default People;