import React, { Component } from "react";
import _ from "lodash";

class Pagination extends Component {
  render() {
    const { itmesCount, pageSize, onPageChange, currentPage } = this.props;
    console.log("Current Page", currentPage);
    const numberOfPages = Math.ceil(itmesCount / pageSize);
    const pages = _.range(1, numberOfPages + 1);

    const renderPagination = pages.map(page => {
      return (
        <li
          key={page}
          className={page === currentPage ? "page-item active" : "page-item"}
        >
          <a className="page-link " onClick={() => onPageChange(page)}>
            {page}
          </a>
        </li>
      );
    });

    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {pages.length === 1 ? null : renderPagination}
        </ul>
      </nav>
    );
  }
}

export default Pagination;
