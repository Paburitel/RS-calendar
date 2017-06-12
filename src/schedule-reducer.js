/**
 * Created by Paburitel on 23.05.2017.
 */

import Immutable from 'immutable';
window.Immutable = Immutable;

const initialState = Immutable.List();

export default function scheduleReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_SCHEDULE': {
                const sort = action.payload.sort((a, b) => {
                    if (+new Date(a.start) < +new Date(b.start)) {
                        return -1;
                    }
                    if (+new Date(a.start) > +new Date(b.start)) {
                        return 1;
                    }
                    if (+new Date(a.start) == +new Date(b.start)) {
                        return 0;
                    }
                });
            return Immutable.List(sort);
        }
        default:
            return state;
    }
}

