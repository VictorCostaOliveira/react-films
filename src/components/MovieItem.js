import React, { Component } from 'react';

class MovieItem extends Component {
  render() {
    const { movies, favoriteFilm, removeFavorite } = this.props;
    if (movies.length === 0) {
      return (
        <h3 className="no-films">Nenhum filme para ser listado :(</h3>
      )
    }
    return (
      <div>
        { movies.map((movie) => (
          <div className="movie-container" key={ movie.id }>
            <div>
              <img className="movie-image" alt={ movie.name} src={ `http://image.tmdb.org/t/p/original${movie.poster_path}` }/>
            </div>
            <p className="name">{ movie.title }</p>
            <p className="sinopse">{ movie.overview }</p>
            <p className="nota">{ movie.vote_average }</p>
            { !movie.favorite ? 
              (<button className="fav-btn" onClick={ () => favoriteFilm(movie.id) }>Favoritar</button>) 
              :
              (<button className="fav-btn" onClick={ () => removeFavorite(movie.id) }>Desvaforitar</button>)
            }
          </div>
        ))}
      </div>
    )
  }
}

export default MovieItem;