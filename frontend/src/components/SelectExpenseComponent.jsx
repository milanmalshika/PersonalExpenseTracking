import React, { Component } from 'react'
import ExpenseService from '../services/ExpenseService';
import Moment from "moment";

export default class SelectExpenseComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            expense: {}
        }
    }

    componentDidMount() {
        ExpenseService.getExpenseById(this.state.id).then( res => {
            this.setState({expense: res.data});
        });
    }

    render() {
        return (
          <div>
            <br></br>
            <div className="card col-md-6 offset-md-3">
              <h3 className="text-center"> View Expense Details </h3>
              <div className="card-body">
                <div className="row">
                  <label>Description : </label>
                  <div>{this.state.expense.description}</div>
                </div>
                <div className="row">
                  <label>Type : </label>
                  <div>{this.state.expense.type}</div>
                </div>
                <div className="row">
                  <label>Expense : </label>
                  <div>{this.state.expense.expense}</div>
                </div>
                <div className="row">
                  <label>Date : </label>
                  <div>
                    {Moment(this.state.expense.date).format("YYYY-MM-DD")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
}
