import React from 'react';
import { Link } from 'react-router-dom';

// nodejs library that concatenates classes
import classNames from 'classnames';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';

// @material-ui/icons

// core components
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import Button from 'components/CustomButtons/Button.jsx';
import Parallax from 'components/Parallax/Parallax.jsx';

import homePageStyle from 'assets/jss/material-kit-react/views/homePage.jsx';

// Sections for this page
import WhatWeDoSection from './Sections/WhatWeDoSection.jsx';
import HackathonSection from './Sections/HackathonSection.jsx';
import FinishedHackathonSection from './Sections/FinishedHackathonSection.jsx';
import CallToActionSection from './Sections/CallToActionSection.jsx';
import SponsorSection from './Sections/SponsorSection.jsx';

class HomePage extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Parallax
                    filter
                    image={require('../../assets/img/home-bg.jpg')}
                >
                    <div className={classes.container}>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={6}>
                                <h1 className={classes.title}>
                                    WE GET TOGETHER, BUILD AND GIVE TOGETHER
                                </h1>
                                <h4>We help the world go forward.</h4>
                                <br />
                                <Button
                                    color="primary"
                                    size="lg"
                                    component={Link}
                                    to="/about"
                                >
                                    Know More
                                </Button>
                            </GridItem>
                        </GridContainer>
                    </div>
                </Parallax>
                <div className={classNames(classes.main)}>
                    <div className={classes.container}>
                        <WhatWeDoSection />
                        <HackathonSection />
                        <FinishedHackathonSection />
                        <CallToActionSection />
                        <SponsorSection />
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(homePageStyle)(HomePage);
