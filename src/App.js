import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import './App.scss';
import { movies } from './data/Api';
import MovieItem from './components/MovieItem';
import NavBar from './components/NavBar';
import Loading from './components/Loading';

class App extends Component {
  state = {
    movies: movies,
    loading: false,
    filmesEncontrados: [],
    query: false,
  };

  getFilms = () => {
    const URL = "https://api.themoviedb.org/3/movie/popular?api_key=b5a6960f5d00348279dfa8da641961fe";
    this.setLoading();
    axios.get(URL).then((response) => {
      this.setState({ movies: response.data.results });
      this.setLoading();
    }).catch((error) => {
      this.setLoading();
      console.log(error);
    });
  };

  buscarFilme = (param) => {
    if(param.length > 3) {
      const URL = `https://api.themoviedb.org/3/search/movie?query=${param}&api_key=b5a6960f5d00348279dfa8da641961fe`;
      this.setLoading();
      axios.get(URL).then((response) => {
        this.setLoading();
        this.setState({filmesEncontrados: response.data.results});
        console.log(this.state.filmesEncontrados)
      }).catch((error) => {
        this.setLoading()
      });
    }
  };
  
  setLoading = () => {
    this.setState({loading: !this.state.loading});
  };

  componentDidMount = () => {
    this.getFilms();
  };

  favoriteFilm = (movieId) => {
    const movies = this.state.movies;
    const movie = movies.find(item => (item.id === movieId));
    movie.favorite = true;
    this.setState({movies: movies});
  };

  removeFavorite = (movieId) => {
    const movies = this.state.movies;
    const movie = movies.find(item => (item.id === movieId));
    movie.favorite = false;
    this.setState({movies: movies});
  }

  render() {
    const { movies, loading, filmesEncontrados, query } = this.state;
    const noFavMovies = movies.filter(movie => (!movie.favorite));
    const favMovies = movies.filter(movie => (movie.favorite));
    console.log(favMovies)
    return (
      <div className="App">
      {loading && <Loading /> }
        <Router>
          <div>
            <NavBar buscarFilme={this.buscarFilme.bind(this)}/>
            <Route path="/search" component={() => <MovieItem movies={filmesEncontrados} favoriteFilm={this.favoriteFilm}/>}/>
            <Route path="/no-favorites" component={() => <MovieItem movies={noFavMovies} favoriteFilm={this.favoriteFilm}/>}/>
            <Route path="/favorites" component={() =>  <MovieItem movies={favMovies} removeFavorite={this.removeFavorite} />}/>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
