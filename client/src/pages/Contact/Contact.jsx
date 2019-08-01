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

import contactPageStyle from 'assets/jss/material-kit-react/views/contactPage.jsx';

// Sections for this page
import FormSection from './Sections/FormSection.jsx';

class ContactPage extends React.Component {
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
                <FormSection id={id} success={this.successSection.bind(this)} />
            );
        }

        if (this.state.success && !this.state.loading) {
            return (
                <Thankyou
                    title="Thank You For Contacting us"
                    description="We will get back to you asap."
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
                    image={require('../../assets/img/contact-bg.jpg')}
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
                                    Contact Us
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

export default withStyles(contactPageStyle)(ContactPage);
