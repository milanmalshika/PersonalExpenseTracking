import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import WelcomeComponent from './components/WelcomeComponent';
import CreateExpenseComponent from './components/CreateExpenseComponent';
import ViewExpenseComponent from './components/ViewExpenseComponent';
// import UpdateExpenseComponent from './components/UpdateExpenseComponent';
import SelectExpenseComponent from './components/SelectExpenseComponent';
import FilterExpenseComponent from './components/FilterExpenseComponent';
import FilterExpenseUsingTypeComponent from './components/FilterExpenseUsingTypeComponent';
import ViewTypeExpenseComponent from './components/ViewTypeExpenseComponent';
import Sidenav from './components/sidenav/sidenav';

function App() {
  return (
    <div>
      <Router>
        <HeaderComponent />
        {/* <Sidenav /> */}
        <div className="container">
          <Switch>
            <Route path="/" exact component={WelcomeComponent}></Route>
            <Route path="/expenses" component={WelcomeComponent}></Route>
            <Route
              path="/add-expense/:id"
              component={CreateExpenseComponent}
            ></Route>
            <Route
              path="/view-expenses"
              component={ViewExpenseComponent}
            ></Route>
            {/* <Route
              path="/update-expense/:id"
              component={UpdateExpenseComponent}
            ></Route> */}
            <Route
              path="/select-expense/:id"
              component={SelectExpenseComponent}
            ></Route>
            <Route
              path="/filter-expenses"
              component={FilterExpenseComponent}
            ></Route>
            <Route
              path="/filter-expenses-by-type"
              component={FilterExpenseUsingTypeComponent}
            ></Route>
            <Route
              path="/same-type-expenses/:type"
              component={ViewTypeExpenseComponent}
            ></Route>
          </Switch>
        </div>
        <FooterComponent />
      </Router>
    </div>
  );
}

export default App;
