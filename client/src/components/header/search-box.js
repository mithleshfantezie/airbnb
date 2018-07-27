import React,{ Component } from 'react';
import { withRouter } from 'react-router-dom';


class Search extends Component {

constructor(props) {
  super(props);
      this.state = {
        searchTerm: ''
      }
}

hanleKeyPress(event){
  if(event.key === 'Enter'){
    if(this.state.searchTerm === '') {
      return;
    }else{
      this.handleSubmit();
    }

  }
}

handleSubmit() {

  if(this.state.searchTerm === '') {
    return;
  }else{
    const { history } = this.props;
    const city = this.state.searchTerm;

    city ? history.push(`/city/${city}/homes`) : history.push('/rentals')
  }



}


  render() {
    return(
      <div className="search-here">
      <input type="search" value={this.state.searchTerm} onChange={(e) => this.setState({searchTerm: e.target.value})} onKeyPress = {(event) => {this.hanleKeyPress(event)}}  placeholder="Try 'New York'" />
      <button onClick={()=> this.handleSubmit()} >Search</button>
      </div>
    )
  }
}



export default withRouter(Search);
