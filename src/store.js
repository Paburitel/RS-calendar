import { createStore, combineReducers, applyMiddleware } from 'redux';
import calendarReducer from './calendar-reducer';
import scheduleReducer from './schedule-reducer';
import trainersReducer from './trainers-reduser';
import mapReduser from './map-reduser';
import { logger } from './logger-middleware';
import { reqest } from './request-middleware';
import { routerReducer } from 'react-router-redux'

const store = createStore(combineReducers({
    calendar: calendarReducer,
    schedule: scheduleReducer,
    trainers: trainersReducer,
    map: mapReduser,
    routing: routerReducer
}), applyMiddleware(
  logger, reqest
));

window.store = store;
Object.defineProperty(window, 'state', {
    get() {
        return store.getState();
    }
});
store.dispatch({type: 'GET_SCHEDULE'});
store.dispatch({type: 'GET_TRAINERS'});
store.dispatch({type: 'GET_MAP'});
export default store;
