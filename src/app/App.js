import React from 'react';
import { Options } from '../features/Options/Options';
import './App.css'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import appReducer from '../store/reducers/reducers';

const store = createStore(appReducer);


export const App = () => {

  return (
    <Provider store={store}>
    <div className="app-body">
    <Options />
    </div>
    </Provider>
  )
}
