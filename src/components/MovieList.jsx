import { useEffect, useState } from "react";
import { setMovieList } from "../store/eventReducer";
import Dropdown from "./Dropdown";
import SearchBar from "./SearchBar";
import { useDispatch, useSelector } from "react-redux";
import logoSvg from '../assets/Spinner-0.8s-200px.svg'


const MovieList = () => {

    const[loading , setLoading] = useState(true);

    const[currentMovie , setCurrentMovie] = useState({});

    const dispatch = useDispatch();

    function convertToRoman(num) {
        const romanNumerals = {
            M: 1000,
            CM: 900,
            D: 500,
            CD: 400,
            C: 100,
            XC: 90,
            L: 50,
            XL: 40,
            X: 10,
            IX: 9,
            V: 5,
            IV: 4,
            I: 1
        };
    
        let result = '';
    
        for (const key in romanNumerals) {
            while (num >= romanNumerals[key]) {
                result += key;
                num -= romanNumerals[key];
            }
        }
    
        return result;
    }

    const fetchData = () => {
        fetch('https://swapi.dev/api/films/?format=json')
        .then(res => res.json())
        .then(data => {
            dispatch(setMovieList(data.results)) 
            setLoading(false)
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            setLoading(false);
        });
    }

    useEffect(() => {
        fetchData();
    } , [])

const { movieRenderList } = useSelector(state => state.Events);

const handleSelection = (item) => {
    setCurrentMovie(item)
}
    
  return (
    <div className="w-screen h-screen flex justify-center">
        <div className="w-11/12 flex flex-col">
            <div className="w-full bg-slate-300">
                <div className="flex gap-5 items-center w-3/4 self-center">
                 <Dropdown/>
                 <SearchBar/>
                </div> 
            </div>
            <div className="flex w-full">
                <div className="w-1/2 border-r border-solid border-slate-200">
                    <ul>
                        { loading ? <div 
                          className="h-80 flex flex-col gap-1 justify-center items-center">
                            <object
                                type="image/svg+xml"
                                data={logoSvg}
                                width={70}
                                height={70}
                            >
                            </object>
                            fetching data...
                          </div> :
                          movieRenderList?.map((item , idx) => 
                          <li 
                          onClick={() => {handleSelection(item)}}
                          key={idx}
                          className="border-t border-b border-solid border-slate-200 h-14 flex items-center bg-slate-50 justify-between hover:cursor-pointer">
                          <div className="flex gap-2 justify-center items-center ml-2">
                            <p className="text-xs">{`EPISODE ${item.episode_id}`}</p>
                            <p className="font-semibold text-sm">{`Episode ${convertToRoman(item.episode_id)} - ${item.title}`}</p>
                          </div>
                          <p className="text-xs mr-2">{item.release_date}</p>
                          </li>)
                        }
                    </ul>
                </div>
                <div className="w-1/2 flex justify-center items-center min-h-[336px]">
                   {
                    Object.keys(currentMovie).length === 0 ? <p>No Movie Selected</p>
                    :                   
                    <div className="m-5">
                    <p 
                    className="font-semibold text-xl mt-2">
                    {`EPISODE ${convertToRoman(currentMovie.episode_id)} - ${currentMovie.title}`}</p>
                    <p 
                    className="text-sm mt-2">
                    {currentMovie.opening_crawl}</p>
                    <p 
                    className="text-sm mt-2">
                    {`Directed by - ${currentMovie.director}`}</p>
                   </div>
                   }
                </div>
            </div>
        </div>
    </div>
  )
}

export default MovieList;