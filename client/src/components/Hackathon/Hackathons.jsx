import React, { Component } from 'react';

import { Query } from 'react-apollo';

import { Spinner } from '../Common/';

import { hackathons } from '../../apolloClient/queries/hackathonQueries.js';

import Hackathon from './Hackathon.jsx';

class Hackathons extends Component {
    hackathonUrl(arg) {
        return `/hackathon/${arg}`;
    }

    displayHackathons() {
        const { classes } = this.props;
        return (
            <Query query={hackathons}>
                {({ loading, error, data }) => {
                    if (loading) {
                        return <Spinner size="3x" />;
                    } else {
                        return data.hackathons.map(hackathon => (
                            <Hackathon
                                key={hackathon.id}
                                hackathon={hackathon}
                                classes={classes}
                                buttonText={this.props.buttonText}
                            />
                        ));
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
