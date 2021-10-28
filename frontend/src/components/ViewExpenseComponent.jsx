import React, { Component } from 'react';
import ExpenseService from "../services/ExpenseService";
import Moment from "moment";

export default class ViewExpenseComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expenses: [],
    };

    this.editExpense = this.editExpense.bind(this);
    this.deleteExpense = this.deleteExpense.bind(this);
    this.selectExpense = this.selectExpense.bind(this);
  }

  deleteExpense(id) {
    ExpenseService.deleteExpense(id).then((res) => {
      this.setState({
        expenses: this.state.expenses.filter((expense) => expense.id !== id),
      });
    });
  }

  editExpense(id) {
    this.props.history.push(`/add-expense/${id}`);
  }

  selectExpense(id) {
    this.props.history.push(`/select-expense/${id}`);
  }

  componentDidMount() {
    ExpenseService.getExpenses().then((res) => {
      this.setState({ expenses: res.data });
    });
  }

  render() {
    return (
      <div>
        <h2 className="text-center">Expenses List</h2>
        <div className="row">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Description</th>
                <th>Type</th>
                <th>Expense</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.expenses.map((expense) => (
                <tr key={expense.id}>
                  <td>{expense.description}</td>
                  <td>{expense.type}</td>
                  <td>{expense.expense}</td>
                  <td>{Moment(expense.date).format("YYYY-MM-DD")}</td>
                  <td>
                    <button
                      onClick={() => this.editExpense(expense.id)}
                      className="btn btn-info"
                    >
                      Update{" "}
                    </button>
                    <button
                      style={{ marginLeft: "10px" }}
                      onClick={() => this.deleteExpense(expense.id)}
                      className="btn btn-danger"
                    >
                      Delete{" "}
                    </button>
                    <button
                      style={{ marginLeft: "10px" }}
                      onClick={() => this.selectExpense(expense.id)}
                      className="btn btn-info"
                    >
                      View{" "}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
