import React from 'react';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';

// core components
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';

import sponsorSection from 'assets/jss/material-kit-react/views/homePageSections/sponsorSection.jsx';

class SponsorSection extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.section}>
                <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={12}>
                        <h2 className={classes.title}>OUR SPONSORS</h2>
                    </GridItem>
                </GridContainer>
                <GridContainer alignItems="center" justify="center">
                    <GridItem xs={12} sm={12} md={4}>
                        <div className={classes.textCenter}>
                            <img
                                src={require('../../../assets/img/harhub.png')}
                                alt="HarHub"
                                className={classes.spaceBetween}
                            />
                        </div>
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}

export default withStyles(sponsorSection)(SponsorSection);
