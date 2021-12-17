import React from 'react';
import { useDispatch } from 'react-redux';
import { selectLocation, setSearchTerm } from '../../store/actions/actions';

export const DropDownItem = (props) => {
    const listItem = props.location;
    const searchTerm = props.searchTerm;
    const dispatch = useDispatch();


    const clearSearch = () => {
        dispatch(selectLocation(listItem));
        dispatch(setSearchTerm(''));
    }
    
    if (listItem.location.toLowerCase().includes(searchTerm.toLowerCase())) {
    return(
        <div onClick={() => clearSearch()}>{listItem.location}</div>
    )
} return null;
}