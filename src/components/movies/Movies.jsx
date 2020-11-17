import React, { Component } from "react";
import { getMovies } from "../../services/fakeMovieService";

class Movies extends Component {
  constructor(props) {
    super(props);
    //State
    this.state = {
      movies: getMovies()
    };
  }

  //Functions
  handleDelete = movie => {
    console.log(movie);
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  };

  //Render
  render() {
    return (
      <div>
        {this.state.movies.length === 0 ? (
          <h4>No More Movies Left For Rental</h4>
        ) : (
          <h4>{this.state.movies.length} Movies left for rental</h4>
        )}
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map(movie => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <button
                    onClick={() => this.handleDelete(movie)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Movies;
