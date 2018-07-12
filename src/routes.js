import React from 'react';
import {HashRouter,Route, Switch} from 'react-router-dom';
import App from './App';
import About from './components/About/About';
import Calendar from './components/Calendar/Calendar';
import Dashboard from './components/Dashboard/Dashboard';
import {Provider} from 'react-redux';
import store from './dux/store';
import './App.css';
import './components/Navigation/Navigation.css';



const routes = (
  <HashRouter>
    <Provider store={store}>
    <Switch>
      <Route exact path="/" component={App}/>
      <Route path='/About' component={About}/>
      <Route path='/Calendar' component={Calendar}/>
      <Route path='/Dashboard' component={Dashboard}/>
    </Switch>
    </Provider>
    </HashRouter>
)

export default routes;