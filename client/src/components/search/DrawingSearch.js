import React, { Component } from "react";
import axios from "axios";
import classnames from "classnames";
import ResultsTable from "./ResultsTable";
//import viewPdf from "../../functions/viewFile";

export default class drawingsearch extends Component {
  constructor() {
    super();
    this.state = {
      submitted: false,
      drawings: [],
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    const drawing = {
      drwnum: this.state.drwnum
    };

    this.setState({ loading: true, drawings: [], submitted: false });
    axios
      .post("/api/drawings/finddrawing", drawing)
      .then(res => {
        this.setState({
          drawings: [...this.state.drawings, ...res.data.recordset],
          submitted: true
        });
      })
      .catch(err => this.setState({ errors: err.response.data }));
  }

  onReset(e) {
    e.preventDefault();

    this.setState({
      drwnum: "",
      submitted: false,
      imgSrc: {},
      data: [],
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
              {this.state.submitted ? (
                <ResultsTable drawingslist={this.state.drawings} />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
