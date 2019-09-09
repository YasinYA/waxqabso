import React, { Component } from 'react';

import { Query } from 'react-apollo';

import { Spinner } from '../Common/';

import { workshops } from '../../apolloClient/queries/workshopQueries.js';

import Workshop from './Workshop.jsx';

class Workshops extends Component {
    displayWorkshops() {
        const { classes, finished } = this.props;
        return (
            <Query query={workshops} variables={{ finished }}>
                {({ loading, error, data }) => {
                    if (loading) {
                        return <Spinner size="3x" />;
                    } else {
                        return data.workshops.length > 0 ? (
                            data.workshops.map(workshop => (
                                <Workshop
                                    key={workshop.id}
                                    workshop={workshop}
                                    path={this.props.path}
                                    classes={classes}
                                    buttonText={this.props.buttonText}
                                />
                            ))
                        ) : finished ? (
                            <h4 className={classes.textDark}>
                                All workshops are running.
                            </h4>
                        ) : (
                            <h4 className={classes.textDark}>
                                Still planning the next workshop will update
                                you shortly..
                            </h4>
                        );
                    }
                }}
            </Query>
        );
    }

    render() {
        return <div>{this.displayWorkshops()}</div>;
    }
}

export default Workshops;
