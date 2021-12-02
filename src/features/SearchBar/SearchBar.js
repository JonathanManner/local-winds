import React, { useState } from 'react';
import './SearchBar.css';

export const SearchBar = (props) => {
    const coordinates = props.coordinates;
    const handleSearch = props.handleSearch;

    const [searchTerm, setSearchTerm] = useState('');

        const onSearchInput = (e) => {
            const userInput = e.target.value;
            setSearchTerm(userInput);
        }

        const onEnter = ({key}) => {
            if(key === "Enter") {
                console.log("hejhej: " + key);
                setSearchTerm('')
            }
        }

    // props.handleSearch("2");

    return (
        <div className="search-container">
        <input 
            className="search-box"
            type="text"
            value={searchTerm}
            onChange={onSearchInput}
            onKeyPress={onEnter}
            placeholder="Sök och välj ort"
            />
        </div>    
    )
}