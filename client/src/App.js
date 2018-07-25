import React, { Component } from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

import { connect } from 'react-redux';

import Header from './components/header/main';
import Rentals from './components/rentals/main';
import SearchRentals from './components/rentals/search-rentals';


class App extends Component {



  render() {
    return (
      <BrowserRouter>
      <div>
      <Header/>
      <Switch>
      <Route exact path="/" component={()=> <Redirect to="/rentals" />} />
      <Route exact path="/rentals" component={Rentals} />
      <Route exact path="/city/:city/homes" component={SearchRentals} />
      </Switch>
      </div>
      </BrowserRouter>
    );
  }
}



export default App;
