import React from 'react';
import { useDispatch } from 'react-redux';
import { setSearchTerm } from '../../store/actions/actions';

export const DropDownItem = (props) => {
    const listItem = props.location;
    const searchTerm = props.searchTerm;
    const dispatch = useDispatch();


    const clearSearch = () => {
        props.handleSearch(listItem.id)
        dispatch(setSearchTerm(''));
    }
    
    if (listItem.location.toLowerCase().includes(searchTerm.toLowerCase())) {
    return(
        <div onClick={() => clearSearch()}>{listItem.location}</div>
    )
} return null;
}