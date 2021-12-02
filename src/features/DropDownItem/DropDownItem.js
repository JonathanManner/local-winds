import React from 'react';

export const DropDownItem = (props) => {
    const listItem = props.location;
    const searchTerm = props.searchTerm;
    const setSearchTerm = props.setSearchTerm;

    const clearSearch = () => {
        props.handleSearch(listItem.id)
        setSearchTerm('')
    }
    
    if (listItem.location.toLowerCase().includes(searchTerm.toLowerCase())) {
    return(
        <div onClick={() => clearSearch()}>{listItem.location}</div>
    )
} return null;
}