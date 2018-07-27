import React, { Component } from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';



import Header from './components/header/main';
import Rentals from './components/rentals/main';
import SearchRentals from './components/rentals/search-rentals';
import RentalSingle from './components/rentals/rentalsingle';
import Login from './components/login';

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
      <Route exact path="/rental/:id" component={RentalSingle} />
      <Route exact path="/login" component={Login} />
      </Switch>
      </div>
      </BrowserRouter>
    );
  }
}



export default App;
