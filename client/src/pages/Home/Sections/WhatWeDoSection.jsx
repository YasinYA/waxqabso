import React from 'react';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';

// core components
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import InfoArea from 'components/InfoArea/InfoArea.jsx';

import whatWeDoStyle from 'assets/jss/material-kit-react/views/homePageSections/whatWeDoStyle.jsx';

class WhatWeDoSection extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.section}>
                <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={8}>
                        <h2 className={classes.title}>WHAT WE DO</h2>
                        <h5 className={classes.description}>
                            We are bunch of cool people, who come together to
                            help their people.
                        </h5>
                    </GridItem>
                </GridContainer>
                <div>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={4}>
                            <InfoArea
                                title="Get Together"
                                description="We get together at a venue to work on projects"
                                icon="users"
                                iconSize="4x"
                                iconColor="info"
                                vertical
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                            <InfoArea
                                title="Build Together"
                                description="We build useful applications that help both community and the country."
                                icon="tools"
                                iconSize="4x"
                                iconColor="success"
                                vertical
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                            <InfoArea
                                title="Give Together"
                                description="We proudly give together what we've built."
                                icon="gifts"
                                iconSize="4x"
                                iconColor="danger"
                                vertical
                            />
                        </GridItem>
                    </GridContainer>
                </div>
            </div>
        );
    }
}

export default withStyles(whatWeDoStyle)(WhatWeDoSection);
