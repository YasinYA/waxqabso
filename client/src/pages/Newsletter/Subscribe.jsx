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
import ErrorHandler from 'components/ErrorHandler/ErrorHandler.jsx';

import subscriptionPageStyle from 'assets/jss/material-kit-react/views/subscriptionPage.jsx';

// Sections for this page
import From from './Sections/Form.jsx';

class SubscribePage extends React.Component {
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
            return <From success={this.successSection.bind(this)} />;
        }

        if (this.state.success) {
            return (
                <Thankyou
                    title={`${this.state.message}.Thank you for joining us`}
                    description="We will make sure that you get notified for valuable content."
                />
            );
        }

        if (this.state.error) {
            return (
                <ErrorHandler
                    title={`${this.state.message}`}
                    description="What are you trying to do."
                />
            );
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Parallax filter image={require('../../assets/img/sub-bg.jpg')}>
                    <div className={classes.container}>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={12}>
                                <h1
                                    className={classNames(
                                        classes.title,
                                        classes.textCenter,
                                    )}
                                >
                                    Subscribing To Our Newsletter
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

export default withStyles(subscriptionPageStyle)(SubscribePage);
