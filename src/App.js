import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import "./App.css";

import AddTutorial from "./components/AddTutorial";
import EditPerson from "./components/EditPerson";
import PeopleList from "./components/PeopleList";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a>
          22300593 이지광
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/people"} className="nav-link">
              People
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/people"]} component={PeopleList} />
          <Route exact path="/add" component={AddTutorial} />
          <Route path="/people/:id" component={EditPerson} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
