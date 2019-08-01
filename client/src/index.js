import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { ApolloProvider } from 'react-apollo';

import CssBaseline from '@material-ui/core/CssBaseline';

import App from './App/App.js';
import client from './apolloClient/apolloClient.js';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <ApolloProvider client={client}>
        <BrowserRouter>
            <CssBaseline />
            <App />
        </BrowserRouter>
    </ApolloProvider>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
