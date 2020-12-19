import React, { Component } from "react";

class ListGroups extends Component {
  render() {
    const { genres, textProperty, valueProperty, selectedGenre } = this.props;

    console.log("selected genre: ", selectedGenre);
    console.log(genres);
    return (
      <ul className="list-group">
        {genres.map(genre => {
          return (
            <li
              key={genre[valueProperty]}
              className={
                selectedGenre === genre
                  ? "list-group-item active"
                  : "list-group-item "
              }
              onClick={() => this.props.onGenreSelect(genre)}
            >
              {genre[textProperty]}
            </li>
          );
        })}
      </ul>
    );
  }
}

export default ListGroups;
