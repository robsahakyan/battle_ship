import {createStore ,combineReducers } from "redux"
import { reducer1 } from "./reducer1";
import { reducer2 } from "./reducer2";
let rootReducers = combineReducers( {
    reducer1: reducer1,
    reducer2: reducer2
});

function saveToLocalStorage(state) {
  try {
    const serialisedState = JSON.stringify(state);
    localStorage.setItem("persistantState", serialisedState);
  } catch (e) {
    console.warn(e);
  }
}

function loadFromLocalStorage() {
  try {
    const serialisedState = localStorage.getItem("persistantState");
    if (serialisedState === null) return undefined;
    return JSON.parse(serialisedState);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}

const store = createStore(rootReducers, loadFromLocalStorage());

export function saveToLocal() {
  return  store.subscribe(() => saveToLocalStorage(store.getState()));
}

window.store = store;

export default store;



