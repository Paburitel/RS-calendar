import './css/reset.css';
import './css/css.css';
import './css/spinner.css';
import './css/media-query.css';
import './css/reactBootstrap.css';
import 'react-bootstrap-table/css/react-bootstrap-table.css';
import 'react-bootstrap-table/css/toastr.css';
import 'whatwg-fetch';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import store from './store';
import { syncHistoryWithStore} from 'react-router-redux';
import { Router, Route, browserHistory } from 'react-router'

import Trainers from './components/trainers/Trainers';
import Lectures from './components/lectures/Lectures';
import Webinars from './components/webinars/Webinars';
import Workshops from './components/workshops/Workshops';
import Events from './components/events/Events';
import Deadlines from './components/deadlines/Deadlines';


const history = syncHistoryWithStore(browserHistory, store);
render(
    <Provider store={store}>

        <Router history={history}>

            <Route path="/" component={App}/>
            <Route path="/trainers" component={Trainers}/>
            <Route path="/lectures" component={Lectures}/>
            <Route path="/webinars" component={Webinars}/>
            <Route path="/workshops" component={Workshops}/>
            <Route path="/events" component={Events}/>
            <Route path="/deadlines" component={Deadlines}/>

        </Router>
    </Provider>,
    document.querySelector('#root')
);
