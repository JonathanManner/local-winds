import React from 'react';
import { Options } from '../features/Options/Options';
import './App.css'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import appReducer from '../store/reducers/reducers';

const saveToLocalStorage = (state) => {
  try {
    localStorage.setItem('state', JSON.stringify(state));
  } catch (e) {
    console.error(e);
  } 
};

const store = createStore(appReducer);

store.subscribe(() => {
  saveToLocalStorage(store.getState());
});


export const App = () => {

  return (
    <Provider store={store}>
    <div className="app-body">
    <Options />
    </div>
    <h6 style={{textAlign: "center"}}>weather data gathered from SMHI</h6>
    </Provider>
  )
}
