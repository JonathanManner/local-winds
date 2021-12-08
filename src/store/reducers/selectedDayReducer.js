const selectedDayReducer = (state = 'forecast', action) => {
    switch(action.type) {
        case 'SELECTED_DAY' :
            return action.payload;
        default :
            return state;
    }
}

export default selectedDayReducer;