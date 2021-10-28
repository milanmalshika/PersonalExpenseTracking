import React, { Component } from "react";
import * as typeService from "../../src/services/typeService";
import { MenuItem, Select as MuiSelect } from "@material-ui/core";
import ExpenseService from "../services/ExpenseService";
import Moment from "moment";

const Max = 30000;
var today = new Date(),
  Currentdate =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
var first = new Date(),
  firstDay = first.getFullYear() + "-" + (first.getMonth() + 1) + "-01";

class CreateExpenseComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      description: "",
      type: "",
      date: "",
      expense: "",
    };

    this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
    this.changeDateHandler = this.changeDateHandler.bind(this);
    this.changeTypeHandler = this.changeTypeHandler.bind(this);
    this.changeExpenseHandler = this.changeExpenseHandler.bind(this);
    this.saveOrUpdateExpense = this.saveOrUpdateExpense.bind(this);
  }

  componentDidMount() {
    console.log(Max);
    if (this.state.id === "_add") {
      return;
    } else {
      ExpenseService.getExpenseById(this.state.id).then((res) => {
        let expense = res.data;
        this.setState({
          description: expense.description,
          type: expense.type,
          expense: expense.expense,
          date: Moment(expense.date).format("YYYY-MM-DD"),
        });
      });
    }
  }

  saveOrUpdateExpense = (e) => {
    e.preventDefault();
    let expense = {
      description: this.state.description,
      type: this.state.type,
      date: this.state.date,
      expense: this.state.expense,
    };
    console.log("expense => " + JSON.stringify(expense));

    if (this.state.id === "_add") {
      ExpenseService.getExpenseTotal().then((total) => {
          const pre = 30000*0.9;
          const totalE = total.data + Number(this.state.expense);

          if (pre < totalE) {
            alert("Expense is higher than max value");
          } else {
            ExpenseService.createExpense(expense).then((res) => {
              this.props.history.push("/expenses");
            });
          }
      });

        
    } else {
      ExpenseService.getExpenseTotal().then((total) => {
          const pre = Max*0.9;
          const totalE = total.data + Number(this.state.expense);

          if (pre < totalE) {
            alert("Expense is higher than max value");
          } else {
            ExpenseService.updateExpense(expense, this.state.id).then((total) => {
            this.props.history.push("/view-expenses");
          });
          }
      });
        
      
    }
  };

  changeDescriptionHandler = (event) => {
    this.setState({ description: event.target.value });
  };

  changeDateHandler = (event) => {
    this.setState({ date: event.target.value });
  };

  changeTypeHandler = (event) => {
    this.setState({ type: event.target.value });
  };

  changeExpenseHandler = (event) => {
    this.setState({ expense: event.target.value });
  };

  cancel() {
    if (this.state.id === "_add") {
      this.props.history.push("/expenses");
    } else {
      this.props.history.push("/view-expenses");
    }
  }

  getTitle() {
    if (this.state.id === "_add") {
      return <h3 className="text-center">Add Expense</h3>;
    } else {
      return <h3 className="text-center">Update Expense</h3>;
    }
  }

  render() {
    return (
      <div>
        <br></br>
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              {this.getTitle()}
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label>Description</label>
                    <input
                      placeholder="Description"
                      name="description"
                      className="form-control"
                      value={this.state.description}
                      onChange={this.changeDescriptionHandler}
                    />
                  </div>
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
                  <div className="form-group">
                    <label>Date</label>
                    <input
                      name="date"
                      className="form-control"
                      type="date"
                      value={this.state.date}
                      onChange={this.changeDateHandler}
                      min={firstDay}
                      max={Currentdate}
                    />
                  </div>
                  <div className="form-group">
                    <label>Expense</label>
                    <input
                      placeholder="Expense"
                      name="expense"
                      type="number"
                      className="form-control"
                      value={this.state.expense}
                      onChange={this.changeExpenseHandler}
                    />
                  </div>

                  <button
                    className="btn btn-success form-control"
                    onClick={this.saveOrUpdateExpense}
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

export default CreateExpenseComponent;
