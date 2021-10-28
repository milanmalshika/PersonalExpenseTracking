import React, { Component, Fragment } from 'react';
import "./sidenav.css";
import ListIcon from "@material-ui/icons/List";

export default class sidenav extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.addExpense = this.addExpense.bind(this);
    this.viewExpenses = this.viewExpenses.bind(this);
    this.filterExpenses = this.filterExpenses.bind(this);
  }

  addExpense() {
    this.props.history.push("/add-expense/_add");
  }

  viewExpenses() {
    this.props.history.push("/view-expenses");
  }

  filterExpenses() {
      this.props.history.push("/filter-expenses");
  }

  render() {
    return (
      <Fragment>
        <div className="side-menu">
          <div className="main-menu">
            <ul>
              <li>
                <a className="menu-item" onClick={this.addExpense}>
                  <div className="menu-icon">
                    <ListIcon />
                  </div>
                  Add Expense
                </a>
              </li>

              <li>
                <a className="menu-item" onClick={this.viewExpenses}>
                  <div className="menu-icon">
                    <ListIcon />
                  </div>
                  View Expenses
                </a>
              </li>

              <li>
                <a className="menu-item" onClick={this.filterExpenses}>
                  <div className="menu-icon">
                    <ListIcon />
                  </div>
                  Filter Expenses
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Fragment>
    );
  }
}
