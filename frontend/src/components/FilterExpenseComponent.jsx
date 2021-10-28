import React, { Component } from "react";

class FilterExpenseComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.filterByType = this.filterByType.bind(this);
    this.filterByDate = this.filterByDate.bind(this);
    // this.filterExpenses = this.filterExpenses.bind(this);
  }

  filterByType() {
    this.props.history.push("/filter-expenses-by-type");
  }

    filterByDate() {
      this.props.history.push("/filter-expenses-by-date");
    }

  //   filterExpenses() {
  //     this.props.history.push("/filter-expenses");
  //   }

  render() {
    return (
      <div>
        <div className="row">
          <button
            className="btn btn-primary"
            onClick={this.filterByType}
            style={{ marginTop: "10px", marginLeft: "100px" }}
          >
            Expense Filter Using Type
          </button>
          <button
            className="btn btn-primary"
            onClick={this.filterByDate}
            style={{ marginTop: "10px", marginLeft: "100px" }}
          >
            Expense Filter Using Date
          </button>
          {/* <button
            className="btn btn-primary"
            onClick={this.filterExpenses}
            style={{ marginTop: "10px", marginLeft: "100px" }}
          >
            Filter Expenses
          </button> */}
        </div>
      </div>
    );
  }
}

export default FilterExpenseComponent;