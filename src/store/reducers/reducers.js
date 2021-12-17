import initialState from "../initialState";

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SELECT_DAY":
      return {
        ...state, 
        selectedDay: action.payload};

    case "SELECT_LOCATION":
      return {
        ...state, 
        selectedLocation: action.payload };

    case "STORE_WEATHER":
      return { 
        ...state, 
        weatherData: action.payload };

    case "IS_LOADING":
      return { 
        ...state, 
        isLoading: action.payload };

    case "SEARCH_TERM":
      return { 
        ...state, 
        searchTerm: action.payload }; 

    case "UPDATE_LOCATIONS":
      return {
        ...state,
        locations: action.payload };    

    default:
      return state;
  }
};

export default appReducer;
