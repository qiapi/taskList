import { createStore,applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
var reducer = require('./reducer');
const initialState = {
	isFetching:false,
	complete:false
}
const store = createStore(reducer,applyMiddleware(thunk));
module.exports = store;