import React from 'react';
import {HashRouter,Route, Switch} from 'react-router-dom';
import App from './App';
import About from './components/About/About';
import Dashboard from './components/Dashboard/Dashboard';
import {Provider} from 'react-redux';
import store from './dux/store';
import Navigation from './components/Navigation/Navigation';
import Master from './components/Master/Master';



const routes = (
  <HashRouter>
    <Provider store={store}>
    <div>
      <Navigation/>
    <Switch>
      <Route exact path="/" component={App}/>
      <Route path='/about' component={About}/>
      <Route path='/calendar' component={Master}/>
      <Route path='/dashboard' component={Dashboard}/>
    </Switch>
    </div>
    </Provider>
    </HashRouter>
)

export default routes;