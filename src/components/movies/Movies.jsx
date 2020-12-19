import React, { Component } from "react";
import { getMovies } from "../../services/fakeMovieService";
import Likes from "../common/liks";
import Pagination from "../common/Pagination";
import { paginate } from "../../utils/paginate";
import propTypes from "prop-types";
import ListGroups from "../common/listGroups";
import { getGenres } from "../../services/fakeGenreService";
import _ from "lodash";

class Movies extends Component {
  constructor(props) {
    super(props);
    //State
    this.state = {
      movies: [],
      genres: [],
      pageSize: 4,
      currentPage: 1,
      sortColumn: { path: "title", order: "asc" }
    };
  }

  //LifeCycles
  componentDidMount() {
    const movies = getMovies();
    //for all genres tab
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies, genres });
  }

  //Functions
  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  //Handle page Change
  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  //Handle Genre select
  handleGenreSelect = genre => {
    console.log(genre.name);
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  //Handle sort
  handleSort = path => {
    const sortColumn = { ...this.state.sortColumn };
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.setState({ sortColumn });
  };

  //Render
  render() {
    //Destructuring the state
    let moviesCount = this.state.movies.length;
    const {
      currentPage,
      pageSize,
      movies,
      genres,
      selectedGenre,
      sortColumn
    } = this.state;

    //Filter movies
    const filtered =
      selectedGenre && selectedGenre._id
        ? movies.filter(m => m.genre._id === selectedGenre._id)
        : movies;
    //Sort Movies
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movieList = paginate(sorted, currentPage, pageSize);

    return (
      <div className="container">
        <div className="row">
          <div className="col-">
            <ListGroups
              genres={genres}
              onGenreSelect={this.handleGenreSelect}
              textProperty={"name"}
              valueProperty="_id"
              selectedGenre={this.state.selectedGenre}
            />
          </div>
          <div className="col-9">
            <div>
              {filtered.length === 0 ? (
                <h4>No More Movies Left For Rental</h4>
              ) : (
                <h4>{filtered.length} Movies left for rental</h4>
              )}
              <table className="table">
                <thead>
                  <tr>
                    <th onClick={() => this.handleSort("title")}>Title</th>
                    <th onClick={() => this.handleSort("genre.name")}>Genre</th>
                    <th onClick={() => this.handleSort("numberInStock")}>
                      Stock
                    </th>
                    <th onClick={() => this.handleSort("dailyRentalRate")}>
                      Rate
                    </th>
                    <th onClick={() => this.handleSort("")}></th>
                  </tr>
                </thead>
                <tbody>
                  {movieList.map(movie => (
                    <tr key={movie._id}>
                      <td>{movie.title}</td>
                      <td>{movie.genre.name}</td>
                      <td>{movie.numberInStock}</td>
                      <td>{movie.dailyRentalRate}</td>
                      <td>
                        <Likes
                          handleLike={() => this.handleLike(movie)}
                          liked={movie.liked}
                        />
                      </td>
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

              {/* Pagination component */}
              <Pagination
                itmesCount={filtered.length}
                pageSize={pageSize}
                onPageChange={this.handlePageChange}
                currentPage={currentPage}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Pagination.propTypes = {
  currentPage: propTypes.number.isRequired,
  pageSize: propTypes.number.isRequired,
  movies: propTypes.array,
  onPageChange: propTypes.func.isRequired
};

ListGroups.propTypes = {
  genres: propTypes.array.isRequired
};

export default Movies;
