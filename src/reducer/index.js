import { combineReducers } from 'redux';
import Cartreducer from './cartreducer' ;
  
const rootReducer = combineReducers({
	cartreducer : Cartreducer,
})

export default rootReducer; 