import React, { Component } from "react";

class Movie extends Component {
  constructor(props) {
    super(props);
  }

  onSelectedClick = () => {
    this.props.sendToLibrayCallback(this.props);
  };

  render() {
    return (
      <section>
        {this.props.title}

        <button
          type="button"
          className="btn btn-danger"
          aria-label="Close"
          onClick={this.onSelectedClick}
        >
          SELECT
        </button>
      </section>
    );
  }
}

export default Movie;
