import { combineReducers } from 'redux';
import { movies } from './movies';
import { user } from './user'


export const rootReducer = combineReducers({
    movies,
    user
})


