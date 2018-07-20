import React from 'react';
import {HashRouter,Route, Switch} from 'react-router-dom';
import App from './App';
import About from './components/About/About';
import Edit from './components/Edit/Edit';
import Dashboard from './components/Dashboard/Dashboard';
import {Provider} from 'react-redux';
import store from './dux/store';




const routes = (
  <HashRouter>
    <Provider store={store}>
    <Switch>
      <Route exact path="/" component={App}/>
      <Route path='/about' component={About}/>
      <Route path='/calendar' component={Edit}/>
      <Route path='/dashboard' component={Dashboard}/>
    </Switch>
    </Provider>
    </HashRouter>
)

export default routes;