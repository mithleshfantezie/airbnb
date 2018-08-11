import React,{ Component } from 'react';
import { withRouter } from 'react-router-dom';


class Search extends Component {

constructor(props) {
  super(props);
      this.state = {
        searchTerm: ''
      }
}



searchCity(e) {
      const { history } = this.props;

  this.setState({searchTerm: e.target.value});
  if(e.target.value === '') {
    return  history.push('/rentals');
  }else{

    const city = e.target.value;

    city ? history.push(`/city/${city}/homes`) : history.push('/rentals')
  }


}


  render() {
    return(
      <div className="search-here">
      <input type="search" value={this.state.searchTerm} onChange={(e) => this.searchCity(e)}  placeholder="Try 'New York'" />
      </div>
    )
  }
}

//onKeyPress = {(event) => {this.hanleKeyPress(event)}} 

export default withRouter(Search);
