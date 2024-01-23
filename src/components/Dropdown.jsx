import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sortByEpisode, sortByYear } from '../store/eventReducer';

const Dropdown = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const dispatch = useDispatch();

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const{movieList} = useSelector(state => state.Events);

  const handleSortByYear = () => {
    dispatch(sortByYear())
    setDropdownOpen(false)
  }

  const handleSortByEpisode = () => {
    dispatch(sortByEpisode())
    setDropdownOpen(false)
  }


  return (
    <div className="relative m-2">
      <button
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center"
        type="button"
        data-dropdown-toggle="dropdown"
        onClick={toggleDropdown}
      >
        sort
        <svg
          className={`w-4 h-4 ml-2 transform ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>

      <div className={`absolute right-0 bg-white text-base z-50 list-none divide-y divide-gray-100 rounded shadow my-4 ${isDropdownOpen ? 'block' : 'hidden'}`} id="dropdown">
        <div className="px-4 py-3"></div>
        <ul className="py-1" aria-labelledby="dropdown">
          <li 
          onClick={handleSortByEpisode}
          className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2 hover:cursor-pointer">
            Episode
          </li>
          <li 
          onClick={handleSortByYear}
          className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2 hover:cursor-pointer">
            Year
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
