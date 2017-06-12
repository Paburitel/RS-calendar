/**
 * Created by Paburitel on 27.05.2017.
 */

import Immutable from 'immutable';
window.Immutable = Immutable;

const initialState = Immutable.List();

export default function scheduleReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_TRAINERS': {
            const sort = action.payload.sort((a, b) => {
                if (a.name < b.name) {
                    return -1;
                }
                if (a.name > b.name) {
                    return 1;
                }
                if (a.name == b.name) {
                    return 0;
                }
            });
            return  Immutable.List(sort);
        }
        default:
            return state;
    }
}
