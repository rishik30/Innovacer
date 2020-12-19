import * as React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import Main from "./Containers/Main"
import PatientContainer from "./Containers/PatientPage"

const Router = () => {

    return(
        <BrowserRouter>
          <div>
            <ul className="app-nav">
              <div>Innovacer</div>
              <li>
                <Link to="/">Home</Link>
              </li>
            </ul>

            <Switch>
              <Route path="/patient/:id" render={props => (<PatientContainer {...props} />)} />
              <Route path="/">
                <Main />
              </Route>
            </Switch>
          </div>
        </BrowserRouter>
    )
}

export default Router
