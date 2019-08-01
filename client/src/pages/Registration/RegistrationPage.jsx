import React from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';

// @material-ui/icons

// core components
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import Parallax from 'components/Parallax/Parallax.jsx';
import Thankyou from 'components/Thankyou/Thankyou.jsx';
import { Spinner } from 'components/Common';

import registrationPageStyle from 'assets/jss/material-kit-react/views/registrationPage.jsx';

// Sections for this page
import FromSection from './Sections/FormSection.jsx';

class RegistrationPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            success: false,
        };
    }

    successSection(success) {
        this.setState({
            success,
            loading: false,
        });
    }

    displaySections(classes) {
        const id = this.props.match.params.id;
        if (this.state.loading) {
            return (
                <GridContainer justify="center">
                    <GridItem
                        xs={12}
                        sm={12}
                        md={6}
                        className={classes.textCenter}
                    >
                        <Spinner size="3x" text="Loading" />
                    </GridItem>
                </GridContainer>
            );
        }
        if (!this.state.loading && !this.state.success) {
            return (
                <FromSection id={id} success={this.successSection.bind(this)} />
            );
        }

        if (this.state.success && !this.state.loading) {
            return (
                <Thankyou
                    title="Thank You For Registering"
                    description="We assumed that you would like know about updates, so we
                        added you to list of people that we inform about new
                        things. If you wish to get those update emails click the
                        link in the email we sent."
                />
            );
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Parallax
                    filter
                    image={require('../../assets/img/registration-bg.jpg')}
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
                                    Hackers Registering For Hackathons
                                </h1>
                            </GridItem>
                        </GridContainer>
                    </div>
                </Parallax>
                <div className={classNames(classes.main)}>
                    <div className={classes.container}>
                        {this.displaySections(classes)}
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(registrationPageStyle)(RegistrationPage);
