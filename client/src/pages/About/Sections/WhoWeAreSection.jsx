import React from 'react';

import classNames from 'classnames';

import withStyles from '@material-ui/core/styles/withStyles';

// core components
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';

import whoWeAreStyle from 'assets/jss/material-kit-react/views/aboutPageSections/whoWeAreStyle.jsx';

const WhoWeAreSection = props => {
    const { classes } = props;
    return (
        <div className={classes.section}>
            <GridContainer justify="center">
                <GridItem cs={12} sm={12} md={8}>
                    <h2
                        className={classNames(
                            classes.title,
                            classes.textCenter,
                        )}
                    >
                        WHO WE ARE
                    </h2>
                    <p className={classes.description}>
                        WaxQabso is a community that helps people through
                        technology. We organize hackathon every quarter of the
                        year to build tools and programs that benefit the
                        society, government and non-profit organizations. We
                        don’t seek profit from this contributions. We are just
                        passionate people trying to help.
                    </p>
                </GridItem>
            </GridContainer>
        </div>
    );
};

export default withStyles(whoWeAreStyle)(WhoWeAreSection);
