import {createStore ,combineReducers } from "redux"
import { reducer1 } from "./reducer1";
import { reducer2 } from "./reducer2";
let rootReducers = combineReducers( {
    reducer1: reducer1,
    reducer2: reducer2
});
const store = createStore(rootReducers);

window.store = store;

export default store