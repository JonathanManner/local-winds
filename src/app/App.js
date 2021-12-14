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

const loadFromLocalStorage = () => {
  try {
    const stateStr = localStorage.getItem('state');
    return stateStr ? JSON.parse(stateStr) : undefined;
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

const persistedStore = loadFromLocalStorage();

const store = createStore(appReducer, persistedStore);

store.subscribe(() => {
  saveToLocalStorage(store.getState());
});


export const App = () => {

  return (
    <Provider store={store}>
    <div className="app-body">
    <Options />
    </div>
    </Provider>
  )
}
