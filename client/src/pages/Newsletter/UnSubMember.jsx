import React from 'react';
import { Redirect } from 'react-router-dom';

// nodejs library that concatenates classes
import classNames from 'classnames';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';

import client from '../../apolloClient/apolloClient.js';

// core components
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import Parallax from 'components/Parallax/Parallax.jsx';
import Thankyou from 'components/Thankyou/Thankyou.jsx';
import { Spinner } from 'components/Common';

import { unSubMember } from '../../apolloClient/mutations/memberMutations.js';

import unSubscriptionPageStyle from 'assets/jss/material-kit-react/views/unSubscriptionPage.jsx';

class UnSubMemberPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            success: false,
            redirect: false,
            token: this.props.match.params.token,
        };
    }

    successSection(success) {
        this.setState({
            success,
            redirect: success,
            loading: false,
        });
    }

    displaySections() {
        client
            .mutate({
                mutation: unSubMember,
                variables: {
                    token: this.state.token,
                },
            })
            .then(result => this.successSection(true));
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Parallax
                    filter
                    image={require('../../assets/img/unsub-bg.jpg')}
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
                                    Un-Subscribing From Our Newsletter
                                </h1>
                            </GridItem>
                        </GridContainer>
                    </div>
                </Parallax>
                <div className={classNames(classes.main)}>
                    <div className={classes.container}>
                        <div className={classes.section}>
                            {this.displaySections()}
                            {this.state.success && !this.state.loading ? (
                                <Thankyou
                                    title="Un-Subscribed Successfully."
                                    description="We sorry to see you leave."
                                />
                            ) : (
                                <GridContainer justify="center">
                                    <GridItem
                                        xs={12}
                                        sm={12}
                                        md={6}
                                        className={classes.textCenter}
                                    >
                                        <Spinner
                                            size="3x"
                                            text="Un-Subscribing..."
                                        />
                                    </GridItem>
                                </GridContainer>
                            )}
                            {this.state.redirect && <Redirect to="/" />}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(unSubscriptionPageStyle)(UnSubMemberPage);
