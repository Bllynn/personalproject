import {createStore} from 'redux';
import reducer from './reducer';
//always import the reducer, and then invoke createStore with reducer
export default createStore(reducer);