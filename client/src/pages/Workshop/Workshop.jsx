import React from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';

// core components
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import Parallax from 'components/Parallax/Parallax.jsx';
import Thankyou from 'components/Thankyou/Thankyou.jsx';
import ErrorHandler from 'components/ErrorHandler/ErrorHandler.jsx';

import registrationPageStyle from 'assets/jss/material-kit-react/views/registrationPage.jsx';

// Sections for this page
import Form from './Sections/Form.jsx';

class WorkshopPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            success: false,
            error: false,
            message: '',
        };
    }

    successSection({ success, message }) {
        if (success) {
            this.setState({
                success,
                error: false,
                message,
            });
        } else {
            this.setState({
                success,
                error: true,
                message,
            });
        }
    }

    displaySections(classes) {
        if (!this.state.success) {
            return <Form success={this.successSection.bind(this)} />;
        }

        if (this.state.success) {
            return (
                <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={6}>
                        <Thankyou
                            title={`${this.state.message}.Thank you for joining us`}
                            description="We assumed that you would like know about updates, so we
                                added you to list of people that we inform about new
                                things."
                        />
                    </GridItem>
                </GridContainer>
            );
        }

        if (this.state.error) {
            return (
                <GridContainer justify="center">
                    <GridItem
                        xs={12}
                        sm={12}
                        md={6}
                        className={classNames(
                            classes.textCenter,
                            classes.title,
                        )}
                    >
                        <ErrorHandler
                            title={`${this.state.message}`}
                            description="Tells us about the error you faced in the Contact us form"
                        />
                    </GridItem>
                </GridContainer>
            );
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Parallax
                    filter
                    image={require('../../assets/img/workshop.jpg')}
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
                                    Registering For Workshop
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

export default withStyles(registrationPageStyle)(WorkshopPage);
