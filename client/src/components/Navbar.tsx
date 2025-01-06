import React, { useState, useEffect, useRef } from "react";
import logo from "../assets/cafe_hopper_logo.png";
import Usericon from "./User/Usericon";
import { SET_LOGIN_OPEN, UPDATE_COORDINATES } from "../slice/slice";
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

interface Coordinates {
  longitude: number;
  latitude: number;
}

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogin = () => {
    dispatch(SET_LOGIN_OPEN());
  };

  const updateCoordinates = (coord: Coordinates) => {
    dispatch(
      UPDATE_COORDINATES({ longitude: coord.longitude, latitude: coord.latitude, change: true })
    );
  };

  const handleSuggestionClick = (suggestion: SearchValue) => {
    setInputValue(suggestion.name);
    setShowDropdown(false);
    const coord: Coordinates = {
      longitude: suggestion.coordinates.longitude,
      latitude: suggestion.coordinates.latitude,
    };
    updateCoordinates(coord);
  };

  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState<SearchValue[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (inputValue.length > 0) {
        try {
          const res = await axios.get<SearchResponse>(
            `https://api.mapbox.com/search/geocode/v6/forward?q=${inputValue}&proximity=ip&access_token=${import.meta.env.VITE_MAPBOX}`
          );
          const data: SearchResponse = res.data;

          setSearchQuery([]);
          data.features.forEach((feature) => {
            const value = {
              name: feature.properties.name,
              coordinates: feature.properties.coordinates,
            };
            setSearchQuery((prevQuery) => [...prevQuery, value]);
          });
          setShowDropdown(true);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        setSearchQuery([]);
        setShowDropdown(false);
      }
    };

    fetchData();
  }, [inputValue]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white shadow-md dark:bg-gray-900">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <img src={logo} className="h-11" alt="Seekerra Logo" />
        </a>

        {/* Search Bar */}
        <div className="relative flex-1 mx-4" ref={dropdownRef}>
          <input
            type="text"
            placeholder="Where To ..."
            className="w-full px-4 py-2 text-sm border rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          {/* Dropdown */}
          {showDropdown && searchQuery.length > 0 && (
            <ul className="absolute left-0 w-full mt-1 bg-white border rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-600 z-50">
              {searchQuery.map((suggestion, index) => (
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
