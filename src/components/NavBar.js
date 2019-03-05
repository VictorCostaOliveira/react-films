import React, { Component } from 'react';
import { Link} from 'react-router-dom';

class NavBar extends Component {
  state = {
    text: ""
  };

  handleChange = (event) => {
    event.preventDefault();
    this.setState({text: event.target.value});
    this.props.buscarFilme(this.state.text);
  };

  render() {
    return (
      <div>
        <nav className="nav-bar">
          <Link to="/no-favorites">Filmes</Link>
          <Link to="/favorites">Favoritos</Link>
          <div className="search-container">
            <Link to="/search">
              <input className="nav-search" type="text" value={this.state.text} onChange={this.handleChange.bind(this)}placeholder="Buscar filme..."/>
            </Link>
          </div>
        </nav>
      </div>
    )
  }
}

export default NavBar;