import React, { Component } from "react";
import axios from "axios";
import classnames from "classnames";

export default class drawingsearch extends Component {
  constructor() {
    super();
    this.state = {
      drwnum: "",
      revision: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onReset = this.onReset.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    const drawing = {
      drwnum: this.state.drwnum
    };

    axios
      .post("api/drawings/find", drawing)
      .then(res => console.log(res.data))
      .catch(err => this.setState({ errors: err.response.data }));

    console.log(drawing);
  }

  onReset(e) {
    e.preventDefault();

    this.setState({
      drwnum: "",
      errors: {}
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const { errors } = this.state;

    return (
      <div className="drawingsearch">
        <div className="container">
          <div className="row">
            <div className="col-md-12 m-auto">
              <p className="lead text-left">Enter drawing number</p>
              <form onSubmit={this.onSubmit} onReset={this.onReset}>
                <div className="form-group">
                  <input
                    type="drawing"
                    className={classnames("form-control form-control-sm", {
                      "is-invalid": errors.drwnum
                    })}
                    placeholder="Drawing Number"
                    name="drwnum"
                    value={this.state.drwnum}
                    onChange={this.onChange}
                  />
                </div>
                <input
                  type="submit"
                  className="btn btn-info mr-2"
                  value="Search"
                />
                <input className="btn btn-primary" type="reset" value="Reset" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
