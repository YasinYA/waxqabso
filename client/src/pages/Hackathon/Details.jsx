import React from 'react';

import { Query } from 'react-apollo';

// nodejs library that concatenates classes
import classNames from 'classnames';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';

// core components
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import Parallax from 'components/Parallax/Parallax.jsx';

import detialPageStyle from 'assets/jss/material-kit-react/views/detialPage.jsx';

// Sections for this page
import HackathonDetialSection from './Sections/HackathonDetialSection.jsx';

import { Spinner } from 'components/Common';

import { hackathon } from '../../apolloClient/queries/hackathonQueries.js';

class DetialPage extends React.Component {
    render() {
        const { classes } = this.props;
        const id = this.props.match.params.id;

        return (
            <Query query={hackathon} variables={{ id: id }}>
                {({ loading, error, data }) => {
                    if (loading) {
                        return (
                            <div className={classNames(classes.main)}>
                                <div className={classes.container}>
                                    <GridContainer justify="center">
                                        <GridItem xs={12} sm={12} md={12}>
                                            <Spinner size="3x" />
                                        </GridItem>
                                    </GridContainer>
                                </div>
                            </div>
                        );
                    } else {
                        return (
                            <div>
                                <Parallax
                                    filter
                                    image={require('../../assets/img/hackathon-bg.jpg')}
                                >
                                    <div className={classes.container}>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={12}>
                                                <h1
                                                    className={classNames(
                                                        classes.title,
                                                        classes.textCenter,
                                                    )}
                                                >
                                                    Hackathon
                                                </h1>
                                            </GridItem>
                                        </GridContainer>
                                    </div>
                                </Parallax>
                                <div className={classNames(classes.main)}>
                                    <div className={classes.container}>
                                        <HackathonDetialSection
                                            hackathon={data.hackathon}
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    }
                }}
            </Query>
        );
    }
}

export default withStyles(detialPageStyle)(DetialPage);
