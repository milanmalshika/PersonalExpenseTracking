import React, { Component } from 'react';
import { MenuItem, Select as MuiSelect } from "@material-ui/core";
import * as typeService from "../../src/services/typeService";
import ExpenseService from '../services/ExpenseService';

export default class FilterExpenseUsingTypeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: "",
    };
    this.changeTypeHandler = this.changeTypeHandler.bind(this);
    this.filterData = this.filterData.bind(this);
  }

  changeTypeHandler(event) {
    this.setState({ type: event.target.value });
  }

  filterData() {
    this.props.history.push(`/same-type-expenses/${this.state.type}`);
  }

  cancel() {
    this.props.history.push("/filter-expenses");
  }

  render() {
    return (
      <div>
        <br></br>
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              <h3 className="text-center">Filter Expenses</h3>
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label>Type</label>
                    <MuiSelect
                      name="type"
                      className="form-control"
                      value={this.state.type}
                      onChange={this.changeTypeHandler}
                    >
                      <MenuItem value="">None</MenuItem>
                      {typeService.getTypeCollection().map((item) => (
                        <MenuItem key={item.id} value={item.title}>
                          {item.title}
                        </MenuItem>
                      ))}
                    </MuiSelect>
                  </div>

                  <button
                    className="btn btn-success form-control"
                    onClick={this.filterData}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-danger form-control"
                    onClick={this.cancel.bind(this)}
                    style={{ marginTop: "10px" }}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
