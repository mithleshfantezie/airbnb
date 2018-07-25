import React,{ Component } from 'react';
import { connect } from 'react-redux';

import { toUpperCase } from '../../helper';

import * as actions from '../../actions';

import RentalsList from './rentals-list';

class SearchRentals extends Component {
constructor(props) {
  super(props);

  this.state = {
    searchTerm: this.props.match.params.city
  }
}

componentWillMount() {
  this.SearchRentalsByCity();
}

SearchRentalsByCity() {
  const searchedCity = this.props.match.params.city;
  this.setState({searchTerm: searchedCity});

  this.props.dispatch(actions.fetchRentals(searchedCity));
}

componentDidUpdate(prevProps) {
  const currentUrlParam = this.props.match.params.city;

  const prevUrlParam = prevProps.match.params.city;

  if(currentUrlParam !== prevUrlParam) {
    this.SearchRentalsByCity();
  }
}

renderSearchTitle() {
  if(this.props.rentals.data.length > 0) {
    return(
      <h2>Your Home in the City of {toUpperCase(this.state.searchTerm)}!</h2>
    )
  }else{
    return(
      <h2>Sorry! We are unable to find the match for the city: {toUpperCase(this.state.searchTerm)}!</h2>
    )
  }
}



render() {
console.log(this.props.rentals);
  return(
    <div className="container">
    {this.renderSearchTitle()}
      <RentalsList rentals={this.props.rentals}/>

    </div>
  )
}
}

function mapStateToProps(state) {
  return {
    rentals: state.rentals
  }
}


export default connect(mapStateToProps)(SearchRentals);
