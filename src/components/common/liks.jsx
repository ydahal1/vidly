import React, { Component } from "react";
//Input : Like : Boolean
//Output: onClick

class Like extends Component {
  render() {
    let classes = "fa fa-heart";
    if (!this.props.liked) {
      classes += "-o";
    }
    return (
      <div>
        <i
          className={classes}
          aria-hidden="true"
          onClick={this.props.handleLike}
          style={{ cursor: "pointer" }}
        ></i>
      </div>
    );
  }
}

export default Like;
