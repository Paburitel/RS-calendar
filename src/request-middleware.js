/**
 * Created by Paburitel on 23.05.2017.
 */
import fetchGoogleMaps from 'fetch-google-maps';

export function reqest(store) {
    return function (next) {
        return function (action) {
            switch (action.type) {

                case 'GET_SCHEDULE' : {
                    fetch(`http://128.199.53.150/events`)
                        .then((data) => {
                            return data.json();
                        })
                        .then((data) => {
                            store.dispatch({
                                type: 'SET_SCHEDULE',
                                payload: data,
                            });

                        });
                    break;
                }
                case 'GET_TRAINERS' : {
                    fetch(`http://128.199.53.150/trainers`)
                        .then((data) => {
                            return data.json();
                        })
                        .then((data) => {
                            store.dispatch({
                                type: 'SET_TRAINERS',
                                payload: data,
                            });

                        });
                    break;
                }
                case 'GET_MAP' : {
                    fetchGoogleMaps({
                        apiKey: 'AIzaSyA3ah2VYNVUryGN6WaK0OjsGvxTFVkqdwc',
                        language: 'en',
                        libraries: ['geometry']
                    }).then(( data ) => {
                            store.dispatch({
                                type: 'SET_MAP',
                                payload: data,

                            });
                        });
                    break;
                }
                case 'GET_COOR' : {
                    const gg = new state.map.map.Geocoder;
                        gg.geocode({
                        address: action.payload
                    }, function (data) {
                            state.map.address = data;
                            store.dispatch({
                                type: 'SET_EVENT_MAP',
                                payload: state.map,
                            });

                    })
                    break;
                }
                case 'SEND_FEEDBACK' : {
                    // there is no server API fore POST, action.payload considered options fore POST
                    console.log('[SEND-FEEDBACK]', action.payload);

                    break;
                }
                default: {
                    // console.log('[NO-SUITABLE-ACTION]')
                }
            }
            return next(action);
        }
    }
}
