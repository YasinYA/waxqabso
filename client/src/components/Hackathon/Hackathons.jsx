import React, { Component } from 'react';

import { Query } from 'react-apollo';

import { Spinner } from '../Common/';

import { hackathons } from '../../apolloClient/queries/hackathonQueries.js';

import Hackathon from './Hackathon.jsx';

class Hackathons extends Component {
    displayHackathons() {
        const { classes, finished } = this.props;
        return (
            <Query query={hackathons} variables={{ finished }}>
                {({ loading, error, data }) => {
                    if (loading) {
                        return <Spinner size="3x" />;
                    } else {
                        if (data.hackathons.length > 0) {
                            return data.hackathons.map(hackathon => (
                                <Hackathon
                                    key={hackathon.id}
                                    hackathon={hackathon}
                                    path={this.props.path}
                                    classes={classes}
                                    buttonText={this.props.buttonText}
                                />
                            ));
                        } else if (!finished) {
                            return (
                                <h4 className={classes.textDark}>
                                    All hackathons are running.
                                </h4>
                            );
                        } else if (finished) {
                            return (
                                <h4 className={classes.textDark}>
                                    Still planning the next hackathon will
                                    update you shortly..
                                </h4>
                            );
                        } else {
                            return (
                                <h4 className={classes.textDark}>
                                    No Hackathons
                                </h4>
                            );
                        }
                    }
                }}
            </Query>
        );
    }

    render() {
        return <div>{this.displayHackathons()}</div>;
    }
}

export default Hackathons;
