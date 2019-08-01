import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import { MuiThemeProvider } from '@material-ui/core/styles';

import appTheme from '../theme.js';
import routes from '../routes.js';
import '../utils/loadIcons.js';

import { Layout } from '../components/Common/';

class App extends Component {
    render() {
        return (
            <MuiThemeProvider theme={appTheme}>
                <div className="App">
                    <Layout>
                        <Switch>
                            {routes.map((route, i) => (
                                <Route key={i} {...route} />
                            ))}
                        </Switch>
                    </Layout>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
