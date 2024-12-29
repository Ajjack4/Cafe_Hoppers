// import logo from '../assets/Seekerra-logo.png';
// import Usericon from './User/Usericon';
// import { SET_LOGIN_OPEN } from '../slice/slice';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../slice/stateStore';
// import { useEffect, useState } from 'react';
// import axios from 'axios';

// interface SearchResponse{
//   features:SimplifiedFeature[];
// }
// interface SimplifiedFeature {
//   properties: SimplifiedProperties;
// }

// interface SimplifiedProperties {
//   name: string;
//   coordinates: {
//     longitude: number;
//     latitude: number;
//   };
// }

// interface searchvalue{
//   name: string;
//   coordinates: {
//     longitude: number;
//     latitude: number;
//   };
// }

// const Navbar = () => {
//   const dispatch = useDispatch();
//   const user = useSelector((state: RootState) => state.user);

//   const handleLogin = () => {
//     dispatch(SET_LOGIN_OPEN());
//   };
//   const [inputvalue,setinputvalue]=useState("")
//   const [searchquery,setsearchquery]=useState<searchvalue[]>([])
  
//   // useEffect(()=>{
//   // const data=async()=>{
//   //   if(inputvalue.length>0){
//   //     const res= await axios.get<SearchResponse>(`https://api.mapbox.com/search/geocode/v6/forward?q=${inputvalue}&proximity=ip&access_token=${import.meta.env.VITE_MAPBOX}`)
//   //     // console.log(datavalue)
//   //     const data:SearchResponse=res.data;
//   //     console.log(data)
//   //     setsearchquery([])
//   //     data.features.forEach((feature)=>{
//   //       const value={
//   //         name:feature.properties.name,
//   //         coordinates:feature.properties.coordinates
//   //       }
//   //       setsearchquery([...searchquery,value])
//   //     })
//   //     console.log(searchquery)
//   //   }
    
//   // }
//   // data()
//   // },[inputvalue])

//   useEffect(() => {
//     const fetchData = async () => {
//       if (inputvalue.length > 0) {
//         try {
//           const res = await axios.get<SearchResponse>(
//             `https://api.mapbox.com/search/geocode/v6/forward?q=${inputvalue}&proximity=ip&access_token=${import.meta.env.VITE_MAPBOX}`
//           );
//           const data: SearchResponse = res.data;
  
//           // Reset searchquery before adding new data
//           setsearchquery([]);
  
//           data.features.forEach((feature) => {
//             const value = {
//               name: feature.properties.name,
//               coordinates: feature.properties.coordinates,
//             };
//             // Use functional state update to avoid stale state issues
//             setsearchquery((prevQuery) => [...prevQuery, value]);
//           });
//           // console.log(data);
//         } catch (error) {
//           console.error("Error fetching data:", error);
//         }
//       } else {
//         // Clear searchquery when inputvalue is empty
//         setsearchquery([]);
//       }
//     };
    
//     fetchData();
    
//   }, [inputvalue]);
  

//   return (
//     <nav className="bg-white shadow-md dark:bg-gray-900">
//       <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">
//         {/* Logo */}
//         <a href="/" className="flex items-center">
//           <img src={logo} className="h-8" alt="Seekerra Logo" />
//         </a>

//         {/* Search Bar */}
//         <div className="flex-1 mx-4">
//           <input
//             type="text"
//             placeholder="Where To ..."
//             className="w-full px-4 py-2 text-sm border rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//             value={inputvalue}
//             onChange={(e) => setinputvalue(e.target.value)}
//           />
//         </div>

//         {/* Menu */}
//         <ul className="flex space-x-6 items-center">
//           <li>
//             <a
//               href="#"
//               className="text-gray-700 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
//             >
//               Home
//             </a>
//           </li>
//           <li>
//             <a
//               href="#"
//               className="text-gray-700 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
//             >
//               Services
//             </a>
//           </li>
//           <li>
//             {user.name ? (
//               <Usericon />
//             ) : (
//               <button
//                 onClick={handleLogin}
//                 className="px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
//               >
//                 Login
//               </button>
//             )}
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import React, { useState, useEffect } from "react";
import logo from "../assets/Seekerra-logo.png";
import Usericon from "./User/Usericon";
import { SET_LOGIN_OPEN ,UPDATE_COORDINATES} from "../slice/slice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../slice/stateStore";
import axios from "axios";

interface SearchResponse {
  features: SimplifiedFeature[];
}

interface SimplifiedFeature {
  properties: SimplifiedProperties;
}

interface SimplifiedProperties {
  name: string;
  coordinates: {
    longitude: number;
    latitude: number;
  };
}

interface SearchValue {
  name: string;
  coordinates: {
    longitude: number;
    latitude: number;
  };
}
interface Coordinates{
  longitude: number;
  latitude: number;
}
const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  

  const handleLogin = () => {
    dispatch(SET_LOGIN_OPEN());
  };
  const updateCoordinates = (coord:Coordinates) => {
    dispatch(UPDATE_COORDINATES({ longitude: coord.longitude, latitude: coord.latitude ,change: true})); 
  };
  const handleSuggestionClick = (suggestion: SearchValue) => {
    
    setinputvalue(suggestion.name);
    setShowDropdown(false);
    const coord:Coordinates={longitude:suggestion.coordinates.longitude, latitude:suggestion.coordinates.latitude};
    console.log("coord",coord);
    updateCoordinates(coord); // Update coordinates when a suggestion is clicked
  };

  const [inputvalue, setinputvalue] = useState("");
  const [searchquery, setsearchquery] = useState<SearchValue[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      if (inputvalue.length > 0) {
        try {
          const res = await axios.get<SearchResponse>(
            `https://api.mapbox.com/search/geocode/v6/forward?q=${inputvalue}&proximity=ip&access_token=${import.meta.env.VITE_MAPBOX}`
          );
          const data: SearchResponse = res.data;

          // Reset searchquery before adding new data
          setsearchquery([]);

          data.features.forEach((feature) => {
            const value = {
              name: feature.properties.name,
              coordinates: feature.properties.coordinates,
            };
            // Use functional state update to avoid stale state issues
            setsearchquery((prevQuery) => [...prevQuery, value]);
          });
          setShowDropdown(true); // Show dropdown when there are results
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        // Clear searchquery when inputvalue is empty
        setsearchquery([]);
        setShowDropdown(false); // Hide dropdown if input is cleared
      }
    };

    fetchData();
  }, [inputvalue]);

  

  return (
    <nav className="bg-white shadow-md dark:bg-gray-900">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <img src={logo} className="h-8" alt="Seekerra Logo" />
        </a>

        {/* Search Bar */}
        <div className="relative flex-1 mx-4">
          <input
            type="text"
            placeholder="Where To ..."
            className="w-full px-4 py-2 text-sm border rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={inputvalue}
            onChange={(e) => setinputvalue(e.target.value)}
          />
          {/* Dropdown */}
          {showDropdown && searchquery.length > 0 && (
            <ul className="absolute left-0 w-full mt-1 bg-white border rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-600 z-50">
              {searchquery.map((suggestion, index) => (
                <li
                  key={index}
                  className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
                  onClick={() => handleSuggestionClick(suggestion)}
                  
                >
                  {suggestion.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Menu */}
        <ul className="flex space-x-6 items-center">
          <li>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
            >
              Services
            </a>
          </li>
          <li>
            {user.name ? (
              <Usericon />
            ) : (
              <button
                onClick={handleLogin}
                className="px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                Login
              </button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
