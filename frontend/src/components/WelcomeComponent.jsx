import React, { Component, PureComponent } from "react";
import { Pie } from "react-chartjs-2";
import ExpenseService from "../services/ExpenseService";

const Max = 30000;

class WelcomeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      maxVal: "",
      val: [],
    };

    this.addExpense = this.addExpense.bind(this);
    this.viewExpenses = this.viewExpenses.bind(this);
    this.filterExpenses = this.filterExpenses.bind(this);
    this.setMaxExpense = this.setMaxExpense.bind(this);
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

  setMaxExpense() {}

  componentDidMount() {
    console.log(Max);
    ExpenseService.getDataToPie().then((res) => {
      this.setState({ val: res.data });
    });
  }

  render() {
    const data = {
      labels: ["Foods", "Movies", "Travelling", "Online Subscription"],
      datasets: [
        {
          label: "# of Votes",
          data: this.state.val,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)"
            
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)"
          ],
          borderWidth: 1,
        },
      ],
    };
    return (
      <div>
        <br></br>
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              <h2 className="text-center">Manage Expenses</h2>
              <div style={{ textAlign: "center" }}>
                <label>
                  <h6>Max Monthly Expense Amount: {Max}</h6>
                </label>
              </div>

              <div className="card-body">
                <form>
                  <button
                    className="btn btn-primary form-control"
                    onClick={this.addExpense}
                    style={{ marginBottom: "10px", marginTop: "60px" }}
                  >
                    Add Expense
                  </button>
                  <button
                    className="btn btn-primary form-control"
                    onClick={this.viewExpenses}
                    style={{ marginBottom: "10px" }}
                  >
                    View Expenses
                  </button>
                  <button
                    className="btn btn-primary form-control"
                    onClick={this.filterExpenses}
                    style={{ marginBottom: "10px" }}
                  >
                    Filter Expenses
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* <button
            className="btn btn-primary"
            onClick={this.setMaxExpense}
            style={{ marginTop: "10px", marginLeft: "100px" }}
          >
            Set Max Monthly Expense Amount
          </button>  */}
        </div>
        <div
          style={{ height: "300px", width: "300px"}}
          className="col-md-8 offset-md-4 offset-md-3"
        >
          <Pie data={data} />
        </div>
      </div>
    );
  }
}

export default WelcomeComponent;
