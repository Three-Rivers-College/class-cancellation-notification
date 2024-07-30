import React from 'react';
import PropTypes from 'prop-types';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import Home from './Home';
import ChanegeOfProgram from './ChanegeOfProgram';
//import PiiApproval from './PiiApproval';
import ClassCancellationNotificationForm from './ClassCancellation';

// for more information on react router: https://v5.reactrouter.com/web/guides/quick-start

const RouterPage = (props) => {
    return (
        <Router basename={props.pageInfo.basePath}>
            <Switch>
                <Route exact path='/'>
                    <Home {...props} />
                </Route>
                <Route path='/changeofprogram'>
                    <ChanegeOfProgram {...props} />
                </Route>
                <Route path='/classcancellation'>
                    <ClassCancellationNotificationForm {...props} />
                </Route>
                <Route path="*">
                    <Redirect to="/" />
                </Route>
            </Switch>
        </Router>
    );
};

RouterPage.propTypes = {
    pageInfo: PropTypes.object
};

export default RouterPage;