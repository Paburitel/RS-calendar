/**
 * Created by Paburitel on 03.06.2017.
 */


const initialState = {
    map: null,
    container: null,
    address: "vulісa Akadеmіka Kuprеvіča 1, Building 5, Minsk"

};

// console.log('[MAPREDUS]');

export default function mapReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_MAP': {
            state.map = action.payload;
            return state;
        }
        case 'SET_EVENT_MAP': {
            const googleMap = state.map;
            const tempCoor = state.address[0].geometry.location;

            const map = new googleMap.Map(document.getElementById('map') , {
                zoom: 15,
                center: tempCoor,
                gestureHandling: 'cooperative',
                scrollwheel: false,
            });

            const marker = new googleMap.Marker({
                map: map,
                position: tempCoor,
            })
            return state;
        }
        default:
            return state;
    }
}
