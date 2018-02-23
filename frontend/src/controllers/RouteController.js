import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import AdminPage from "../containers/CalculationPage";

class RouteController extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/' component={AdminPage}/>
            </Switch>
        )
    }
}

export default RouteController;